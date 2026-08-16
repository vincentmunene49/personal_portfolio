"use client";

// next/image with a shimmer placeholder underneath it.
// Needs "use client" because it tracks load state — the server can't know
// whether a given image has painted in the visitor's browser yet.
//
// Analogue: a Flutter FadeInImage, where the placeholder shows until the real
// image resolves and then cross-fades out.

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ShimmerImage({ className = "", ...rest }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // A cached image can finish decoding before React hydrates, in which case
  // onLoad already fired and would never fire again — leaving the image stuck
  // at opacity-0. Checking .complete on mount covers that case.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && (
        <div className="shimmer absolute inset-0 z-10" aria-hidden="true" />
      )}
      <Image
        {...rest}
        ref={ref}
        onLoad={() => setLoaded(true)}
        // A failed image never fires onLoad, so without this the shimmer sits on
        // top of it indefinitely and a broken image is indistinguishable from a
        // loading one. Clearing the flag on error lets the failure show instead.
        onError={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
