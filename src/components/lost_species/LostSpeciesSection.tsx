"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Skull,
  Dna,
  Filter,
  Search,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Calendar,
  Layers,
  Info,
  X
} from "lucide-react";

export type CladeCategory =
  | "All"
  | "Mammalia"
  | "Aves"
  | "Reptilia"
  | "Amphibia"
  | "Marine Animals"
  | "Insecta & Invertebrates";

export type DnaStatus = "all" | "ancient_dna" | "fossil_only";

export interface LostSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  clade: CladeCategory;
  dnaStatus: "ancient_dna" | "fossil_only";
  extinctionEpoch: string;
  exactDateOrAge: string;
  preservationSubstrate: string;
  museumSpecimenSource: string;
  image: string;
  livingReferenceTaxon: string;
  taphonomicLimit: string;
  scientificOverview: string;
  molecularStatus: string;
}

export const LOST_SPECIES_CATALOG: LostSpecies[] = [
  // Mammalia
  {
    id: "mammoth",
    commonName: "Woolly Mammoth",
    scientificName: "Mammuthus primigenius",
    clade: "Mammalia",
    dnaStatus: "ancient_dna",
    extinctionEpoch: "Late Pleistocene to Mid-Holocene",
    exactDateOrAge: "~4,000 BP (Wrangel Island relict)",
    preservationSubstrate: "Siberian sub-zero permafrost matrix",
    museumSpecimenSource: "Museum of Ancient Life / Yakutia Sub-fossil",
    image: "/media/species/mammoth_skeleton.jpg",
    livingReferenceTaxon: "Asian Elephant (Elephas maximus)",
    taphonomicLimit: "High Coverage (28× depth recovered)",
    scientificOverview:
      "One of the best-characterized ancient mammalian genomes. High-coverage nuclear and mitochondrial genomes recovered from permafrost hair and bone. Crucial model for cold-adaptation gene editing.",
    molecularStatus: "Full nuclear genome assembled from multiple individuals.",
  },
  {
    id: "thylacine",
    commonName: "Thylacine (Tasmanian Tiger)",
    scientificName: "Thylacinus cynocephalus",
    clade: "Mammalia",
    dnaStatus: "ancient_dna",
    extinctionEpoch: "Anthropocene (Modern)",
    exactDateOrAge: "September 7, 1936 (Hobart Zoo)",
    preservationSubstrate: "Ethanol-fixed pouch young & taxidermy study skins",
    museumSpecimenSource: "Hobart Zoo 1928 Archival Specimen Record",
    image: "/media/species/thylacine_historical.jpg",
    livingReferenceTaxon: "Spotted-tailed Quoll / Fat-tailed Dunnart",
    taphonomicLimit: "High Coverage (RNA + DNA recovered)",
    scientificOverview:
      "Remarkable apex marsupial carnivore with extreme craniofacial convergence to placental canids. Extensively sequenced from museum wet collection specimens; first extinct species with recovered transcriptomic RNA profiles.",
    molecularStatus: "Chromosome-length genome scaffolded using living dasyurid Hi-C maps.",
  },
  {
    id: "quagga",
    commonName: "Quagga",
    scientificName: "Equus quagga quagga",
    clade: "Mammalia",
    dnaStatus: "ancient_dna",
    extinctionEpoch: "Anthropocene (Modern)",
    exactDateOrAge: "August 12, 1883 (Artis Magistra, Amsterdam)",
    preservationSubstrate: "Museum taxidermy hide & salt-cured skin tissue",
    museumSpecimenSource: "Muséum d'Histoire Naturelle de Toulouse (MHNT)",
    image: "/media/lost_species/quagga_specimen.jpg",
    livingReferenceTaxon: "Plains Zebra (Equus quagga burchellii)",
    taphonomicLimit: "Pioneering Ancient DNA (Higuchi et al. 1984)",
    scientificOverview:
      "A subspecies of plains zebra exhibiting stark reduction of hindquarters striping and a chestnut-brown dorsal coat. The quagga was the first extinct animal from which ancient DNA was successfully cloned and sequenced in history (1984).",
    molecularStatus: "Subspecies divergence validated at <0.3% genetic distance from plains zebra.",
  },
  {
    id: "irish_elk",
    commonName: "Giant Irish Elk",
    scientificName: "Megaloceros giganteus",
    clade: "Mammalia",
    dnaStatus: "ancient_dna",
    extinctionEpoch: "Late Pleistocene to Holocene",
    exactDateOrAge: "~7,700 BP (Urals relict population)",
    preservationSubstrate: "Calcareous peat bogs and cold lake sediments",
    museumSpecimenSource: "Muséum National d'Histoire Naturelle, Paris",
    image: "/media/lost_species/irish_elk_skeleton.jpg",
    livingReferenceTaxon: "Fallow Deer (Dama dama) & Red Deer",
    taphonomicLimit: "Sub-fossil Collagen & Ancient DNA",
    scientificOverview:
      "Wielded the largest antlers of any known cervid, spanning up to 3.65 meters across. Ancient mitochondrial genomes confirmed its phylogenetic placement as sister clade to modern fallow deer rather than red deer.",
    molecularStatus: "Complete mitochondrial genome and low-coverage nuclear contigs.",
  },
  {
    id: "smilodon",
    commonName: "Saber-toothed Cat",
    scientificName: "Smilodon fatalis",
    clade: "Mammalia",
    dnaStatus: "ancient_dna",
    extinctionEpoch: "Late Pleistocene Extinction Event",
    exactDateOrAge: "~10,000 BP (Rancho La Brea asphaltum)",
    preservationSubstrate: "Asphaltic matrix and dry sub-fossil bone",
    museumSpecimenSource: "La Brea Tar Pits Collection, Los Angeles",
    image: "/media/species/smilodon_skull.jpg",
    livingReferenceTaxon: "Clouded Leopard & African Lion",
    taphonomicLimit: "Ancient Collagen Proteomics & Mitochondrial DNA",
    scientificOverview:
      "Heavily built apex felid with elongated 28cm upper maxillary canines. Collagen proteomics and ancient mitochondrial sequences confirm divergence from living felids approximately 20 million years ago.",
    molecularStatus: "Mitochondrial sequence published; nuclear coverage constrained by asphalt cross-linking.",
  },
  {
    id: "stellers_seacow",
    commonName: "Steller's Sea Cow",
    scientificName: "Hydrodamalis gigas",
    clade: "Mammalia",
    dnaStatus: "ancient_dna",
    extinctionEpoch: "Anthropocene (Modern)",
    exactDateOrAge: "Extinct 1768 (Commander Islands, Bering Sea)",
    preservationSubstrate: "Sub-fossil coastal skeletal bone",
    museumSpecimenSource: "Finnish Museum of Natural History, Helsinki",
    image: "/media/species/stellers_seacow.jpg",
    livingReferenceTaxon: "Dugong (Dugong dugon)",
    taphonomicLimit: "High Coverage Paleogenomics (Sharko et al. 2021)",
    scientificOverview:
      "A sub-arctic giant herbivorous sirenian reaching up to 10 meters in length. Paleogenomic analysis revealed an ancient demographic collapse predating human arrival, with extreme loss of genetic diversity and fixed blubber-thickening alleles.",
    molecularStatus: "High-coverage nuclear genome resolved; reveals extreme historical inbreeding.",
  },

  // Aves
  {
    id: "dodo",
    commonName: "Dodo",
    scientificName: "Raphus cucullatus",
    clade: "Aves",
    dnaStatus: "ancient_dna",
    extinctionEpoch: "Anthropocene (Modern)",
    exactDateOrAge: "Extinct ~1662 (Mauritius, Indian Ocean)",
    preservationSubstrate: "Museum dried toepad tissue & sub-fossil cave guano",
    museumSpecimenSource: "Natural History Museum London (Holotype Skeleton)",
    image: "/media/lost_species/dodo_skeleton.jpg",
    livingReferenceTaxon: "Nicobar Pigeon (Caloenas nicobarica)",
    taphonomicLimit: "Ancient Nuclear Genome (Shapiro Lab 2022)",
    scientificOverview:
      "A flightless columbid endemic to Mauritius. High-depth ancient DNA extracted from the Copenhagen and Natural History Museum specimens placed the dodo as a specialized insular offshoot of flying pigeons, closely allied with the Nicobar pigeon.",
    molecularStatus: "High-coverage nuclear genome sequenced; key reference for flightlessness genetics.",
  },
  {
    id: "passenger_pigeon",
    commonName: "Passenger Pigeon",
    scientificName: "Ectopistes migratorius",
    clade: "Aves",
    dnaStatus: "ancient_dna",
    extinctionEpoch: "Anthropocene (Modern)",
    exactDateOrAge: "September 1, 1914 (Martha, Cincinnati Zoo)",
    preservationSubstrate: "Museum study skins & toepad clippings",
    museumSpecimenSource: "Muséum d'Histoire Naturelle de Toulouse (MHNT)",
    image: "/media/species/passenger_pigeon.jpg",
    livingReferenceTaxon: "Band-tailed Pigeon & Mourning Dove",
    taphonomicLimit: "Multiple High-Coverage Nuclear Genomes",
    scientificOverview:
      "Once among the most abundant birds on Earth, with nomadic flocks numbering in the billions. Genomic analysis indicates that extreme natural population fluctuations combined with rapid industrial harvesting caused irreversible population collapse.",
    molecularStatus: "Multiple full nuclear genomes sequenced at >30× depth.",
  },
  {
    id: "giant_moa",
    commonName: "South Island Giant Moa",
    scientificName: "Dinornis robustus",
    clade: "Aves",
    dnaStatus: "ancient_dna",
    extinctionEpoch: "Holocene Insular Extinction",
    exactDateOrAge: "Extinct ~1440 CE (New Zealand)",
    preservationSubstrate: "Sub-fossil bones and mummified cave tissue",
    museumSpecimenSource: "Yorkshire Museum / Canterbury Museum Collection",
    image: "/media/lost_species/giant_moa_skeleton.jpg",
    livingReferenceTaxon: "South American Tinamous (Tinamidae)",
    taphonomicLimit: "Calibrated Ancient DNA Half-Life Study (Allentoft 2012)",
    scientificOverview:
      "The largest bird known, reaching heights of 3.6 meters with completely lost wing bones (zero vestigial humerus). Moa sub-fossils were the primary empirical basis for calculating the 521-year physical half-life of ancient DNA bonds.",
    molecularStatus: "Full nuclear genome assembled; calibrated global ancient DNA decay physics.",
  },
  {
    id: "great_auk",
    commonName: "Great Auk",
    scientificName: "Pinguinus impennis",
    clade: "Aves",
    dnaStatus: "ancient_dna",
    extinctionEpoch: "Anthropocene (Modern)",
    exactDateOrAge: "June 3, 1844 (Eldey Island, Iceland)",
    preservationSubstrate: "Museum taxidermy study mounts",
    museumSpecimenSource: "Naturalis Biodiversity Center (RMNH.AVES.110104)",
    image: "/media/lost_species/great_auk_specimen.jpg",
    livingReferenceTaxon: "Razorbill (Alca torda)",
    taphonomicLimit: "High-Depth Genome (Thomas et al. 2019)",
    scientificOverview:
      "The original flightless 'penguin' of the North Atlantic (the Southern Hemisphere penguins were named after it). Over 70 preserved skins exist in international museums, yielding clean nuclear assemblies that demonstrated high genetic health right up to human over-hunting.",
    molecularStatus: "Complete nuclear genome; demonstrates zero evidence of genetic decline prior to exploitation.",
  },

  // Reptilia
  {
    id: "titanoboa",
    commonName: "Titanoboa",
    scientificName: "Titanoboa cerrejonensis",
    clade: "Reptilia",
    dnaStatus: "fossil_only",
    extinctionEpoch: "Paleocene Epoch (~58–60 Million Years Ago)",
    exactDateOrAge: "Cerrejón Formation, Colombia (58 Mya)",
    preservationSubstrate: "Permineralized rock matrix & petrified vertebrae",
    museumSpecimenSource: "Florida Museum of Natural History (UF-IGM Holotype)",
    image: "/media/lost_species/titanoboa_vertebra.jpg",
    livingReferenceTaxon: "Green Anaconda & Boa constrictor",
    taphonomicLimit: "Fossil Only (Exceeds DNA Survival Boundary by ~56 Ma)",
    scientificOverview:
      "The largest snake ever discovered, estimated at 12.8 meters in length and weighing over 1,100 kilograms. Existed during the Paleocene thermal maximum. Because it lived 58 million years ago, all organic DNA has completely mineralized into stone.",
    molecularStatus: "No DNA recoverable (strictly mineralized fossil). Reconstructed via comparative osteology.",
  },

  // Amphibia
  {
    id: "golden_toad",
    commonName: "Golden Toad",
    scientificName: "Incilius periglenes",
    clade: "Amphibia",
    dnaStatus: "ancient_dna",
    extinctionEpoch: "Anthropocene (Modern)",
    exactDateOrAge: "Extinct 1989 (Monteverde Cloud Forest, Costa Rica)",
    preservationSubstrate: "Formalin/Ethanol museum collections",
    museumSpecimenSource: "US Fish & Wildlife Service / Martha Crump Historic Record",
    image: "/media/lost_species/golden_toad.jpg",
    livingReferenceTaxon: "Cane Toad (Rhinella marina) & Incilius clades",
    taphonomicLimit: "Sub-Modern Tissue Sample",
    scientificOverview:
      "A brilliantly colored true toad endemic to a tiny 4-square-kilometer high-elevation cloud forest ridge in Costa Rica. Disappeared abruptly in 1989 due to chytridiomycosis epidemic driven by El Niño drought anomalies. Preserved specimens exist in international museums.",
    molecularStatus: "Tissue samples exist; active research in recovering formalin-crosslinked genomes.",
  },

  // Marine Animals
  {
    id: "caribbean_monk_seal",
    commonName: "Caribbean Monk Seal",
    scientificName: "Neomonachus tropicalis",
    clade: "Marine Animals",
    dnaStatus: "ancient_dna",
    extinctionEpoch: "Anthropocene (Modern)",
    exactDateOrAge: "Extinct 1952 (Seranilla Bank, Caribbean Sea)",
    preservationSubstrate: "Museum osteological and skin collections",
    museumSpecimenSource: "National Museum of Natural History, Smithsonian Institution",
    image: "/media/lost_species/caribbean_monk_seal.jpg",
    livingReferenceTaxon: "Hawaiian Monk Seal & Mediterranean Monk Seal",
    taphonomicLimit: "Museum Ancient DNA (Scheel et al. 2014)",
    scientificOverview:
      "The only seal species native to the Caribbean Sea and Gulf of Mexico. Relentlessly hunted for lamp oil over four centuries. Ancient mitochondrial and nuclear DNA confirmed its distinct genus status (Neomonachus) alongside the endangered Hawaiian monk seal.",
    molecularStatus: "Genome sequenced; confirmed split between Atlantic and Pacific monk seals 3–4 Mya.",
  },
  {
    id: "megalodon",
    commonName: "Megalodon",
    scientificName: "Otodus megalodon",
    clade: "Marine Animals",
    dnaStatus: "fossil_only",
    extinctionEpoch: "Miocene to Pliocene Epoch (~3.6 Million Years Ago)",
    exactDateOrAge: "Extinct ~3.6 Mya",
    preservationSubstrate: "Permineralized fluorapatite tooth enameloid",
    museumSpecimenSource: "Natural History Museum Mineralized Tooth Collection",
    image: "/media/lost_species/megalodon_tooth.jpg",
    livingReferenceTaxon: "Great White Shark (Carcharodon carcharias)",
    taphonomicLimit: "Fossil Only (Exceeds Thermal DNA Boundary)",
    scientificOverview:
      "An apex macropredatory lamniform shark reaching up to 20 meters in length. As with all chondrichthyan fishes, its cartilaginous skeleton rarely petrified; it is known primarily through massive 18cm serrated teeth. Dating to 3.6 Mya, zero organic DNA survives.",
    molecularStatus: "No DNA recoverable. Stable isotope analysis of tooth enamel reveals endothermic body temperature.",
  },

  // Insecta & Invertebrates
  {
    id: "ammonite",
    commonName: "Ammonite",
    scientificName: "Ammonoidea (Subclass)",
    clade: "Insecta & Invertebrates",
    dnaStatus: "fossil_only",
    extinctionEpoch: "Cretaceous–Paleogene Boundary (K-Pg)",
    exactDateOrAge: "Extinct 66 Million Years Ago",
    preservationSubstrate: "Aragonite permineralized shell fossil",
    museumSpecimenSource: "Musée d'Histoire Naturelle Fossil Record",
    image: "/media/lost_species/ammonite_fossil.jpg",
    livingReferenceTaxon: "Chambered Nautilus (Nautilus pompilius)",
    taphonomicLimit: "Fossil Only (Pre-DNA Horizon by 64.5 Ma)",
    scientificOverview:
      "A vast, diverse group of coiled shelled cephalopods that dominated world oceans for over 350 million years before vanishing in the asteroid impact 66 Mya. Aragonite shells preserve intricate dendritic suture lines; zero organic nucleic acid survives.",
    molecularStatus: "Fossil only. Shell micro-architecture reveals buoyancy physics and ocean chemistry.",
  },
  {
    id: "xerces_blue",
    commonName: "Xerces Blue Butterfly",
    scientificName: "Glaucopsyche xerces",
    clade: "Insecta & Invertebrates",
    dnaStatus: "ancient_dna",
    extinctionEpoch: "Anthropocene (Modern)",
    exactDateOrAge: "Extinct 1941 (San Francisco Dunes, California)",
    preservationSubstrate: "Field museum pin-mounted dry insect specimen",
    museumSpecimenSource: "Field Museum of Natural History (Chicago)",
    image: "/media/lost_species/xerces_blue.jpg",
    livingReferenceTaxon: "Silvery Blue Butterfly (Glaucopsyche lygdamus)",
    taphonomicLimit: "First North American Insect Ancient Genome (2021)",
    scientificOverview:
      "The first documented North American insect species driven extinct by urban expansion. In 2021, researchers successfully extracted ancient DNA from a 93-year-old pinned specimen, confirming that it was a distinct biological species rather than a local color morph.",
    molecularStatus: "Mitochondrial and nuclear genome assembled; confirmed high unique species divergence.",
  },
  {
    id: "trilobite",
    commonName: "Trilobite (Elrathia kingii)",
    scientificName: "Elrathia kingii",
    clade: "Insecta & Invertebrates",
    dnaStatus: "fossil_only",
    extinctionEpoch: "Middle Cambrian Period (~505 Million Years Ago)",
    exactDateOrAge: "Wheeler Shale, Utah (~505 Mya)",
    preservationSubstrate: "Carbonaceous shale compression fossil",
    museumSpecimenSource: "Smithsonian National Museum of Natural History",
    image: "/media/lost_species/trilobite_fossil.jpg",
    livingReferenceTaxon: "Horseshoe Crab (Limulus polyphemus - distant chelicerate)",
    taphonomicLimit: "Fossil Only (Pre-DNA Horizon by ~503 Ma)",
    scientificOverview:
      "Extinct marine arthropods that flourished for over 270 million years across the Paleozoic era. Characterized by a three-lobed calcified dorsal exoskeleton. With specimens dating back half a billion years, trilobites represent the absolute mineralized fossil baseline.",
    molecularStatus: "Strictly petrified fossil. Holochroal compound eye optics studied via calcite crystallography.",
  },
];

