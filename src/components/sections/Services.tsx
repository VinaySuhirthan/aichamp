"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export interface ServiceItem {
  id: number;
  name: string;
  category: "visual" | "video" | "tech" | "publishing";
  categoryLabel: string;
  tag: string;
  techStack: string;
  description: string;
  deliverables: string[];
  stat: { label: string; value: string };
  imageSrc: string;
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
    deliverables: ["Vector & CMYK Print 300DPI", "Custom LoRA Fine-Tuning", "Full Commercial Rights"],
    stat: { label: "Resolution", value: "8K Ultra-HD" },
    imageSrc: "/images/service-poster.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    deliverables: ["Cinematic Neural Motion", "Dynamic SFX & Score", "Cross-Platform Ratios"],
    stat: { label: "Turnaround", value: "24-48 Hours" },
    imageSrc: "/images/service-video.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    deliverables: ["Kinetic Typography", "Algorithmic 3s Hook Engine", "Soundtrack Licensing"],
    stat: { label: "Retention", value: "+84% Benchmark" },
    imageSrc: "/images/ai-phone.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    deliverables: ["Sub-second TTFB & Core Vitals", "Custom Interactive GSAP", "Full Responsive Architecture"],
    stat: { label: "Performance", value: "100/100 Lighthouse" },
    imageSrc: "/images/service-web.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
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
    deliverables: ["Automated Multitrack Sync", "Color Grading & Master LUT", "Narrative B-Roll AI Infill"],
    stat: { label: "Format", value: "4K Master HDR" },
    imageSrc: "/images/service-video.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    deliverables: ["Zero-Hallucination RAG Pipeline", "WhatsApp & Webhook Sync", "Live CRM Lead Capture"],
    stat: { label: "Latency", value: "< 240ms Response" },
    imageSrc: "/images/service-agents.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    deliverables: ["Autonomous Multi-Step Logic", "Tool Calling & API Bridges", "Human-in-the-Loop Safeguards"],
    stat: { label: "Architecture", value: "Multi-Agent Mesh" },
    imageSrc: "/images/service-agents.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
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
    deliverables: ["Photorealistic Lip-Sync", "40+ Languages Native Audio", "Consistent Brand Spokesperson"],
    stat: { label: "Voice Cloning", value: "99.4% Fidelity" },
    imageSrc: "/images/ai-phone.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
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
    deliverables: ["Amazon KDP Ready EPUB & PDF", "Vector Cover & Interior Typography", "Automated Sales Funnel Setup"],
    stat: { label: "Distribution", value: "Amazon, Apple & Kobo" },
    imageSrc: "/images/service-poster.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
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
    deliverables: ["Executive Presence Kit", "LinkedIn Authority Templates", "Signature Token Library"],
    stat: { label: "Positioning", value: "Top 1% Creator" },
    imageSrc: "/images/service-poster.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    deliverables: ["Organic Native Formats", "Split-Tested Creative Variations", "Conversion ROAS Optimized"],
    stat: { label: "Target ROAS", value: "3.2x - 5.5x" },
    imageSrc: "/images/service-video.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
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
    deliverables: ["Pattern Interrupt Hooks", "Broadcast-Grade Audio Mastering", "Omni-Channel Asset Package"],
    stat: { label: "Resolution", value: "4K Master ProRes" },
    imageSrc: "/images/service-video.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    deliverables: ["Golden Ratio Geometric Grid", "Universal SVG / EPS / PDF Export", "Full Brand Identity Guidelines"],
    stat: { label: "Scalability", value: "Vector Infinite" },
    imageSrc: "/images/service-poster.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    deliverables: ["Original Neural Composition", "Stems & 48kHz 24-bit WAV", "100% Royalty-Free Rights"],
    stat: { label: "Audio Fidelity", value: "Studio 24-Bit / 48kHz" },
    imageSrc: "/images/service-agents.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    deliverables: ["IEEE / Scopus Journal Targeting", "Mathematical LaTeX Typesetting", "Faculty Peer-Review Rubric"],
    stat: { label: "Supervision", value: "PhD Professor Advisor" },
    imageSrc: "/images/service-web.jpg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
      </svg>
    ),
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const cardViewportRef = useRef<HTMLDivElement>(null);
  const cardTrackRef = useRef<HTMLDivElement>(null);

  const [filter, setFilter] = useState<"all" | "visual" | "video" | "tech" | "publishing">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Filtered capabilities based on search and category
  const filteredServices = useMemo(() => {
    return allServices.filter((s) => {
      const matchesCategory = filter === "all" || s.category === filter;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        s.name.toLowerCase().includes(q) ||
        s.tag.toLowerCase().includes(q) ||
        s.techStack.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.categoryLabel.toLowerCase().includes(q) ||
        s.deliverables.some((d) => d.toLowerCase().includes(q))
      );
    });
  }, [filter, searchQuery]);

  // ─── PIN THE ENTIRE SECTION: THE BACKGROUND DOES NOT MOVE, ONLY CARDS MOVE ───
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!pinnedStageRef.current || !cardTrackRef.current || !cardViewportRef.current) return;

      // Clean existing triggers
      ScrollTrigger.getAll()
        .filter((t) => t.vars?.id === "services-fixed-bg-trigger")
        .forEach((t) => t.kill());

      const updateScrollDistance = () => {
        if (!cardTrackRef.current || !cardViewportRef.current) return 0;
        const totalHeight = cardTrackRef.current.scrollHeight;
        const viewportHeight = cardViewportRef.current.clientHeight;
        return Math.max(0, totalHeight - viewportHeight + 40);
      };

      const distance = updateScrollDistance();
      if (distance <= 0) return;

      // Pin the section: Background stays 100% frozen in place; ONLY the cards scroll upward
      const pinTrigger = ScrollTrigger.create({
        id: "services-fixed-bg-trigger",
        trigger: pinnedStageRef.current,
        start: "top 72px",
        end: () => `+=${Math.max(distance * 1.6, 1800)}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
        animation: gsap.to(cardTrackRef.current, {
          y: () => -updateScrollDistance(),
          ease: "none",
        }),
      });

      const ro = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      ro.observe(cardTrackRef.current);

      return () => {
        pinTrigger.kill();
        ro.disconnect();
      };
    });

    return () => mm.revert();
  }, [filteredServices]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[var(--ink)] relative"
      aria-labelledby="services-heading"
    >
      {/* ─── Pinned Viewport Container (Background never moves) ─── */}
      <div
        ref={pinnedStageRef}
        className="relative w-full min-h-[92vh] flex flex-col justify-between py-6 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Subtle background tech grid (completely stationary) */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        
        {/* Ambient background glow (completely stationary) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[var(--accent)]/6 blur-[150px] rounded-full pointer-events-none" />

        {/* ─── Top Control Bar: Header + Search + AI Phone Banner ─── */}
        <div className="relative z-10 w-full mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#351f23]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#f3eedf]/25 bg-[#520b12]/40 text-[#f3eedf] text-[10px] font-sans font-semibold tracking-wider uppercase mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-ping" />
                <span>AI BIZ CHAMPION</span>
                <span className="opacity-40">•</span>
                <span>BECAUSE QUALITY MATTERS</span>
              </div>
              <h2
                id="services-heading"
                className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--paper)] tracking-tight leading-tight"
              >
                15 Production-Grade <span className="text-[#f3eedf]">AI Capabilities</span>
              </h2>
            </div>

            {/* Quick Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All 15", count: 15 },
                { id: "visual", label: "Brand & Visual", count: 3 },
                { id: "video", label: "Video & Motion", count: 6 },
                { id: "tech", label: "Web & Agents", count: 3 },
                { id: "publishing", label: "Publishing", count: 3 },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all border flex items-center gap-1.5 cursor-pointer ${
                    filter === cat.id
                      ? "bg-[#c8102e] text-white border-[#c8102e] font-semibold shadow-sm"
                      : "bg-[#140b0d] text-[var(--muted-lt)] border-[#351f23] hover:border-[#f3eedf]/50 hover:text-[#f3eedf]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-sans font-bold px-1.5 py-0.2 rounded-full ${filter === cat.id ? "bg-black/30 text-white" : "text-[var(--muted)]"}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="flex items-center justify-between gap-3 pt-3">
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c8102e]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search capabilities, models, or deliverables (e.g. Video, Midjourney, Agents, LaTeX)..."
                className="w-full pl-9 pr-8 py-2 bg-[#120b0c]/90 border border-[#351f23] rounded-xl text-xs text-[var(--paper)] placeholder-[var(--muted)] focus:outline-none focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e]/30 font-sans transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--muted-lt)] hover:text-[#f3eedf]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Scroll progress & row indicator */}
            <div className="hidden sm:flex items-center gap-3 text-xs font-sans text-[var(--muted-lt)]">
              <span>
                Showing <strong className="text-[#f3eedf]">{filteredServices.length}</strong> services • 3 in a row
              </span>
              <div className="w-20 h-1.5 bg-[#241619] rounded-full overflow-hidden border border-[#351f23]">
                <div
                  className="h-full bg-[#c8102e] transition-all duration-150"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── CARD VIEWPORT: ONLY THE CARDS MOVE THROUGH THIS PINNED FRAME ─── */}
        <div
          ref={cardViewportRef}
          className="relative w-full h-[580px] md:h-[620px] overflow-hidden rounded-2xl border border-[#351f23]/60 bg-[#120b0c]/40 backdrop-blur-sm p-2 sm:p-3"
        >
          {filteredServices.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-heading text-lg text-[var(--paper)] mb-2">No capabilities match &ldquo;{searchQuery}&rdquo;</p>
              <button
                onClick={() => { setSearchQuery(""); setFilter("all"); }}
                className="px-4 py-1.5 rounded-full bg-[#c8102e] text-white text-xs font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              ref={cardTrackRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 will-change-transform"
            >
              {filteredServices.map((item) => (
                <div
                  key={item.id}
                  className="service-card-item group relative rounded-2xl border border-[#351f23] bg-gradient-to-b from-[#241619] via-[#1a1012] to-[#120b0c] p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#c8102e]/80 hover:shadow-[0_16px_36px_rgba(200,16,46,0.25)]"
                >
                  <div>
                    {/* Real AI-Generated Image Preview for every service */}
                    <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3.5 border border-[#351f23] bg-[#120b0c]">
                      <Image
                        src={item.imageSrc}
                        alt={`${item.name} AI-generated service showcase`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#120b0c] via-transparent to-transparent opacity-75" />

                      {/* Top left badge */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-sans font-semibold text-[#f3eedf] uppercase tracking-wider">
                        {item.tag}
                      </div>

                      {/* Bottom index & format */}
                      <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-sans text-[#f3eedf]">
                        <span className="font-bold text-[#c8102e]">#{item.id < 10 ? `0${item.id}` : item.id}</span>
                        <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm text-[9px]">{item.stat.value}</span>
                      </div>
                    </div>

                    {/* Title in Modern Plus Jakarta Sans */}
                    <h3 className="font-heading text-[18px] sm:text-[19px] font-bold text-[var(--paper)] group-hover:text-[#f3eedf] transition-colors mb-1.5 leading-snug tracking-[-0.015em]">
                      {item.name}
                    </h3>

                    {/* Tech Stack Chip */}
                    <p className="text-[11px] font-sans font-medium text-[#f3eedf]/85 mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e]" />
                      <span>{item.techStack}</span>
                    </p>

                    {/* Description */}
                    <p className="text-[var(--muted-lt)] text-[12.5px] leading-relaxed mb-3.5 line-clamp-3 font-sans">
                      {item.description}
                    </p>

                    {/* Deliverables Checkmark Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.deliverables.slice(0, 2).map((deliv, di) => (
                        <span
                          key={di}
                          className="inline-flex items-center gap-1 text-[10px] font-sans font-medium text-[var(--paper)] bg-[#140b0d] border border-[#351f23] px-2 py-0.5 rounded"
                        >
                          <span className="text-[#c8102e] font-bold">✓</span>
                          <span>{deliv}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-[#351f23] flex items-center justify-between font-sans">
                    <span className="text-[10px] font-sans text-[var(--muted)] uppercase tracking-wider">
                      {item.categoryLabel}
                    </span>

                    <Link
                      href="#contact"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#c8102e]/20 hover:bg-[#c8102e] text-[#f3eedf] hover:text-white border border-[#c8102e]/50 text-[11px] font-sans font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
                    >
                      <span>Inquire</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom indicator hint */}
        <div className="relative z-10 pt-2 flex items-center justify-between text-[11px] font-sans text-[var(--muted-lt)]">
          <span>↓ Scroll mouse wheel: Background remains stationary while cards glide through</span>
          <Link href="#contact" className="text-[#c8102e] hover:text-[#f3eedf] font-semibold transition-colors">
            Custom Enterprise Launch Package ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
