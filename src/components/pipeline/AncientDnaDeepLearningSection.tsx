"use client";

import React, { useState } from "react";
import { Dna } from "lucide-react";

interface PipelineStep {
  step: string;
  title: string;
  subtitle: string;
  architecture: string;
  description: string;
  image: string;
  technicalDetails: string[];
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    step: "01",
    title: "Sub-Fossil Excavation & Ultra-Clean Extraction",
    subtitle: "Cleanroom Matrix Isolation",
    architecture: "Sample preparation concept",
    description:
      "Ancient DNA analysis begins with documented specimen selection and contamination-controlled extraction to protect short, degraded fragments.",
    image: "/media/science/permafrost_core.jpg",
    technicalDetails: [
      "Document specimen provenance and preservation conditions",
      "Use contamination-controlled handling and extraction",
      "Prepare fragmented DNA for downstream sequencing and analysis",
    ],
  },
  {
    step: "02",
    title: "Post-mortem DNA damage",
    subtitle: "Cytosine Deamination Inversion",
    architecture: "Damage-aware analysis concept",
    description:
      "Ancient DNA can accumulate post-mortem cytosine deamination, observed as C→T substitutions near fragment ends. A proposed model could account for damage likelihood by position.",
    image: "/media/science/dna_electrophoresis.jpg",
    technicalDetails: [
      "Model the likelihood of damage by fragment position",
      "Compare terminal C→T patterns with candidate biological variants",
      "Evaluate predictions against documented reference data before reporting accuracy",
    ],
  },
  {
    step: "03",
    title: "Phylogenetic Ancestral State Inference",
    subtitle: "Evolutionary comparisons",
    architecture: "Phylogenetic analysis concept",
    description:
      "A phylogenetic model could use evolutionary relationships and living sister taxa to estimate ancestral states while accounting for uncertainty.",
    image: "/media/science/ancient_dna_cleanroom.jpg",
    technicalDetails: [
      "Represent taxa and their relationships as a phylogenetic graph",
      "Estimate confidence for each inferred ancestral base",
      "Compare lineage-specific substitutions and shared changes",
    ],
  },
  {
    step: "04",
    title: "Genome organization",
    subtitle: "Reference-guided comparison",
    architecture: "Genome assembly concept",
    description:
      "A future scaffolding stage could compare reconstructed contigs with synteny and chromosome-contact evidence from living relatives.",
    image: "/media/science/dna_molecular_structure.jpg",
    technicalDetails: [
      "Compare contigs with reference genomes from living sister taxa",
      "Use chromosome-contact evidence to assess candidate contig order",
      "Report assembly limitations and confidence alongside any proposed scaffold",
    ],
  },
];

export function AncientDnaDeepLearningSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(1);

  const currentStep = PIPELINE_STEPS[activeStepIndex];

  return (
    <section id="dna" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#02070d] text-white">
      {/* Glow elements */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#1ec2a4]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#38bdf8]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1ec2a4]/10 border border-[#1ec2a4]/30 text-[#1ec2a4] text-xs font-mono uppercase tracking-[0.2em] mb-4">
            <Dna className="w-3.5 h-3.5" />
            <span>Section 03 — Computational Paleogenomics</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Ancient DNA and Deep Learning
          </h2>
          <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed">
            Ancient DNA can contain fragmented reads and post-mortem damage. This conceptual
            four-stage workflow outlines how future analyses could combine damage-aware read
            assessment, evolutionary context, and chromosome organization.
          </p>
        </div>

        {/* 4-Stage Architecture Pipeline Tabs */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {PIPELINE_STEPS.map((s, index) => {
            const isActive = activeStepIndex === index;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStepIndex(index)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 border ${
                  isActive
                    ? "bg-[#06182c] border-[#1ec2a4] shadow-[0_0_20px_rgba(30,194,164,0.3)]"
                    : "bg-[#030a16] border-white/[0.08] hover:border-white/20 text-white/70 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#1ec2a4]">STAGE {s.step}</span>
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <h4 className="font-serif text-sm sm:text-base font-bold text-white line-clamp-1">
                  {s.subtitle}
                </h4>
                <p className="text-[11px] font-mono text-white/50 mt-1 line-clamp-1">{s.architecture}</p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Spotlight */}
        <div className="mt-8 rounded-3xl bg-[#030914] border border-white/10 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Photographic documentation */}
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentStep.image}
              alt={currentStep.title}
              className="w-full h-full object-cover filter contrast-105 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02070d] via-transparent to-transparent opacity-80" />
            <span className="absolute bottom-3 left-3 text-xs font-mono uppercase tracking-wider text-[#1ec2a4] bg-black/75 px-2.5 py-1 rounded">
              Workflow Reference
            </span>
          </div>

          {/* Description & Technical Points */}
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#38bdf8]">
              Stage {currentStep.step} Architecture — {currentStep.architecture}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1.5">
              {currentStep.title}
            </h3>

            <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed">
              {currentStep.description}
            </p>

            <div className="mt-6 space-y-2.5">
              {currentStep.technicalDetails.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1ec2a4] mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

