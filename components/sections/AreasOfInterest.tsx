"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Code2, Rocket, TrendingUp, Layers, HardDrive, Briefcase, Sparkles, Globe } from "lucide-react";

export function AreasOfInterest() {
  const categories = [
    { title: "AI & MACHINE LEARNING", icon: Cpu, desc: "Foundational models, agentic workflows, inference & vision" },
    { title: "SOFTWARE DEVELOPMENT", icon: Code2, desc: "Modern full-stack architectures, distributed systems, APIs" },
    { title: "STARTUPS", icon: Rocket, desc: "Early-stage ventures, problem discovery, MVP launch & scale" },
    { title: "ENTREPRENEURSHIP", icon: TrendingUp, desc: "Leadership, venture strategy, resilient execution models" },
    { title: "PRODUCT BUILDING", icon: Layers, desc: "User experience design, validation, roadmap orchestration" },
    { title: "HARDWARE & IoT", icon: HardDrive, desc: "Embedded systems, connected devices, firmware & sensors" },
    { title: "BUSINESS", icon: Briefcase, desc: "Sustainable economics, market analysis, partner networks" },
    { title: "INNOVATION", icon: Sparkles, desc: "Cross-disciplinary breakthroughs, experimentation & research" },
    { title: "TECHNOLOGY", icon: Globe, desc: "Cloud primitives, cybersecurity, developer tooling & platforms" },
  ];

  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 mb-2">
            04 / DOMAINS
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
            EXPLORE. EXCHANGE. BUILD.
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base font-light">
            Our members bring diverse expertise spanning modern computational paradigms,
            software systems, and venture building.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-6 rounded-xl bg-neutral-950/60 border border-neutral-900 hover:border-neutral-700 hover:bg-neutral-900/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded bg-neutral-900 text-neutral-400 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-wider text-neutral-200 group-hover:text-white uppercase transition-colors">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-500 group-hover:text-neutral-400 font-light leading-relaxed transition-colors">
                  {cat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
