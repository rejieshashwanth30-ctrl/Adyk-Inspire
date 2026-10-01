"use client";

import React, { Suspense, useSyncExternalStore } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, ArrowLeft, MessageSquare, Mail } from "lucide-react";
import { AdykLogo } from "@/components/ui/AdykLogo";

function subscribeSession(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStoredNameSnapshot() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("adyk_reg_name") || "";
}

function getServerNameSnapshot() {
  return "";
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const regId = searchParams.get("id");
  const userName = useSyncExternalStore(
    subscribeSession,
    getStoredNameSnapshot,
    getServerNameSnapshot
  );

  return (
    <div className="max-w-xl mx-auto text-center py-16 px-4">
      
      {/* Brand */}
      <div className="mb-12 flex justify-center">
        <AdykLogo size="md" href="/" />
      </div>

      {/* Animated Check Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
        className="w-20 h-20 mx-auto rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white mb-8 shadow-2xl shadow-white/5"
      >
        <Check className="w-10 h-10 stroke-[2.5]" />
      </motion.div>

      {/* Headline & Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-3 mb-8"
      >
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 block">
          REGISTRATION RECEIVED
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white">
          YOU&apos;RE IN.
        </h1>
        <h2 className="text-lg sm:text-xl font-light tracking-tight text-neutral-300">
          WELCOME TO ADYK INSPIRE{userName ? `, ${userName}` : ""}.
        </h2>
      </motion.div>

      {/* Narrative Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="p-6 sm:p-8 rounded-2xl bg-neutral-950/80 border border-neutral-900 text-left space-y-4 mb-10 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed"
      >
        <p className="text-white font-normal">
          Your registration has been successfully received and logged into the ADYK system.
        </p>
        <p>
          The ADYK team will review your submission and contact you directly via your chosen
          channel regarding community meetups, project collaborations, and discussion groups.
        </p>

        {regId && (
          <div className="pt-3 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>REFERENCE ID:</span>
            <span className="text-neutral-300 select-all">{regId}</span>
          </div>
        )}
      </motion.div>

      {/* Contact Reference Details */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4 mb-10"
      >
        <div className="text-[11px] font-mono tracking-widest uppercase text-neutral-500">
          COMMUNITY LIAISON CONTACTS
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono">
          <a
            href={`https://wa.me/918870605699?text=${encodeURIComponent(
              `Hello ADYK Inspire team! I have submitted my registration${userName ? ` (${userName})` : ""}${regId ? ` [Ref: ${regId}]` : ""}. Looking forward to connecting!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>+91 8870605699</span>
          </a>
          <a
            href="mailto:rejieshashwanth30@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>rejieshashwanth30@gmail.com</span>
          </a>
        </div>
      </motion.div>

      {/* Return Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.16em] bg-white text-black hover:bg-neutral-200 transition-all shadow-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ADYK INSPIRE</span>
        </Link>
      </motion.div>

    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 selection:bg-white selection:text-black">
      <Suspense fallback={<div className="text-neutral-500 font-mono text-xs">LOADING...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
