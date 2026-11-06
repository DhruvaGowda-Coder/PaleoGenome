"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { AncientDnaDeepLearningSection } from "@/components/pipeline/AncientDnaDeepLearningSection";
import { ProjectVisionSection } from "@/components/about/ProjectVisionSection";
import { MinimalFooter } from "@/components/footer/MinimalFooter";
import {
  BarChart3,
  GitBranch,
  Layers,
} from "lucide-react";

export default function ProjectPage() {
  return (
    <main className="relative min-h-screen bg-[#02070d] text-[#eef4f8] selection:bg-[#2563eb] selection:text-white">
      {/* Navbar with active page detection */}
      <Navbar />

      {/* Research project overview */}
      <section className="relative isolate min-h-[76vh] flex items-center px-6 sm:px-10 pt-32 pb-16 border-b border-white/[0.08] overflow-hidden">
        {/* Match the cinematic wildlife tone of the home page with an existing research image. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-[center_48%]"
          style={{ backgroundImage: "url('/media/science/permafrost_core.jpg')" }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,7,13,0.93)_0%,rgba(2,7,13,0.72)_52%,rgba(2,7,13,0.28)_100%),linear-gradient(0deg,#02070d_0%,transparent_55%,rgba(2,7,13,0.28)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 cinema-grain opacity-40" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-4xl rounded-[2rem] border border-white/15 bg-[#02070d]/45 backdrop-blur-md p-7 sm:p-10 md:p-12 shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#1ec2a4] mb-5">
              Research Project
            </p>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              Computational Paleogenomics
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ded5cb] to-[#1ec2a4] font-light">
                &amp; Neural DNA Reconstruction
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-white/85 font-light leading-relaxed max-w-2xl drop-shadow-md">
              This project explores how deep learning could help account for post-mortem
              cytosine deamination, compare ancient fragments with living relatives, and
              investigate possible ancestral genomic states.
            </p>
            <p className="mt-5 inline-flex rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[11px] sm:text-xs font-mono text-white/65">
              Research overview <span className="mx-2 text-[#1ec2a4]">•</span> No trained model or results connected
            </p>
          </div>
        </div>
      </section>

      {/* CONCEPTUAL RESEARCH WORKFLOW */}
      <AncientDnaDeepLearningSection />

      {/* PROPOSED ARCHITECTURE & OBJECTIVES */}
      <section className="relative py-24 px-6 sm:px-10 bg-[#01040a] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#1ec2a4] block mb-3">
              Research ideas
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Conceptual Damage-Aware Objectives
            </h2>
            <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
              If a model is developed, candidate objectives could account for damage patterns near read
              ends, evolutionary relationships, and genome organization. These formulas describe ideas,
              not measured results:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#030914] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#1ec2a4]/10 border border-[#1ec2a4]/30 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-[#1ec2a4]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Damage-aware sequence analysis
              </h3>
              <div className="bg-black/60 p-3 rounded-lg border border-white/10 my-3 font-mono text-[11px] text-[#1ec2a4] overflow-x-auto">
                Damage likelihood by fragment position
              </div>
              <p className="text-xs text-white/70 mt-3 leading-relaxed">
                A possible method for studying whether observed sequence changes are consistent with post-mortem damage.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#030914] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center mb-4">
                <GitBranch className="w-5 h-5 text-[#38bdf8]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Evolutionary context
              </h3>
              <div className="bg-black/60 p-3 rounded-lg border border-white/10 my-3 font-mono text-[11px] text-[#38bdf8] overflow-x-auto">
                Compare related species and ancestral estimates
              </div>
              <p className="text-xs text-white/70 mt-3 leading-relaxed">
                A future analysis could compare ancient fragments with related living species while representing uncertainty.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#030914] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#a78bfa]/10 border border-[#a78bfa]/30 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 text-[#a78bfa]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Genome organization
              </h3>
              <div className="bg-black/60 p-3 rounded-lg border border-white/10 my-3 font-mono text-[11px] text-[#a78bfa] overflow-x-auto">
                Explore contig order with reference evidence
              </div>
              <p className="text-xs text-white/70 mt-3 leading-relaxed">
                If suitable data becomes available, chromosome references could help assess candidate fragment order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENTIFIC VISION & DUAL IMAGERY */}
      <ProjectVisionSection />

      {/* FOOTER */}
      <MinimalFooter />
    </main>
  );
}
