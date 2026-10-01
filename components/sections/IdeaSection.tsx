"use client";

import React from "react";
import { motion } from "framer-motion";

export function IdeaSection() {
  return (
    <section id="ideas" className="relative py-32 sm:py-44 px-4 sm:px-6 lg:px-8 border-t border-neutral-900 bg-neutral-950/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8"
        >
          <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500">
            05 / CONVICTION
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-white leading-[0.95] select-none">
            GOOD IDEAS<br />
            <span className="text-neutral-500">SHOULD NOT</span><br />
            STAY IDEAS.
          </h2>

          <div className="mt-4 max-w-2xl flex flex-col gap-4 text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            <p>
              ADYK Inspire creates a dedicated space where ideas can be shared,
              constructively challenged, refined, and methodically explored.
            </p>
            <p className="text-neutral-500">
              Whether your idea is only a thought in your head or already becoming a product,
              you can start here. You do not need a finished startup to belong.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
