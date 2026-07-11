import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Emploi",
    links: [
      { label: "Villes", href: "/villes" },
      { label: "Categories", href: "/categories" },
      { label: "Entreprises", href: "/entreprises" },
      { label: "Salaires", href: "/salaires" },
    ],
  },
  {
    title: "Plateforme",
    links: [
      { label: "A Propos", href: "/a-propos" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Confidentialite", href: "/confidentialite" },
      { label: "Conditions", href: "/conditions" },
      { label: "Cookies", href: "/cookies" },
      { label: "Avertissement", href: "/avertissement" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-zinc-900 text-zinc-300" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="HireMe Maroc">
              <div className="w-8 h-8 rounded-lg bg-[#c1272d] flex items-center justify-center">
                <svg viewBox="0 0 512 512" className="w-4 h-4 fill-none stroke-[#006233] stroke-[35]">
                  <path d="M256 160l26.4 81.3h85.5l-69.1 50.2 26.4 81.3-69.2-50.2-69.2 50.2 26.4-81.3-69.1-50.2h85.5z" />
                </svg>
              </div>
              <span className="text-sm font-extrabold text-white uppercase tracking-tight">HireMe Maroc</span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4">
              Le hub intelligent du recrutement au Maroc. Trouvez votre prochain emploi parmi des milliers d&apos;offres.
            </p>
            <p className="text-[11px] text-zinc-600 font-medium">hirememaroc.online</p>
          </div>

          {/* Link Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; 2026 HireMe Maroc. Tous droits reserves.
          </p>
          <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-widest">
            hirememaroc.online
          </p>
        </div>
      </div>
    </footer>
  );
}
