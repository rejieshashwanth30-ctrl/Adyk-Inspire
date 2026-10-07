import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the ADYK Inspire community registration platform.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between selection:bg-white selection:text-black">
      <Navbar />

      <div className="flex-1 pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 mb-2">
              LEGAL & TRANSPARENCY
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-neutral-500 mt-2">
              Last updated: October 2026
            </p>
          </div>

          <div className="space-y-8 text-neutral-300 text-sm leading-relaxed font-light">
            
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white uppercase tracking-wider">
                1. Overview
              </h2>
              <p>
                ADYK (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates ADYK Inspire, an open community platform designed for students, developers, founders, and technology creators. This Privacy Policy outlines what personal information is collected through our community registration form, why it is needed, and how we handle it responsibly.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white uppercase tracking-wider">
                2. Information We Collect
              </h2>
              <p>When you register for ADYK Inspire, we collect information you voluntarily provide, including:</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-400 pl-2">
                <li>Full name</li>
                <li>Email address</li>
                <li>WhatsApp phone number</li>
                <li>City or geographic location</li>
                <li>Age bracket</li>
                <li>Professional role or background (e.g. Student, Developer, Founder)</li>
                <li>Areas of technical and venture interest</li>
                <li>Information regarding startup, product, or exploration ideas</li>
                <li>Community goals (e.g. learning, mentorship, building together)</li>
                <li>Optional social and portfolio links (LinkedIn, GitHub, Personal website)</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white uppercase tracking-wider">
                3. Purpose of Processing
              </h2>
              <p>We process your information solely for legitimate community operations:</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-400 pl-2">
                <li>Reviewing your join-list submission to understand your interests and needs</li>
                <li>Contacting you via your preferred channel (WhatsApp or Email) regarding community initiatives, meetups, and collaboration opportunities</li>
                <li>Connecting you with relevant peers, mentors, or project partners based on aligned interests</li>
                <li>Preventing spam and duplicate submissions to maintain platform security</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white uppercase tracking-wider">
                4. Data Protection & Sharing
              </h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties or marketing brokers. Your information is securely stored within our production database infrastructure and accessed only by authorized ADYK team members.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white uppercase tracking-wider">
                5. Access, Updates & Deletion
              </h2>
              <p>
                You may at any time request a summary of the data we hold regarding your registration, request corrections, or ask for your registration to be permanently deleted from our records.
              </p>
              <p>
                To make any inquiries, please contact our team directly:
              </p>
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 font-mono text-xs text-neutral-400 space-y-1">
                <div>Email: <a href="mailto:adykcompany.in@gmail.com" className="text-white underline">adykcompany.in@gmail.com</a></div>
                <div>WhatsApp: <a href="https://wa.me/918870605699" className="text-white underline">+91 8870605699</a></div>
                <div>Entity: ADYK — A Multi-Venture Technology Company</div>
              </div>
            </section>

          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
