"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/content/content";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const onScroll = () => {
      const y = window.scrollY;
      if (y > 80) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      if (y > lastScrollY.current && y > 200) {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header ref={headerRef} className="header" role="banner">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 no-underline focus-visible:outline-[var(--accent)] group"
              aria-label={`${site.name} — Home`}
            >
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[var(--accent)]/50 bg-[#f5f0e8] p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="AI Biz Champion Brand Mark"
                  width={36}
                  height={36}
                  className="object-contain w-full h-full rounded-full"
                  priority
                />
              </div>
              <span className="font-serif text-[var(--paper)] text-xl tracking-[-0.02em] font-medium group-hover:text-[var(--accent-lt)] transition-colors">
                AI Biz Champion
              </span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[13px] font-medium tracking-[0.06em] uppercase text-[var(--muted-lt)] hover:text-[var(--paper)] transition-colors duration-200 no-underline focus-visible:outline-[var(--accent)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <a
              href="#contact"
              className="btn btn--primary hidden md:inline-flex"
              aria-label="Book a consultation with AI Biz Champion"
            >
              <span>Book a Consultation</span>
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2 min-h-[44px] min-w-[44px] items-center justify-center"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              style={{ cursor: "inherit" }}
            >
              <span
                className="block w-6 h-px bg-[var(--paper)] transition-transform duration-300 origin-center"
                style={{ transform: menuOpen ? "translateY(6px) rotate(45deg)" : "" }}
              />
              <span
                className="block w-6 h-px bg-[var(--paper)] transition-opacity duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-6 h-px bg-[var(--paper)] transition-transform duration-300 origin-center"
                style={{ transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "" }}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        id="mobile-menu"
      />
    </>
  );
}
