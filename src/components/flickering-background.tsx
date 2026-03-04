"use client";
import { useEffect, useState } from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function FlickeringBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="h-[100px] w-full" />;

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