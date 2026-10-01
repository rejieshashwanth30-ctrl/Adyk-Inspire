"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export function DynamicBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let rafId: number;
    let targetX = 50;
    let targetY = 30;
    let currentX = 50;
    let currentY = 30;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const updateSmoothPosition = () => {
      // Linear interpolation for smooth trailing light
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setMousePos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateSmoothPosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateSmoothPosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black select-none"
    >
      {/* 1. Subtle radial mouse follower light */}
      {!reducedMotion && (
        <div
          className="absolute -inset-[100px] opacity-25 transition-opacity duration-1000 will-change-transform"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.06), transparent 60%)`,
          }}
        />
      )}

      {/* 2. Top-center ambient depth glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-neutral-800/15 via-neutral-900/5 to-transparent blur-3xl rounded-full" />

      {/* 3. Deep subtle ambient slow-pulsing shapes */}
      <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-neutral-900/20 rounded-full blur-[140px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] bg-neutral-900/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "-4s" }} />

      {/* 4. Fine cinematic noise grain texture */}
      <div className="absolute inset-0 noise-overlay opacity-40 mix-blend-overlay" />

      {/* 5. Delicate structural grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
