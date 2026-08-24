import { Carousel } from "../../componentsUI/Carousel";

const sampleItems = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  label: `Item ${i + 1}`,
  color: `hsl(${i * 30}, 70%, 60%)`,
}));

/** Demo 1x1 (un item por página) */
export function CarouselDemo1x1() {
  return (
    <Carousel
      items={sampleItems.slice(0, 5)}
      renderItem={(item) => (
        <div
          className="h-24 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
          style={{ backgroundColor: item.color }}
        >
          {item.label}
        </div>
      )}
    />
  );
}

/** Demo 3x3 (9 items por página) */
export function CarouselDemo3x3() {
  return (
    <Carousel
      items={sampleItems}
      cols={3}
      rows={3}
      renderItem={(item) => (
        <div
          className="h-16 rounded-lg flex items-center justify-center text-white font-medium text-xs"
          style={{ backgroundColor: item.color }}
        >
          {item.label}
        </div>
      )}
    />
  );
}

/** Demo 2x2 (4 items por página) */
export function CarouselDemo2x2() {
  return (
    <Carousel
      items={sampleItems.slice(0, 8)}
      cols={2}
      rows={2}
      gap="gap-2"
      renderItem={(item) => (
        <div
          className="h-20 rounded-lg flex items-center justify-center text-white font-medium text-sm"
          style={{ backgroundColor: item.color }}
        >
          {item.label}
        </div>
      )}
    />
  );
}

/** Demo sin flechas */
export function CarouselDemoDotsOnly() {
  return (
    <Carousel
      items={sampleItems.slice(0, 6)}
      cols={3}
      rows={1}
      showArrows={false}
      renderItem={(item) => (
        <div
          className="h-16 rounded-lg flex items-center justify-center text-white font-medium text-xs"
          style={{ backgroundColor: item.color }}
        >
          {item.label}
        </div>
      )}
    />
  );
}
