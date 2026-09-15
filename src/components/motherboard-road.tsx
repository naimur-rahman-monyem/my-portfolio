"use client";

import { useEffect, useRef } from "react";

interface TracePoint {
  x: number;
  z: number;
}

interface CircuitTrace {
  points: TracePoint[];
  color: string;
  width: number;
  electrons: number[]; // positions along the trace (0 to 1)
  electronSpeed: number;
}

interface Chip {
  x: number;
  z: number;
  w: number;
  h: number;
  color: string;
  label: string;
}

export default function MotherboardRoad({ scrollProgress }: { scrollProgress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    zOffset: 0,
    speed: 1.5,
    targetSpeed: 1.5,
    lastScrollY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 3D projection constants
    const horizonY = height * 0.5; // Horizon at 50% height
    const focalLength = 320;
    const roadWidth3D = 280;

    // Segment length for repeating pattern
    const segmentLength = 600;

    // Create static traces within a segment
    // We define them relative to segment z [0, segmentLength]
    const baseTraces: CircuitTrace[] = [
      // Left edge bus lines
      {
        points: [
          { x: -120, z: 0 },
          { x: -120, z: 150 },
          { x: -90, z: 200 },
          { x: -90, z: 400 },
          { x: -110, z: 450 },
          { x: -110, z: 600 },
        ],
        color: "#00f0ff", // Neon Cyan
        width: 2,
        electrons: [0.1, 0.4, 0.7],
        electronSpeed: 0.003,
      },
      // Center lanes
      {
        points: [
          { x: -40, z: 0 },
          { x: -40, z: 250 },
          { x: -20, z: 300 },
          { x: -20, z: 600 },
        ],
        color: "#3b82f6", // Electric Blue
        width: 1.5,
        electrons: [0.2, 0.6],
        electronSpeed: 0.004,
      },
      {
        points: [
          { x: 40, z: 0 },
          { x: 40, z: 180 },
          { x: 10, z: 240 },
          { x: 10, z: 500 },
          { x: 30, z: 540 },
          { x: 30, z: 600 },
        ],
        color: "#a855f7", // Cyber Purple
        width: 1.5,
        electrons: [0.0, 0.5, 0.8],
        electronSpeed: 0.0035,
      },
      // Right edge bus lines
      {
        points: [
          { x: 120, z: 0 },
          { x: 120, z: 100 },
          { x: 100, z: 140 },
          { x: 100, z: 350 },
          { x: 120, z: 390 },
          { x: 120, z: 600 },
        ],
        color: "#00f0ff",
        width: 2.5,
        electrons: [0.15, 0.55, 0.85],
        electronSpeed: 0.0028,
      },
      // Auxiliary diagonals
      {
        points: [
          { x: -70, z: 100 },
          { x: -45, z: 150 },
          { x: -45, z: 350 },
          { x: -70, z: 400 },
        ],
        color: "#ec4899", // Magenta/Pink
        width: 1,
        electrons: [0.3, 0.8],
        electronSpeed: 0.005,
      },
      {
        points: [
          { x: 70, z: 50 },
          { x: 85, z: 100 },
          { x: 85, z: 400 },
          { x: 60, z: 450 },
        ],
        color: "#10b981", // Emerald Green
        width: 1.2,
        electrons: [0.1, 0.7],
        electronSpeed: 0.0045,
      },
    ];

    // Static microchips on sides of the road
    const baseChips: Chip[] = [
      { x: -170, z: 150, w: 40, h: 30, color: "#1e293b", label: "CPU" },
      { x: 170, z: 300, w: 35, h: 50, color: "#0f172a", label: "RAM" },
      { x: -160, z: 450, w: 30, h: 30, color: "#1e293b", label: "AI" },
      { x: 165, z: 80, w: 25, h: 25, color: "#334155", label: "ROM" },
    ];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Track scroll-based acceleration
    let lastScrollTime = Date.now();
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - stateRef.current.lastScrollY);
      
      if (delta > 0) {
        // Boost target speed based on scroll speed
        const timeNow = Date.now();
        const timeDelta = Math.max(1, timeNow - lastScrollTime);
        lastScrollTime = timeNow;

        const scrollVelocity = delta / timeDelta; // px per ms
        stateRef.current.targetSpeed = Math.min(22, 1.5 + scrollVelocity * 15);
      }
      
      stateRef.current.lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Main Draw & Animation Loop
    const draw = () => {
      // 1. Update speed physics (smooth decay and transition)
      const state = stateRef.current;
      state.speed += (state.targetSpeed - state.speed) * 0.06;
      state.targetSpeed += (1.5 - state.targetSpeed) * 0.02; // slowly decay back to idle speed (1.5)

      // Move road forward
      state.zOffset += state.speed;
      if (state.zOffset >= segmentLength) {
        state.zOffset -= segmentLength;
      }

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Draw motherboard background plate fading to top
      const baseGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      baseGrad.addColorStop(0, "rgba(2, 6, 23, 0)"); // Deepest blue/black
      baseGrad.addColorStop(0.3, "rgba(5, 8, 22, 0.4)");
      baseGrad.addColorStop(1, "rgba(9, 12, 34, 0.85)");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // Helper function to project 3D coordinates (X, Z relative to camera offset) to 2D Screen
      // Camera is positioned above the road, looking down.
      const cameraY = -75; // camera height above road
      
      const project = (x3d: number, z3d: number) => {
        // As Z increases, the object goes further away.
        // If Z is very small (near 0), it's close.
        // We clip Z values behind camera
        const relativeZ = z3d;
        if (relativeZ <= 5) return null;
        
        const scale = focalLength / relativeZ;
        const screenX = width / 2 + x3d * scale;
        const screenY = horizonY - (cameraY * scale);
        return { x: screenX, y: screenY, scale };
      };

      // Draw Motherboard Grid gridlines (horizontal and vertical borders)
      ctx.strokeStyle = "rgba(6, 182, 212, 0.06)";
      ctx.lineWidth = 1;

      // Draw longitudinal road borders
      const drawRoadBorder = (x3d: number) => {
        ctx.beginPath();
        let first = true;
        for (let z = 10; z <= 1200; z += 50) {
          const pt = project(x3d, z);
          if (!pt) continue;
          if (first) {
            ctx.moveTo(pt.x, pt.y);
            first = false;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      };
      
      drawRoadBorder(-roadWidth3D / 2);
      drawRoadBorder(roadWidth3D / 2);

      // Draw horizontal motherboard segments (bus bars)
      const gridZSpacing = 100;
      const startGridZ = (state.zOffset % gridZSpacing);
      for (let z = 10 - startGridZ; z < 1000; z += gridZSpacing) {
        const leftPt = project(-roadWidth3D / 2, z);
        const rightPt = project(roadWidth3D / 2, z);
        if (leftPt && rightPt) {
          ctx.strokeStyle = `rgba(6, 182, 212, ${Math.max(0, 0.12 - z / 1000)})`;
          ctx.beginPath();
          ctx.moveTo(leftPt.x, leftPt.y);
          ctx.lineTo(rightPt.x, rightPt.y);
          ctx.stroke();
        }
      }

      // Draw multiple motherboard segments to cover the viewport range (from Z = 10 to Z = 1000)
      const numSegments = 3;
      for (let segIndex = -1; segIndex < numSegments; segIndex++) {
        const segZOffset = segIndex * segmentLength - state.zOffset;

        // Draw Chips
        baseChips.forEach((chip) => {
          const chipZ = chip.z + segZOffset;
          const pt = project(chip.x, chipZ);
          if (!pt || pt.scale < 0.02) return;

          const w = chip.w * pt.scale;
          const h = chip.h * pt.scale;
          const alpha = Math.max(0, Math.min(1, 1.2 - chipZ / 800));

          // Draw chip body
          ctx.fillStyle = chip.color;
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
          ctx.lineWidth = Math.max(1, pt.scale * 0.5);
          
          ctx.fillRect(pt.x - w / 2, pt.y - h / 2, w, h);
          ctx.strokeRect(pt.x - w / 2, pt.y - h / 2, w, h);

          // Draw metal pins on sides
          ctx.fillStyle = "#94a3b8";
          const numPins = 4;
          const pinW = w * 0.08;
          const pinH = h * 0.05;
          for (let i = 0; i < numPins; i++) {
            const pinY = pt.y - h / 2 + (i + 1) * (h / (numPins + 1));
            // Left pins
            ctx.fillRect(pt.x - w / 2 - pinW, pinY - pinH / 2, pinW, pinH);
            // Right pins
            ctx.fillRect(pt.x + w / 2, pinY - pinH / 2, pinW, pinH);
          }

          // Label
          ctx.fillStyle = "rgba(6, 182, 212, 0.8)";
          ctx.font = `${Math.max(6, Math.round(9 * pt.scale))}px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(chip.label, pt.x, pt.y);
          
          ctx.globalAlpha = 1;
        });

        // Draw Circuit Traces
        baseTraces.forEach((trace) => {
          ctx.beginPath();
          let initialized = false;
          let alpha = 1;

          // Draw the trace line
          trace.points.forEach((pt) => {
            const traceZ = pt.z + segZOffset;
            const screenPt = project(pt.x, traceZ);
            if (!screenPt) return;

            alpha = Math.max(0, Math.min(1, 1.3 - traceZ / 800));

            if (!initialized) {
              ctx.moveTo(screenPt.x, screenPt.y);
              initialized = true;
            } else {
              ctx.lineTo(screenPt.x, screenPt.y);
            }
          });

          if (initialized) {
            // Draw glowing thick underlying line for neon effect
            ctx.strokeStyle = trace.color;
            ctx.globalAlpha = alpha * 0.15;
            ctx.lineWidth = trace.width * 3;
            ctx.stroke();

            // Draw bright thin core line
            ctx.strokeStyle = "#ffffff";
            ctx.globalAlpha = alpha * 0.8;
            ctx.lineWidth = trace.width;
            ctx.stroke();

            ctx.globalAlpha = 1.0;
          }

          // Animate & Draw glowing electrons flowing along the paths
          trace.electrons.forEach((eProgress, index) => {
            // Speed accelerates with road speed
            let nextProgress = eProgress + trace.electronSpeed * (state.speed * 0.6);
            if (nextProgress > 1) nextProgress -= 1;
            trace.electrons[index] = nextProgress;

            // Find current position on trace path
            const numSegmentsInPath = trace.points.length - 1;
            const targetSegmentIdx = Math.floor(nextProgress * numSegmentsInPath);
            const segmentProgress = (nextProgress * numSegmentsInPath) % 1;

            if (targetSegmentIdx >= numSegmentsInPath || targetSegmentIdx < 0) return;

            const pStart = trace.points[targetSegmentIdx];
            const pEnd = trace.points[targetSegmentIdx + 1];

            // Lerp 3D coordinates
            const current3DX = pStart.x + (pEnd.x - pStart.x) * segmentProgress;
            const current3DZ = (pStart.z + (pEnd.z - pStart.z) * segmentProgress) + segZOffset;

            const electronPt = project(current3DX, current3DZ);
            if (!electronPt) return;

            const eAlpha = Math.max(0, Math.min(1, 1.3 - current3DZ / 800));

            // Draw electron pulse glow
            ctx.fillStyle = trace.color;
            ctx.globalAlpha = eAlpha;
            ctx.beginPath();
            ctx.arc(electronPt.x, electronPt.y, Math.max(2, trace.width * 2.5 * electronPt.scale), 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(electronPt.x, electronPt.y, Math.max(1, trace.width * 1.2 * electronPt.scale), 0, Math.PI * 2);
            ctx.fill();
            
            ctx.globalAlpha = 1.0;
          });
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-[55vh] z-10 pointer-events-none"
      style={{
        maskImage: "linear-gradient(to top, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0))",
        WebkitMaskImage: "linear-gradient(to top, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0))",
      }}
    />
  );
}
