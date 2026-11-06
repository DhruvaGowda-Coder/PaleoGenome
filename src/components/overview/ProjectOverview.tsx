"use client";

import React from "react";
import { Dna, Compass, Sparkles } from "lucide-react";

export function ProjectOverview() {
  return (
    <section
      id="overview"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#02070d] text-white border-t border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Narrative Introduction */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#1ec2a4] block mb-4">
            The Living &amp; Ancient World
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            Bridging Earth&apos;s ancient past <br className="hidden sm:inline" />
            with the living genomes of today.
          </h2>

          <div className="mt-8 space-y-6 text-base sm:text-lg text-white/75 font-light leading-relaxed">
            <p>
              Deep within sub-zero permafrost, sub-fossil bones, and natural museum archives
              rest the fragmented blueprints of Earth&apos;s vanished species. Over millennia,
              environmental exposure and chemical degradation shatter these ancient genomes into
              millions of damaged microscopic fragments.
            </p>
            <p>
              <strong className="text-white font-medium">PaleoGenome</strong> investigates how
              Deep Learning and evolutionary genetics can deconvolve post-mortem damage,
              anchor fragmented reads against modern living relatives, and reconstruct the lost
              genetic heritage of our planet.
            </p>
          </div>
        </div>

        {/* Cinematic Dual Visual Highlight — Real Authentic Wildlife Imagery */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Living Relative: Asian Elephant */}
          <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/species/asian_elephant.jpg"
              alt="Asian Elephant in Wild Habitat"
              className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#1ec2a4] block">
                Living Sister Taxon
              </span>
              <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                Asian Elephant (Elephas maximus)
              </h3>
            </div>
          </div>

          {/* Lost Specimen: Woolly Mammoth Holotype */}
          <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/species/mammoth_skeleton.jpg"
              alt="Woolly Mammoth Fossil Specimen"
              className="w-full h-full object-cover filter contrast-[1.08] brightness-95 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d99b42] block">
                Pleistocene Target Genome
              </span>
              <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                Woolly Mammoth (Mammuthus primigenius)
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

