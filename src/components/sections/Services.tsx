"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export interface ServiceItem {
  id: number;
  name: string;
  category: "visual" | "video" | "tech" | "publishing";
  categoryLabel: string;
  tag: string;
  techStack: string;
  description: string;
  icon: React.ReactElement;
}

export const allServices: ServiceItem[] = [
  {
    id: 1,
    name: "Poster Design",
    category: "visual",
    categoryLabel: "Brand & Visual",
    tag: "Generative Art",
    techStack: "Midjourney • Vector • Print 300DPI",
    description: "Striking promotional and architectural poster visuals synthesized via custom diffusion models, human art direction, and fine Swiss typography.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
        <circle cx="15" cy="15" r="2" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Short Video Creation",
    category: "video",
    categoryLabel: "Video & Motion",
    tag: "High Velocity",
    techStack: "Runway Gen-3 • Premiere • After Effects",
    description: "Algorithmic, high-retention video sequences built with cinematic neural generation, dynamic sound design, and narrative pacing.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" />
        <line x1="19" y1="5" x2="19" y2="19" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Instagram Reels Creation",
    category: "video",
    categoryLabel: "Video & Motion",
    tag: "Viral Growth",
    techStack: "9:16 Vertical • Auto-Captions • Motion FX",
    description: "Trend-aware vertical storytelling engineered for peak algorithmic reach, kinetic typography, and instant 3-second hook retention.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <circle cx="12" cy="17" r="1" />
        <path d="M9 7h6M9 10h3" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Website Design & Development",
    category: "tech",
    categoryLabel: "Web & Intelligence",
    tag: "Enterprise",
    techStack: "Next.js • React 19 • Tailwind • Turbopack",
    description: "State-of-the-art web applications and high-conversion landing pages engineered for sub-second load times, responsiveness, and SEO dominance.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <circle cx="6" cy="7" r="1" />
        <circle cx="9" cy="7" r="1" />
      </svg>
    ),
  },
  {
    id: 5,
    name: "Vlog Creation",
    category: "video",
    categoryLabel: "Video & Motion",
    tag: "Editorial",
    techStack: "Color Grade • Smart B-Roll • Sound Design",
    description: "Turn raw founder and creator footage into polished, episodic documentaries with studio-grade pacing, transcription, and color correction.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
        <circle cx="8" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 6,
    name: "Chatbot Creation & Integration",
    category: "tech",
    categoryLabel: "Web & Intelligence",
    tag: "Autonomous",
    techStack: "RAG • Vector DB • WhatsApp API • OpenAI",
    description: "Domain-adapted conversational intelligence engines seamlessly wired to your database, website chat, WhatsApp, and CRM pipelines.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="8.5" cy="16" r="1.5" />
        <circle cx="15.5" cy="16" r="1.5" />
        <path d="M12 2v5M8 7h8" />
      </svg>
    ),
  },
  {
    id: 7,
    name: "AI Agent Development & Integration",
    category: "tech",
    categoryLabel: "Web & Intelligence",
    tag: "Next-Gen",
    techStack: "LangChain • Tool Calling • Automation",
    description: "Self-governing cognitive agent systems capable of multi-step task execution, web scraping, document synthesis, and automated business operations.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: 8,
    name: "AI Avatar Creation",
    category: "video",
    categoryLabel: "Video & Motion",
    tag: "Photoreal",
    techStack: "Neural Dubbing • Lip-Sync • 40+ Languages",
    description: "Hyper-realistic AI presenters and virtual spokespersons delivering video content at scale without studio booking or recurring production costs.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 9,
    name: "E-book Creation, Publishing & Selling",
    category: "publishing",
    categoryLabel: "Publishing & Research",
    tag: "Revenue Engine",
    techStack: "Editorial AI • EPUB / PDF • Amazon KDP",
    description: "Complete book packaging pipeline: expert manuscript formatting, high-aesthetic layout, vector covers, and global distribution setup.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="13" y2="11" />
      </svg>
    ),
  },
  {
    id: 10,
    name: "Personal Branding",
    category: "visual",
    categoryLabel: "Brand & Visual",
    tag: "Executive",
    techStack: "Identity System • LinkedIn Suite • Guidelines",
    description: "Transform academic or technical authority into a commanding digital presence with signature design tokens, bio kits, and thought-leadership assets.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: 11,
    name: "UGC Video Creation",
    category: "video",
    categoryLabel: "Video & Motion",
    tag: "Social Proof",
    techStack: "Creator Formats • Dynamic Hooks • Ad Creative",
    description: "Organic, conversion-oriented user-style video ads that feel native on TikTok, Instagram, and YouTube Shorts while boosting ad ROAS.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <polygon points="10 11 15 14 10 17 10 11" />
      </svg>
    ),
  },
  {
    id: 12,
    name: "Advertisement Video Production",
    category: "video",
    categoryLabel: "Video & Motion",
    tag: "Performance",
    techStack: "Direct Response • Sound Design • 4K Export",
    description: "Commercials constructed on data-backed creative testing: attention-grabbing pattern interrupts, clear value propositions, and compelling calls-to-action.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    ),
  },
  {
    id: 13,
    name: "Logo Design",
    category: "visual",
    categoryLabel: "Brand & Visual",
    tag: "Vector Precision",
    techStack: "Geometric Grids • SVG Matrix • Style Guide",
    description: "Timeless, mathematically proportioned startup marks and identity lockups built for ultra-clean scaling from mobile favicons to building billboards.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polygon points="12 8 8 16 16 16" />
      </svg>
    ),
  },
  {
    id: 14,
    name: "Personalized Music Creation",
    category: "publishing",
    categoryLabel: "Publishing & Research",
    tag: "Generative Audio",
    techStack: "Neural Synthesis • DAW Master • 48kHz WAV",
    description: "Custom AI-composed audio tracks, podcast theme music, and bespoke soundscapes scored specifically to reflect brand tone and video pacing.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    id: 15,
    name: "Research Paper Writing & Assistance",
    category: "publishing",
    categoryLabel: "Publishing & Research",
    tag: "Academic Gold",
    techStack: "Doctoral Review • Scopus / IEEE • LaTeX",
    description: "Scholarly methodology guidance, peer-review preparation, and technical paper structuring supervised by Dr. G. Nalinipriya, Professor & PhD Advisor.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
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
        y: 25,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });
    });
    return () => mm.revert();
  }, []);

  const filtered = filter === "all" ? allServices : allServices.filter((s) => s.category === filter);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 md:py-32 bg-[var(--ink)] relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Subtle tech background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        {/* Header Block */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-lt)] text-[11px] font-mono tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
            <span>AI BIZ CHAMPION</span>
            <span className="opacity-40">•</span>
            <span>BECAUSE QUALITY MATTERS</span>
          </div>

          <h2
            id="services-heading"
            className="font-serif text-[clamp(32px,4.5vw,56px)] text-[var(--paper)] leading-[1.25] tracking-[-0.02em] font-medium mb-5"
          >
            Pioneers in{" "}
            <span className="italic text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-8">
              AI-Powered Digital Creativity
            </span>
          </h2>

          <p className="text-[var(--muted-lt)] text-sm md:text-base leading-[1.85] max-w-2xl mx-auto">
            15 specialized, production-ready capabilities orchestrated by Dr. G. Nalinipriya — built for startups, brands, and modern institutions demanding precision and speed.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {[
            { id: "all", label: "All 15 Services", count: 15 },
            { id: "visual", label: "Brand & Visual", count: 3 },
            { id: "video", label: "Video & Motion", count: 6 },
            { id: "tech", label: "Web & Autonomous Agents", count: 3 },
            { id: "publishing", label: "Publishing & Research", count: 3 },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
                filter === cat.id
                  ? "bg-[var(--accent)] text-[var(--ink)] border-[var(--accent)] font-semibold shadow-md shadow-[var(--accent)]/25 scale-105"
                  : "bg-[var(--surface-2)]/80 text-[var(--muted-lt)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--paper)]"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  filter === cat.id ? "bg-[var(--ink)]/20 text-[var(--ink)]" : "bg-[var(--surface)] text-[var(--muted)]"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Startup-Grade Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              className="hover-shimmer group relative rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface-2)]/90 via-[var(--surface-2)]/60 to-[var(--surface)]/90 backdrop-blur-md p-7 md:p-8 transition-all duration-400 hover:border-[var(--accent)] hover:shadow-[0_16px_36px_rgba(184,146,74,0.22)] hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Top ambient highlight line */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]/10 transition-all duration-300 shadow-inner">
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs font-semibold text-[var(--accent)] tracking-widest">
                      #{item.id < 10 ? `0${item.id}` : item.id}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-medium px-2.5 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--muted-lt)] group-hover:border-[var(--accent)]/40 group-hover:text-[var(--accent-lt)] transition-colors duration-300">
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl md:text-[22px] font-medium text-[var(--paper)] leading-[1.35] mb-2.5 group-hover:text-[var(--accent-lt)] transition-colors duration-300">
                  {item.name}
                </h3>

                {/* Tech chip */}
                <p className="text-[10px] font-mono text-[var(--accent)]/80 tracking-wide uppercase mb-3">
                  {item.techStack}
                </p>

                {/* Description */}
                <p className="text-[var(--muted-lt)] text-sm leading-[1.8] mb-6">
                  {item.description}
                </p>
              </div>

              {/* Bottom Footer / Action */}
              <div className="pt-5 border-t border-[var(--border)]/70 flex items-center justify-between mt-auto">
                <span className="text-xs text-[var(--muted)] tracking-wide font-medium">
                  {item.categoryLabel}
                </span>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] group-hover:text-[var(--accent-lt)] group-hover:translate-x-1 transition-all duration-300 cursor-pointer"
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
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold mb-1">
              Custom Startup Architecture
            </p>
            <p className="font-serif text-lg md:text-xl text-[var(--paper)]">
              Looking for a tailored end-to-end launch package? Let AI Biz Champion build your growth engine.
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
