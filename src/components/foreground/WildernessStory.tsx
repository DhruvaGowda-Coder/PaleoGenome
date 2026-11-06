"use client";

import React, { useState } from "react";
import { Dna, Compass } from "lucide-react";

interface TerrestrialHighlight {
  id: string;
  name: string;
  scientific: string;
  group: string;
  status: string;
  details: string;
  image: string;
}

const HIGHLIGHTS: TerrestrialHighlight[] = [
  {
    id: "tiger",
    name: "Royal Bengal Tiger",
    scientific: "Panthera tigris tigris",
    group: "Mammalia • Living",
    status: "Extant Apex Felid",
    details:
      "A living big cat whose genome helps researchers compare shared and distinct traits across the cat family. Tigers offer a useful modern reference for studying felid evolution, alongside fossils and ancient DNA from extinct cats.",
    image: "/media/images/tiger_in_forest.jpg",
  },
  {
    id: "mammoth",
    name: "Woolly Mammoth",
    scientific: "Mammuthus primigenius",
    group: "Mammalia • Ancient DNA",
    status: "High-Coverage Permafrost Genome",
    details:
      "Adapted to cold steppe environments, the woolly mammoth is closely related to the living Asian elephant. Comparing their genomes helps researchers study cold-weather adaptations and changes since their lineages diverged.",
    image: "/media/species/mammoth_skeleton.jpg",
  },
  {
    id: "thylacine",
    name: "Thylacine",
    scientific: "Thylacinus cynocephalus",
    group: "Marsupialia • Holocene Loss",
    status: "Ancient DNA & RNA Recovered",
    details:
      "This extinct Australian marsupial evolved a body shape that resembles placental canids, despite its distant relationship to them. DNA and RNA recovered from museum specimens offer clues to its biology and evolutionary history.",
    image: "/media/species/thylacine_historical.jpg",
  },
  {
    id: "frog",
    name: "Red-Eyed Tree Frog",
    scientific: "Agalychnis callidryas",
    group: "Amphibia • Living",
    status: "Neotropical Bio-Indicator",
    details:
      "A canopy-dwelling Central American frog recognized by its bright eyes and adhesive toe pads. Its sensitivity to changes in forest and water conditions makes amphibians useful subjects in ecosystem monitoring.",
    image: "/media/images/tree_frog.jpg",
  },
  {
    id: "xerces",
    name: "Xerces Blue",
    scientific: "Glaucopsyche xerces",
    group: "Insecta • Vanished 1943",
    status: "First U.S. Invertebrate Loss",
    details:
      "This San Francisco Bay Area butterfly disappeared as coastal dune habitat was developed. DNA from museum specimens supports its status as a distinct species and helps document the loss.",
    image: "/media/lost_species/xerces_blue.jpg",
  },
  {
    id: "asian-elephant",
    name: "Asian Elephant",
    scientific: "Elephas maximus",
    group: "Mammalia • Living",
    status: "Mammoth’s Closest Living Relative",
    details:
      "Asian elephants are the closest living relatives of woolly mammoths. Their genomes provide an important comparison for identifying genetic changes associated with mammoth adaptations to cold climates.",
    image: "/media/species/asian_elephant.jpg",
  },
  {
    id: "passenger-pigeon",
    name: "Passenger Pigeon",
    scientific: "Ectopistes migratorius",
    group: "Aves • Extinct 1914",
    status: "Historic Genome Reconstruction",
    details:
      "Once extraordinarily abundant, the passenger pigeon went extinct in 1914. DNA from museum specimens has helped researchers investigate its population history and why abundance alone did not protect it from extinction.",
    image: "/media/species/passenger_pigeon.jpg",
  },
  {
    id: "blue-whale",
    name: "Blue Whale",
    scientific: "Balaenoptera musculus",
    group: "Mammalia • Living",
    status: "Largest Animal on Earth",
    details:
      "The blue whale is the largest animal known to have lived. As a living baleen whale, it offers a modern example for exploring how mammal lineages adapted to life in the ocean.",
    image: "/media/images/blue_whale.jpg",
  },
];

export function WildernessStory() {
  const [selectedId, setSelectedId] = useState("tiger");

  const active = HIGHLIGHTS.find((h) => h.id === selectedId) || HIGHLIGHTS[0];

  return (
    <section
      id="wilderness"
      className="relative min-h-[100svh] w-full flex flex-col justify-center px-4 sm:px-12 py-24 sm:py-32 bg-transparent z-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="relative isolate w-full max-w-2xl p-5 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-4 -inset-y-5 sm:-inset-x-24 sm:-inset-y-12 -z-10 rounded-[2rem] sm:rounded-[3rem] cinematic-panel-glow"
          />
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#1ec2a4] block mb-3">
            The Living &amp; Ancient Wilderness
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.12] break-words">
            Where living giants meet the lost.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-white/85 font-light leading-relaxed">
            The boundary between past and present dissolves across Earth’s forests and steppes.
            Living apex predators walk the evolutionary paths forged by ancient megafauna,
            offering living comparisons that help researchers interpret ancient DNA and trace how species have changed over time.
          </p>

          {/* Species Selector Pills */}
          <div className="mt-8 space-y-4 pt-6 border-t border-white/10">
            {[
              { label: "Living species", items: HIGHLIGHTS.filter((item) => item.group.includes("Living")) },
              { label: "Extinct species", items: HIGHLIGHTS.filter((item) => !item.group.includes("Living")) },
            ].map((group) => (
              <div key={group.label}>
                <span className="mb-2 block text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      aria-pressed={selectedId === item.id}
                      className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                        selectedId === item.id
                          ? "bg-[#1ec2a4] text-black font-bold shadow-[0_0_15px_rgba(30,194,164,0.4)]"
                          : "bg-white/[0.05] text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Active Species Summary */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/15 shadow-lg bg-black/60 mask-feather-radial">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.image}
                alt={active.name}
                className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.1]"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-mono font-medium text-[#1ec2a4] uppercase tracking-wider">
                  {active.group}
                </span>
                <span className="text-white/30">•</span>
                <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider">
                  {active.status}
                </span>
                <span className="text-white/30">•</span>
                <span className="text-xs font-mono italic text-white/50">{active.scientific}</span>
              </div>
              <p className="mt-2 text-sm text-white/80 leading-relaxed font-light">
                {active.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

