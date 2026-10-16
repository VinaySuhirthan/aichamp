import Link from "next/link";
import Image from "next/image";
import { site, nav, footer } from "@/content/content";

export default function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] py-16 md:py-20" role="contentinfo">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--accent)]/50 bg-[#f5f0e8] p-0.5 shadow-sm flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="AI Biz Champion Brand Mark"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full rounded-full"
                />
              </div>
              <p className="font-serif text-2xl text-[var(--paper)] tracking-[-0.02em] font-medium">
                AI Biz Champion
              </p>
            </div>
            <p className="text-[var(--muted-lt)] text-sm leading-relaxed max-w-xs">
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
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello AI Biz Champion team, I want to inquire about your services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted-lt)] text-sm hover:text-[#25D366] transition-colors no-underline focus-visible:outline-[var(--accent)]"
                  aria-label={`Chat with us on WhatsApp at ${site.phone}`}
                >
                  WhatsApp: <span className="text-[var(--paper)] font-medium">{site.phone}</span>
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
                  aria-label={`Follow AI Biz Champion on ${key}`}
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
