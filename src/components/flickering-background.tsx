"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function FlickeringBackground() {
  return (
    <FlickeringGrid
      className="h-full w-full"
      squareSize={2}
      gridGap={2}
      style={{
        maskImage: "linear-gradient(to bottom, black, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
      }}
    />
  );
}
