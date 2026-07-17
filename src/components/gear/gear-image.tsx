"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

import { cn } from "@/lib/utils/cn";

interface GearImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function GearImage({
  src,
  alt,
  className,
  priority = false,
}: GearImageProps) {
  const [failedSrc, setFailedSrc] =
    useState<string | null>(null);

  const imageFailed =
    !src || failedSrc === src;

  if (imageFailed) {
    return (
      <div
        className={cn(
          "flex size-full items-center justify-center bg-gradient-to-br from-primary/15 via-muted to-accent/10 text-muted-foreground",
          className,
        )}
      >
        <ImageOff className="size-12" />
      </div>
    );
  }

  return (
    // Remote providers can use different image hosts.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={
        priority ? "high" : "auto"
      }
      className={cn(
        "size-full object-cover",
        className,
      )}
      onError={() => {
        setFailedSrc(src);
      }}
    />
  );
}