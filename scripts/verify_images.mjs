import fs from 'fs';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PaleoGenomeBot/1.0 (bio-team@paleogenome.org)';

async function searchExact(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent('filemime:image/jpeg ' + query)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=1600&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data.query?.pages || {};
  return Object.values(pages).map(p => ({
    title: p.title,
    thumburl: p.imageinfo?.[0]?.thumburl,
    url: p.imageinfo?.[0]?.url,
    size: p.imageinfo?.[0]?.size,
    artist: (p.imageinfo?.[0]?.extmetadata?.Artist?.value || 'Wikimedia Commons').replace(/<[^>]*>?/gm, '').trim(),
    license: p.imageinfo?.[0]?.extmetadata?.LicenseShortName?.value || 'CC / Public Domain'
  }));
}

const queries = {
  elephant: 'Loxodonta africana male elephant',
  blue_whale: 'Balaenoptera musculus underwater OR breaching',
  red_deer: 'Cervus elaphus stag Scotland',
  tree_frog: 'Agalychnis callidryas frog leaf Costa Rica',
  butterfly: 'Morpho peleides blue morpho butterfly',
  coral_reef: 'Coral reef fish Great Barrier Reef',
  sea_turtle: 'Chelonia mydas green sea turtle coral',
  eagle: 'Haliaeetus leucocephalus bald eagle flight',
  mammoth: 'Mammuthus primigenius skeleton museum',
  asian_elephant: 'Elephas maximus Asian elephant wild',
  thylacine: 'Thylacinus cynocephalus Hobart zoo',
  quoll: 'Dasyurus maculatus tiger quoll',
  passenger_pigeon: 'Ectopistes migratorius passenger pigeon',
  mourning_dove: 'Zenaida macroura mourning dove',
  smilodon: 'Smilodon fatalis skull',
  clouded_leopard: 'Neofelis nebulosa clouded leopard',
  stellers_seacow: 'Hydrodamalis gigas skeleton',
  dugong: 'Dugong dugon swimming',
  dna_gel: 'agarose gel electrophoresis DNA bands',
  permafrost: 'permafrost core ice sediment',
  cryo_em: 'nucleosome DNA crystal structure',
  cleanroom: 'cleanroom laboratory pipette DNA'
};

async function main() {
  const verified = {};
  for (const [key, q] of Object.entries(queries)) {
    const list = await searchExact(q);
    if (list && list.length > 0) {
      verified[key] = list[0];
      console.log(`[OK] ${key} -> ${list[0].title}`);
    } else {
      console.log(`[FAIL] ${key}`);
    }
    await new Promise(r => setTimeout(r, 600));
  }
  fs.writeFileSync('scripts/verified_images.json', JSON.stringify(verified, null, 2));
  console.log('Saved scripts/verified_images.json');
}

main().catch(console.error);

