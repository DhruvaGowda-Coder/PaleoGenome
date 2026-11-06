import fs from 'fs';

const USER_AGENT = 'Mozilla/5.0 PaleoGenomeBot/1.0 (academic-demo; bio-team@paleogenome.edu)';

async function download(title, target, isVideo = false) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size|mime&${isVideo ? '' : 'iiurlwidth=1920&'}format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  if (!page || !page.imageinfo) {
    console.error('Failed to find', title);
    return;
  }
  const downloadUrl = isVideo ? page.imageinfo[0].url : (page.imageinfo[0].thumburl || page.imageinfo[0].url);
  console.log(`Downloading ${title} from ${downloadUrl}...`);
  const resp = await fetch(downloadUrl, { headers: { 'User-Agent': USER_AGENT } });
  const buf = Buffer.from(await resp.arrayBuffer());
  fs.writeFileSync(target, buf);
  console.log(`Saved ${target} (${(buf.length / 1024).toFixed(1)} KB)`);
}

async function run() {
  await download(
    'File:Hall of Mosses, Hoh Rainforest, Olympic National Park, Washington (2015).jpg',
    'public/media/images/lush_rainforest_canopy.jpg',
    false
  );
  await download(
    'File:Bengal tiger (Panthera tigris tigris), Bandhavgarh National Park.jpg',
    'public/media/images/tiger_in_forest.jpg',
    false
  );
  await download(
    'File:Tropical Fish Banner Fish on Coral Reef.webm',
    'public/media/videos/coral_reef_fish.webm',
    true
  );
}

run().catch(console.error);

