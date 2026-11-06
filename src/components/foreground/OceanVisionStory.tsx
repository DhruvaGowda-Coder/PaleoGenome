"use client";

import React from "react";
import { Dna, Sparkles } from "lucide-react";

export function OceanVisionStory() {
  return (
    <section
      id="abyss"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 py-24 sm:py-32 bg-transparent z-10 scroll-mt-12"
    >
      <div id="vision" className="absolute -top-12 left-0" />
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-start justify-between gap-12">
        {/* Story Block */}
        <div className="relative isolate max-w-2xl p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-24 -inset-y-12 -z-10 rounded-[3rem] cinematic-panel-glow"
          />
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#38bdf8] block mb-3">
            The Deep Ocean &amp; The Scientific Vision
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.12]">
            Decoding the ancient memory <br className="hidden sm:inline" />
            of our oceans and planet.
          </h2>

          <div className="mt-6 space-y-4 text-base sm:text-lg text-white/85 font-light leading-relaxed">
            <p>
              From sub-polar kelp forests inhabited by vanished giants like Steller&apos;s Sea Cow
              to pelagic cetaceans navigating the open abyss, marine life preserves deep-time
              evolutionary adaptations.
            </p>
            <p>
              DNA degrades after death, leaving fragments that can be difficult to interpret.
              <strong className="text-white font-medium"> PaleoGenome</strong> explores how Deep
              Learning could help analyze damaged ancient DNA alongside evidence from living
              relatives, fossils, and museum collections. This research aims to support our
              understanding of biodiversity and evolutionary change.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 font-mono text-xs text-white/60">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1ec2a4]" />
              Zero Synthetic Avatars
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
              100% Authentic Wildlife Recordings
            </span>
          </div>
        </div>

        {/* Supporting subtle badge */}
        <div className="max-w-xs text-right hidden lg:block md:mt-28">
          <span className="text-[11px] font-mono tracking-widest uppercase text-white/40 block">
            Living Pelagic Waters
          </span>
          <p className="text-xs font-mono text-white/60 mt-1">
            Humpback whales, wild dolphin pods, and coral reef life in open water.
          </p>
        </div>
      </div>
    </section>
  );
}

