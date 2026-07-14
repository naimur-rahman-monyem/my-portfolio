"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
}

interface BackgroundCar {
  laneOffset: number; // pixels from screen edges
  y: number;
  speed: number;
  direction: "up" | "down";
  length: number;
  width: number;
  color: string;
}

export default function CyberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize stars
    const stars: Star[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.8,
      radius: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.003,
    }));

    // Initialize neural network particles
    const particles: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.4 + 0.15,
    }));

    // Initialize side highway traffic (BackgroundCars)
    // Left side: lanes going up (towards top). Right side: lanes going down.
    const bgCars: BackgroundCar[] = Array.from({ length: 10 }, (_, idx) => {
      const isLeft = idx < 5;
      const laneOffset = idx % 2 === 0 ? 30 : 65; // offset from screen edges
      return {
        laneOffset,
        y: Math.random() * height,
        speed: Math.random() * 2.5 + 1.2,
        direction: isLeft ? "up" : "down",
        length: Math.random() * 6 + 14, // height of car
        width: 3.5,
        color: isLeft ? "rgba(6, 182, 212, 0.7)" : "rgba(168, 85, 247, 0.7)", // Left cyan, right purple
      };
    });

    // Glow points (cyber fog)
    const glowPoints = [
      { x: width * 0.2, y: height * 0.3, radius: 250, color: "rgba(6, 182, 212, 0.06)", angle: 0, speed: 0.001 },
      { x: width * 0.8, y: height * 0.4, radius: 300, color: "rgba(168, 85, 247, 0.04)", angle: Math.PI, speed: 0.0008 },
      { x: width * 0.5, y: height * 0.7, radius: 400, color: "rgba(59, 130, 246, 0.05)", angle: Math.PI / 2, speed: 0.0005 },
    ];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const draw = () => {
      // 1. Detect light/dark theme dynamically
      const isDark = document.documentElement.classList.contains("dark");

      // Clear canvas (fully transparent background, let CSS bg-background handle it)
      ctx.clearRect(0, 0, width, height);

      // 2. Draw glowing cyber fog (Dark Mode Only)
      if (isDark) {
        glowPoints.forEach((gp) => {
          gp.angle += gp.speed;
          const dx = Math.sin(gp.angle) * 40;
          const dy = Math.cos(gp.angle) * 40;
          
          const grad = ctx.createRadialGradient(
            gp.x + dx, gp.y + dy, 10,
            gp.x + dx, gp.y + dy, gp.radius
          );
          grad.addColorStop(0, gp.color);
          grad.addColorStop(1, "rgba(3, 7, 18, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(gp.x + dx, gp.y + dy, gp.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 3. Draw Side Highway Lanes & Traffic (animated cars going up/down)
      const laneBorderColor = isDark ? "rgba(6, 182, 212, 0.04)" : "rgba(15, 23, 42, 0.05)";
      ctx.strokeStyle = laneBorderColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 10]);

      // Left lanes
      ctx.beginPath();
      ctx.moveTo(30, 0); ctx.lineTo(30, height);
      ctx.moveTo(65, 0); ctx.lineTo(65, height);
      // Right lanes
      ctx.moveTo(width - 30, 0); ctx.lineTo(width - 30, height);
      ctx.moveTo(width - 65, 0); ctx.lineTo(width - 65, height);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // Draw Background Cars
      bgCars.forEach((car) => {
        const x = car.direction === "up" ? car.laneOffset : width - car.laneOffset;

        // Move car
        if (car.direction === "up") {
          car.y -= car.speed;
          if (car.y < -50) {
            car.y = height + 50;
            car.speed = Math.random() * 2.5 + 1.2;
          }
        } else {
          car.y += car.speed;
          if (car.y > height + 50) {
            car.y = -50;
            car.speed = Math.random() * 2.5 + 1.2;
          }
        }

        // Setup colors based on theme
        let carColor = car.color;
        let headlightColor = isDark ? "rgba(6, 182, 212, 0.9)" : "rgba(2, 132, 199, 0.8)";
        let taillightColor = "rgba(244, 63, 94, 0.85)";

        if (!isDark) {
          carColor = car.direction === "up" ? "rgba(2, 132, 199, 0.45)" : "rgba(124, 58, 237, 0.45)";
        }

        // Draw car body streak
        ctx.fillStyle = carColor;
        ctx.fillRect(x - car.width / 2, car.y - car.length / 2, car.width, car.length);

        // Draw headlights and taillights
        ctx.fillStyle = headlightColor;
        const frontY = car.direction === "up" ? car.y - car.length / 2 : car.y + car.length / 2;
        ctx.fillRect(x - car.width / 2, frontY - 1, car.width, 2);

        ctx.fillStyle = taillightColor;
        const backY = car.direction === "up" ? car.y + car.length / 2 : car.y - car.length / 2;
        ctx.fillRect(x - car.width / 2, backY - 1, car.width, 2);
      });

      // 4. Draw stars (glowing/twinkling)
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        const starColor = isDark
          ? `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, star.alpha))})`
          : `rgba(15, 23, 42, ${Math.max(0.02, Math.min(0.25, star.alpha * 0.25))})`;
        
        if (isDark) {
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 3;
        }
        ctx.fillStyle = starColor;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0; // reset shadow

      // 5. Draw neural net particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;

        const particleColor = isDark
          ? `rgba(6, 182, 212, ${p.alpha})`
          : `rgba(15, 23, 42, ${p.alpha * 0.35})`;

        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 6. Draw neural network connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.15;
            
            ctx.strokeStyle = isDark
              ? `rgba(168, 85, 247, ${alpha})`
              : `rgba(99, 102, 241, ${alpha * 0.35})`;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
