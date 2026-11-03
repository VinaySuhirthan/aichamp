import Link from "next/link";
import Image from "next/image";
import { site, nav, footer } from "@/content/content";
import Floating3DShape from "@/components/ui/Floating3DShape";

export default function Footer() {
  return (
    <footer className="relative bg-[var(--surface-2)] border-t border-[var(--border)] py-16 md:py-20 overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#0ea5e9]/40 before:to-transparent" role="contentinfo">
      {/* ── Flowing Gradient Light Beam Across Top ── */}
      <div className="animate-flow-line absolute top-0 left-0 w-80 h-[2px] bg-gradient-to-r from-transparent via-[#0284c7] to-transparent pointer-events-none z-10" />

      {/* ── 3D Shape & Ambient Lighting ── */}
      <Floating3DShape
        variant="sphere"
        theme="rose"
        size={135}
        animation={3}
        className="-right-10 sm:-right-16 bottom-6 opacity-75 hidden md:block"
      />
      <div className="animate-drift-1 absolute -bottom-10 left-1/3 w-[500px] h-[260px] rounded-full pointer-events-none z-0 ambient-glow-cyan opacity-60" />
      <div className="animate-drift-2 absolute -top-10 right-1/4 w-[460px] h-[240px] rounded-full pointer-events-none z-0 ambient-glow-lavender opacity-50" />

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#0ea5e9]/30 bg-white p-0.5 shadow-sm flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="AI Biz Champ Brand Mark"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full rounded-full"
                />
              </div>
              <p className="font-serif text-2xl text-[#0c192c] tracking-[-0.02em] font-bold">
                AI Biz Champ
              </p>
            </div>
            <p className="text-[#475569] text-sm leading-relaxed max-w-xs">
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
                      className="text-[#475569] text-sm hover:text-[#0284c7] transition-colors no-underline focus-visible:outline-[#0ea5e9]"
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
                  className="text-[#475569] text-sm hover:text-[#0284c7] transition-colors no-underline break-all focus-visible:outline-[#0ea5e9]"
                  aria-label="Send us an email"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello AI Biz Champ team, I want to inquire about your services.")}`}
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
                  aria-label={`Follow AI Biz Champ on ${key}`}
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
