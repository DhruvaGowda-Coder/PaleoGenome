"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dna, Clock, Compass, ChevronRight, ChevronLeft } from "lucide-react";

interface WildlifeFocus {
  id: string;
  name: string;
  scientific: string;
  status: "Living Sister Clade" | "Ancient DNA Recovered" | "Fossil Horizon";
  era: string;
  image: string;
  narrative: string;
}

const WILDERNESS_SUBJECTS: WildlifeFocus[] = [
  {
    id: "tiger",
    name: "Royal Bengal Tiger",
    scientific: "Panthera tigris tigris",
    status: "Living Sister Clade",
    era: "Extant Apex Felid",
    image: "/media/images/tiger_in_forest.jpg",
    narrative:
      "Stalking through the dense sal and bamboo forests of Asia, the tiger preserves the pinnacle of felid muscular and craniofacial evolution. Its living genome anchors ancestral reconstructions of Pleistocene hyper-carnivores.",
  },
  {
    id: "mammoth",
    name: "Woolly Mammoth",
    scientific: "Mammuthus primigenius",
    status: "Ancient DNA Recovered",
    era: "Extinct ~4,000 BP (Siberian Steppe)",
    image: "/media/species/mammoth_skeleton.jpg",
    narrative:
      "Adapted to the unforgiving arctic cold with dense dual-layered fleece and specialized hemoglobin. High-coverage DNA recovered from permafrost remains provides the foundation for synteny assembly against modern Asian elephants.",
  },
  {
    id: "thylacine",
    name: "Thylacine (Tasmanian Tiger)",
    scientific: "Thylacinus cynocephalus",
    status: "Ancient DNA Recovered",
    era: "Extinct 1936 (Tasmania)",
    image: "/media/species/thylacine_historical.jpg",
    narrative:
      "A masterclass in convergent evolution: an apex marsupial carnivore that mirrored canid skull architecture while retaining a 120-degree jaw aperture and dorsal striping. Museum specimens have yielded both complete DNA and RNA transcriptomes.",
  },
  {
    id: "irish_elk",
    name: "Giant Irish Elk",
    scientific: "Megaloceros giganteus",
    status: "Ancient DNA Recovered",
    era: "Extinct ~7,700 BP (Late Pleistocene)",
    image: "/media/lost_species/irish_elk_skeleton.jpg",
    narrative:
      "Carrying massive 3.6-meter antlers weighing over 40 kilograms, this colossal cervid roamed across Eurasia. Peat bog ancient DNA confirms its evolutionary placement as sister clade to modern fallow deer.",
  },
];

const MARINE_COASTAL_SUBJECTS: WildlifeFocus[] = [
  {
    id: "seacow",
    name: "Steller's Sea Cow",
    scientific: "Hydrodamalis gigas",
    status: "Ancient DNA Recovered",
    era: "Extinct 1768 (Commander Islands)",
    image: "/media/species/stellers_seacow.jpg",
    narrative:
      "An arctic titan reaching 10 meters in length and weighing over 8 metric tons. Grazing massive kelp canopies in the freezing sub-polar North Pacific, its genetic record reveals profound blubber-thickening and toothless keratinous plate adaptations.",
  },
  {
    id: "dodo",
    name: "Dodo",
    scientific: "Raphus cucullatus",
    status: "Ancient DNA Recovered",
    era: "Extinct ~1662 (Mauritius)",
    image: "/media/lost_species/dodo_skeleton.jpg",
    narrative:
      "A flightless giant columbid endemic to the pristine palm forests of Mauritius. Ancient DNA extracted from museum holotypes confirmed its rapid evolutionary divergence from ancestral flying pigeons of the Indian Ocean.",
  },
  {
    id: "toad",
    name: "Golden Toad",
    scientific: "Incilius periglenes",
    status: "Ancient DNA Recovered",
    era: "Extinct 1989 (Costa Rica)",
    image: "/media/lost_species/golden_toad.jpg",
    narrative:
      "Glowing with vivid golden-orange pigmentation on rain-soaked moss, this high-altitude elfin cloud forest amphibian vanished in 1989. It stands as an enduring symbol of fragile tropical micro-habitats.",
  },
  {
    id: "xerces",
    name: "Xerces Blue Butterfly",
    scientific: "Glaucopsyche xerces",
    status: "Ancient DNA Recovered",
    era: "Extinct 1941 (San Francisco)",
    image: "/media/lost_species/xerces_blue.jpg",
    narrative:
      "The first recorded North American insect extinction caused by modern coastal development. Genomic sequencing of a 93-year-old pinned museum specimen in 2021 proved it was a distinct, irreplaceable biological species.",
  },
];

