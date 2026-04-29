"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ContentImage } from "@/components/shared/content-image";

export function DirectoryImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeImage = images[activeIndex] || images[0];

  if (!activeImage) return null;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f2f4f8]">
        <div className="relative h-[420px] overflow-hidden bg-slate-100 sm:h-[520px]">
          <button
            type="button"
            onClick={openModal}
            className="absolute inset-0 cursor-pointer"
            aria-label="Open image in modal"
          >
            <ContentImage src={activeImage} alt={title} fill className="object-contain p-8" />
          </button>
        </div>
        {images.length > 1 ? (
          <div className="flex flex-wrap gap-3 border-t border-slate-200 bg-white p-4">
            {images.slice(0, 8).map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  setIsModalOpen(true);
                }}
                className={`relative h-20 w-20 overflow-hidden rounded-xl border bg-slate-50 transition ${
                  index === activeIndex
                    ? "border-[#0f4e8a] ring-2 ring-[#0f4e8a]/25"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                aria-label={`Open image ${index + 1}`}
              >
                <ContentImage src={image} alt={`${title} thumbnail ${index + 1}`} fill className="object-contain p-2" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeModal}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={activeImage}
              alt={title}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
