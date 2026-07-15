import { useParams, Navigate } from "react-router-dom";
import { registry } from "../../docs/registry";
import { ComponentPreview } from "../projectComponents/ComponentPreview";

export function ComponentPage() {
  const { name } = useParams<{ name: string }>();
  const entry = registry.find(
    (e) => e.name.toLowerCase() === name?.toLowerCase()
  );

  if (!entry) {
    return <Navigate to="/components" replace />;
  }

  return <ComponentPreview entry={entry} />;
}
