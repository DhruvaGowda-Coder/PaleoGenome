"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Clock, GitCompare } from "lucide-react";

interface EvolutionaryPair {
  id: string;
  title: string;
  divergence: string;
  extinct: {
    name: string;
    scientific: string;
    image: string;
    role: string;
  };
  living: {
    name: string;
    scientific: string;
    image: string;
    role: string;
  };
  narrative: string;
}

const LINEAGE_PAIRS: EvolutionaryPair[] = [
  {
    id: "proboscidea",
    title: "Proboscidean Megafauna",
    divergence: "Diverged ~5.8 Million Years Ago",
    extinct: {
      name: "Woolly Mammoth",
      scientific: "Mammuthus primigenius",
      image: "/media/species/mammoth_skeleton.jpg",
      role: "Sub-zero Steppe Megafauna (Extinct ~4,000 BP)",
    },
    living: {
      name: "Asian Elephant",
      scientific: "Elephas maximus",
      image: "/media/species/asian_elephant.jpg",
      role: "Living Forest Sister Clade (Endangered)",
    },
    narrative:
      "Mammoths and Asian elephants share a closer common ancestor than either shares with the African elephant. Comparing their genomes reveals fixed amino acid changes responsible for sub-zero peripheral blood flow, subcutaneous brown fat deposition, and massive curved tusks.",
  },
  {
    id: "marsupial",
    title: "Dasyuromorphian Carnivores",
    divergence: "Diverged ~14 Million Years Ago",
    extinct: {
      name: "Thylacine",
      scientific: "Thylacinus cynocephalus",
      image: "/media/species/thylacine_historical.jpg",
      role: "Apex Marsupial Hunter (Extinct 1936)",
    },
    living: {
      name: "Spotted-tailed Quoll",
      scientific: "Dasyurus maculatus",
      image: "/media/species/tiger_quoll.jpg",
      role: "Living Marsupial Relative",
    },
    narrative:
      "While the thylacine famously mirrored placental wolves in skull shape, its living dasyurid relatives—such as the spotted-tailed quoll and dunnart—provide the essential chromosomal blueprint for assembling ancient marsupial reads.",
  },
  {
    id: "sirenia",
    title: "Giant Marine Sirenians",
    divergence: "Diverged ~22 Million Years Ago",
    extinct: {
      name: "Steller's Sea Cow",
      scientific: "Hydrodamalis gigas",
      image: "/media/species/stellers_seacow.jpg",
      role: "Arctic Marine Giant (Extinct 1768)",
    },
    living: {
      name: "Dugong",
      scientific: "Dugong dugon",
      image: "/media/species/dugong.jpg",
      role: "Tropical Marine Sirenian",
    },
    narrative:
      "Steller’s sea cow reached unprecedented 10-meter lengths to thrive in the icy, kelp-choked waters of the North Pacific. Modern dugongs represent the sole surviving sister clade, providing key evolutionary context for ancient marine herbivory.",
  },
  {
    id: "columbidae",
    title: "Nomadic Avian Lineages",
    divergence: "Diverged ~28 Million Years Ago",
    extinct: {
      name: "Passenger Pigeon",
      scientific: "Ectopistes migratorius",
      image: "/media/species/passenger_pigeon.jpg",
      role: "Colonial Forest Flocker (Extinct 1914)",
    },
    living: {
      name: "Mourning Dove",
      scientific: "Zenaida macroura",
      image: "/media/species/mourning_dove.jpg",
      role: "Living Columbid Sister Clade",
    },
    narrative:
      "Passenger pigeons traveled in billion-strong nomadic flocks that darkened skies for days. Modern mourning doves share deeply conserved synteny blocks, revealing how social flocking loci governed ancient bird migrations.",
  },
];

export function EvolutionaryContinuum() {
  const [selectedId, setSelectedId] = useState("proboscidea");

  const current = LINEAGE_PAIRS.find((p) => p.id === selectedId) || LINEAGE_PAIRS[0];

  return (
    <section
      id="continuum"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#02070d] text-white border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#1ec2a4] block mb-3">
            The Living Continuum
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Extinction Meets Evolution
          </h2>
          <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed font-light">
            No extinct genome stands alone. By pairing ancient sub-fossil remains directly with their
            closest living relatives, evolutionary genetics uncovers the molecular changes that allowed
            species to adapt, flourish, and eventually vanish.
          </p>
        </div>

        {/* Lineage Selector */}
        <div className="mt-10 flex flex-wrap gap-2.5 pb-6 border-b border-white/[0.08]">
          {LINEAGE_PAIRS.map((pair) => {
            const isSelected = pair.id === current.id;
            return (
              <button
                key={pair.id}
                onClick={() => setSelectedId(pair.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "bg-[#1ec2a4] text-black font-bold shadow-[0_0_15px_rgba(30,194,164,0.4)]"
                    : "bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                {pair.title}
              </button>
            );
          })}
        </div>

        {/* Seamless Environmental Side-by-Side Vista */}
        <div className="mt-12 bg-[#01040a]/90 rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d99b42] block">
                {current.divergence}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                {current.extinct.name}{" "}
                <span className="text-[#1ec2a4] font-light">&amp;</span> {current.living.name}
              </h3>
            </div>
            <span className="text-xs font-mono text-white/50">Comparative Lineage Alignment</span>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Extinct Taxon */}
            <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-white/10 group bg-black shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.extinct.image}
                alt={current.extinct.name}
                className="w-full h-full object-cover filter contrast-[1.08] brightness-95 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-amber-950/80 border border-amber-500/40 text-amber-300">
                  Extinct Taxon
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="font-serif text-lg font-bold text-white">{current.extinct.name}</h4>
                <p className="text-xs font-mono italic text-white/50">{current.extinct.scientific}</p>
                <p className="text-[11px] font-mono text-white/70 mt-1">{current.extinct.role}</p>
              </div>
            </div>

            {/* Living Sister Taxon */}
            <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-white/10 group bg-black shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.living.image}
                alt={current.living.name}
                className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                  Living Sister Clade
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="font-serif text-lg font-bold text-white">{current.living.name}</h4>
                <p className="text-xs font-mono italic text-white/50">{current.living.scientific}</p>
                <p className="text-[11px] font-mono text-white/70 mt-1">{current.living.role}</p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-base text-white/75 font-light leading-relaxed">
            {current.narrative}
          </p>
        </div>
      </div>
    </section>
  );
}

