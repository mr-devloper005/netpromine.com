"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ContentImage } from "@/components/shared/content-image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TaskImageCarousel({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: images.length > 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
      setActiveIndex(emblaApi.selectedScrollSnap());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (!images.length) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-muted">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div key={`${src}-${index}`} className="min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-[16/10] w-full">
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setIsModalOpen(true);
                  }}
                  className="absolute inset-0 z-10"
                  aria-label={`Open image ${index + 1}`}
                >
                  <ContentImage
                    src={src}
                    alt={`Gallery image ${index + 1} for verified business listing`}
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    quality={78}
                    className="object-cover"
                    intrinsicWidth={1440}
                    intrinsicHeight={900}
                    priority={index === 0}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  emblaApi?.scrollPrev();
                }}
                className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  emblaApi?.scrollNext();
                }}
                className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          ) : null}

          <img
            src={images[activeIndex] || images[0]}
            alt={`Gallery image ${activeIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  );
}




