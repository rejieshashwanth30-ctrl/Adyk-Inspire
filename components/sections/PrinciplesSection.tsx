"use client";

import React from "react";
import { motion } from "framer-motion";

export function PrinciplesSection() {
  const principles = [
    {
      num: "01",
      title: "LEARN WITHOUT LIMITS",
      tagline: "Stay curious. Ask questions. Share knowledge.",
      desc: "There are no foolish questions in frontier engineering or early venture experimentation. True mastery emerges from relentless curiosity and shared learning loops.",
    },
    {
      num: "02",
      title: "BUILD WITH PURPOSE",
      tagline: "Turn ideas into experiments, projects and real solutions.",
      desc: "The value of thought resides in execution. We believe in turning abstract musings into prototypes, codebases, hardware builds, and practical implementations.",
    },
    {
      num: "03",
      title: "GROW TOGETHER",
      tagline: "Connect with people, exchange perspectives and create opportunities.",
      desc: "Technology breakthroughs are collaborative achievements. By bringing together students, developers, founders and thinkers, we unlock non-linear opportunities.",
    },
  ];

  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 mb-2">
            06 / VALUES
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            COMMUNITY PRINCIPLES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((p, idx) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between p-8 rounded-2xl bg-neutral-950/60 border border-neutral-900 hover:border-neutral-700 transition-colors"
            >
              <div>
                <span className="font-mono text-xs tracking-widest text-neutral-600 block mb-6">
                  PRINCIPLE // {p.num}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-white mb-2 uppercase">
                  {p.title}
                </h3>
                <p className="text-sm font-medium text-neutral-300 mb-4">
                  {p.tagline}
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  {p.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] text-neutral-600 font-mono">
                <span>ADYK</span>
                <span>AUTHENTICITY</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
