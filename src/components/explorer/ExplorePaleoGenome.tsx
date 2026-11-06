"use client";

import { useState } from "react";
import { Compass } from "lucide-react";

const species = [
  { id: "mammoth", name: "Woolly Mammoth", latin: "Mammuthus primigenius", image: "/media/species/mammoth_skeleton.jpg" },
  { id: "thylacine", name: "Thylacine", latin: "Thylacinus cynocephalus", image: "/media/species/thylacine_historical.jpg" },
  { id: "pigeon", name: "Passenger Pigeon", latin: "Ectopistes migratorius", image: "/media/species/passenger_pigeon.jpg" },
  { id: "smilodon", name: "Saber-toothed Cat", latin: "Smilodon fatalis", image: "/media/species/smilodon_skull.jpg" },
];

export function ExplorePaleoGenome() {
  const [selectedId, setSelectedId] = useState(species[0].id);
  const selected = species.find((item) => item.id === selectedId) ?? species[0];

  return (
    <section id="explore" className="relative bg-[#01050c] px-4 py-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1ec2a4]/30 bg-[#1ec2a4]/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-[#1ec2a4]"><Compass className="h-3.5 w-3.5" />Species image index</div>
          <h2 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Explore PaleoGenome</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">Browse species imagery and names. No genome measurements, viability scores, or model predictions are presented here.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {species.map((item) => (
            <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} aria-pressed={selectedId === item.id} className={`rounded-2xl border p-3 text-left transition ${selectedId === item.id ? "border-[#1ec2a4] bg-[#06182a]" : "border-white/10 bg-[#030914] hover:border-white/25"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} className="aspect-[16/10] w-full rounded-xl object-cover" loading="lazy" />
              <span className="mt-3 block font-serif text-lg font-bold">{item.name}</span>
              <span className="mt-1 block text-xs font-mono italic text-white/55">{item.latin}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#030914] p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#1ec2a4]">Selected species</p>
          <h3 className="mt-2 font-serif text-2xl font-bold">{selected.name}</h3>
          <p className="mt-1 text-sm font-mono italic text-white/60">{selected.latin}</p>
          <p className="mt-4 text-sm leading-6 text-white/70">This is a visual species reference only. No sequence dataset or trained-model output is connected.</p>
        </div>
      </div>
    </section>
  );
}
