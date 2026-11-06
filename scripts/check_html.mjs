async function check() {
  const res = await fetch('http://localhost:3000');
  const html = await res.text();
  console.log('HTML head:');
  console.log(html.slice(0, 1500));
}
check();

