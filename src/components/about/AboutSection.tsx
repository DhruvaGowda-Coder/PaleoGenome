"use client";

import React from "react";
import { GraduationCap, ShieldCheck, Code, Award, ExternalLink, Dna, Database, Terminal } from "lucide-react";

interface AboutSectionProps {
  onOpenCredits: () => void;
}

export function AboutSection({ onOpenCredits }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#02070d] text-white border-t border-white/[0.08]">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#1ec2a4]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Academic Capstone Context (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1ec2a4]/10 border border-[#1ec2a4]/30 text-[#1ec2a4] text-xs font-mono uppercase tracking-[0.2em]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Final-Year Project • Deep Learning & Bioinformatics</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              About PaleoGenome
            </h2>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
              <strong className="text-white font-medium">PaleoGenome</strong> is a final-year Deep Learning
              research capstone investigating ancient DNA reconstruction, damage deconvolution, and extinct animal
              genetics.
            </p>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Traditional de-extinction approaches are constrained by extreme chemical degradation in sub-fossil
              remains: hydrolytic depurination, cytosine deamination, and fragmentation down to ultra-short 30bp
              segments. PaleoGenome explores how self-attention architectures and graph neural networks can invert
              post-mortem damage distributions and infer the ancestral states of Earth&apos;s lost megafauna.
            </p>

            {/* Core Project Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <ShieldCheck className="w-5 h-5 text-[#1ec2a4] mb-2" />
                <h4 className="font-serif text-base font-bold text-white">Photorealistic Wildlife</h4>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                  Strictly zero synthetic AI animal avatars or cheap 3D models. Built with authentic footage and
                  photography from world-class nature documentary archives.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <Terminal className="w-5 h-5 text-[#38bdf8] mb-2" />
                <h4 className="font-serif text-base font-bold text-white">100% Offline Demonstration</h4>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                  All videos and imagery are downloaded locally into the workspace for dependable, low-latency
                  presentation in university auditoriums and evaluations.
                </p>
              </div>
            </div>

            {/* Real Media Manifest Button */}
            <div className="pt-2">
              <button
                onClick={onOpenCredits}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#1ec2a4]/15 hover:bg-[#1ec2a4]/25 border border-[#1ec2a4]/40 text-[#1ec2a4] font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-black"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Open Verified Asset Manifest & Licenses</span>
              </button>
            </div>
          </div>

          {/* Right Column: Project Technical Specs (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#030a16] border border-white/10 p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-[#1ec2a4]" /> Project Architecture Spec
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                <span className="text-white/40">Framework</span>
                <span className="text-white font-semibold">Next.js 14 / React 18 / TypeScript</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                <span className="text-white/40">Styling & Motion</span>
                <span className="text-white font-semibold">Tailwind CSS + Framer Motion</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                <span className="text-white/40">Color Grading</span>
                <span className="text-white font-semibold">Documentary Nature Palette</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                <span className="text-white/40">Media Assets</span>
                <span className="text-[#1ec2a4] font-bold">29 Local High-Res Files (0 Hotlinks)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                <span className="text-white/40">Evaluation Mode</span>
                <span className="text-[#38bdf8] font-bold">Academic Capstone Defense</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
                Scientific Reference Sources
              </span>
              <ul className="space-y-1.5 text-xs text-white/60">
                <li>• Nature (2021): Million-year-old mammoth genomes</li>
                <li>• Genome Research: High-coverage Tasmanian tiger genome</li>
                <li>• Science: Ancient DNA damage deconvolution algorithms</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Global Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-white text-sm">PaleoGenome</span>
            <span>•</span>
            <span>Deep Learning Ancient Genomics Research</span>
          </div>
          <div>
            <span>Developed for Academic Demonstration • All Wildlife Assets Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
}

