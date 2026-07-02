"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";

export function SmoothShell({ children }: { children: React.ReactNode }) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.86,
      touchMultiplier: 1.1
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const move = (event: PointerEvent) => {
      glow.animate(
        {
          transform: `translate3d(${event.clientX - 160}px, ${event.clientY - 160}px, 0)`
        },
        { duration: 700, fill: "forwards", easing: "cubic-bezier(.2,.8,.2,1)" }
      );
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      {children}
    </>
  );
}
