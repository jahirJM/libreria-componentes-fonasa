import { Command } from "commander";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve, join } from "path";
import ora from "ora";
import { loadRegistry, type RegistryEntry } from "../utils/registry.js";
import { loadConfig } from "../utils/config.js";
import { resolveInternalDeps } from "../utils/resolve.js";
import { fetchComponentSource, fetchTestSource } from "../utils/fetch.js";
import {
  printBanner,
  printSection,
  printBox,
  printSuccessItem,
  printSkippedItem,
  printErrorItem,
  printTip,
  printSeparator,
  brand,
} from "../utils/ui.js";

export const addCommand = new Command("add")
  .description("Agrega uno o más componentes a tu proyecto")
  .argument("<componentes...>", "Nombres de los componentes a instalar")
  .option("-y, --yes", "Instalar sin confirmación", false)
  .option("-o, --overwrite", "Sobrescribir archivos existentes", false)
  .option("-t, --with-tests", "Incluir archivos de test (Jest)", false)
  .option("--only-tests", "Instalar solo los tests (sin copiar componentes)", false)
  .action(async (componentes: string[], opts) => {
    printBanner();

    // 1. Cargar configuración del proyecto
    const config = loadConfig();
    if (!config) {
      printBox("Error", [
        "No se encontró fonasa-ui.json",
        "",
        `Ejecuta primero: ${brand.primary("npx fonasa-ui init")}`,
      ]);
      console.log("");
      return;
    }

    // 2. Cargar registry
    const spinner = ora({
      text: brand.muted("Cargando registro de componentes..."),
      spinner: "dots12",
    }).start();

    const registry = await loadRegistry();
    if (!registry) {
      spinner.fail("No se pudo cargar el registry.");
      return;
    }
    spinner.succeed(brand.muted("Registry sincronizado"));

    // 3. Resolver componentes solicitados
    const notFound: string[] = [];
    const toInstall: RegistryEntry[] = [];

    for (const name of componentes) {
      const entry = registry.find(
        (r) =>
          r.name.toLowerCase() === name.toLowerCase() ||
          r.file.toLowerCase() === name.toLowerCase() + ".tsx"
      );
      if (!entry) {
        notFound.push(name);
      } else {
        toInstall.push(entry);
      }
    }

    if (notFound.length > 0) {
      console.log("");
      for (const name of notFound) {
        printErrorItem(`"${name}" no encontrado`);
      }
      printTip(`Ver disponibles → ${brand.primary("npx fonasa-ui list")}`);
      if (toInstall.length === 0) return;
    }

    // 4. Resolver dependencias internas
    const allComponents = resolveInternalDeps(toInstall, registry);

    // Determinar modo de instalación
    const onlyTests = opts.onlyTests;
    const includeTests = opts.withTests || onlyTests;
    const includeComponents = !onlyTests;
    const testsDir = config.testsDir || "__tests__";

    // Validar que los componentes tengan tests disponibles en modo --only-tests
    if (onlyTests) {
      const sinTest = allComponents.filter((c) => !c.testFile);
      if (sinTest.length > 0) {
        console.log("");
        for (const comp of sinTest) {
          printSkippedItem(`${comp.name} no tiene test disponible`);
        }
      }
    }

    // Mostrar plan de instalación
    printSection("📋", "Plan de instalación");
    console.log("");
    if (includeComponents) {
      console.log(`    ${brand.muted("Destino:")} ${brand.primary(config.componentsDir)}`);
    }
    if (includeTests) {
      console.log(`    ${brand.muted("Tests:")}   ${brand.primary(testsDir)}`);
    }
    if (onlyTests) {
      console.log(`    ${brand.muted("Modo:")}    ${brand.primary("solo tests")}`);
    }
    console.log("");

    for (const comp of allComponents) {
      const isExplicit = toInstall.some((t) => t.name === comp.name);
      const hasTest = comp.testFile ? " 🧪" : "";

      if (onlyTests) {
        // En modo only-tests, solo mostrar los que tienen test
        if (comp.testFile) {
          if (isExplicit) {
            console.log(`    ${brand.primary("◆")} ${comp.testFile}`);
          } else {
            console.log(`    ${brand.dim("◇")} ${comp.testFile} ${brand.dim("(dependencia)")}`);
          }
        }
      } else {
        if (isExplicit) {
          console.log(`    ${brand.primary("◆")} ${comp.file}${includeTests ? hasTest : ""}`);
        } else {
          console.log(`    ${brand.dim("◇")} ${comp.file} ${brand.dim("(dependencia)")}${includeTests ? hasTest : ""}`);
        }
      }
    }

    // 5. Obtener dependencias npm externas
    const allExternalDeps = new Set<string>();
    if (includeComponents) {
      for (const comp of allComponents) {
        if (comp.dependencies) {
          for (const dep of comp.dependencies) {
            allExternalDeps.add(dep);
          }
        }
      }
    }

    // Agregar dependencias de test si se incluyen tests
    const testDevDeps = new Set<string>();
    if (includeTests) {
      testDevDeps.add("jest");
      testDevDeps.add("@testing-library/react");
      testDevDeps.add("@testing-library/jest-dom");
      testDevDeps.add("@types/jest");
      testDevDeps.add("ts-jest");
      testDevDeps.add("jest-environment-jsdom");
    }

    // 6. Crear directorios destino
    if (includeComponents) {
      const destDir = resolve(process.cwd(), config.componentsDir);
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true });
      }
    }

    const testDestDir = resolve(process.cwd(), testsDir);
    if (includeTests && !existsSync(testDestDir)) {
      mkdirSync(testDestDir, { recursive: true });
    }

    // 7. Copiar archivos
    printSection("⬇️", "Instalando");
    console.log("");

    let installed = 0;
    let skipped = 0;
    let testsInstalled = 0;
    let testsSkipped = 0;

    for (const comp of allComponents) {
      // Copiar componente (solo si no es --only-tests)
      if (includeComponents) {
        const destDir = resolve(process.cwd(), config.componentsDir);
        const destFile = join(destDir, comp.file);

        if (existsSync(destFile) && !opts.overwrite) {
          printSkippedItem(`${comp.file} ya existe`);
          skipped++;
        } else {
          try {
            const source = await fetchComponentSource(comp.file);
            if (!source) {
              printErrorItem(`No se pudo obtener ${comp.file}`);
              continue;
            }

            writeFileSync(destFile, source, "utf-8");
            printSuccessItem(comp.file);
            installed++;
          } catch (error) {
            printErrorItem(`${comp.file} — ${(error as Error).message}`);
          }
        }
      }

      // Copiar test si aplica
      if (includeTests && comp.testFile) {
        const testDestFile = join(testDestDir, comp.testFile);

        if (existsSync(testDestFile) && !opts.overwrite) {
          printSkippedItem(`${comp.testFile} ya existe`);
          testsSkipped++;
        } else {
          try {
            const testSource = await fetchTestSource(comp.testFile);
            if (!testSource) {
              printSkippedItem(`${comp.testFile} no disponible`);
              testsSkipped++;
              continue;
            }

            writeFileSync(testDestFile, testSource, "utf-8");
            printSuccessItem(`${comp.testFile} ${brand.dim("(test)")}`);
            testsInstalled++;
          } catch (error) {
            printErrorItem(`${comp.testFile} — ${(error as Error).message}`);
          }
        }
      }
    }

    // 8. Resumen
    printSeparator();
    console.log("");

    if (includeComponents) {
      let summary = `    ${brand.success("●")} ${installed} instalado${installed !== 1 ? "s" : ""}`;
      if (skipped > 0) {
        summary += `  ${brand.warning("○")} ${skipped} omitido${skipped !== 1 ? "s" : ""}`;
      }
      console.log(summary);
    }

    if (includeTests && (testsInstalled > 0 || testsSkipped > 0)) {
      let testSummary = `    ${brand.success("●")} ${testsInstalled} test${testsInstalled !== 1 ? "s" : ""} instalado${testsInstalled !== 1 ? "s" : ""}`;
      if (testsSkipped > 0) {
        testSummary += `  ${brand.warning("○")} ${testsSkipped} test${testsSkipped !== 1 ? "s" : ""} omitido${testsSkipped !== 1 ? "s" : ""}`;
      }
      console.log(testSummary);
    }

    // 9. Dependencias npm
    if (allExternalDeps.size > 0) {
      const depsArray = Array.from(allExternalDeps);
      console.log("");
      printBox("Dependencias requeridas", [
        "",
        `  ${brand.primary(`npm install ${depsArray.join(" ")}`)}`,
        "",
      ]);
    }

    // Dependencias de test (devDependencies)
    if (includeTests && testDevDeps.size > 0) {
      const testDepsArray = Array.from(testDevDeps);
      console.log("");
      printBox("Dependencias de testing (devDependencies)", [
        "",
        `  ${brand.primary(`npm install -D ${testDepsArray.join(" ")}`)}`,
        "",
      ]);
    }

    // 10. Tip final
    if (onlyTests && testsInstalled > 0) {
      printTip("¡Tests agregados! Ejecuta con " + brand.primary("npx jest"));
    } else if (skipped > 0) {
      printTip(`Usa ${brand.primary("--overwrite")} para reemplazar archivos existentes`);
    } else if (includeTests && testsInstalled > 0) {
      printTip("¡Componentes y tests listos! Ejecuta tus tests con " + brand.primary("npx jest"));
    } else {
      printTip("¡Componentes listos para usar! Impórtalos en tu código.");
    }
  });
