"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dna, Sparkles, Compass, ChevronRight, ChevronLeft, Eye, Clock } from "lucide-react";

interface ExtinctAnimal {
  id: string;
  name: string;
  scientific: string;
  era: string;
  habitat: string;
  image: string;
  provenance: string;
  dnaStatus: "dna_available" | "fossil_only";
  narrative: string;
}

const EXTINCT_WILDLIFE: ExtinctAnimal[] = [
  {
    id: "mammoth",
    name: "Woolly Mammoth",
    scientific: "Mammuthus primigenius",
    era: "Pleistocene to Mid-Holocene (~4,000 BP)",
    habitat: "Permafrost Mammoth Steppe",
    image: "/media/species/mammoth_skeleton.jpg",
    provenance: "Authentic Museum Sub-fossil Skeleton",
    dnaStatus: "dna_available",
    narrative:
      "Roaming the windswept arctic steppes from Eurasia to North America, the woolly mammoth survived until just four millennia ago. Its genetic code, preserved in Siberian permafrost ice, reveals dense double-layered fleece, unique hemoglobin adaptations for sub-zero peripheral circulation, and massive curved tusks.",
  },
  {
    id: "thylacine",
    name: "Thylacine (Tasmanian Tiger)",
    scientific: "Thylacinus cynocephalus",
    era: "Extinct 1936 (Hobart Zoo)",
    habitat: "Temperate Eucalyptus & Heath Forests",
    image: "/media/species/thylacine_historical.jpg",
    provenance: "1928 Authentic Archival Photographic Record",
    dnaStatus: "dna_available",
    narrative:
      "A crowning marvel of convergent evolution: an apex marsupial carnivore that mirrored placental canids in skull biomechanics, equipped with an astonishing 120-degree jaw gape and distinct dorsal stripes. High-quality museum specimens have yielded both complete nuclear DNA and ancient RNA profiles.",
  },
  {
    id: "dodo",
    name: "Dodo",
    scientific: "Raphus cucullatus",
    era: "Extinct ~1662 (Mauritius)",
    habitat: "Pristine Coastal Palm & Hardwood Forests",
    image: "/media/lost_species/dodo_skeleton.jpg",
    provenance: "Natural History Museum London Holotype",
    dnaStatus: "dna_available",
    narrative:
      "Endemic to the isolated volcanic island of Mauritius in the Indian Ocean, the flightless dodo evolved in the complete absence of mammalian predators. Paleogenomics confirms it was a specialized insular columbid closely allied with the Southeast Asian Nicobar pigeon.",
  },
  {
    id: "smilodon",
    name: "Saber-toothed Cat",
    scientific: "Smilodon fatalis",
    era: "Late Pleistocene (~10,000 BP)",
    habitat: "Brushy Savannah & Ancient Woodland",
    image: "/media/species/smilodon_skull.jpg",
    provenance: "La Brea Tar Pits Asphalt Preservation",
    dnaStatus: "dna_available",
    narrative:
      "Equipped with 28-centimeter recurved maxillary canines and hypertrophied forelimb musculature designed for wrestling giant Pleistocene ground sloths and bison. Ancient collagen proteomics and mitochondrial DNA confirm it branched from modern felids roughly 20 million years ago.",
  },
  {
    id: "giant_moa",
    name: "South Island Giant Moa",
    scientific: "Dinornis robustus",
    era: "Extinct ~1440 CE (New Zealand)",
    habitat: "Prehistoric Dense Beech & Fern Forests",
    image: "/media/lost_species/giant_moa_skeleton.jpg",
    provenance: "Canterbury Museum Holotype Mount",
    dnaStatus: "dna_available",
    narrative:
      "Reaching towering heights of 3.6 meters, the giant moa completely lacked all wing bones, possessing neither humerus nor flight musculature. Sub-fossil moa bones provided the empirical foundation for calibrating the 521-year physical half-life of ancient DNA.",
  },
  {
    id: "stellers_seacow",
    name: "Steller's Sea Cow",
    scientific: "Hydrodamalis gigas",
    era: "Extinct 1768 (Commander Islands)",
    habitat: "Sub-polar Kelp Canopies, Bering Sea",
    image: "/media/species/stellers_seacow.jpg",
    provenance: "Finnish Museum of Natural History Mount",
    dnaStatus: "dna_available",
    narrative:
      "Reaching up to 10 meters in length and weighing over 8 metric tons, Steller’s sea cow was an arctic gentle giant among sirenians. Lacking true teeth, it grazed thick kelp blades using horny keratinous crushing plates, insulated by a 10cm blubber shield.",
  },
  {
    id: "irish_elk",
    name: "Giant Irish Elk",
    scientific: "Megaloceros giganteus",
    era: "Late Pleistocene to Holocene (~7,700 BP)",
    habitat: "Sub-boreal Meadows & Open Steppe",
    image: "/media/lost_species/irish_elk_skeleton.jpg",
    provenance: "MNHN Paris Specimen Record",
    dnaStatus: "dna_available",
    narrative:
      "Crowned with the largest antlers of any deer species in Earth’s history, measuring 3.65 meters from tip to tip and weighing over 40 kilograms. Mitochondrial genomes recovered from peat bog remains reveal it was a close phylogenetic relative of modern fallow deer.",
  },
  {
    id: "quagga",
    name: "Quagga",
    scientific: "Equus quagga quagga",
    era: "Extinct 1883 (South Africa / Amsterdam)",
    habitat: "Karoo Dry Grassland & Savannah",
    image: "/media/lost_species/quagga_specimen.jpg",
    provenance: "Muséum d'Histoire Naturelle de Toulouse",
    dnaStatus: "dna_available",
    narrative:
      "A southern variant of the plains zebra exhibiting striking loss of hindquarter striping and a rich chestnut coat. In 1984, fragments extracted from salt-cured quagga skins became the very first ancient DNA ever successfully cloned in scientific history.",
  },
  {
    id: "great_auk",
    name: "Great Auk",
    scientific: "Pinguinus impennis",
    era: "Extinct 1844 (Eldey Island, Iceland)",
    habitat: "Remote Sea-girt North Atlantic Islands",
    image: "/media/lost_species/great_auk_specimen.jpg",
    provenance: "Naturalis Biodiversity Center Specimen",
    dnaStatus: "dna_available",
    narrative:
      "The true original 'penguin' of the Northern oceans, a flightless pelagic alcid that dived deep into the icy North Atlantic for fish. Museum skin genomes indicate the species maintained robust genetic diversity right up to the final century of industrial exploitation.",
  },
  {
    id: "titanoboa",
    name: "Titanoboa",
    scientific: "Titanoboa cerrejonensis",
    era: "Paleocene Epoch (~58 Million Years Ago)",
    habitat: "Equatorial Rainforest Swamps",
    image: "/media/lost_species/titanoboa_vertebra.jpg",
    provenance: "Florida Museum of Natural History Holotype",
    dnaStatus: "fossil_only",
    narrative:
      "The largest snake ever recorded, measuring over 12.8 meters and weighing 1.1 metric tons. Existing 58 million years ago during the Paleocene thermal maximum, all organic material has completely mineralized into stone; it is studied purely through comparative osteology.",
  },
  {
    id: "golden_toad",
    name: "Golden Toad",
    scientific: "Incilius periglenes",
    era: "Extinct 1989 (Costa Rica)",
    habitat: "Monteverde Tropical Cloud Forest",
    image: "/media/lost_species/golden_toad.jpg",
    provenance: "US Fish & Wildlife Service Authentic Record",
    dnaStatus: "dna_available",
    narrative:
      "A jewel of the high-elevation tropical elfin cloud forest, glowing with vivid brilliant orange skin. Disappearing abruptly in 1989 due to climate-linked chytridiomycosis epidemics, it stands as an urgent bio-indicator of global amphibian vulnerability.",
  },
  {
    id: "xerces_blue",
    name: "Xerces Blue Butterfly",
    scientific: "Glaucopsyche xerces",
    era: "Extinct 1941 (San Francisco Dunes)",
    habitat: "Coastal Sand Dune Flora & Lotus",
    image: "/media/lost_species/xerces_blue.jpg",
    provenance: "Field Museum Chicago Holotype Specimen",
    dnaStatus: "dna_available",
    narrative:
      "The first recorded North American insect extinction driven by urban expansion. In 2021, DNA extracted from a 93-year-old pinned specimen validated its status as a distinct biological species, unlocking insect ancient genomics from fragile chitin.",
  },
];

