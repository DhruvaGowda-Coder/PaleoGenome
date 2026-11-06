"use client";

import React from "react";
import { Dna } from "lucide-react";

export function MinimalFooter() {
  return (
    <footer className="relative z-10 w-full max-w-full overflow-hidden border-t border-white/[0.08] bg-transparent px-4 py-12 text-white sm:px-12 sm:py-16 backdrop-blur-[2px]">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div className="flex w-full min-w-0 items-center justify-center gap-3 md:w-auto md:justify-start">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.05] border border-[#1ec2a4]/40">
            <Dna className="w-4 h-4 text-[#1ec2a4]" />
          </div>
          <div className="min-w-0">
            <span className="font-serif text-lg font-bold tracking-[0.16em] uppercase text-white">
              Paleo<span className="text-[#1ec2a4] font-light">Genome</span>
            </span>
            <p className="mt-0.5 break-words text-xs font-mono text-white/50">
              Reviving the Lost Code of Life • Ancient Genomics &amp; Deep Learning
            </p>
          </div>
        </div>

        <div className="max-w-full break-words text-xs font-mono text-white/40">
          Photorealistic Wildlife Documentary Homepage • All Assets Sourced from Authentic Records
        </div>
      </div>
    </footer>
  );
}
