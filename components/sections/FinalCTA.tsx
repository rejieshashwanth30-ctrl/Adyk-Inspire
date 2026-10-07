"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-32 sm:py-44 px-4 sm:px-6 lg:px-8 border-t border-neutral-900 overflow-hidden text-center">
      {/* Background glow circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.03] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 mb-6">
            07 / INVITATION
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white leading-none mb-6">
            READY TO<br />
            JOIN THE COMMUNITY?
          </h2>

          <div className="text-base sm:text-xl text-neutral-400 font-light mb-10 max-w-lg space-y-1">
            <p>Bring your ideas.</p>
            <p>Bring your curiosity.</p>
            <p>Bring your ambition.</p>
          </div>

          <Link
            href="/join"
            className="group relative inline-flex items-center gap-2 px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-white text-black hover:bg-neutral-200 transition-all duration-300 shadow-2xl hover:shadow-white/20"
          >
            <span>JOIN ADYK INSPIRE</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          {/* Contact Details */}
          <div className="mt-16 pt-12 border-t border-neutral-900 w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-neutral-500 font-mono">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-neutral-400" />
              <a
                href="https://wa.me/918870605699"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                +91 8870605699
              </a>
            </div>

            <span className="hidden sm:inline text-neutral-800">•</span>

            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-neutral-400" />
              <a
                href="mailto:adykcompany.in@gmail.com"
                className="hover:text-white transition-colors"
              >
                adykcompany.in@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
