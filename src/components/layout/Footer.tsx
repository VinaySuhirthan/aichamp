import Link from "next/link";
import { site, nav, footer } from "@/content/content";

export default function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] py-16 md:py-20" role="contentinfo">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl text-[var(--paper)] tracking-[-0.02em] font-medium mb-4">
              AI bis Champ
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-xs">
              Because Quality Matters. Expert AI-powered services led by Dr. G. Nalinipriya, Professor and AI Specialist.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="section-label mb-6">Navigate</p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3 list-none">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-[var(--muted-lt)] text-sm hover:text-[var(--accent)] transition-colors no-underline focus-visible:outline-[var(--accent)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact + Social */}
          <div>
            <p className="section-label mb-6">Connect</p>
            <ul className="space-y-3 list-none">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[var(--muted-lt)] text-sm hover:text-[var(--accent)] transition-colors no-underline break-all focus-visible:outline-[var(--accent)]"
                  aria-label="Send us an email"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted-lt)] text-sm hover:text-[var(--accent)] transition-colors no-underline focus-visible:outline-[var(--accent)]"
                  aria-label="Chat with us on WhatsApp"
                >
                  WhatsApp [PLACEHOLDER]
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              {Object.entries(site.social).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors capitalize text-xs tracking-wider focus-visible:outline-[var(--accent)]"
                  aria-label={`Follow AI bis Champ on ${key}`}
                >
                  {key}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[var(--muted)] text-xs">{footer.copyright}</p>
          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none">
              {footer.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[var(--muted)] text-xs hover:text-[var(--accent)] transition-colors no-underline focus-visible:outline-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
