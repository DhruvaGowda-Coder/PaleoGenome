"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dna, ArrowLeft } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isProjectPage = pathname === "/project";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled || isProjectPage
          ? "bg-[#02070d]/90 backdrop-blur-md py-4 border-b border-white/[0.08] shadow-2xl shadow-black/60"
          : "bg-gradient-to-b from-black/85 via-black/30 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-white transition-opacity hover:opacity-90"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.05] border border-[#1ec2a4]/40 group-hover:border-[#1ec2a4] transition-colors shadow-[0_0_12px_rgba(30,194,164,0.25)]">
            <Dna className="w-4 h-4 text-[#1ec2a4]" />
          </div>
          <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.18em] uppercase text-white/95">
            Paleo<span className="text-[#1ec2a4] font-light">Genome</span>
          </span>
        </Link>

        {/* Minimal Navigation: clean destinations */}
        <nav className="flex items-center gap-4 sm:gap-8 font-mono text-xs uppercase tracking-[0.2em]">
          {!isProjectPage ? (
            <>
              <a
                href="#hero"
                className="text-white/60 hover:text-white transition-colors hidden sm:inline-block"
              >
                Home
              </a>
              <a
                href="#wilderness"
                className="text-white/60 hover:text-white transition-colors"
              >
                Wilderness
              </a>
              <a
                href="#abyss"
                className="text-white/60 hover:text-white transition-colors hidden md:inline-block"
              >
                Ocean
              </a>

              {/* HIGHLIGHTED BOX / PILL BUTTON FOR THE PROJECT (AI MODEL RUNNER) */}
              <Link
                href="/reconstruct"
                id="btn-the-project"
                className="group relative px-4 py-2 rounded-full border border-[#1ec2a4]/70 bg-[#1ec2a4]/15 hover:bg-[#1ec2a4]/30 text-white shadow-[0_0_20px_rgba(30,194,164,0.35)] hover:shadow-[0_0_30px_rgba(30,194,164,0.6)] flex items-center gap-2 transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1ec2a4] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1ec2a4]"></span>
                </span>
                <span className="font-semibold tracking-[0.2em] text-[#1ec2a4] group-hover:text-white transition-colors">
                  The Project
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/reconstruct"
                className="inline-flex min-h-10 items-center rounded-full border border-[#1ec2a4]/55 bg-[#1ec2a4]/10 px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold tracking-[0.12em] text-[#7fe6d2] shadow-[0_0_16px_rgba(30,194,164,0.12)] transition-all hover:border-[#1ec2a4] hover:bg-[#1ec2a4]/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ec2a4]"
              >
                DNA Reconstruction
              </Link>
              <Link
                href="/results"
                className="inline-flex min-h-10 items-center rounded-full border border-[#1ec2a4]/55 bg-[#1ec2a4]/10 px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold tracking-[0.12em] text-[#7fe6d2] shadow-[0_0_16px_rgba(30,194,164,0.12)] transition-all hover:border-[#1ec2a4] hover:bg-[#1ec2a4]/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ec2a4]"
              >
                Model Results
              </Link>
              <Link
                href="/"
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Return to Cinematic World</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
