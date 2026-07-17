"use client";

import { useState } from "react";

import { GearImage } from "@/components/gear/gear-image";
import { cn } from "@/lib/utils/cn";

interface GearGalleryProps {
  images: string[];
  name: string;
}

export function GearGallery({
  images,
  name,
}: GearGalleryProps) {
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const safeImages =
    images.length > 0
      ? images
      : [null];

  return (
    <div>
      <div className="aspect-[4/3] overflow-hidden rounded-[2rem] border bg-muted">
        <GearImage
          src={safeImages[selectedIndex]}
          alt={name}
          priority
        />
      </div>

      {images.length > 1 ? (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.slice(0, 8).map(
            (image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                aria-label={`Show image ${
                  index + 1
                }`}
                aria-pressed={
                  selectedIndex === index
                }
                className={cn(
                  "aspect-square overflow-hidden rounded-xl border-2 transition",
                  selectedIndex === index
                    ? "border-primary"
                    : "border-transparent opacity-65 hover:opacity-100",
                )}
                onClick={() => {
                  setSelectedIndex(index);
                }}
              >
                <GearImage
                  src={image}
                  alt={`${name} image ${
                    index + 1
                  }`}
                />
              </button>
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}