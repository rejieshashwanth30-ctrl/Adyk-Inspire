"use client";

import React from "react";
import { motion } from "framer-motion";

export function ManifestoSection() {
  return (
    <section id="about" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500">
            01 / MANIFESTO
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.05]">
            BUILT FOR PEOPLE<br />
            <span className="text-neutral-500">WHO WANT TO BUILD.</span>
          </h2>

          <p className="mt-4 text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
            Whether you&apos;re exploring your first startup idea, building a project,
            learning a new technology, looking for collaborators, or simply curious about
            what comes next, ADYK Inspire gives you a place to connect, exchange ideas and grow.
          </p>

          <div className="mt-8 pt-8 border-t border-neutral-900 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Open</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Community Platform</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Zero</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Membership Fees</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Direct</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Peer Collaboration</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Multi-tech</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Venture Ecosystem</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
