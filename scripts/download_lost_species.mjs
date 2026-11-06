import fs from 'fs';
import path from 'path';

const USER_AGENT = 'Mozilla/5.0 PaleoGenomeBot/1.0 (academic-demo; bio-team@paleogenome.edu)';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const TARGETS = [
  {
    key: 'dodo',
    title: 'File:Dodo-Skeleton Natural History Museum London England.jpg',
    target: 'public/media/lost_species/dodo_skeleton.jpg',
    label: 'Dodo Skeleton Holotype',
    species: 'Raphus cucullatus',
    category: 'avian',
    dnaStatus: 'ancient_dna',
    era: 'Extinct ~1662 (Mauritius)'
  },
  {
    key: 'quagga',
    title: 'File:Equus quagga 3 MHNT.jpg',
    target: 'public/media/lost_species/quagga_specimen.jpg',
    label: 'Quagga Mounted Specimen',
    species: 'Equus quagga quagga',
    category: 'mammal',
    dnaStatus: 'ancient_dna',
    era: 'Extinct 1883 (Amsterdam)'
  },
  {
    key: 'irish_elk',
    title: 'File:Megaloceros giganteus Paris 25 05 2013 01.jpg',
    target: 'public/media/lost_species/irish_elk_skeleton.jpg',
    label: 'Giant Irish Elk Antler Skeleton',
    species: 'Megaloceros giganteus',
    category: 'mammal',
    dnaStatus: 'ancient_dna',
    era: 'Extinct ~7,700 BP (Late Pleistocene)'
  },
  {
    key: 'giant_moa',
    title: 'File:Dinornis robustus, South Island Giant Moa - three quarter view on black YORYM 2004 20.jpg',
    target: 'public/media/lost_species/giant_moa_skeleton.jpg',
    label: 'South Island Giant Moa Skeleton',
    species: 'Dinornis robustus',
    category: 'avian',
    dnaStatus: 'ancient_dna',
    era: 'Extinct ~1440 CE (New Zealand)'
  },
  {
    key: 'great_auk',
    title: 'File:Naturalis Biodiversity Center - RMNH.AVES.110104 - Pinguinus impennis (Linnaeus, 1758) - Great Auk - specimen - lateral view.jpeg',
    target: 'public/media/lost_species/great_auk_specimen.jpg',
    label: 'Great Auk Holotype Specimen',
    species: 'Pinguinus impennis',
    category: 'avian',
    dnaStatus: 'ancient_dna',
    era: 'Extinct 1844 (Eldey Island)'
  },
  {
    key: 'golden_toad',
    title: 'File:Bufo periglenes2.jpg',
    target: 'public/media/lost_species/golden_toad.jpg',
    label: 'Golden Toad (Monteverde Cloud Forest)',
    species: 'Incilius periglenes',
    category: 'amphibian',
    dnaStatus: 'ancient_dna',
    era: 'Extinct 1989 (Costa Rica)'
  },
  {
    key: 'titanoboa',
    title: 'File:Titanoboa vertebra 1.jpg',
    target: 'public/media/lost_species/titanoboa_vertebra.jpg',
    label: 'Titanoboa Giant Vertebra Fossil',
    species: 'Titanoboa cerrejonensis',
    category: 'reptile',
    dnaStatus: 'fossil_only',
    era: 'Paleocene Epoch (~58 Mya)'
  },
  {
    key: 'monk_seal',
    title: 'File:Monachus tropicalis.jpg',
    target: 'public/media/lost_species/caribbean_monk_seal.jpg',
    label: 'Caribbean Monk Seal Historical Specimen',
    species: 'Neomonachus tropicalis',
    category: 'marine',
    dnaStatus: 'ancient_dna',
    era: 'Extinct 1952 (Seranilla Bank)'
  },
  {
    key: 'megalodon',
    title: 'File:Megalodon shark tooth fossil.jpg',
    target: 'public/media/lost_species/megalodon_tooth.jpg',
    label: 'Megalodon Mineralized Serrated Tooth',
    species: 'Otodus megalodon',
    category: 'marine',
    dnaStatus: 'fossil_only',
    era: 'Miocene to Pliocene (~3.6 Mya)'
  },
  {
    key: 'ammonite',
    title: 'File:Ammonite fossil.JPG',
    target: 'public/media/lost_species/ammonite_fossil.jpg',
    label: 'Ammonite Siphuncle Shell Fossil',
    species: 'Ammonoidea sp.',
    category: 'invertebrate',
    dnaStatus: 'fossil_only',
    era: 'Extinct 66 Mya (K-Pg Boundary)'
  },
  {
    key: 'xerces_blue',
    title: 'File:Xerces Blue.jpg',
    target: 'public/media/lost_species/xerces_blue.jpg',
    label: 'Xerces Blue Butterfly Museum Specimen',
    species: 'Glaucopsyche xerces',
    category: 'invertebrate',
    dnaStatus: 'ancient_dna',
    era: 'Extinct 1941 (San Francisco Dunes)'
  },
  {
    key: 'trilobite',
    title: 'File:Elrathia kingii Dyet 2174.jpg',
    target: 'public/media/lost_species/trilobite_fossil.jpg',
    label: 'Elrathia kingii Trilobite Exoskeleton',
    species: 'Elrathia kingii',
    category: 'invertebrate',
    dnaStatus: 'fossil_only',
    era: 'Middle Cambrian (~505 Mya)'
  }
];

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
  let manifest = [];
  if (fs.existsSync('public/media/manifest.json')) {
    manifest = JSON.parse(fs.readFileSync('public/media/manifest.json', 'utf8'));
  }

  for (const item of TARGETS) {
    if (fs.existsSync(item.target)) {
      console.log(`[EXISTS] ${item.target}`);
      continue;
    }

    console.log(`Fetching ${item.title}...`);
    const meta = await getThumbAndMeta(item.title);
    if (!meta) {
      console.error(`Failed meta for ${item.title}`);
      await sleep(1000);
      continue;
    }

    console.log(`Downloading ${item.label}...`);
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
        species: item.species,
        dnaStatus: item.dnaStatus,
        era: item.era,
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
  console.log(`Done! Manifest updated with ${manifest.length} total items.`);
}

main().catch(console.error);

