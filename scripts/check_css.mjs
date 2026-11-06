async function checkCss() {
  const res = await fetch('http://localhost:3000');
  const html = await res.text();
  const match = html.match(/href="(\/_next\/static\/css\/[^"]+)"/);
  if (match) {
    console.log('CSS URL:', match[1]);
    const cssRes = await fetch('http://localhost:3000' + match[1]);
    console.log('CSS status:', cssRes.status);
    const cssText = await cssRes.text();
    console.log('CSS length:', cssText.length);
    console.log('CSS sample:', cssText.slice(0, 500));
  } else {
    console.log('No CSS URL matched!');
  }
}
checkCss();

