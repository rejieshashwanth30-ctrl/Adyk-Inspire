"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, BookOpen, Hammer, Users } from "lucide-react";

export function WhatYouCanDo() {
  const cards = [
    {
      num: "01",
      title: "SHARE IDEAS",
      desc: "Share startup concepts, product ideas, innovations and solutions in a constructive environment.",
      icon: Lightbulb,
    },
    {
      num: "02",
      title: "LEARN",
      desc: "Exchange knowledge, experiences, technical skills and useful architectural resources.",
      icon: BookOpen,
    },
    {
      num: "03",
      title: "BUILD TOGETHER",
      desc: "Find dedicated people interested in building projects, real-world products and early-stage startups.",
      icon: Hammer,
    },
    {
      num: "04",
      title: "CONNECT",
      desc: "Meet students, developers, creators, founders and technology enthusiasts with shared drive.",
      icon: Users,
    },
  ];

  return (
    <section id="capabilities" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 mb-2">
              02 / CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              WHAT YOU CAN DO
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-sm">
            A collaborative ground engineered for rapid idea exchange and collective engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-8 sm:p-10 rounded-2xl bg-neutral-950/80 border border-neutral-800/90 transition-all duration-300 hover:border-neutral-500 hover:bg-neutral-900/40 hover:shadow-2xl hover:shadow-white/[0.02]"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-sm tracking-widest text-neutral-500 group-hover:text-white transition-colors">
                    {card.num}
                  </span>
                  <div className="p-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-neutral-400 group-hover:text-white group-hover:border-neutral-700 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
                  {card.desc}
                </p>

                <div className="mt-8 pt-4 border-t border-neutral-900/60 flex items-center justify-between text-xs text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  <span className="tracking-wider uppercase font-mono">ADYK Inspire</span>
                  <span>Learn • Build • Share</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
