"use client";

import React from "react";

export function HeroCinematic() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between px-4 sm:px-12 bg-transparent select-none z-10"
    >
      {/* Spacer for navbar offset */}
      <div className="h-24 sm:h-28" />

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-start pt-8 sm:pt-14">
        <div className="relative isolate w-full max-w-2xl lg:max-w-xl p-5 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-24 -inset-y-12 -z-10 rounded-[3rem] cinematic-panel-glow"
          />
          {/* Brand Tagline */}
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#1ec2a4] block mb-3 drop-shadow-md">
            PaleoGenome
          </span>

          {/* Main Headline */}
          <h1 className="font-serif text-[2.15rem] min-[390px]:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            Reviving the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ded5cb] to-[#1ec2a4]">
              Lost Code of Life
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-5 text-sm sm:text-base text-white/90 leading-relaxed font-light drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] max-w-md">
            Exploring ancient DNA and the evolution of life through Deep Learning.
          </p>

        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="pb-8 text-center pointer-events-none">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40 block drop-shadow">
          Scroll to Experience
        </span>
      </div>
    </section>
  );
}
