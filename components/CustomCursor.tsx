"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let raf = 0;

    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const loop = () => {
      ringX += (x - ringX) * 0.14;
      ringY += (y - ringY) * 0.14;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const view = Boolean(target.closest("[data-cursor='view']"));
      const active = Boolean(target.closest("a, button, [data-cursor='view']"));
      ringRef.current?.classList.toggle("is-active", active);
      ringRef.current?.classList.toggle("is-view", view);
    };

    const leave = () => ringRef.current?.classList.add("is-hidden");
    const enter = () => ringRef.current?.classList.remove("is-hidden");

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor cursor--dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor cursor--ring" aria-hidden="true">
        <span>VIEW</span>
      </div>
    </>
  );
}
