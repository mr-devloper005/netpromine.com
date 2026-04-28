"use client";

import { useState } from "react";
import { ContentImage } from "@/components/shared/content-image";

export function DirectoryImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || images[0];

  if (!activeImage) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f2f4f8]">
      <div className="relative h-[420px] overflow-hidden bg-slate-100 sm:h-[520px]">
        <ContentImage src={activeImage} alt={title} fill className="object-contain p-8" />
      </div>
      {images.length > 1 ? (
        <div className="flex flex-wrap gap-3 border-t border-slate-200 bg-white p-4">
          {images.slice(0, 8).map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 w-20 overflow-hidden rounded-xl border bg-slate-50 transition ${
                index === activeIndex
                  ? "border-[#0f4e8a] ring-2 ring-[#0f4e8a]/25"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              aria-label={`Show image ${index + 1}`}
            >
              <ContentImage src={image} alt={`${title} thumbnail ${index + 1}`} fill className="object-contain p-2" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

