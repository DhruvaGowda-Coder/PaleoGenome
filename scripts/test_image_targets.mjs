import fs from 'fs';
import path from 'path';

async function getImage(title) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'PaleoGenomeApp/1.0 (academic-demo)' } });
  const data = await res.json();
  const pages = data.query?.pages || {};
  for (const k in pages) {
    if (pages[k].imageinfo) {
      const info = pages[k].imageinfo[0];
      return {
        title: pages[k].title,
        url: info.url,
        mime: info.mime,
        size: info.size,
        license: info.extmetadata?.LicenseShortName?.value || 'CC BY-SA / Public Domain',
        artist: (info.extmetadata?.Artist?.value || 'Wikimedia Commons Contributor').replace(/<[^>]*>?/gm, '').trim()
      };
    }
  }
  return null;
}

const targets = [
  // Animals for Hero and Diversity
  'File:Bald Eagle (Haliaeetus leucocephalus) in flight - Homer, Alaska.jpg',
  'File:African Bush Elephant (Loxodonta africana) male (26224131276).jpg',
  'File:Bengal tiger (Panthera tigris tigris) female 3.jpg',
  'File:Red deer stag (Cervus elaphus scoticus).jpg',
  'File:Agalychnis callidryas (frog).jpg',
  'File:Blue morpho butterfly (Morpho peleides).jpg',
  'File:Green sea turtle (Chelonia mydas) 2.jpg',
  'File:School of fish over coral reef.jpg',
  'File:Humpback whale breaching, Stellwagen Bank Sanctuary.jpg',
  'File:Blue Whale 001.jpg',
  // Extinct Species
  'File:Mammuthus primigenius museum.jpg',
  'File:Woolly mammoth reconstruction.jpg',
  'File:Thylacine 1930.jpg',
  'File:Thylacine at Hobart Zoo, 1928.jpg',
  'File:Passenger Pigeon (Ectopistes migratorius) male.jpg',
  'File:Smilodon californicus.jpg',
  'File:Hydrodamalis gigas skeleton.jpg',
  // Science & ancient DNA
  'File:DNA agarose gel with ethidium bromide.jpg',
  'File:Gel electrophoresis 2.jpg',
  'File:DNA double helix horizontal.jpg'
];

async function run() {
  const results = [];
  for (const t of targets) {
    const res = await getImage(t);
    if (res) {
      console.log("FOUND:", t, "->", res.mime, (res.size / 1024 / 1024).toFixed(2), "MB");
      results.push(res);
    } else {
      console.log("NOT FOUND:", t);
    }
  }
}

run().catch(console.error);

