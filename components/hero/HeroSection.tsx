"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AdykLogo } from "@/components/ui/AdykLogo";

export function HeroSection() {
  const words = ["LEARN", "BUILD", "SHARE", "INSPIRE"];

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 pt-32 pb-16 overflow-hidden">
      
      {/* Center Hero Content */}
      <div className="max-w-4xl mx-auto flex-1 flex flex-col justify-center items-center">
        
        {/* Brand Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-950/70 text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>ADYK • A MULTI-VENTURE TECHNOLOGY COMPANY</span>
        </motion.div>

        {/* Central Logo Motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <AdykLogo size="lg" href={undefined} />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white uppercase select-none"
        >
          INSPIRE
        </motion.h1>

        {/* Secondary Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-neutral-200 max-w-2xl"
        >
          A community for people who want to learn, build, share and grow.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-sm sm:text-base text-neutral-400 max-w-xl font-normal leading-relaxed"
        >
          ADYK Inspire is an open community for students, developers, creators, founders,
          aspiring entrepreneurs and technology enthusiasts.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/join"
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-white text-black hover:bg-neutral-200 transition-all duration-300 shadow-lg hover:shadow-white/10"
          >
            <span>JOIN ADYK INSPIRE</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] text-neutral-300 border border-neutral-800 bg-neutral-950/60 hover:bg-neutral-900 hover:text-white hover:border-neutral-700 transition-all duration-300"
          >
            <span>EXPLORE COMMUNITY</span>
          </a>
        </motion.div>

      </div>

      {/* Micro Tagline Words & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="w-full max-w-4xl pt-12 flex flex-col items-center gap-6"
      >
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-500">
          {words.map((word, idx) => (
            <React.Fragment key={word}>
              <span className="hover:text-neutral-300 transition-colors cursor-default">
                {word}
              </span>
              {idx < words.length - 1 && (
                <span className="text-neutral-800 select-none">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <a
          href="#about"
          className="text-neutral-600 hover:text-neutral-300 transition-colors p-2"
          aria-label="Scroll down to explore"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>

    </section>
  );
}
