"use client";

import React from "react";

export function ProjectVisionSection() {
  return (
    <section
      id="vision"
      className="relative py-28 sm:py-36 px-6 sm:px-10 bg-[#02070d] text-white border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#1ec2a4]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#1ec2a4] block mb-4">
            The Scientific Vision
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.12]">
            Decoding the evolutionary memory <br className="hidden sm:inline" />
            of our planet.
          </h2>

          <div className="mt-8 space-y-6 text-base sm:text-lg text-white/80 font-light leading-relaxed">
            <p>
              Over millennia, chemical exposure, hydrolytic deamination, and fragmentation shatter
              ancient DNA into ultra-short microscopic remnants. What once defined Earth’s lost
              species becomes scattered across geological time.
            </p>
            <p>
              <strong className="text-white font-medium">PaleoGenome</strong> is a research concept for
              exploring how future computational methods might study post-mortem DNA damage and compare
              ancient fragments with evidence from living relatives. No model outputs or reconstructed
              genomes are available yet.
            </p>
          </div>
        </div>

        {/* Clean, spacious dual imagery celebrating living and ancient biology */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Living Sister Clade */}
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/species/asian_elephant.jpg"
              alt="Living Asian Elephant"
              className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#1ec2a4] block">
                Living Reference Clade
              </span>
              <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                Asian Elephant (Elephas maximus)
              </h3>
            </div>
          </div>

          {/* Vanished Target Genome */}
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/species/mammoth_skeleton.jpg"
              alt="Woolly Mammoth Fossil Specimen"
              className="w-full h-full object-cover filter contrast-[1.08] brightness-95 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
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

