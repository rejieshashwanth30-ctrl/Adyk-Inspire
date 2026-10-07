import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Participation",
  description: "Terms and guidelines for participating in the ADYK Inspire community.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
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
              COMMUNITY CHARTER
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white">
              Terms of Participation
            </h1>
            <p className="text-xs font-mono text-neutral-500 mt-2">
              Last updated: October 2026
            </p>
          </div>

          <div className="space-y-8 text-neutral-300 text-sm leading-relaxed font-light">
            
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white uppercase tracking-wider">
                1. Nature of the Community
              </h2>
              <p>
                ADYK Inspire is an open, collaborative public community operated by ADYK (A Multi-Venture Technology Company). Registering for ADYK Inspire is not an employment application, nor does it constitute an offer of investment, funding, or guaranteed outcomes. It is a portal to discover, connect, exchange knowledge, and collaborate on technology and startup projects.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white uppercase tracking-wider">
                2. Community Code of Conduct
              </h2>
              <p>All participants and applicants agree to uphold the following standards:</p>
              <ul className="list-disc list-inside space-y-2 text-neutral-400 pl-2">
                <li><strong className="text-neutral-200">Respect Others:</strong> Maintain professional, courteous, and constructive interactions across all community channels and discussions.</li>
                <li><strong className="text-neutral-200">Zero Spam:</strong> Unsolicited advertising, mass cold promotions, and repetitive commercial pitches are strictly prohibited.</li>
                <li><strong className="text-neutral-200">Zero Harassment:</strong> Discrimination, abuse, intimidation, or hate speech in any form will result in immediate removal.</li>
                <li><strong className="text-neutral-200">Integrity:</strong> Do not post deceptive information, impersonate other individuals, or claim ownership of projects or intellectual property that does not belong to you.</li>
                <li><strong className="text-neutral-200">Lawful Use:</strong> All shared projects, codebases, and materials must comply with applicable local and international laws.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white uppercase tracking-wider">
                3. Moderation & Participation
              </h2>
              <p>
                ADYK reserves the right to review submissions, moderate community participation, and curate channels to preserve the standard, safety, and mutual value of the community.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white uppercase tracking-wider">
                4. Communications
              </h2>
              <p>
                By completing the registration form, you consent to being contacted by the ADYK team via your designated preference (WhatsApp or Email) regarding community announcements, group activities, collaboration opportunities, and discussions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white uppercase tracking-wider">
                5. Contact & Questions
              </h2>
              <p>
                For questions regarding these terms, reach out directly:
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
