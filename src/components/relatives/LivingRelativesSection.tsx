"use client";

import { useState } from "react";
import { GitCompare } from "lucide-react";

const comparisons = [
  { id: "mammoth", past: "Woolly Mammoth", pastLatin: "Mammuthus primigenius", pastImage: "/media/species/mammoth_skeleton.jpg", living: "Asian Elephant", livingLatin: "Elephas maximus", livingImage: "/media/species/asian_elephant.jpg" },
  { id: "thylacine", past: "Thylacine", pastLatin: "Thylacinus cynocephalus", pastImage: "/media/species/thylacine_historical.jpg", living: "Spotted-tailed Quoll", livingLatin: "Dasyurus maculatus", livingImage: "/media/species/tiger_quoll.jpg" },
  { id: "pigeon", past: "Passenger Pigeon", pastLatin: "Ectopistes migratorius", pastImage: "/media/species/passenger_pigeon.jpg", living: "Mourning Dove", livingLatin: "Zenaida macroura", livingImage: "/media/species/mourning_dove.jpg" },
  { id: "smilodon", past: "Saber-toothed Cat", pastLatin: "Smilodon fatalis", pastImage: "/media/species/smilodon_skull.jpg", living: "Clouded Leopard", livingLatin: "Neofelis nebulosa", livingImage: "/media/species/clouded_leopard.jpg" },
  { id: "seacow", past: "Steller’s Sea Cow", pastLatin: "Hydrodamalis gigas", pastImage: "/media/species/stellers_seacow.jpg", living: "Dugong", livingLatin: "Dugong dugon", livingImage: "/media/species/dugong.jpg" },
];

export function LivingRelativesSection() {
  const [selectedId, setSelectedId] = useState(comparisons[0].id);
  const selected = comparisons.find((item) => item.id === selectedId) ?? comparisons[0];

  return (
    <section id="relatives" className="relative bg-[#01060e] px-4 py-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-[#38bdf8]"><GitCompare className="h-3.5 w-3.5" />Species comparisons</div>
          <h2 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Extinct Animals and Living Species</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">Browse visual pairings for context. No genome alignment, mapped loci, or reconstruction results are connected.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {comparisons.map((item) => <button type="button" key={item.id} onClick={() => setSelectedId(item.id)} aria-pressed={selectedId === item.id} className={`rounded-full border px-4 py-2 text-xs font-mono transition ${selectedId === item.id ? "border-[#1ec2a4] bg-[#1ec2a4] font-bold text-black" : "border-white/15 bg-white/[0.03] text-white/70 hover:text-white"}`}>{item.past} ↔ {item.living}</button>)}
        </div>
        <div className="mt-8 grid gap-6 rounded-3xl border border-white/10 bg-[#020a16]/90 p-5 sm:p-8 md:grid-cols-2">
          {[{ name: selected.past, latin: selected.pastLatin, image: selected.pastImage, label: "Extinct species" }, { name: selected.living, latin: selected.livingLatin, image: selected.livingImage, label: "Living species" }].map((item) => (
            <article key={item.label} className="rounded-2xl border border-white/10 bg-black/40 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} className="aspect-[16/10] w-full rounded-xl object-cover" loading="lazy" />
              <p className="mt-4 text-[11px] font-mono uppercase tracking-widest text-[#1ec2a4]">{item.label}</p>
              <h3 className="mt-1 font-serif text-xl font-bold">{item.name}</h3>
              <p className="mt-1 text-xs font-mono italic text-white/55">{item.latin}</p>
            </article>
          ))}
          <p className="md:col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/70">These pairings are for visual browsing only. They do not indicate a measured genetic distance or prove that one species is a suitable reconstruction reference.</p>
        </div>
      </div>
    </section>
  );
}
