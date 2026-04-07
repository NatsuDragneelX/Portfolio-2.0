"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

function initialsFromName(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Uses a plain <img> (not next/image) so very large phone JPEGs still load reliably.
 * next/image + Sharp can fail or strip huge files; the browser handles them fine.
 */
export function ProfilePhoto({ src, alt, className, priority = false }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={cn(
        "relative aspect-square w-full max-w-[280px] min-w-[200px] overflow-hidden bg-muted/30",
        className
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          width={800}
          height={800}
          className="absolute inset-0 h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="flex h-full min-h-[200px] w-full items-center justify-center bg-muted/40 text-3xl font-semibold tracking-tight text-muted-foreground"
          aria-hidden={!src}
        >
          {initialsFromName(alt || "?")}
        </div>
      )}
    </div>
  );
}
