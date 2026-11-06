"use client";

import React from "react";
import { Dna } from "lucide-react";

export function MinimalFooter() {
  return (
    <footer className="py-16 px-6 sm:px-12 bg-transparent text-white border-t border-white/[0.08] relative z-10 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.05] border border-[#1ec2a4]/40">
            <Dna className="w-4 h-4 text-[#1ec2a4]" />
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-[0.16em] uppercase text-white">
              Paleo<span className="text-[#1ec2a4] font-light">Genome</span>
            </span>
            <p className="text-xs font-mono text-white/50 mt-0.5">
              Reviving the Lost Code of Life • Ancient Genomics &amp; Deep Learning
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-white/40">
          Photorealistic Wildlife Documentary Homepage • All Assets Sourced from Authentic Records
        </div>
      </div>
    </footer>
  );
}
