"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function DiscordIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.86 0 1.54-.68 1.54-1.54a1.54 1.54 0 0 0-3.08 0c0 .86.68 1.54 1.54 1.54m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

export function CommunitySection() {
  const words = ["LEARN", "BUILD", "SHARE", "INSPIRE"];

  return (
    <section
      id="community"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-neutral-900 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.02] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-950/70 text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>COMMUNITY HUBS</span>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white leading-tight mb-6">
            JOIN OUR<br />
            <span className="text-neutral-500">COMMUNITY</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Connect with builders, creators, students, developers, founders and technology enthusiasts.
          </p>

          {/* Tagline Words */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-neutral-400 pt-4 border-t border-neutral-900">
            {words.map((word, idx) => (
              <React.Fragment key={word}>
                <span className="hover:text-white transition-colors cursor-default">
                  {word}
                </span>
                {idx < words.length - 1 && (
                  <span className="text-neutral-800 select-none">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Community Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Discord Card */}
          <motion.a
            href="https://discord.gg/7qB6vGNb2"
            target="_blank"
            rel="noopener noreferrer"
            id="discord-community-button"
            aria-label="Join our Discord Community (opens in a new tab)"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative p-8 sm:p-10 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-500/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <div>
              {/* Header row */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white group-hover:border-neutral-600 group-hover:scale-105 transition-all duration-300">
                  <DiscordIcon className="w-7 h-7" />
                </div>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-[10px] font-mono tracking-widest uppercase text-neutral-400 group-hover:text-white transition-colors">
                  <span>DISCORD</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Text content */}
              <div className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-2">
                [ DISCORD ]
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase mb-3">
                Join our Discord Community
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                Connect directly with builders and developers in real time. Share projects, explore collaborations, and participate in technical discussions.
              </p>
            </div>

            {/* Bottom Button Action */}
            <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.16em] bg-white text-black group-hover:bg-neutral-200 transition-all duration-300 shadow-lg">
                <span>ENTER DISCORD</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider text-center sm:text-right group-hover:text-neutral-400 transition-colors">
                discord.gg/7qB6vGNb2
              </span>
            </div>
          </motion.a>

          {/* LinkedIn Group Card */}
          <motion.a
            href="https://www.linkedin.com/groups/42834184"
            target="_blank"
            rel="noopener noreferrer"
            id="linkedin-community-button"
            aria-label="Join our LinkedIn Group (opens in a new tab)"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative p-8 sm:p-10 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-500/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <div>
              {/* Header row */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white group-hover:border-neutral-600 group-hover:scale-105 transition-all duration-300">
                  <LinkedInIcon className="w-7 h-7" />
                </div>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-[10px] font-mono tracking-widest uppercase text-neutral-400 group-hover:text-white transition-colors">
                  <span>LINKEDIN</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Text content */}
              <div className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-2">
                [ LINKEDIN ]
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase mb-3">
                Join our LinkedIn Group
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                Connect with founders, student entrepreneurs, and industry leaders. Build your professional network and discover venture opportunities.
              </p>
            </div>

            {/* Bottom Button Action */}
            <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.16em] bg-white text-black group-hover:bg-neutral-200 transition-all duration-300 shadow-lg">
                <span>ENTER LINKEDIN</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider text-center sm:text-right group-hover:text-neutral-400 transition-colors">
                linkedin.com/groups/42834184
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
