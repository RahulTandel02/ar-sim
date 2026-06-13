import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface Img {
  id: number;
  src: string;
}

interface GridProps {
  data: Img[];
}

export default function Grid({ data }: GridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openAt = (index: number) => setSelectedIndex(index);
  const close = () => setSelectedIndex(null);

  const next = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((s) => (s === null ? null : (s + 1) % data.length));
  }, [selectedIndex, data.length]);

  const prev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((s) =>
      s === null ? null : (s - 1 + data.length) % data.length,
    );
  }, [selectedIndex, data.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, next, prev]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {data.map((image, idx) => (
          <button
            key={image.id}
            onClick={() => openAt(idx)}
            className="overflow-hidden rounded-lg bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label={`Open image ${idx + 1}`}
          >
            <div className="relative h-36 sm:h-40 w-full">
              <Image
                src={image.src}
                alt={`Image ${image.id}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${selectedIndex + 1} preview`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <div
            className="relative max-h-full max-w-full touch-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close preview"
              className="absolute right-2 top-2 z-50 rounded-full bg-black/60 p-2 text-white hover:bg-black/70"
            >
              ✕
            </button>

            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-40 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
            >
              ‹
            </button>

            <div className="flex items-center justify-center">
              <Image
                src={data[selectedIndex].src}
                alt={`Image ${data[selectedIndex].id}`}
                width={1200}
                height={800}
                className="max-h-[80vh] max-w-[90vw] object-contain"
                sizes="(max-width: 640px) 90vw, 1200px"
              />
            </div>

            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-40 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
