"use client";

import React from "react";
import { motion } from "framer-motion";

export function WhoIsFor() {
  const roles = [
    "Students",
    "Developers",
    "Founders",
    "Entrepreneurs",
    "Creators",
    "Product Builders",
    "AI Enthusiasts",
    "Technology Enthusiasts",
  ];

  return (
    <section className="relative py-28 sm:py-36 border-t border-neutral-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2"
        >
          <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 mb-4">
            03 / AUDIENCE
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase text-white leading-none">
            FOR THE CURIOUS.
          </h2>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase text-neutral-400 leading-none">
            FOR THE BUILDERS.
          </h2>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase text-neutral-600 leading-none">
            FOR THE DREAMERS.
          </h2>
        </motion.div>
      </div>

      {/* Slow Horizontal Marquee */}
      <div className="relative w-full overflow-hidden py-4 border-y border-neutral-900/60 bg-neutral-950/40">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
          {[...roles, ...roles, ...roles].map((role, idx) => (
            <div
              key={`${role}-${idx}`}
              className="inline-flex items-center gap-12 text-sm sm:text-base font-mono tracking-[0.2em] uppercase text-neutral-400 select-none hover:text-white transition-colors"
            >
              <span>{role}</span>
              <span className="text-neutral-700 text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
