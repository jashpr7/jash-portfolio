"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
};

export function AmbientScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let running = true;
    let pointerX = width * 0.68;
    let pointerY = height * 0.3;
    const particleCount = reducedMotion ? 0 : coarsePointer ? 18 : 38;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      radius: 1.2 + Math.random() * 2.6,
      hue: [336, 258, 169, 43][index % 4],
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const draw = () => {
      if (!running) return;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        const dx = pointerX - particle.x;
        const dy = pointerY - particle.y;
        const distance = Math.hypot(dx, dy) || 1;

        if (distance < 240 && !coarsePointer) {
          particle.vx += (dx / distance) * 0.0017;
          particle.vy += (dy / distance) * 0.0017;
        }

        particle.vx *= 0.995;
        particle.vy *= 0.995;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        const glow = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 8,
        );
        glow.addColorStop(0, `hsla(${particle.hue}, 85%, 68%, 0.34)`);
        glow.addColorStop(1, `hsla(${particle.hue}, 85%, 68%, 0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius * 8, 0, Math.PI * 2);
        context.fill();

        for (let compareIndex = index + 1; compareIndex < particles.length; compareIndex += 1) {
          const other = particles[compareIndex];
          const lineDistance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (lineDistance < 116) {
            context.strokeStyle = `rgba(79, 62, 130, ${0.055 * (1 - lineDistance / 116)})`;
            context.lineWidth = 0.75;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      });

      frame = window.requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      running = !document.hidden;
      if (running) draw();
      else window.cancelAnimationFrame(frame);
    };

    resize();
    if (!reducedMotion) draw();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />;
}
