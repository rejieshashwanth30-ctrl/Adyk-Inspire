"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdykLogo } from "@/components/ui/AdykLogo";
import { ArrowRight, Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Community", href: "/#community" },
    { name: "Ideas", href: "/#ideas" },
    { name: "Join", href: "/join" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full px-5 py-2.5 flex items-center justify-between transition-all duration-300 border ${
          isScrolled
            ? "bg-black/85 backdrop-blur-md border-neutral-800/80 shadow-2xl shadow-black/80"
            : "bg-neutral-950/40 backdrop-blur-sm border-neutral-900/60"
        }`}
      >
        {/* Left: Logo */}
        <div className="flex items-center">
          <AdykLogo size="md" href="/" />
        </div>

        {/* Center: Desktop Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-[0.14em] font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Primary CTA (Desktop) */}
        <div className="hidden md:flex items-center">
          <Link
            href="/join"
            className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-[0.12em] bg-white text-black hover:bg-neutral-200 transition-all duration-200 shadow-sm"
          >
            <span>JOIN ADYK</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-neutral-300 hover:text-white focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto bg-black/95 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.14em] text-neutral-300 hover:text-white py-2 border-b border-neutral-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 py-3 rounded-lg bg-white text-black font-medium text-xs tracking-wider uppercase"
            >
              <span>JOIN ADYK INSPIRE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="mt-4 pt-4 border-t border-neutral-900 flex flex-col gap-1 text-[11px] text-neutral-500">
              <span>Primary Contact: +91 8870605699</span>
              <span>Email: adykcompany.in@gmail.com</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