export function LostSpeciesSection() {
  const [selectedClade, setSelectedClade] = useState<CladeCategory>("All");
  const [dnaFilter, setDnaFilter] = useState<DnaStatus>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeDossier, setActiveDossier] = useState<LostSpecies | null>(null);

  const clades: CladeCategory[] = [
    "All",
    "Mammalia",
    "Aves",
    "Reptilia",
    "Amphibia",
    "Marine Animals",
    "Insecta & Invertebrates",
  ];

  // Scalable filter engine supporting hundreds of species
  const filteredSpecies = useMemo(() => {
    return LOST_SPECIES_CATALOG.filter((item) => {
      // Clade match
      const cladeMatches = selectedClade === "All" || item.clade === selectedClade;

      // DNA status match
      const dnaMatches =
        dnaFilter === "all" || item.dnaStatus === dnaFilter;

      // Search query match
      const searchMatches =
        !searchQuery.trim() ||
        item.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.extinctionEpoch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.preservationSubstrate.toLowerCase().includes(searchQuery.toLowerCase());

      return cladeMatches && dnaMatches && searchMatches;
    });
  }, [selectedClade, dnaFilter, searchQuery]);

  return (
    <section id="lost-species" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#01040a] text-white border-t border-white/[0.08]">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#1ec2a4]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#38bdf8]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 border-b border-white/10 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1ec2a4]/10 border border-[#1ec2a4]/30 text-[#1ec2a4] text-xs font-mono uppercase tracking-[0.2em] mb-4">
              <Skull className="w-3.5 h-3.5" />
              <span>Section 02B — Comprehensive Paleontological Archive</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Lost Species: Beyond the Megafauna
            </h2>
            <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed">
              Earth’s extinction crisis extends across every major taxonomic group: mammals, birds, reptiles,
              amphibians, marine organisms, and insects. We distinguish species with{" "}
              <strong className="text-[#1ec2a4] font-medium">recoverable ancient DNA</strong> from deep-time taxa
              known strictly through <strong className="text-amber-300 font-medium">mineralized petrifaction</strong>.
            </p>
          </div>

          {/* DNA Status Toggle Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#030914] border border-white/10">
              <button
                onClick={() => setDnaFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  dnaFilter === "all"
                    ? "bg-white/15 text-white font-bold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                All Records
              </button>
              <button
                onClick={() => setDnaFilter("ancient_dna")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  dnaFilter === "ancient_dna"
                    ? "bg-[#1ec2a4] text-black font-bold shadow-[0_0_12px_rgba(30,194,164,0.4)]"
                    : "text-[#1ec2a4] hover:bg-[#1ec2a4]/10"
                }`}
              >
                <Dna className="w-3 h-3" />
                Ancient DNA (≤1.5 Ma)
              </button>
              <button
                onClick={() => setDnaFilter("fossil_only")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  dnaFilter === "fossil_only"
                    ? "bg-amber-400 text-black font-bold shadow-[0_0_12px_rgba(251,191,36,0.4)]"
                    : "text-amber-300 hover:bg-amber-400/10"
                }`}
              >
                <Layers className="w-3 h-3" />
                Fossil Only (&gt;1.5 Ma)
              </button>
            </div>
          </div>
        </div>

        {/* Scalable Controls: Clade Filter & Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Clade selector pills */}
          <div className="flex flex-wrap gap-2">
            {clades.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedClade(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedClade === cat
                    ? "bg-[#1ec2a4] text-black font-semibold shadow-[0_0_15px_rgba(30,194,164,0.35)]"
                    : "bg-white/[0.03] text-white/65 hover:text-white hover:bg-white/[0.07] border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input for future catalog scaling */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Filter by species, epoch, or substrate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#1ec2a4] focus:outline-none text-xs font-mono placeholder:text-white/35 text-white"
            />
          </div>
        </div>

        {/* Species Catalog Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSpecies.map((species) => {
            const hasDna = species.dnaStatus === "ancient_dna";

            return (
              <div
                key={species.id}
                onClick={() => setActiveDossier(species)}
                className="group cursor-pointer rounded-2xl bg-[#020813]/90 hover:bg-[#040e20] border border-white/10 hover:border-[#1ec2a4]/50 transition-all duration-300 p-4 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[16/11] rounded-xl overflow-hidden mb-3 border border-white/5 bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={species.image}
                      alt={species.commonName}
                      className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                    {/* DNA Status Badge */}
                    <span
                      className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 backdrop-blur-md shadow-md ${
                        hasDna
                          ? "bg-[#1ec2a4]/90 text-black"
                          : "bg-amber-400/90 text-black"
                      }`}
                    >
                      {hasDna ? <Dna className="w-2.5 h-2.5" /> : <Layers className="w-2.5 h-2.5" />}
                      {hasDna ? "Ancient DNA Available" : "Fossil Only (Pre-DNA)"}
                    </span>

                    {/* Clade tag */}
                    <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white/80 bg-black/70 px-2 py-0.5 rounded">
                      {species.clade}
                    </span>
                  </div>

                  {/* Taxonomy & Era */}
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#1ec2a4] transition-colors">
                      {species.commonName}
                    </h4>
                    <p className="text-xs font-mono italic text-white/50">{species.scientificName}</p>
                    <p className="text-[11px] font-mono text-amber-200/80 mt-1 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {species.exactDateOrAge}
                    </p>
                  </div>
                </div>

                {/* Substrate & Footer */}
                <div className="mt-4 pt-3 border-t border-white/5">
                  <span className="text-[10px] font-mono text-white/40 block uppercase">
                    Preservation Matrix
                  </span>
                  <p className="text-xs font-mono text-white/75 truncate mt-0.5">
                    {species.preservationSubstrate}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs font-mono text-[#38bdf8]">
                    <span>Inspect Paleontological Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state when query matches nothing */}
        {filteredSpecies.length === 0 && (
          <div className="mt-12 text-center p-12 rounded-3xl bg-white/[0.02] border border-white/10 font-mono text-sm text-white/50">
            No extinct species match the current query. Clear filters to return to full archive.
          </div>
        )}

        {/* Taphonomic Boundary Educational Note */}
        <div className="mt-12 p-6 rounded-2xl bg-[#030a16] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#1ec2a4] flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-white/80 leading-relaxed font-mono">
              <strong className="text-white">The 1.5-Million-Year Taphonomic Horizon:</strong> DNA degrades
              according to first-order hydrolytic kinetics (half-life of 521 years at 13.1°C; Allentoft et al. 2012).
              Even in optimal sub-zero permafrost, complete bond fragmentation occurs within ~1.5 million years.
              Species prior to the Early Pleistocene (e.g., Titanoboa, Megalodon, Ammonites) are studied strictly
              through mineralized fossil osteology and comparative anatomy without synthetic extrapolation.
            </div>
          </div>
          <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-mono whitespace-nowrap">
            Peer-Reviewed Paleogenomics
          </span>
        </div>
      </div>

      {/* Cinematic Detailed Inspection Dossier Drawer */}
      <AnimatePresence>
        {activeDossier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#030914] border border-[#1ec2a4]/40 rounded-3xl shadow-2xl p-6 sm:p-10 text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDossier(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left 5 Cols: Specimen Photographic Evidence */}
                <div className="md:col-span-5 space-y-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeDossier.image}
                      alt={activeDossier.commonName}
                      className="w-full h-full object-cover filter contrast-105 brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                        activeDossier.dnaStatus === "ancient_dna"
                          ? "bg-[#1ec2a4] text-black"
                          : "bg-amber-400 text-black"
                      }`}
                    >
                      {activeDossier.dnaStatus === "ancient_dna"
                        ? "Ancient DNA Verified"
                        : "Fossil Only Record"}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs space-y-2">
                    <span className="text-white/40 block uppercase text-[10px]">
                      Authentic Museum Specimen Source
                    </span>
                    <p className="text-white font-medium">{activeDossier.museumSpecimenSource}</p>
                    <p className="text-white/50 text-[11px] pt-2 border-t border-white/5">
                      Strictly authentic photograph with verified scientific reuse license.
                    </p>
                  </div>
                </div>

                {/* Right 7 Cols: Detailed Scientific Metadata */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#38bdf8]">
                      {activeDossier.clade} • {activeDossier.extinctionEpoch}
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-white mt-1">
                      {activeDossier.commonName}
                    </h3>
                    <p className="text-sm font-mono italic text-white/50">
                      {activeDossier.scientificName}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {activeDossier.scientificOverview}
                  </p>

                  {/* Quantitative data blocks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-2">
                    <div className="p-3.5 rounded-xl bg-[#040e20] border border-white/10">
                      <span className="text-white/40 block text-[10px] uppercase">
                        Preservation Substrate
                      </span>
                      <span className="text-white font-medium text-xs mt-0.5 block">
                        {activeDossier.preservationSubstrate}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#040e20] border border-white/10">
                      <span className="text-white/40 block text-[10px] uppercase">
                        Living Sister Taxon Reference
                      </span>
                      <span className="text-[#1ec2a4] font-medium text-xs mt-0.5 block">
                        {activeDossier.livingReferenceTaxon}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#040e20] border border-white/10 sm:col-span-2">
                      <span className="text-white/40 block text-[10px] uppercase">
                        Molecular &amp; Paleogenomic Status
                      </span>
                      <span className="text-[#38bdf8] font-medium text-xs mt-0.5 block">
                        {activeDossier.molecularStatus}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-white/40">
                      Taphonomic Classification: {activeDossier.taphonomicLimit}
                    </span>
                    <button
                      onClick={() => setActiveDossier(null)}
                      className="px-4 py-2 rounded-xl bg-[#1ec2a4] hover:bg-[#16a085] text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Close Dossier
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
