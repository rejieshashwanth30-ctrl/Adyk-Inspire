"use client";

import React from "react";
import Link from "next/link";
import { AdykLogo } from "@/components/ui/AdykLogo";
import { MessageSquare, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-black pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-neutral-900">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <AdykLogo size="md" href="/" />
            <div className="text-xs uppercase tracking-[0.16em] text-neutral-500 font-mono">
              A MULTI-VENTURE TECHNOLOGY COMPANY
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm mt-2">
              ADYK Inspire is an open technology community built to connect curious minds,
              engineers, founders, and creators. We engineer the spaces where ideas transform
              into real execution.
            </p>
            <div className="text-[11px] font-mono tracking-[0.2em] text-neutral-600 mt-2 uppercase">
              LEARN. BUILD. SHARE. INSPIRE.
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-mono tracking-[0.2em] uppercase text-white font-semibold mb-2">
              PLATFORM
            </div>
            <Link href="/" className="text-xs text-neutral-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/join" className="text-xs text-neutral-400 hover:text-white transition-colors">
              Join ADYK Inspire
            </Link>
            <Link href="/#about" className="text-xs text-neutral-400 hover:text-white transition-colors">
              Manifesto
            </Link>
            <Link href="/#ideas" className="text-xs text-neutral-400 hover:text-white transition-colors">
              Ideas
            </Link>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-mono tracking-[0.2em] uppercase text-white font-semibold mb-2">
              CONNECT
            </div>
            <a
              href="https://wa.me/918870605699"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: +91 8870605699</span>
            </a>
            <a
              href="mailto:rejieshashwanth30@gmail.com"
              className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>rejieshashwanth30@gmail.com</span>
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/privacy" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
                Terms of Participation
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600 font-mono">
          <div>
            © 2026 ADYK. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[10px] tracking-widest uppercase">
              ENGINEERED FOR BUILDERS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