export function LivingContinuumSection() {
  const [activeWildernessIndex, setActiveWildernessIndex] = useState(0);
  const [activeMarineIndex, setActiveMarineIndex] = useState(0);

  const activeWilderness = WILDERNESS_SUBJECTS[activeWildernessIndex];
  const activeMarine = MARINE_COASTAL_SUBJECTS[activeMarineIndex];

  return (
    <div className="relative bg-[#02070d] text-white overflow-hidden">
      {/* =========================================================================
          CONTINUOUS SCROLL AREA 1: THE TERRESTRIAL WILDERNESS & STEPPE
          Living mammals and extinct megafauna coexisting in atmospheric depth
          ========================================================================= */}
      <section
        id="wilderness"
        className="relative py-28 sm:py-36 px-6 sm:px-10 border-t border-white/[0.06] overflow-hidden"
      >
        {/* Subtle background forest mist glow */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#1ec2a4]/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Subtle narrative lead */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/[0.08] gap-6">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#1ec2a4] block mb-3">
                Continuum I • Terrestrial Wilderness
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Where Living Giants Meet the Lost
              </h2>
              <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed font-light">
                The boundary between past and present dissolves across Earth’s forests and steppes.
                Living apex predators walk the same evolutionary pathways forged by Pleistocene megafauna.
              </p>
            </div>

            {/* Selector Controls */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/40 mr-1">
                <span className="text-[#1ec2a4] font-bold">{activeWildernessIndex + 1}</span> /{" "}
                {WILDERNESS_SUBJECTS.length}
              </span>
              <button
                onClick={() =>
                  setActiveWildernessIndex(
                    (prev) => (prev - 1 + WILDERNESS_SUBJECTS.length) % WILDERNESS_SUBJECTS.length
                  )
                }
                aria-label="Previous Wilderness Subject"
                className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/30 text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setActiveWildernessIndex((prev) => (prev + 1) % WILDERNESS_SUBJECTS.length)
                }
                aria-label="Next Wilderness Subject"
                className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-[#1ec2a4] text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Balanced 2-Subject Viewport Layout */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Primary Visual Subject (7 Cols) */}
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWilderness.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeWilderness.image}
                    alt={activeWilderness.name}
                    className="w-full h-full object-cover filter contrast-[1.08] brightness-95"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Natural documentary vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02070d] via-transparent to-transparent opacity-80 pointer-events-none" />

              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-black/75 backdrop-blur-md border border-white/20 text-[#1ec2a4]">
                  {activeWilderness.status}
                </span>
              </div>

              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono text-white/50 block">{activeWilderness.era}</span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                    {activeWilderness.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Narrative & Supporting Perspective (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#38bdf8] block">
                  {activeWilderness.scientific}
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mt-1 leading-tight">
                  {activeWilderness.name}
                </h3>
              </div>

              <p className="text-base text-white/80 font-light leading-relaxed">
                {activeWilderness.narrative}
              </p>

              {/* Thumbnail Strip to toggle seamlessly */}
              <div className="pt-6 border-t border-white/[0.08]">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 block mb-3">
                  Terrestrial Lineages
                </span>
                <div className="grid grid-cols-4 gap-2.5">
                  {WILDERNESS_SUBJECTS.map((item, index) => {
                    const isSelected = index === activeWildernessIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveWildernessIndex(index)}
                        className={`aspect-[4/3] rounded-xl overflow-hidden border transition-all duration-300 relative ${
                          isSelected
                            ? "border-[#1ec2a4] ring-2 ring-[#1ec2a4]/40"
                            : "border-white/10 opacity-60 hover:opacity-100"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover filter contrast-105"
                          loading="lazy"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTINUOUS SCROLL AREA 2: THE PELAGIC ABYSS & ISLAND SHORES
          Real moving whale & coral reef fish footage seamlessly integrated
          ========================================================================= */}
      <section
        id="abyss"
        className="relative py-28 sm:py-36 px-6 sm:px-10 border-t border-white/[0.06] overflow-hidden"
      >
        {/* Ocean caustics glow */}
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#38bdf8]/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Subtle narrative lead */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/[0.08] gap-6">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#38bdf8] block mb-3">
                Continuum II • Pelagic Abyss &amp; Coastal Sanctuaries
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                The Depths of Ocean Time
              </h2>
              <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed font-light">
                From the sub-polar kelp forests of the Bering Sea to tropical volcanic archipelagos,
                marine and insular ecosystems harbor the deepest evolutionary lineages on Earth.
              </p>
            </div>

            {/* Selector Controls */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/40 mr-1">
                <span className="text-[#38bdf8] font-bold">{activeMarineIndex + 1}</span> /{" "}
                {MARINE_COASTAL_SUBJECTS.length}
              </span>
              <button
                onClick={() =>
                  setActiveMarineIndex(
                    (prev) =>
                      (prev - 1 + MARINE_COASTAL_SUBJECTS.length) % MARINE_COASTAL_SUBJECTS.length
                  )
                }
                aria-label="Previous Marine Subject"
                className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/30 text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setActiveMarineIndex((prev) => (prev + 1) % MARINE_COASTAL_SUBJECTS.length)
                }
                aria-label="Next Marine Subject"
                className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-[#38bdf8] text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Real Looping Underwater Video Ambient Window */}
          <div className="mt-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[21/9] sm:aspect-[24/9] bg-black">
            <video
              src="/media/videos/whales_underwater.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter brightness-95 contrast-115 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#02070d]/80 via-transparent to-[#02070d]/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02070d] via-transparent to-transparent opacity-70" />

            <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between pointer-events-none">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#38bdf8] block">
                  Continuous Living Ocean
                </span>
                <h4 className="font-serif text-lg sm:text-2xl font-bold text-white">
                  Pelagic Marine Cetaceans &amp; Coral Ecosystems
                </h4>
              </div>
              <span className="hidden sm:inline-block text-xs font-mono text-white/60 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                100% Authentic Wildlife Recording
              </span>
            </div>
          </div>

          {/* Balanced 2-Subject Coastal/Marine Showcase */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Marine Subject Visual (7 Cols) */}
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMarine.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeMarine.image}
                    alt={activeMarine.name}
                    className="w-full h-full object-cover filter contrast-[1.08] brightness-95"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Natural documentary vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02070d] via-transparent to-transparent opacity-80 pointer-events-none" />

              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-black/75 backdrop-blur-md border border-white/20 text-[#38bdf8]">
                  {activeMarine.status}
                </span>
              </div>

              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono text-white/50 block">{activeMarine.era}</span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                    {activeMarine.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Narrative & Thumbnails (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#1ec2a4] block">
                  {activeMarine.scientific}
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mt-1 leading-tight">
                  {activeMarine.name}
                </h3>
              </div>

              <p className="text-base text-white/80 font-light leading-relaxed">
                {activeMarine.narrative}
              </p>

              {/* Marine Thumbnail Selection */}
              <div className="pt-6 border-t border-white/[0.08]">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 block mb-3">
                  Marine &amp; Coastal Lineages
                </span>
                <div className="grid grid-cols-4 gap-2.5">
                  {MARINE_COASTAL_SUBJECTS.map((item, index) => {
                    const isSelected = index === activeMarineIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveMarineIndex(index)}
                        className={`aspect-[4/3] rounded-xl overflow-hidden border transition-all duration-300 relative ${
                          isSelected
                            ? "border-[#38bdf8] ring-2 ring-[#38bdf8]/40"
                            : "border-white/10 opacity-60 hover:opacity-100"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover filter contrast-105"
                          loading="lazy"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

