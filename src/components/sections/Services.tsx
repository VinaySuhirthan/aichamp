"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export interface ServiceItem {
  id: number;
  emoji: string;
  name: string;
  category: "visual" | "video" | "tech" | "publishing";
  categoryLabel: string;
  tag: string;
  description: string;
}

export const allServices: ServiceItem[] = [
  {
    id: 1,
    emoji: "🎨",
    name: "Poster Design",
    category: "visual",
    categoryLabel: "Visual Design",
    tag: "High Impact",
    description: "Striking, event-grade and campaign poster visuals synthesized with custom generative art styles and fine typography.",
  },
  {
    id: 2,
    emoji: "🎬",
    name: "Short Video Creation",
    category: "video",
    categoryLabel: "Video & Content",
    tag: "Trending",
    description: "Dynamic micro-content engineered for modern attention spans, high algorithmic velocity, and viral audience retention.",
  },
  {
    id: 3,
    emoji: "📱",
    name: "Instagram Reels Creation",
    category: "video",
    categoryLabel: "Video & Content",
    tag: "Top Growth",
    description: "Trend-aligned, visually arresting vertical videos cut with rhythm, sound design, and custom AI visual sequences.",
  },
  {
    id: 4,
    emoji: "🌐",
    name: "Website Design & Development",
    category: "tech",
    categoryLabel: "Web & Intelligence",
    tag: "Flagship",
    description: "Ultra-fast, award-standard bespoke websites built on Next.js, modern CSS, dynamic motion, and full responsiveness.",
  },
  {
    id: 5,
    emoji: "📹",
    name: "Vlog Creation",
    category: "video",
    categoryLabel: "Video & Content",
    tag: "Storytelling",
    description: "Cinematic narrative editing, smart B-roll synthesis, audio sweetening, and consistent personal brand packaging.",
  },
  {
    id: 6,
    emoji: "🤖",
    name: "Chatbot Creation & Integration",
    category: "tech",
    categoryLabel: "Web & Intelligence",
    tag: "Automated",
    description: "Domain-tuned conversational AI chatbots seamlessly embedded into websites, WhatsApp, and internal business workflows.",
  },
  {
    id: 7,
    emoji: "🧠",
    name: "AI Agent Development & Integration",
    category: "tech",
    categoryLabel: "Web & Intelligence",
    tag: "Advanced",
    description: "Autonomous reasoning agents with tool usage, web scraping, and multi-step pipeline automation designed for scale.",
  },
  {
    id: 8,
    emoji: "👤",
    name: "AI Avatar Creation",
    category: "video",
    categoryLabel: "Video & Content",
    tag: "Hyper-Real",
    description: "Lifelike digital presenters and multilingual spokespersons for scalable course delivery and corporate comms.",
  },
  {
    id: 9,
    emoji: "📚",
    name: "E-book Creation, Publishing & Selling",
    category: "publishing",
    categoryLabel: "Publishing & Research",
    tag: "Monetization",
    description: "End-to-end authoring, editorial polish, aesthetic cover design, and multichannel digital storefront publishing.",
  },
  {
    id: 10,
    emoji: "👑",
    name: "Personal Branding",
    category: "visual",
    categoryLabel: "Visual Design",
    tag: "Authority",
    description: "Executive and founder identity systems: signature visual palettes, bespoke typography, and omnichannel presence.",
  },
  {
    id: 11,
    emoji: "🎥",
    name: "UGC Video Creation",
    category: "video",
    categoryLabel: "Video & Content",
    tag: "Conversion",
    description: "Authentic, relatable creator-style user generated videos crafted to skyrocket ad performance and consumer trust.",
  },
  {
    id: 12,
    emoji: "📢",
    name: "Advertisement Video Production",
    category: "video",
    categoryLabel: "Video & Content",
    tag: "ROI Driven",
    description: "Commercial-grade video ads built on psychological hook structures, emotional resonance, and crisp call-to-actions.",
  },
  {
    id: 13,
    emoji: "💡",
    name: "Logo Design",
    category: "visual",
    categoryLabel: "Visual Design",
    tag: "Iconic",
    description: "Timeless, mathematically balanced marks and visual identity emblems rooted in conceptual depth and vector perfection.",
  },
  {
    id: 14,
    emoji: "🎵",
    name: "Personalized Music Creation",
    category: "publishing",
    categoryLabel: "Publishing & Research",
    tag: "Custom Audio",
    description: "Original, AI-composed adaptive soundtracks and audio branding custom-scored for videos, events, and releases.",
  },
  {
    id: 15,
    emoji: "📝",
    name: "Research Paper Writing & Assistance",
    category: "publishing",
    categoryLabel: "Publishing & Research",
    tag: "Doctoral Grade",
    description: "Rigorous scholarly guidance, literature review synthesis, and publication prep led by Professor Dr. G. Nalinipriya.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "visual" | "video" | "tech" | "publishing">("all");

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!headingRef.current) return;
      gsap.from(headingRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });

      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          opacity: 0,
          y: 25,
          stagger: 0.04,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 88%",
          },
        });
      }
    });
    return () => mm.revert();
  }, []);

  const filtered = filter === "all" ? allServices : allServices.filter((s) => s.category === filter);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 md:py-28 bg-[var(--ink)] relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        {/* Header Block */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-lt)] text-xs font-semibold tracking-wider uppercase mb-5 shadow-sm">
            <span>🚀 AI bis Champ</span>
            <span className="opacity-40">•</span>
            <span>✨ Because Quality Matters</span>
          </div>

          <h2
            id="services-heading"
            className="font-serif text-[clamp(30px,4.5vw,56px)] text-[var(--paper)] leading-[1.05] tracking-[-0.02em] font-medium mb-4"
          >
            We Are Pioneers in{" "}
            <span className="italic text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-8">
              AI-Powered Digital Creativity
            </span>
          </h2>

          <p className="text-[var(--muted-lt)] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Offering the following 15 specialized capabilities — orchestrated by Dr. G. Nalinipriya to combine academic excellence with high-velocity creative production.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: "all", label: "All 15 Services", count: 15 },
            { id: "visual", label: "🎨 Visual Design", count: 3 },
            { id: "video", label: "🎬 Video & Motion", count: 6 },
            { id: "tech", label: "🌐 Web & AI Agents", count: 3 },
            { id: "publishing", label: "📚 Publishing & Research", count: 3 },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
                filter === cat.id
                  ? "bg-[var(--accent)] text-[var(--ink)] border-[var(--accent)] font-semibold shadow-md shadow-[var(--accent)]/20 scale-105"
                  : "bg-[var(--surface-2)]/80 text-[var(--muted-lt)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--paper)]"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filter === cat.id ? "bg-[var(--ink)]/20 text-[var(--ink)]" : "bg-[var(--surface)] text-[var(--muted)]"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Super Dooper Highlighted Grid of 15 Works */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              className="hover-shimmer group relative rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface-2)]/90 to-[var(--surface)]/90 backdrop-blur-md p-6 transition-all duration-400 hover:border-[var(--accent)] hover:shadow-[0_12px_32px_rgba(184,146,74,0.22)] hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Top ambient highlight line */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-[var(--accent)] transition-all duration-300 shadow-inner">
                      {item.emoji}
                    </div>
                    <span className="font-mono text-xs font-semibold text-[var(--accent)] tracking-wider">
                      #{item.id < 10 ? `0${item.id}` : item.id}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-medium px-2.5 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--muted-lt)] group-hover:border-[var(--accent)]/40 group-hover:text-[var(--accent-lt)] transition-colors duration-300">
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-medium text-[var(--paper)] mb-2.5 group-hover:text-[var(--accent-lt)] transition-colors duration-300">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-[var(--muted-lt)] text-xs md:text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Bottom Footer / Action */}
              <div className="pt-4 border-t border-[var(--border)]/70 flex items-center justify-between">
                <span className="text-[11px] text-[var(--muted)] tracking-wide">
                  {item.categoryLabel}
                </span>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] group-hover:text-[var(--accent-lt)] group-hover:translate-x-1 transition-all duration-300 cursor-pointer"
                >
                  <span>Inquire</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Callout */}
        <div className="mt-14 p-6 md:p-8 rounded-2xl border border-[var(--accent)]/30 bg-gradient-to-r from-[var(--surface-2)] via-[var(--surface)] to-[var(--surface-2)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-1">
              Custom Requirements?
            </p>
            <p className="font-serif text-lg md:text-xl text-[var(--paper)]">
              Combine any of the 15 services into a bespoke institutional or enterprise package.
            </p>
          </div>
          <Link
            href="#contact"
            className="px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--ink)] font-semibold text-xs tracking-wider uppercase hover:bg-[var(--accent-lt)] transition-all duration-300 shadow-lg shadow-[var(--accent)]/20 whitespace-nowrap cursor-pointer hover:scale-105"
          >
            Start Your Project ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
