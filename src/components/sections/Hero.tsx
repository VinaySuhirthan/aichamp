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
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const section = sectionRef.current;
    const badge = badgeRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    const ctas = ctasRef.current;

    if (!section || !badge || !headline || !sub || !ctas) return;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });
      
      tl.from(badge, { opacity: 0, y: -15, scale: 0.9, duration: 0.6 })
        .from(headline.children, { y: 25, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=0.3")
        .from(sub, { opacity: 0, y: 15, duration: 0.5 }, "-=0.35")
        .from(ctas.children, { opacity: 0, y: 12, stagger: 0.08, duration: 0.5 }, "-=0.25");

      gsap.to(headline, {
        y: -30,
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
      className="hero relative min-h-[90dvh] sm:min-h-screen flex flex-col justify-center items-center text-center overflow-hidden pt-20 sm:pt-24 pb-10 px-4"
      aria-label="Hero section"
    >
      {/* 3D WebGL Background Canvas */}
      <HeroCanvas />

      {/* Ambient background glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(14, 165, 233, 0.06) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      
      {/* Subtle bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-0"
        style={{
          background: "linear-gradient(to top, #060c18 0%, rgba(6,12,24,0.5) 60%, transparent 100%)",
        }}
      />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1000px] mx-auto flex flex-col items-center">
        {/* Top Floating Category Badge (Creamy White on Deep Sapphire with Light Blue Live Pulse) */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#38bdf8]/35 bg-[#0c1a33]/60 backdrop-blur-md mb-3 sm:mb-4 shadow-[0_4px_20px_rgba(14,165,233,0.25)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8] animate-pulse" />
          <span className="text-xs font-bold tracking-wider uppercase text-[#fcf9f2]">
            AI Biz Champion
          </span>
        </div>

        {/* Master Headline: 3 Clean Lines */}
        <h1
          ref={headlineRef}
          className="font-sans font-black tracking-[-0.025em] uppercase leading-[0.98] text-[#fcf9f2] flex flex-col items-center select-none"
        >
          <span className="block text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#fcf9f2] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            Empowering The
          </span>
          
          {/* Signature Outlined Stroke Keyword */}
          <span
            className="block text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-black tracking-tight my-0.5 sm:my-1"
            style={{
              WebkitTextStroke: "2px rgba(252, 249, 242, 0.95)",
              color: "transparent",
              textShadow: "0 0 35px rgba(56, 189, 248, 0.65)",
            }}
          >
            NEXT-GEN
          </span>

          <span className="block text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#fcf9f2] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            AI Revolution
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="text-xs sm:text-sm md:text-base text-[#a6bdd8] font-normal max-w-lg mt-3 sm:mt-4 mb-5 sm:mb-6 leading-relaxed drop-shadow"
        >
          Pioneers in high-impact AI agents, video, and automated growth systems — led by{" "}
          <span className="text-[#fcf9f2] font-semibold drop-shadow-[0_0_12px_rgba(252,249,242,0.35)] underline decoration-[#38bdf8]/60 underline-offset-4">Dr. G. Nalinipriya</span>, Professor & AI Specialist.
        </p>

        {/* Action CTAs: Dual-Tone Actions */}
        <div ref={ctasRef} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href={hero.cta1.href || "#services"}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0284c7] text-[#fcf9f2] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(56,189,248,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
            aria-label="Explore our services"
          >
            <span>{hero.cta1.label || "View Services"}</span>
            <ArrowIcon />
          </a>
          <a
            href={hero.cta2.href || "#contact"}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#fcf9f2]/40 bg-white/[0.04] backdrop-blur-md text-[#fcf9f2] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#0c1a33]/60 hover:border-[#38bdf8] hover:text-[#38bdf8] hover:scale-105 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
            aria-label="Book a consultation"
          >
            <span>{hero.cta2.label || "Book Consultation"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
