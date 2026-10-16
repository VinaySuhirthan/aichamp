"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero } from "@/content/content";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import("@/components/ui/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const secondaryRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const secondary = secondaryRef.current;
    const sub = subRef.current;
    const ctas = ctasRef.current;

    if (!section || !headline || !secondary || !sub || !ctas) return;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Reveal lines on load
      const mainLines = headline.querySelectorAll(".reveal-line__inner");
      const secLines = secondary.querySelectorAll(".reveal-line__inner");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });
      tl.from(mainLines, { y: 25, opacity: 0, duration: 0.8 })
        .from(secLines, { y: 20, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(sub, { opacity: 0, y: 16, duration: 0.6 }, "-=0.35")
        .from(ctas.children, { opacity: 0, y: 12, stagger: 0.08, duration: 0.5 }, "-=0.25");

      // Parallax on scroll
      gsap.to([headline, secondary], {
        y: -40,
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
        <div className="max-w-[960px]">
          {/* Main H1: AI Biz Champion (Largest, Serif) */}
          <h1
            ref={headlineRef}
            className="hero__headline mb-3 sm:mb-4"
          >
            <span className="reveal-line block">
              <span className="reveal-line__inner">
                {hero.title}
              </span>
            </span>
          </h1>

          {/* Secondary Line: Because Quality Matters. (Smaller, Matters in gold italic) */}
          <p
            ref={secondaryRef}
            className="hero__secondary mb-4 sm:mb-5"
          >
            <span className="reveal-line block">
              <span className="reveal-line__inner">
                Because Quality{" "}
                <em className="italic text-[var(--accent)] font-serif">
                  Matters.
                </em>
              </span>
            </span>
          </p>

          {/* Supporting Line: Smallest */}
          <p
            ref={subRef}
            className="hero__subhead text-sm sm:text-base md:text-lg mb-7 sm:mb-8 md:mb-9"
          >
            {hero.subhead}
          </p>

          {/* CTAs: visible above the fold */}
          <div ref={ctasRef} className="flex flex-wrap items-center gap-4 sm:gap-5">
            <a
              href={hero.cta1.href}
              className="btn btn--ghost"
              aria-label="Explore our services"
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
