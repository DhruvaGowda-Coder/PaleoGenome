import fs from 'fs';

async function getFileInfo(title) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'PaleoGenomeResearchBot/1.0 (academic-demo)' } });
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
        license: info.extmetadata?.LicenseShortName?.value || 'Public Domain / CC',
        artist: (info.extmetadata?.Artist?.value || 'Wikimedia Commons Contributor').replace(/<[^>]*>?/gm, '').trim()
      };
    }
  }
  return null;
}

async function searchCategory(cat, limit = 15) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(cat)}&cmnamespace=6&cmlimit=${limit}&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'PaleoGenomeResearchBot/1.0 (academic-demo)' } });
  const data = await res.json();
  const members = data.query?.categorymembers || [];
  const results = [];
  for (const m of members) {
    const info = await getFileInfo(m.title);
    if (info) results.push(info);
  }
  return results;
}

async function searchKeyword(keyword, limit = 10) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(keyword)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'PaleoGenomeResearchBot/1.0 (academic-demo)' } });
  const data = await res.json();
  const pages = data.query?.pages || {};
  return Object.values(pages).map(p => {
    const info = p.imageinfo?.[0];
    return {
      title: p.title,
      url: info?.url,
      mime: info?.mime,
      size: info?.size,
      license: info?.extmetadata?.LicenseShortName?.value || 'Public Domain / CC',
      artist: (info?.extmetadata?.Artist?.value || 'Wikimedia Commons Contributor').replace(/<[^>]*>?/gm, '').trim()
    };
  });
}

async function main() {
  console.log("Searching for Whale videos...");
  const whales = await searchKeyword('filemime:video/webm whale underwater OR "humpback whale" OR "blue whale"', 5);
  console.log("Whales:", whales.map(w => ({ title: w.title, mime: w.mime, size: w.size, url: w.url })));

  console.log("Searching for Turtle / Reef videos...");
  const reef = await searchKeyword('filemime:video/webm "sea turtle" OR "coral reef" OR "swimming"', 5);
  console.log("Reef:", reef.map(w => ({ title: w.title, mime: w.mime, size: w.size, url: w.url })));

  console.log("Searching for Birds in flight videos...");
  const birds = await searchKeyword('filemime:video/webm birds flight OR eagle flight', 5);
  console.log("Birds:", birds.map(w => ({ title: w.title, mime: w.mime, size: w.size, url: w.url })));

  console.log("Searching for Butterfly videos...");
  const butterflies = await searchKeyword('filemime:video/webm butterfly', 5);
  console.log("Butterflies:", butterflies.map(w => ({ title: w.title, mime: w.mime, size: w.size, url: w.url })));
}

main().catch(console.error);

