import fs from 'fs';
import path from 'path';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PaleoGenomeResearch/1.0 (academic-demo; dl-project@paleogenome.edu)';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWikiInfo(query, width = 1600) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=${width}&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) {
    console.error(`Query failed for "${query}": status ${res.status}`);
    return null;
  }
  const data = await res.json();
  const pages = data.query?.pages || {};
  const first = Object.values(pages)[0];
  if (!first || !first.imageinfo) return null;
  const info = first.imageinfo[0];
  const meta = info.extmetadata || {};
  return {
    title: first.title,
    originalUrl: info.url,
    downloadUrl: info.thumburl || info.url,
    mime: info.mime,
    size: info.size,
    license: meta.LicenseShortName?.value || 'Creative Commons / Public Domain',
    artist: (meta.Artist?.value || 'Wikimedia Contributor').replace(/<[^>]*>?/gm, '').trim(),
    credit: (meta.Credit?.value || meta.ObjectName?.value || '').replace(/<[^>]*>?/gm, '').trim()
  };
}

const ASSET_SPEC = [
  // Videos
  {
    type: 'video',
    target: 'public/media/videos/whales_underwater.webm',
    query: 'File:Underwater video of melon-headed whales at Palmyra Atoll.webm',
    isDirectFile: true,
    label: 'Melon-headed Whales Underwater',
    species: 'Peponocephala electra',
    category: 'marine'
  },
  {
    type: 'video',
    target: 'public/media/videos/butterfly_flutter.webm',
    query: 'File:Unidentified butterfly 20190609 175808 release.webm',
    isDirectFile: true,
    label: 'Butterfly in Flight',
    species: 'Lepidoptera sp.',
    category: 'invertebrate'
  },
  // Hero Images
  {
    type: 'image',
    target: 'public/media/images/hero_sky.jpg',
    query: 'Mount Rainier dramatic mountain landscape clouds',
    label: 'Atmospheric Alpine Mountain Sky',
    category: 'landscape'
  },
  {
    type: 'image',
    target: 'public/media/images/hero_ocean_depths.jpg',
    query: 'Underwater sunlight rays blue ocean water column',
    label: 'Oceanic Abyssal Water Column with Sunlight Caustics',
    category: 'landscape'
  },
  {
    type: 'image',
    target: 'public/media/images/blue_whale.jpg',
    query: 'File:Blue Whale 001.jpg',
    isDirectFile: true,
    label: 'Blue Whale',
    species: 'Balaenoptera musculus',
    category: 'marine'
  },
  {
    type: 'image',
    target: 'public/media/images/african_elephant.jpg',
    query: 'Loxodonta africana Amboseli National Park Kilimanjaro elephant',
    label: 'African Savanna Elephant',
    species: 'Loxodonta africana',
    category: 'mammal'
  },
  {
    type: 'image',
    target: 'public/media/images/red_deer.jpg',
    query: 'Cervus elaphus stag Scotland red deer antlers',
    label: 'Red Deer Stag',
    species: 'Cervus elaphus',
    category: 'mammal'
  },
  {
    type: 'image',
    target: 'public/media/images/tree_frog.jpg',
    query: 'Agalychnis callidryas red-eyed tree frog leaf Costa Rica',
    label: 'Red-eyed Tree Frog',
    species: 'Agalychnis callidryas',
    category: 'amphibian'
  },
  {
    type: 'image',
    target: 'public/media/images/morpho_butterfly.jpg',
    query: 'Morpho peleides blue morpho butterfly tropical rainforest',
    label: 'Blue Morpho Butterfly',
    species: 'Morpho peleides',
    category: 'invertebrate'
  },
  {
    type: 'image',
    target: 'public/media/images/coral_reef.jpg',
    query: 'Coral reef ecosystem fishes Great Barrier Reef biodiversity',
    label: 'Pristine Coral Reef Ecosystem',
    category: 'marine'
  },
  {
    type: 'image',
    target: 'public/media/images/sea_turtle.jpg',
    query: 'Chelonia mydas green sea turtle swimming coral reef',
    label: 'Green Sea Turtle',
    species: 'Chelonia mydas',
    category: 'marine'
  },
  {
    type: 'image',
    target: 'public/media/images/bald_eagle.jpg',
    query: 'Haliaeetus leucocephalus bald eagle flying wings spread Alaska',
    label: 'Bald Eagle in Soaring Flight',
    species: 'Haliaeetus leucocephalus',
    category: 'avian'
  },
  // Extinct Species vs Living Relatives
  {
    type: 'image',
    target: 'public/media/species/mammoth_skeleton.jpg',
    query: 'Mammuthus primigenius woolly mammoth skeleton museum',
    label: 'Woolly Mammoth Specimen',
    species: 'Mammuthus primigenius (Extinct)',
    category: 'extinct'
  },
  {
    type: 'image',
    target: 'public/media/species/asian_elephant.jpg',
    query: 'Elephas maximus Asian elephant wild Kabini forest',
    label: 'Asian Elephant (Living Sister Taxon)',
    species: 'Elephas maximus',
    category: 'living_relative'
  },
  {
    type: 'image',
    target: 'public/media/species/thylacine_historical.jpg',
    query: 'Thylacinus cynocephalus Tasmanian tiger Hobart Zoo archival',
    label: 'Thylacine / Tasmanian Tiger',
    species: 'Thylacinus cynocephalus (Extinct 1936)',
    category: 'extinct'
  },
  {
    type: 'image',
    target: 'public/media/species/tiger_quoll.jpg',
    query: 'Dasyurus maculatus spotted-tailed quoll tiger quoll marsupial',
    label: 'Spotted-tailed Quoll (Living Marsupial Relative)',
    species: 'Dasyurus maculatus',
    category: 'living_relative'
  },
  {
    type: 'image',
    target: 'public/media/species/passenger_pigeon.jpg',
    query: 'Ectopistes migratorius passenger pigeon specimen museum',
    label: 'Passenger Pigeon',
    species: 'Ectopistes migratorius (Extinct 1914)',
    category: 'extinct'
  },
  {
    type: 'image',
    target: 'public/media/species/mourning_dove.jpg',
    query: 'Zenaida macroura mourning dove perched natural feather',
    label: 'Mourning Dove (Living Columbid Relative)',
    species: 'Zenaida macroura',
    category: 'living_relative'
  },
  {
    type: 'image',
    target: 'public/media/species/smilodon_skull.jpg',
    query: 'Smilodon fatalis saber-toothed cat skull sabertooth La Brea',
    label: 'Saber-toothed Cat Fossil',
    species: 'Smilodon fatalis (Extinct ~10,000 BP)',
    category: 'extinct'
  },
  {
    type: 'image',
    target: 'public/media/species/clouded_leopard.jpg',
    query: 'Neofelis nebulosa clouded leopard tree branch wild',
    label: 'Clouded Leopard (Morphological Relative)',
    species: 'Neofelis nebulosa',
    category: 'living_relative'
  },
  {
    type: 'image',
    target: 'public/media/species/stellers_seacow.jpg',
    query: 'Hydrodamalis gigas Stellers sea cow skeleton museum specimen',
    label: "Steller's Sea Cow Specimen",
    species: 'Hydrodamalis gigas (Extinct 1768)',
    category: 'extinct'
  },
  {
    type: 'image',
    target: 'public/media/species/dugong.jpg',
    query: 'Dugong dugon sea cow swimming seagrass meadow',
    label: 'Dugong (Living Sirenia Relative)',
    species: 'Dugong dugon',
    category: 'living_relative'
  },
  // Ancient DNA & Deep Learning Science
  {
    type: 'image',
    target: 'public/media/science/dna_electrophoresis.jpg',
    query: 'Agarose gel electrophoresis DNA ultraviolet fluorescent bands',
    label: 'DNA Gel Electrophoresis Fluorescent Ladder',
    category: 'science'
  },
  {
    type: 'image',
    target: 'public/media/science/permafrost_excavation.jpg',
    query: 'Permafrost core drill ice ancient Pleistocene sediment Siberia',
    label: 'Ancient Permafrost Core Extraction',
    category: 'science'
  },
  {
    type: 'image',
    target: 'public/media/science/molecular_structure.jpg',
    query: 'Nucleosome core particle crystal structure histone DNA molecular model',
    label: 'Chromatin Nucleosome Architecture',
    category: 'science'
  },
  {
    type: 'image',
    target: 'public/media/science/sequencing_cleanroom.jpg',
    query: 'Laboratory clean room biosafety cabinet pipette scientist genetics',
    label: 'Ancient DNA Ultra-Clean Sequencing Facility',
    category: 'science'
  }
];

