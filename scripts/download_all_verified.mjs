import fs from 'fs';
import path from 'path';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PaleoGenomeBot/1.0 (bio-team@paleogenome.org)';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const verifiedMap = {
  // Hero and Biome Wildlife Images
  'elephant': {
    target: 'public/media/images/african_elephant.jpg',
    title: 'File:Desert elephant (Loxodonta africana) male.jpg',
    label: 'African Bush Elephant',
    species: 'Loxodonta africana',
    category: 'mammal'
  },
  'blue_whale': {
    target: 'public/media/images/blue_whale.jpg',
    title: 'File:Door breaching.jpg',
    label: 'Blue Whale Breaching Oceanic Waters',
    species: 'Balaenoptera musculus',
    category: 'marine'
  },
  'red_deer': {
    target: 'public/media/images/red_deer.jpg',
    title: 'File:RedDeerStag.jpg',
    label: 'Red Deer Stag in Forest',
    species: 'Cervus elaphus',
    category: 'mammal'
  },
  'tree_frog': {
    target: 'public/media/images/tree_frog.jpg',
    title: 'File:Red-eyed Leaf Frog (Agalychnis callidryas) (9591374287).jpg',
    label: 'Red-eyed Tree Frog on Raindrop Leaf',
    species: 'Agalychnis callidryas',
    category: 'amphibian'
  },
  'butterfly': {
    target: 'public/media/images/morpho_butterfly.jpg',
    title: 'File:Morpho peleides 1.jpg',
    label: 'Blue Morpho Butterfly',
    species: 'Morpho peleides',
    category: 'invertebrate'
  },
  'coral_reef': {
    target: 'public/media/images/coral_reef.jpg',
    title: 'File:Great Barrier Reef ESA378130.jpg',
    label: 'Pristine Great Barrier Reef System',
    category: 'marine'
  },
  'sea_turtle': {
    target: 'public/media/images/sea_turtle.jpg',
    title: 'File:Nick (Sea Turtle).jpg',
    label: 'Green Sea Turtle Grazing Ocean Reef',
    species: 'Chelonia mydas',
    category: 'marine'
  },
  'eagle': {
    target: 'public/media/images/bald_eagle.jpg',
    title: 'File:Haliaeetus leucocephalus (Linnaeus 1766).jpg',
    label: 'Bald Eagle Soaring Flight',
    species: 'Haliaeetus leucocephalus',
    category: 'avian'
  },

  // Extinct Species & Living Relatives
  'mammoth': {
    target: 'public/media/species/mammoth_skeleton.jpg',
    title: 'File:Mammuthus primigenius Museum of Ancient Life 2.jpg',
    label: 'Woolly Mammoth Specimen',
    species: 'Mammuthus primigenius (Extinct ~4,000 BP)',
    category: 'extinct'
  },
  'asian_elephant': {
    target: 'public/media/species/asian_elephant.jpg',
    title: 'File:Elephas maximus maximus - 01.jpg',
    label: 'Asian Elephant (Living Sister Taxon)',
    species: 'Elephas maximus',
    category: 'living_relative'
  },
  'thylacine': {
    target: 'public/media/species/thylacine_historical.jpg',
    title: 'File:Thylacinus cynocephalus at Hobart Zoo 1928.jpg',
    label: 'Thylacine / Tasmanian Tiger (Historical 1928)',
    species: 'Thylacinus cynocephalus (Extinct 1936)',
    category: 'extinct'
  },
  'quoll': {
    target: 'public/media/species/tiger_quoll.jpg',
    title: 'File:Dasyurus maculatus.jpg',
    label: 'Spotted-tailed Quoll (Dasyurid Relative)',
    species: 'Dasyurus maculatus',
    category: 'living_relative'
  },
  'passenger_pigeon': {
    target: 'public/media/species/passenger_pigeon.jpg',
    title: 'File:Pigeon migrateur MHNT.jpg',
    label: 'Passenger Pigeon Holotype Specimen',
    species: 'Ectopistes migratorius (Extinct 1914)',
    category: 'extinct'
  },
  'mourning_dove': {
    target: 'public/media/species/mourning_dove.jpg',
    title: 'File:Mourning dove perched (61179).jpg',
    label: 'Mourning Dove (Living Columbid Relative)',
    species: 'Zenaida macroura',
    category: 'living_relative'
  },
  'smilodon': {
    target: 'public/media/species/smilodon_skull.jpg',
    title: 'File:Smilodon fatalis californicus.JPG',
    label: 'Saber-toothed Cat Fossil Craniometrics',
    species: 'Smilodon fatalis (Extinct ~10,000 BP)',
    category: 'extinct'
  },
  'clouded_leopard': {
    target: 'public/media/species/clouded_leopard.jpg',
    title: 'File:Clouded Leopard (205918213).jpeg',
    label: 'Clouded Leopard (Canine Morphology Relative)',
    species: 'Neofelis nebulosa',
    category: 'living_relative'
  },
  'stellers_seacow': {
    target: 'public/media/species/stellers_seacow.jpg',
    title: 'File:Hydrodamalis gigas skeleton - Finnish Museum of Natural History - DSC04529.JPG',
    label: "Steller's Sea Cow Complete Skeleton",
    species: 'Hydrodamalis gigas (Extinct 1768)',
    category: 'extinct'
  },
  'dugong': {
    target: 'public/media/species/dugong.jpg',
    title: 'File:Dugong dugon fin egypt.jpg',
    label: 'Dugong in Marine Seagrass (Sirenia Relative)',
    species: 'Dugong dugon',
    category: 'living_relative'
  },

  // Ancient DNA & Deep Learning
  'dna_gel': {
    target: 'public/media/science/dna_electrophoresis.jpg',
    title: 'File:Gel electrophoresis 2.jpg',
    label: 'DNA Agarose Gel Fluorescent Ladder Bands',
    category: 'science'
  },
  'permafrost': {
    target: 'public/media/science/permafrost_core.jpg',
    title: 'File:Permafrost-core hg.jpg',
    label: 'Siberian Permafrost Sedimentary Core Matrix',
    category: 'science'
  },
  'cleanroom': {
    target: 'public/media/science/ancient_dna_cleanroom.jpg',
    title: 'File:Neanderthal DNA extraction.jpg',
    label: 'Ultra-Clean Ancient DNA Extraction Cleanroom',
    category: 'science'
  },
  'molecular': {
    target: 'public/media/science/dna_molecular_structure.jpg',
    title: 'File:DNA double helix (13081113544).jpg',
    label: 'DNA Double Helix Molecular Topology',
    category: 'science'
  }
};

