"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AdykLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function AdykLogo({ className = "", size = "md", href = "/" }: AdykLogoProps) {
  const sizeMap = {
    sm: "h-7 w-auto",
    md: "h-9 w-auto",
    lg: "h-14 w-auto",
  };

  const content = (
    <div className={`inline-flex items-center gap-2 group transition-opacity hover:opacity-90 ${className}`}>
      {/* 
        Original authentic ADYK logo uploaded by the user:
        The calligraphy is preserved with pure white inversion for the dark theme.
      */}
      <div className="relative overflow-hidden rounded flex items-center justify-center">
        <Image
          src="/logo/adyk_logo.jpg"
          alt="ADYK — A Multi-Venture Technology Company"
          width={160}
          height={60}
          priority
          className={`${sizeMap[size]} object-contain filter invert contrast-125 brightness-150 mix-blend-screen transition-transform duration-300 group-hover:scale-105`}
        />
      </div>
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-neutral-400 leading-tight">
          INSPIRE
        </span>
        <span className="text-[8px] tracking-[0.14em] uppercase text-neutral-600 font-mono leading-none">
          TECH VENTURES
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="ADYK Inspire Home" className="focus:outline-none focus-visible:ring-1 focus-visible:ring-white">
        {content}
      </Link>
    );
  }

  return content;
}