export function LostWorldPanorama() {
  const [activeIndex, setActiveIndex] = useState(0);

  const current = EXTINCT_WILDLIFE[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % EXTINCT_WILDLIFE.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + EXTINCT_WILDLIFE.length) % EXTINCT_WILDLIFE.length);
  };

  return (
    <section
      id="lost-world"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#01050c] text-white overflow-hidden border-t border-white/[0.06]"
    >
      {/* Subtle atmospheric natural mist background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_rgba(30,194,164,0.15)_0%,_transparent_70%)]" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-white/[0.08] gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#d99b42] block mb-3">
              The Vanished Realm
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Lost Species of Earth
            </h2>
            <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed font-light">
              Beyond the living biosphere lie the vanished species that shaped ancient ecosystems for
              millions of years. Authentic fossil records and museum holotypes provide the ground truth
              for reconstructing their biology.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/50 mr-2">
              <span className="text-[#1ec2a4] font-bold">{activeIndex + 1}</span> of{" "}
              {EXTINCT_WILDLIFE.length}
            </span>
            <button
              onClick={handlePrev}
              aria-label="Previous Extinct Species"
              className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/30 text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Extinct Species"
              className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-[#1ec2a4] text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Cinematic Showcase */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Full-Bleed Authentic Specimen Photography (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[16/11] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover filter contrast-[1.08] brightness-95"
                />
              </motion.div>
            </AnimatePresence>

            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050c] via-transparent to-transparent opacity-85 pointer-events-none" />

            {/* Status Provenance Badge */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest backdrop-blur-md border ${
                  current.dnaStatus === "dna_available"
                    ? "bg-[#1ec2a4]/20 border-[#1ec2a4]/50 text-[#1ec2a4]"
                    : "bg-amber-400/20 border-amber-400/50 text-amber-300"
                }`}
              >
                {current.dnaStatus === "dna_available"
                  ? "Ancient DNA Available"
                  : "Fossil Only (Pre-DNA)"}
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-white/50 block">
                  {current.habitat}
                </span>
                <span className="text-xs font-mono text-white/80">{current.provenance}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Species Narrative & Paleobiological Notes (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#38bdf8] block">
                {current.era}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1.5 leading-tight">
                {current.name}
              </h3>
              <p className="text-sm font-mono italic text-white/50 mt-1">{current.scientific}</p>
            </div>

            <p className="text-base text-white/80 font-light leading-relaxed">
              {current.narrative}
            </p>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-white/50">
              <span>Scientific Museum Holotype</span>
              <span className="text-[#1ec2a4]">Authentic Record</span>
            </div>
          </div>
        </div>

        {/* Scalable Cinematic Filmstrip (Thumbnails of all extinct groups) */}
        <div className="mt-16 pt-10 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-white/70">
              Taxonomic Diversity Panorama: Mammalia • Aves • Reptilia • Amphibia • Marine • Insecta
            </span>
            <span className="text-xs font-mono text-white/40 hidden sm:inline-block">
              Scroll or Click to Inspect
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto subtle-scrollbar scroll-smooth pb-6 pt-1">
            {EXTINCT_WILDLIFE.map((item, index) => {
              const isSelected = index === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex-shrink-0 w-52 sm:w-60 md:w-64 text-left rounded-2xl overflow-hidden p-3 transition-all duration-300 border ${
                    isSelected
                      ? "bg-[#03182c] border-[#1ec2a4] shadow-[0_0_24px_rgba(30,194,164,0.35)] scale-[1.02]"
                      : "bg-[#020813] border-white/10 hover:border-white/25 opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-black border border-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover filter contrast-[1.08]"
                      loading="lazy"
                    />
                    <span
                      className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-sm ${
                        item.dnaStatus === "dna_available"
                          ? "bg-[#1ec2a4]/80 text-black"
                          : "bg-amber-400/80 text-black"
                      }`}
                    >
                      {item.dnaStatus === "dna_available" ? "Ancient DNA" : "Fossil"}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm sm:text-base font-bold text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs font-mono text-white/50 truncate mt-0.5">{item.scientific}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

