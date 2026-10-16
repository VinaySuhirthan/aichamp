"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero, stats } from "@/content/content";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import("@/components/ui/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    const ctas = ctasRef.current;

    if (!section || !headline || !sub || !ctas) return;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Reveal lines on load
      const lines = headline.querySelectorAll(".reveal-line__inner");
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 1.3 });
      tl.to(lines, { y: "0%", duration: 1.1, stagger: 0.12 })
        .from(sub, { opacity: 0, y: 24, duration: 0.8 }, "-=0.6")
        .from(ctas.children, { opacity: 0, y: 20, stagger: 0.1, duration: 0.7 }, "-=0.5");

      // Parallax on scroll
      gsap.to(headline, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero"
      aria-label="Hero section"
    >
      <HeroCanvas />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to top, rgba(13,13,11,0.98) 0%, rgba(13,13,11,0.5) 50%, rgba(13,13,11,0.15) 100%)",
        }}
      />

      <div className="hero__content container">
        <div className="max-w-[900px]">
          {/* Label */}
          <p className="section-label mb-8" aria-hidden="true">
            AI bis Champ
          </p>

          {/* Headline */}
          <h1 ref={headlineRef} className="hero__headline mb-6 leading-[1.18]">
            {hero.headline.map((line, i) => (
              <span key={i} className="reveal-line block">
                <span className="reveal-line__inner">
                  {i === 1 ? (
                    <>
                      <em className="not-italic text-[var(--accent)]">
                        {line.split(" ")[0]}{" "}
                      </em>
                      {line.split(" ").slice(1).join(" ")}
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          {/* Subhead */}
          <p ref={subRef} className="hero__subhead leading-[1.75] mb-10 text-base md:text-lg">
            {hero.subhead}
          </p>

          {/* CTAs */}
          <div ref={ctasRef} className="flex flex-wrap gap-4">
            <a
              href={hero.cta1.href}
              className="btn btn--ghost"
              aria-label="View our portfolio"
            >
              <span>{hero.cta1.label}</span>
              <ArrowIcon />
            </a>
            <a
              href={hero.cta2.href}
              className="btn btn--primary"
              aria-label="Book a consultation"
            >
              <span>{hero.cta2.label}</span>
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-[var(--border)]">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="counter">
                {s.value}
                {s.suffix}
              </p>
              <p className="text-[var(--muted)] text-xs tracking-[0.1em] uppercase mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--muted)] rotate-90 origin-center mb-4">
          Scroll
        </span>
        <div className="w-px h-16 bg-[var(--border)] relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-[var(--accent)]"
            style={{
              animation: "scroll-line 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
