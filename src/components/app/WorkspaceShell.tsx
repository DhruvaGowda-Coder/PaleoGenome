import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/reconstruct", label: "DNA Reconstruction" },
  { href: "/results", label: "Model Results" },
];

export function WorkspaceShell({
  active,
  children,
}: {
  active: "/reconstruct" | "/results";
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f4f7f7] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link href="/" className="inline-flex items-center gap-3 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
            <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-xl bg-teal-800 text-sm font-semibold text-white">PG</span>
            <span>
              <span className="block font-serif text-lg font-semibold tracking-wide">PaleoGenome</span>
              <span className="block text-xs text-slate-600">Ancient DNA research workspace</span>
            </span>
          </Link>
          <nav aria-label="Main navigation" className="flex flex-wrap gap-2">
            {links.map((link) => {
              const selected = link.href === active;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={selected ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
                    selected ? "bg-teal-800 text-white" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-slate-200 bg-white px-5 py-6 text-center text-xs text-slate-600">
        PaleoGenome · Research interface · No model outputs are shown until supplied by a connected model.
      </footer>
    </main>
  );
}

