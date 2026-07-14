"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { DATA } from "@/data/resume";
import MotherboardRoad from "@/components/motherboard-road";
import SportsCar from "@/components/sports-car";
import HologramPanel from "@/components/hologram-panel";

function CyberCyclingDescription({ description }: { description: string }) {
  const lines = description.split("\n").map(l => l.trim()).filter(Boolean);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [lines.length]);

  return (
    <div className="h-14 flex items-center justify-center md:justify-start">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-cyan-400/90 font-mono text-sm md:text-base max-w-[500px]"
        >
          &gt; {lines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function CyberpunkHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transformations for scroll depth
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const carZoom = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const carY = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100vh] min-h-[600px] overflow-hidden flex flex-col justify-between"
    >

      {/* 2. Horizontal Cyber Gradient Splitter */}
      <div className="absolute top-[48vh] inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent shadow-[0_0_8px_1px_rgba(6,182,212,0.3)] z-10" />

      {/* 3. Floating Hologram Panels */}
      {/* Left Panel */}
      <HologramPanel 
        title="sys.config()" 
        className="left-[6%] top-[20%] w-[210px] hidden lg:flex" 
        duration={5.5}
        delay={0.2}
      >
        <span className="text-cyan-500">const</span> dev = &#123;<br />
        &nbsp;&nbsp;name: <span className="text-pink-400">&quot;Naimur Rahman&quot;</span>,<br />
        &nbsp;&nbsp;role: <span className="text-pink-400">&quot;C# / Java Dev&quot;</span>,<br />
        &nbsp;&nbsp;focus: <span className="text-pink-400">&quot;Data Analysis&quot;</span>,<br />
        &nbsp;&nbsp;motto: <span className="text-emerald-400">&quot;Decode complexity&quot;</span><br />
        &#125;;
      </HologramPanel>

      {/* Right Panel */}
      <HologramPanel 
        title="research.log()" 
        className="right-[6%] top-[22%] w-[240px] hidden lg:flex" 
        duration={6.5}
        delay={1.5}
      >
        <span className="text-purple-400"># Phishing detection ML</span><br />
        &nbsp;&nbsp;[DISTILBERT] Extracted URL<br />
        &nbsp;&nbsp;[CNN] Visual Extraction<br />
        &nbsp;&nbsp;[ACCURACY] &gt; 97.4%<br />
        <span className="text-purple-400"># Explainable AI (XAI)</span><br />
        &nbsp;&nbsp;Cybersecurity risk framework
      </HologramPanel>

      {/* Center Bottom Panel */}
      <HologramPanel 
        title="data.stack()" 
        className="left-[12%] top-[55%] w-[180px] hidden xl:flex" 
        duration={7}
        delay={0.8}
        yOffset={10}
      >
        &gt; python / pandas / numpy<br />
        &gt; sql server / postgresql<br />
        &gt; next.js / tailwind css<br />
        &gt; git / ci-cd pipeline
      </HologramPanel>

      {/* 4. Top Header Information */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 w-full max-w-2xl mx-auto pt-20 px-6 flex flex-col items-center md:items-start text-center md:text-left flex-grow-0"
      >
        {/* Connection status tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 dark:border-cyan-500/20 bg-cyan-500/5 dark:bg-cyan-950/20 backdrop-blur-sm mb-4">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            LOC: Dhaka, Bangladesh // Secure Connection
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-sans">
          Hi, I&apos;m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            {DATA.name.split(" ").slice(0, 2).join(" ")}
          </span>
        </h1>

        <CyberCyclingDescription description={DATA.description} />
      </motion.div>

      {/* 5. Motherboard Highway (Canvas) */}
      <MotherboardRoad scrollProgress={0} />

      {/* 6. Reactive Vehicle Base Container (Car sits at center bottom) */}
      <motion.div
        style={{ scale: carZoom, y: carY }}
        className="relative w-full z-20 flex flex-col items-center pb-8 mt-auto"
      >
        <SportsCar />

        {/* Scroll helper cue */}
        <div className="mt-4 flex flex-col items-center gap-1.5 opacity-40">
          <span className="font-mono text-[9px] tracking-widest text-cyan-400 uppercase animate-pulse">
            Scroll to Accelerate
          </span>
          <div className="w-4 h-6 border border-cyan-400/30 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 bg-cyan-400 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
