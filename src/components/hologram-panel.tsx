"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HologramPanelProps {
  children: ReactNode;
  title: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  className?: string;
}

export default function HologramPanel({
  children,
  title,
  duration = 6,
  delay = 0,
  yOffset = 15,
  className = "",
}: HologramPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: [0.7, 0.95, 0.7],
        y: [0, -yOffset, 0, yOffset, 0],
        rotateX: [2, -2, 2],
        rotateY: [-3, 3, -3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute hidden md:flex flex-col rounded-xl border border-cyan-500/30 dark:border-cyan-500/20 bg-cyan-500/5 dark:bg-cyan-950/10 backdrop-blur-md p-4 shadow-[0_0_20px_-3px_rgba(6,182,212,0.15)] pointer-events-none overflow-hidden select-none z-10 ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Scanline overlay effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 240, 255, 1) 50%, rgba(0, 0, 0, 0) 50%)",
          backgroundSize: "100% 4px",
        }}
      />
      
      {/* Hologram Header bar */}
      <div className="flex items-center justify-between border-b border-cyan-500/30 dark:border-cyan-500/20 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
            {title}
          </span>
        </div>
        <span className="font-mono text-[8px] text-cyan-600/70 dark:text-cyan-500/60">SYSTEM // RUNNING</span>
      </div>

      {/* Content */}
      <div className="font-mono text-[10px] text-cyan-800 dark:text-cyan-300/85 leading-relaxed leading-4">
        {children}
      </div>

      {/* Glass Corner Highlights */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-600/50 dark:border-cyan-400/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-600/50 dark:border-cyan-400/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-600/50 dark:border-cyan-400/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-600/50 dark:border-cyan-400/50" />
    </motion.div>
  );
}
