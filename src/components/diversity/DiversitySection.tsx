"use client";

import { useMemo, useState } from "react";
import { Globe2 } from "lucide-react";

const species = [
  { id: "elephant", name: "African Savanna Elephant", scientific: "Loxodonta africana", group: "Mammals", biome: "Savanna", image: "/media/images/african_elephant.jpg" },
  { id: "tiger", name: "Bengal Tiger", scientific: "Panthera tigris tigris", group: "Mammals", biome: "Forest and mangrove", image: "/media/images/tiger.jpg" },
  { id: "whale", name: "Blue Whale", scientific: "Balaenoptera musculus", group: "Marine life", biome: "Open ocean", image: "/media/images/blue_whale.jpg" },
  { id: "turtle", name: "Green Sea Turtle", scientific: "Chelonia mydas", group: "Marine life", biome: "Coastal waters", image: "/media/images/sea_turtle.jpg" },
  { id: "eagle", name: "Bald Eagle", scientific: "Haliaeetus leucocephalus", group: "Birds", biome: "River and coastal habitats", image: "/media/images/bald_eagle.jpg" },
  { id: "deer", name: "Red Deer", scientific: "Cervus elaphus", group: "Mammals", biome: "Woodland and highlands", image: "/media/images/red_deer.jpg" },
  { id: "frog", name: "Red-eyed Tree Frog", scientific: "Agalychnis callidryas", group: "Amphibians", biome: "Rainforest canopy", image: "/media/images/tree_frog.jpg" },
  { id: "butterfly", name: "Blue Morpho Butterfly", scientific: "Morpho peleides", group: "Invertebrates", biome: "Tropical rainforest", image: "/media/images/morpho_butterfly.jpg" },
];

const filters = ["All", "Mammals", "Birds", "Marine life", "Amphibians", "Invertebrates"];

export function DiversitySection() {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => filter === "All" ? species : species.filter((item) => item.group === filter), [filter]);

  return (
    <section id="species" className="relative bg-[#02070d] px-4 py-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1ec2a4]/30 bg-[#1ec2a4]/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-[#1ec2a4]"><Globe2 className="h-3.5 w-3.5" />Wildlife index</div>
          <h2 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Discover the Diversity of Life</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">Browse wildlife images, species names, and broad habitat labels. This gallery does not claim to contain a connected genomic dataset or model-derived measurements.</p>
        </div>
        <div className="mt-7 flex flex-wrap gap-2">{filters.map((item) => <button type="button" key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={`rounded-full border px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition ${filter === item ? "border-[#1ec2a4] bg-[#1ec2a4] font-semibold text-black" : "border-white/10 bg-white/[0.04] text-white/65 hover:text-white"}`}>{item}</button>)}</div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((item) => <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#030914] p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.name} className="aspect-[16/10] w-full rounded-xl object-cover" loading="lazy" />
          <p className="mt-3 text-[10px] font-mono uppercase tracking-widest text-[#38bdf8]">{item.group} · {item.biome}</p>
          <h3 className="mt-1 font-serif text-lg font-bold">{item.name}</h3>
          <p className="mt-1 text-xs font-mono italic text-white/55">{item.scientific}</p>
        </article>)}</div>
      </div>
    </section>
  );
}