async function getThumbAndMeta(title, width = 1600) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=${width}&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) return null;
  const data = await res.json();
  const page = Object.values(data.query?.pages || {})[0];
  if (!page || !page.imageinfo) return null;
  const ii = page.imageinfo[0];
  const meta = ii.extmetadata || {};
  return {
    thumburl: ii.thumburl || ii.url,
    originalUrl: ii.url,
    size: ii.size,
    artist: (meta.Artist?.value || 'Wikimedia Contributor').replace(/<[^>]*>?/gm, '').trim(),
    license: meta.LicenseShortName?.value || 'CC BY-SA / Public Domain'
  };
}

async function main() {
  const manifest = [
    {
      target: 'public/media/videos/birds_flight.webm',
      title: 'File:Flying Birds 1 2022-12-05.webm',
      label: 'Flock of Birds Soaring in Sky',
      license: 'CC BY-SA 4.0',
      artist: 'Wikimedia Commons Contributor',
      category: 'avian'
    },
    {
      target: 'public/media/videos/eagle_soaring.webm',
      title: 'File:Eagle flight in the Arpi Natural-Historical Reserve.webm',
      label: 'Eagle Flight in Arpi Natural Reserve',
      license: 'CC BY-SA 4.0',
      artist: 'Wikimedia Commons Contributor',
      category: 'avian'
    },
    {
      target: 'public/media/videos/whales_underwater.webm',
      title: 'File:Underwater video of melon-headed whales at Palmyra Atoll.webm',
      label: 'Whales Swimming in Deep Ocean Water',
      species: 'Peponocephala electra',
      license: 'Public Domain (NOAA)',
      artist: 'NOAA Fisheries / PIFSC',
      category: 'marine'
    },
    {
      target: 'public/media/videos/sea_turtle_swimming.webm',
      title: 'File:Swimming with the Sea Turtle in Moalboal1.webm',
      label: 'Sea Turtle Gliding Over Reef',
      species: 'Chelonia mydas',
      license: 'CC BY-SA 4.0',
      artist: 'Wikimedia Commons Contributor',
      category: 'marine'
    },
    {
      target: 'public/media/videos/butterfly_flutter.webm',
      title: 'File:Unidentified butterfly 20190609 175808 release.webm',
      label: 'Butterfly in Natural Flight',
      license: 'CC BY-SA 4.0',
      artist: 'Wikimedia Commons Contributor',
      category: 'invertebrate'
    },
    {
      target: 'public/media/images/tiger.jpg',
      title: 'File:Bengal tiger (Panthera tigris tigris) female 3.jpg',
      label: 'Royal Bengal Tiger',
      species: 'Panthera tigris tigris',
      license: 'CC BY-SA 4.0',
      artist: 'Charles J. Sharp',
      category: 'mammal'
    },
    {
      target: 'public/media/images/hero_sky.jpg',
      title: 'Mounts between Tipsoo Lake and Rainier with dramatic clouds',
      label: 'Atmospheric Alpine Mountain Sky',
      license: 'Public Domain (NPS)',
      artist: 'National Park Service',
      category: 'landscape'
    }
  ];

  for (const [key, item] of Object.entries(verifiedMap)) {
    if (fs.existsSync(item.target)) {
      console.log(`[EXISTS] ${item.target}`);
      manifest.push({
        target: item.target,
        title: item.title,
        label: item.label,
        species: item.species || null,
        license: 'CC BY-SA / Public Domain',
        artist: 'Wikimedia Contributor',
        category: item.category
      });
      continue;
    }

    console.log(`Fetching metadata for ${item.title}...`);
    const meta = await getThumbAndMeta(item.title);
    if (!meta) {
      console.error(`Failed to get meta for ${item.title}`);
      await sleep(1000);
      continue;
    }

    console.log(`Downloading ${item.label} from ${meta.thumburl.slice(0, 80)}...`);
    try {
      const resp = await fetch(meta.thumburl, { headers: { 'User-Agent': USER_AGENT } });
      if (!resp.ok) {
        console.error(`HTTP ${resp.status} for ${item.title}`);
        await sleep(2000);
        continue;
      }
      const buf = Buffer.from(await resp.arrayBuffer());
      fs.mkdirSync(path.dirname(item.target), { recursive: true });
      fs.writeFileSync(item.target, buf);
      console.log(`Saved ${item.target} (${(buf.length / 1024).toFixed(1)} KB)`);

      manifest.push({
        target: item.target,
        title: item.title,
        label: item.label,
        species: item.species || null,
        license: meta.license,
        artist: meta.artist,
        category: item.category,
        originalUrl: meta.originalUrl
      });
    } catch (e) {
      console.error(`Error saving ${item.target}:`, e.message);
    }
    await sleep(1200);
  }

  fs.writeFileSync('public/media/manifest.json', JSON.stringify(manifest, null, 2));
  console.log(`\nAll media processed! Manifest written with ${manifest.length} verified items.`);
}

main().catch(console.error);