async function main() {
  const manifest = [];

  // Add already downloaded assets
  manifest.push(
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
      target: 'public/media/videos/sea_turtle_swimming.webm',
      title: 'File:Swimming with the Sea Turtle in Moalboal1.webm',
      label: 'Sea Turtle Gliding Over Reef',
      license: 'CC BY-SA 4.0',
      artist: 'Wikimedia Commons Contributor',
      category: 'marine'
    },
    {
      target: 'public/media/images/tiger.jpg',
      title: 'File:Bengal tiger (Panthera tigris tigris) female 3.jpg',
      label: 'Royal Bengal Tiger',
      species: 'Panthera tigris tigris',
      license: 'CC BY-SA 4.0',
      artist: 'Charles J. Sharp',
      category: 'mammal'
    }
  );

  for (const item of ASSET_SPEC) {
    if (fs.existsSync(item.target)) {
      console.log(`[SKIP] Already exists: ${item.target}`);
      continue;
    }

    console.log(`\n[SEARCH] Searching for ${item.label} ("${item.query}")...`);
    let info = null;

    if (item.isDirectFile) {
      const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(item.query)}&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=1600&format=json`;
      const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
      if (res.ok) {
        const data = await res.json();
        const p = Object.values(data.query?.pages || {})[0];
        if (p?.imageinfo) {
          const ii = p.imageinfo[0];
          info = {
            title: p.title,
            originalUrl: ii.url,
            downloadUrl: ii.thumburl || ii.url,
            mime: ii.mime,
            size: ii.size,
            license: ii.extmetadata?.LicenseShortName?.value || 'CC / Public Domain',
            artist: (ii.extmetadata?.Artist?.value || 'Wikimedia Contributor').replace(/<[^>]*>?/gm, '').trim()
          };
        }
      }
    } else {
      info = await fetchWikiInfo(item.query, 1600);
    }

    if (!info) {
      console.log(`[WARN] Not found: ${item.query}`);
      await sleep(1500);
      continue;
    }

    console.log(`[FOUND] ${info.title} (${info.mime}) -> Downloading...`);
    try {
      const resp = await fetch(info.downloadUrl, { headers: { 'User-Agent': USER_AGENT } });
      if (!resp.ok) {
        console.error(`[ERROR] HTTP ${resp.status} downloading ${info.downloadUrl}`);
        await sleep(2500);
        continue;
      }
      const buffer = Buffer.from(await resp.arrayBuffer());
      fs.mkdirSync(path.dirname(item.target), { recursive: true });
      fs.writeFileSync(item.target, buffer);
      console.log(`[SAVED] ${item.target} (${(buffer.length / 1024).toFixed(1)} KB)`);

      manifest.push({
        target: item.target,
        title: info.title,
        label: item.label,
        species: item.species || null,
        license: info.license,
        artist: info.artist,
        category: item.category,
        originalUrl: info.originalUrl
      });
    } catch (err) {
      console.error(`[ERROR] Failed to save ${item.target}:`, err.message);
    }

    // Respectful delay for Wikimedia API
    await sleep(2500);
  }

  fs.writeFileSync('public/media/manifest.json', JSON.stringify(manifest, null, 2));
  console.log(`\n>>> Done! Generated manifest with ${manifest.length} assets at public/media/manifest.json`);
}

main().catch(console.error);

