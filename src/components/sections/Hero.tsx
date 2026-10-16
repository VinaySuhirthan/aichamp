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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });
      tl.from(lines, { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 })
        .from(sub, { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
        .from(ctas.children, { opacity: 0, y: 16, stagger: 0.08, duration: 0.6 }, "-=0.3");

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
          <p className="section-label" style={{ marginBottom: "28px" }} aria-hidden="true">
            AI Biz Champion
          </p>

          {/* Headline */}
          <h1 ref={headlineRef} className="hero__headline" style={{ lineHeight: "1.32", marginBottom: "32px" }}>
            {hero.headline.map((line, i) => (
              <span key={i} className="reveal-line block" style={{ marginBottom: "12px" }}>
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
          <p ref={subRef} className="hero__subhead text-base md:text-lg" style={{ lineHeight: "2.15", marginBottom: "44px" }}>
            {hero.subhead}
          </p>

          {/* CTAs */}
          <div ref={ctasRef} className="flex flex-wrap" style={{ gap: "20px" }}>
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
