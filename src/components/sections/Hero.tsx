"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero } from "@/content/content";
import Floating3DShape from "@/components/ui/Floating3DShape";

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
      className="hero relative min-h-[90dvh] sm:min-h-screen flex flex-col justify-center items-center text-center overflow-hidden pt-20 sm:pt-24 pb-10 px-4 bg-[#faf7f0]"
      aria-label="Hero section"
    >
      {/* 3D WebGL Background Canvas with Undulating Silk Wave & Orbital Rings */}
      <HeroCanvas />

      {/* ── Flowing Liquid Texture Shape 1 (Top Left Ambient Chromatic Wave) ── */}
      <div
        className="animate-fluid-1 absolute top-[22%] left-[18%] -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 40% 40%, rgba(56, 189, 248, 0.32) 0%, rgba(14, 165, 233, 0.2) 45%, transparent 75%)",
          filter: "blur(75px)",
        }}
      />

      {/* ── Flowing Liquid Texture Shape 2 (Bottom Right Ambient Violet-Cyan Wave) ── */}
      <div
        className="animate-fluid-2 absolute top-[68%] right-[16%] translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 60% 60%, rgba(129, 140, 248, 0.28) 0%, rgba(56, 189, 248, 0.18) 50%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />

      {/* Antigravity Minimal RGB Prismatic Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] rounded-full pointer-events-none z-0"
        style={{
          background: "conic-gradient(from var(--rgb-angle, 0deg), rgba(56, 189, 248, 0.22) 0%, rgba(129, 140, 248, 0.18) 25%, rgba(192, 132, 252, 0.15) 50%, rgba(244, 114, 182, 0.18) 75%, rgba(56, 189, 248, 0.22) 100%)",
          filter: "blur(90px)",
          animation: "rgb-rotate 14s linear infinite",
        }}
      />
      
      {/* Subtle bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-0"
        style={{
          background: "linear-gradient(to top, #faf7f0 0%, rgba(250,247,240,0.6) 60%, transparent 100%)",
        }}
      />

            {/* ── 3D Decorative Floating Gradient Shapes on Flanks ── */}
      <Floating3DShape
        variant="sphere"
        theme="cyan"
        size={175}
        animation={1}
        className="-left-14 sm:-left-20 top-[22%] opacity-90 hidden sm:block"
      />
      <Floating3DShape
        variant="blob"
        theme="lavender"
        size={195}
        animation={2}
        className="-right-16 sm:-right-24 top-[32%] opacity-85 hidden sm:block"
      />
      <Floating3DShape
        variant="ellipsoid"
        theme="ice"
        size={140}
        animation={3}
        className="-left-10 bottom-[15%] opacity-80 hidden lg:block"
      />

      {/* Floating subtle particle sparks */}
      <div className="ambient-spark w-2 h-2 top-[20%] left-[16%] [animation-delay:0.5s]" />
      <div className="ambient-spark w-2.5 h-2.5 top-[38%] right-[18%] [animation-delay:3s]" />
      <div className="ambient-spark w-2 h-2 top-[68%] left-[22%] [animation-delay:1.5s]" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1000px] mx-auto flex flex-col items-center">
        {/* Top Floating Category Badge with Antigravity RGB Halo */}
        <div
          ref={badgeRef}
          className="rgb-border-pill rgb-soft-glow inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md mb-3 sm:mb-4 shadow-[0_4px_16px_rgba(2,132,199,0.12)] cursor-default select-none"
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] shadow-[0_0_12px_#38bdf8] animate-pulse" />
          <span className="text-xs font-bold tracking-wider uppercase text-[#0c192c]">
            AI Biz Champ
          </span>
        </div>

        {/* Master Headline: 3 Clean Lines */}
        <h1
          ref={headlineRef}
          className="font-sans font-black tracking-[-0.025em] uppercase leading-[0.98] flex flex-col items-center select-none"
        >
          <span className="block text-3xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-black via-[#091e3a] to-[#034ea2] bg-clip-text text-transparent pb-0.5">
            Empowering The
          </span>
          
          {/* High-Impact Vibrant Gradient Filled NEXT-GEN */}
          <span className="brand-gradient-fill block text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-black tracking-tight my-0.5 sm:my-1 bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#2563eb] bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(2,132,199,0.25)] pb-1" style={{ WebkitTextStroke: "0px transparent" }}>
            NEXT-GEN
          </span>

          <span className="block text-3xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-black via-[#091e3a] to-[#034ea2] bg-clip-text text-transparent pb-0.5">
            AI Revolution
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="text-xs sm:text-sm md:text-base text-[#475569] font-medium max-w-lg mt-3 sm:mt-4 mb-5 sm:mb-6 leading-relaxed"
        >
          Pioneers in high-impact AI agents, video, and automated growth systems — led by{" "}
          <span className="text-[#0c192c] font-bold underline decoration-[#0ea5e9]/70 underline-offset-4">Dr. G. Nalinipriya</span>, Professor & AI Specialist.
        </p>

        {/* Action CTAs: Dual-Tone Actions */}
        <div ref={ctasRef} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href={hero.cta1.href || "#services"}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0284c7] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(2,132,199,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]"
            aria-label="Explore our services"
          >
            <span>{hero.cta1.label || "View Services"}</span>
            <ArrowIcon />
          </a>
          <a
            href={hero.cta2.href || "#contact"}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0284c7]/40 bg-white/95 backdrop-blur-md text-[#0284c7] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#e0f2fe] hover:border-[#0284c7] hover:scale-105 hover:shadow-[0_4px_16px_rgba(2,132,199,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]"
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
