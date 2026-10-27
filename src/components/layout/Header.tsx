"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/content/content";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let prevScrolled = false;
    let prevHidden = false;

    const onScroll = () => {
      const y = window.scrollY;
      const isScrolled = y > 40;
      if (isScrolled !== prevScrolled) {
        prevScrolled = isScrolled;
        setScrolled(isScrolled);
      }

      const isHidden = y > lastScrollY.current && y > 200;
      if (isHidden !== prevHidden) {
        prevHidden = isHidden;
        setHidden(isHidden);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 transition-all duration-300 pointer-events-none ${
          hidden ? "-translate-y-28 opacity-0" : "translate-y-0 opacity-100"
        }`}
        role="banner"
      >
        <div
          className={`pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 border rgb-hairline ${
            scrolled
              ? "bg-[#faf7f0]/95 border-[#0ea5e9]/25 backdrop-blur-2xl shadow-[0_10px_30px_rgba(2,132,199,0.12),0_2px_8px_rgba(0,0,0,0.05)]"
              : "bg-[#faf7f0]/85 border-[#e8dfd3] backdrop-blur-xl shadow-[0_8px_24px_rgba(2,132,199,0.08),0_2px_6px_rgba(0,0,0,0.04)]"
          }`}
        >
          {/* Brand Logo & Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 no-underline group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] rounded-full p-1"
            aria-label={`${site.name} — Home`}
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#0ea5e9]/30 bg-white p-0.5 shadow-sm group-hover:scale-105 group-hover:border-[#0284c7] transition-all duration-300 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="AI Biz Champ Brand Mark"
                width={32}
                height={32}
                className="object-contain w-full h-full rounded-full"
                priority
              />
            </div>
            <span className="font-sans font-bold text-[#0c192c] text-base sm:text-lg tracking-tight group-hover:text-[#0284c7] transition-colors">
              {site.name}
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              href="#hero"
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#0284c7] shadow-[0_2px_12px_rgba(2,132,199,0.35)] transition-all duration-200"
            >
              Home
            </a>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#475569] hover:text-[#0284c7] hover:bg-[#e0f2fe]/70 transition-all duration-200 no-underline"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTA Button */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0284c7] text-white shadow-[0_4px_16px_rgba(2,132,199,0.3)] hover:shadow-[0_6px_24px_rgba(2,132,199,0.5)] transition-all duration-300 no-underline"
              aria-label="Book a consultation with AI Biz Champ"
            >
              Contact Us
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2 min-h-[40px] min-w-[40px] items-center justify-center rounded-full hover:bg-[#0284c7]/10 transition-colors"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span
                className="block w-5 h-[2px] bg-[#0c192c] transition-transform duration-300 origin-center"
                style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "" }}
              />
              <span
                className="block w-5 h-[2px] bg-[#0c192c] transition-opacity duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-[2px] bg-[#0c192c] transition-transform duration-300 origin-center"
                style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "" }}
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
