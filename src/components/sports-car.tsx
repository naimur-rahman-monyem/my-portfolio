"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export default function SportsCar() {
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  // Frame loop for exhaust particles & scroll speed decay
  useEffect(() => {
    let animationFrameId: number;

    const update = () => {
      // 1. Decay scroll speed back to idle (1.0)
      setScrollSpeed((prev) => prev + (1 - prev) * 0.05);

      // 2. Update existing particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            alpha: p.alpha - 0.02,
            size: p.size * 0.96,
          }))
          .filter((p) => p.alpha > 0)
      );

      // 3. Spawn new exhaust particles (rate scales with speed)
      const spawnChance = 0.15 + (scrollSpeed - 1) * 0.15;
      if (Math.random() < spawnChance) {
        const id = particleIdRef.current++;
        const speedMultiplier = scrollSpeed * 1.5;

        // Exhaust coordinates relative to the exhausts
        // Left exhaust is around x: 100, y: 110; Right is x: 200, y: 110
        const isLeft = Math.random() > 0.5;
        const startX = isLeft ? 98 : 202;
        const startY = 112;

        const newParticle: Particle = {
          id,
          x: startX,
          y: startY,
          vx: (Math.random() - 0.5) * 1.0,
          vy: Math.random() * 2.0 * speedMultiplier + 1.0, // exhaust blows downwards/towards viewer
          size: Math.random() * 4 + 3,
          alpha: Math.random() * 0.7 + 0.3,
        };

        setParticles((prev) => [...prev, newParticle]);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollSpeed]);

  // Listen to window scroll to boost speed
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);
      const timeNow = Date.now();
      const timeDelta = Math.max(1, timeNow - lastScrollTime.current);
      
      if (delta > 0) {
        const speed = delta / timeDelta;
        setScrollSpeed(Math.min(10, 1 + speed * 12));
      }

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = timeNow;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Suspension vibration controls
  const bodyBounceY: any = {
    animate: {
      y: [0, -1.5, 0, -0.8, 0],
      transition: {
        duration: Math.max(0.12, 0.4 / scrollSpeed), // vibrates faster when driving fast
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Underglow intensity
  const underglowOpacity = 0.6 + (scrollSpeed - 1) * 0.04;
  const underglowBlur = 14 + (scrollSpeed - 1) * 3;

  return (
    <div className="relative w-[280px] sm:w-[320px] mx-auto z-20 flex flex-col items-center">
      {/* Light Cones from Headlights (shining forward onto road/horizon) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[120px] w-[500px] h-[300px] pointer-events-none opacity-30 mix-blend-screen transition-all duration-300"
        style={{
          background: "radial-gradient(ellipse at bottom center, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(3, 7, 18, 0) 100%)",
          maskImage: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
          WebkitMaskImage: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
          transform: `translateX(-50%) scaleX(${1 + (scrollSpeed - 1) * 0.05}) scaleY(${1 + (scrollSpeed - 1) * 0.03})`,
        }}
      />

      {/* Cyberpunk Cyan Underglow */}
      <div
        className="absolute bottom-1 w-[220px] h-6 rounded-full bg-cyan-500 pointer-events-none mix-blend-screen transition-all duration-150"
        style={{
          filter: `blur(${underglowBlur}px)`,
          opacity: underglowOpacity,
          transform: `scaleX(${1 + (scrollSpeed - 1) * 0.08})`,
        }}
      />

      {/* SVG Particles layer (Exhaust) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {particles.map((p) => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill="#06b6d4"
            opacity={p.alpha}
            style={{ filter: "blur(1.5px)", mixBlendMode: "screen" }}
          />
        ))}
      </svg>

      {/* The Sports Car SVG */}
      <motion.svg
        width="100%"
        viewBox="0 0 300 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate="animate"
        className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
      >
        {/* WHEELS (Static Tires relative to suspension bounce) */}
        {/* Left Wheel */}
        <rect x="42" y="104" width="28" height="34" rx="4" fill="#090d16" stroke="#1e293b" strokeWidth="2" />
        <line x1="42" y1="112" x2="70" y2="112" stroke="#475569" strokeWidth="2" />
        <line x1="42" y1="120" x2="70" y2="120" stroke="#475569" strokeWidth="2" />
        <line x1="42" y1="128" x2="70" y2="128" stroke="#475569" strokeWidth="2" />

        {/* Right Wheel */}
        <rect x="230" y="104" width="28" height="34" rx="4" fill="#090d16" stroke="#1e293b" strokeWidth="2" />
        <line x1="230" y1="112" x2="258" y2="112" stroke="#475569" strokeWidth="2" />
        <line x1="230" y1="120" x2="258" y2="120" stroke="#475569" strokeWidth="2" />
        <line x1="230" y1="128" x2="258" y2="128" stroke="#475569" strokeWidth="2" />

        {/* BODY (Bounces on suspension) */}
        <motion.g variants={bodyBounceY}>
          {/* Rear diffuser */}
          <path d="M60 115 H240 V126 L220 134 H80 L60 126 Z" fill="#0b0f19" stroke="#1e293b" strokeWidth="2" />
          
          {/* Diffuser vertical fins */}
          <rect x="95" y="118" width="4" height="14" fill="#00f0ff" opacity="0.8" />
          <rect x="120" y="118" width="4" height="14" fill="#1e293b" />
          <rect x="148" y="118" width="4" height="14" fill="#1e293b" />
          <rect x="176" y="118" width="4" height="14" fill="#1e293b" />
          <rect x="201" y="118" width="4" height="14" fill="#00f0ff" opacity="0.8" />

          {/* Left Exhaust Pipe */}
          <rect x="94" y="110" width="10" height="6" rx="1" fill="#334155" stroke="#475569" />
          <circle cx="99" cy="113" r="3" fill="#000000" />
          <circle cx="99" cy="113" r="1.5" fill="#00f0ff" />

          {/* Right Exhaust Pipe */}
          <rect x="196" y="110" width="10" height="6" rx="1" fill="#334155" stroke="#475569" />
          <circle cx="201" cy="113" r="3" fill="#000000" />
          <circle cx="201" cy="113" r="1.5" fill="#00f0ff" />

          {/* Cyberpunk LED exhaust center booster (flickers based on scroll speed) */}
          <rect x="136" y="108" width="28" height="6" rx="2" fill="#020617" stroke="#1e293b" />
          <rect x="138" y="110" width="24" height="2" rx="1" fill="#ec4899" opacity={0.6 + Math.random() * 0.4} />

          {/* Main rear body lower bumper */}
          <path d="M50 82 L55 116 H245 L250 82 Z" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          
          {/* Rear license plate display */}
          <rect x="125" y="90" width="50" height="15" rx="2" fill="#020617" stroke="#00f0ff" strokeWidth="1" />
          <text x="150" y="100" fill="#00f0ff" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="1" fontWeight="bold">
            NRM 7402
          </text>

          {/* Main rear bumper side panels (carbon texture or glossy dark) */}
          <path d="M45 80 L50 114 H80 L75 80 Z" fill="#090d16" />
          <path d="M255 80 L250 114 H220 L225 80 Z" fill="#090d16" />

          {/* Rear wheel arches */}
          <path d="M40 86 Q30 96 42 110 L45 102 Q38 94 44 88 Z" fill="#1e293b" />
          <path d="M260 86 Q270 96 258 110 L255 102 Q262 94 256 88 Z" fill="#1e293b" />

          {/* Upper rear body & decklid */}
          <path d="M60 45 L50 80 H250 L240 45 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />

          {/* Rear Window / Canopy */}
          <path d="M90 24 L75 48 H225 L210 24 Z" fill="#020617" stroke="#475569" strokeWidth="1.5" />
          <path d="M102 26 L90 46 H210 L198 26 Z" fill="#090d16" opacity="0.6" />
          {/* Glass glare line */}
          <path d="M110 28 L94 46" stroke="#94a3b8" strokeWidth="1" opacity="0.3" />

          {/* Aerodynamic Roof Scoop/Ridge */}
          <path d="M142 18 L147 28 H153 L158 18 Z" fill="#334155" />

          {/* Side Mirrors */}
          <path d="M72 44 L54 40 L56 36 L70 42 Z" fill="#0f172a" stroke="#334155" />
          <path d="M228 44 L246 40 L244 36 L230 42 Z" fill="#0f172a" stroke="#334155" />

          {/* Rear Wing / Spoiler (Cyberpunk active spoiler) */}
          <path d="M42 42 H258 L250 48 H50 Z" fill="#090d16" stroke="#475569" strokeWidth="1.5" />
          {/* Wing pillars */}
          <rect x="75" y="47" width="10" height="12" fill="#1e293b" />
          <rect x="215" y="47" width="10" height="12" fill="#1e293b" />
          {/* Endplates */}
          <path d="M40 34 L44 50 L40 54 L36 38 Z" fill="#00f0ff" stroke="#00f0ff" strokeWidth="1" opacity="0.9" />
          <path d="M260 34 L256 50 L260 54 L264 38 Z" fill="#00f0ff" stroke="#00f0ff" strokeWidth="1" opacity="0.9" />

          {/* Taillights: LED Glowing Cyber Lightbar (Neon pink/red) */}
          {/* Inner dark bar slot */}
          <path d="M52 74 H248 V80 H52 Z" fill="#020617" />
          
          {/* Glowing bar */}
          <path
            d="M54 76 H246 V78 H54 Z"
            fill="#ff007f"
            style={{
              filter: `drop-shadow(0 0 ${2 + (scrollSpeed - 1) * 0.8}px #ff007f)`,
            }}
          />
          <circle cx="56" cy="77" r="2.5" fill="#ffffff" style={{ filter: "drop-shadow(0 0 2px #ff007f)" }} />
          <circle cx="244" cy="77" r="2.5" fill="#ffffff" style={{ filter: "drop-shadow(0 0 2px #ff007f)" }} />

          {/* Signal Indicator elements */}
          <rect x="66" y="76" width="18" height="2" fill="#00f0ff" opacity="0.9" />
          <rect x="216" y="76" width="18" height="2" fill="#00f0ff" opacity="0.9" />
          
          {/* Body contours and reflections */}
          <path d="M60 48 L140 76 M240 48 L160 76" stroke="#475569" strokeWidth="1" opacity="0.4" />
        </motion.g>
      </motion.svg>

      {/* SpeedometerHUD overlay (shows up when accelerating / scrolling) */}
      {scrollSpeed > 1.2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -top-12 px-3 py-1 bg-black/80 border border-cyan-500/50 rounded-md font-mono text-[10px] text-cyan-400 flex items-center gap-2 backdrop-blur-sm pointer-events-none"
        >
          <span className="animate-pulse">HUD // SPEED:</span>
          <span className="text-white font-bold">{Math.round(scrollSpeed * 34)} km/h</span>
        </motion.div>
      )}
    </div>
  );
}
