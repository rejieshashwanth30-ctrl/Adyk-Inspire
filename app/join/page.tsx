import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { JoinForm } from "@/components/form/JoinForm";

export const metadata: Metadata = {
  title: "Join ADYK Inspire — Community Registration",
  description:
    "Register for ADYK Inspire. Tell us about yourself, your startup or project ideas, and what you want to build.",
  alternates: {
    canonical: "/join",
  },
};

export default function JoinPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between selection:bg-white selection:text-black">
      <Navbar />

      <div className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-950/70 text-[11px] tracking-[0.2em] uppercase text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>COMMUNITY JOIN-LIST</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-white leading-tight">
              JOIN<br />
              <span className="text-neutral-500">ADYK INSPIRE</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-light max-w-lg mx-auto">
              Tell us a little about yourself, your interests and what you want to build.
            </p>

            <p className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
              Everyone is welcome.
            </p>
          </div>

          {/* Form */}
          <JoinForm />

        </div>
      </div>

      <Footer />
    </main>
  );
}
