"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export interface ServiceItem {
  id: number;
  number: string;
  name: string;
  category: "visual" | "video" | "tech" | "publishing";
  categoryLabel: string;
  tag: string;
  badgeStatus: string;
  techStack: string;
  description: string;
  deliverables: string[];
  stat: { label: string; value: string };
  sla: string;
  imageSrc: string;
  colorAccent: string;
}

export const allServices: ServiceItem[] = [
  {
    id: 1,
    number: "01",
    name: "Poster Design",
    category: "visual",
    categoryLabel: "Brand & Visual",
    tag: "Generative Art",
    badgeStatus: "8K PRODUCTION GRADE",
    techStack: "Midjourney v6.1 • Vector • Print 300DPI",
    description: "Striking promotional and architectural poster visuals synthesized via custom diffusion models, human art direction, and fine Swiss typography.",
    deliverables: ["Vector & CMYK Print 300DPI", "Custom LoRA Fine-Tuning", "Full Commercial & Resale Rights"],
    stat: { label: "Resolution", value: "8K Ultra-HD" },
    sla: "24-48h Delivery",
    imageSrc: "/images/service-poster.jpg",
    colorAccent: "#0284c7",
  },
  {
    id: 2,
    number: "02",
    name: "Short Video Creation",
    category: "video",
    categoryLabel: "Video & Motion",
    tag: "High Velocity",
    badgeStatus: "CINEMATIC NEURAL MOTION",
    techStack: "Runway Gen-3 • Premiere • After Effects",
    description: "Algorithmic, high-retention video sequences built with cinematic neural generation, dynamic sound design, and narrative pacing.",
    deliverables: ["Cinematic Neural Motion", "Dynamic SFX & Custom Score", "Multi-Platform 9:16 & 16:9 Ratios"],
    stat: { label: "Turnaround", value: "24-48 Hours" },
    sla: "Daily Iterations",
    imageSrc: "/images/service-video.jpg",
    colorAccent: "#0ea5e9",
  },
  {
    id: 3,
    number: "03",
    name: "Instagram Reels Creation",
    category: "video",
    categoryLabel: "Video & Motion",
    tag: "Viral Growth",
    badgeStatus: "ALGORITHMIC HOOK ENGINE",
    techStack: "9:16 Vertical • Auto-Captions • Motion FX",
    description: "Trend-aware vertical storytelling engineered for peak algorithmic reach, kinetic typography, and instant 3-second hook retention.",
    deliverables: ["Kinetic Typography", "Algorithmic 3s Hook Engine", "Soundtrack Licensing & Sync"],
    stat: { label: "Retention", value: "+84% Benchmark" },
    sla: "10-20 Reels / Sprint",
    imageSrc: "/images/ai-phone.jpg",
    colorAccent: "#8b5cf6",
  },
  {
    id: 4,
    number: "04",
    name: "Website Design & Development",
    category: "tech",
    categoryLabel: "Web & Agents",
    tag: "Enterprise",
    badgeStatus: "LIGHTHOUSE 100/100",
    techStack: "Next.js 15 • React 19 • Tailwind • GSAP",
    description: "State-of-the-art web applications and high-conversion landing pages engineered for sub-second load times, responsiveness, and SEO dominance.",
    deliverables: ["Sub-second TTFB & Core Vitals", "Custom Interactive GSAP Engine", "Full Responsive Architecture"],
    stat: { label: "Performance", value: "100/100 Lighthouse" },
    sla: "1-2 Weeks Launch",
    imageSrc: "/images/service-web.jpg",
    colorAccent: "#0284c7",
  },
  {
    id: 5,
    number: "05",
    name: "Vlog Creation",
    category: "video",
    categoryLabel: "Video & Motion",
    tag: "Editorial",
    badgeStatus: "4K HDR MASTER",
    techStack: "Multitrack Sync • Smart B-Roll • Sound Design",
    description: "Turn raw founder and creator footage into polished, episodic documentaries with studio-grade pacing, transcription, and color correction.",
    deliverables: ["Automated Multitrack Sync", "Color Grading & Master LUT", "Narrative B-Roll AI Infill"],
    stat: { label: "Master Format", value: "4K Master HDR" },
    sla: "3-5 Days Episodic",
    imageSrc: "/images/service-video.jpg",
    colorAccent: "#38bdf8",
  },
  {
    id: 6,
    number: "06",
    name: "Chatbot Creation & Integration",
    category: "tech",
    categoryLabel: "Web & Agents",
    tag: "Autonomous",
    badgeStatus: "ZERO-HALLUCINATION RAG",
    techStack: "RAG • Vector DB • WhatsApp API • OpenAI",
    description: "Domain-adapted conversational intelligence engines seamlessly wired to your database, website chat, WhatsApp, and CRM pipelines.",
    deliverables: ["Zero-Hallucination RAG Pipeline", "WhatsApp & Webhook Sync", "Live CRM Lead Capture & Analytics"],
    stat: { label: "Latency", value: "< 240ms Response" },
    sla: "48h Deployment",
    imageSrc: "/images/service-agents.jpg",
    colorAccent: "#10b981",
  },
  {
    id: 7,
    number: "07",
    name: "AI Agent Development & Integration",
    category: "tech",
    categoryLabel: "Web & Agents",
    tag: "Next-Gen",
    badgeStatus: "MULTI-AGENT MESH",
    techStack: "LangChain • Tool Calling • Cognitive Automations",
    description: "Self-governing cognitive agent systems capable of multi-step task execution, web scraping, document synthesis, and automated business operations.",
    deliverables: ["Autonomous Multi-Step Logic", "Tool Calling & API Bridges", "Human-in-the-Loop Safeguards"],
    stat: { label: "Architecture", value: "Multi-Agent Mesh" },
    sla: "1-3 Weeks Custom",
    imageSrc: "/images/service-agents.jpg",
    colorAccent: "#0284c7",
  },
  {
    id: 8,
    number: "08",
    name: "AI Avatar Creation",
    category: "video",
    categoryLabel: "Video & Motion",
    tag: "Photoreal",
    badgeStatus: "99.4% VOICE FIDELITY",
    techStack: "Neural Dubbing • Lip-Sync • 40+ Languages",
    description: "Hyper-realistic AI presenters and virtual spokespersons delivering video content at scale without studio booking or recurring production costs.",
    deliverables: ["Photorealistic Lip-Sync", "40+ Languages Native Audio", "Consistent Brand Spokesperson Token"],
    stat: { label: "Voice Cloning", value: "99.4% Fidelity" },
    sla: "24h Video Delivery",
    imageSrc: "/images/ai-phone.jpg",
    colorAccent: "#ec4899",
  },
  {
    id: 9,
    number: "09",
    name: "E-book Creation, Publishing & Selling",
    category: "publishing",
    categoryLabel: "Publishing & Research",
    tag: "Revenue Engine",
    badgeStatus: "AMAZON KDP READY",
    techStack: "Editorial AI • EPUB / PDF • Amazon KDP",
    description: "Complete book packaging pipeline: expert manuscript formatting, high-aesthetic layout, vector covers, and global distribution setup.",
    deliverables: ["Amazon KDP Ready EPUB & PDF", "Vector Cover & Interior Typography", "Automated Sales Funnel Setup"],
    stat: { label: "Distribution", value: "Amazon, Apple & Kobo" },
    sla: "5-7 Days Turnkey",
    imageSrc: "/images/service-poster.jpg",
    colorAccent: "#f59e0b",
  },
  {
    id: 10,
    number: "10",
    name: "Personal Branding",
    category: "visual",
    categoryLabel: "Brand & Visual",
    tag: "Executive",
    badgeStatus: "TOP 1% AUTHORITY SUITE",
    techStack: "Identity System • LinkedIn Suite • Guidelines",
    description: "Transform academic or technical authority into a commanding digital presence with signature design tokens, bio kits, and thought-leadership assets.",
    deliverables: ["Executive Presence Kit", "LinkedIn Authority Templates", "Signature Token Library"],
    stat: { label: "Positioning", value: "Top 1% Creator" },
    sla: "Full Kit in 7 Days",
    imageSrc: "/images/1.webp",
    colorAccent: "#4f46e5",
  },
  {
    id: 11,
    number: "11",
    name: "UGC Video Creation",
    category: "video",
    categoryLabel: "Video & Motion",
    tag: "Social Proof",
    badgeStatus: "DIRECT RESPONSE ROAS",
    techStack: "Creator Formats • Dynamic Hooks • Ad Creative",
    description: "Organic, conversion-oriented user-style video ads that feel native on TikTok, Instagram, and YouTube Shorts while boosting ad ROAS.",
    deliverables: ["Organic Native Formats", "Split-Tested Creative Variations", "Conversion ROAS Optimized"],
    stat: { label: "Target ROAS", value: "3.2x - 5.5x" },
    sla: "48h Per Ad Batch",
    imageSrc: "/images/ai-phone.jpg",
    colorAccent: "#06b6d4",
  },
  {
    id: 12,
    number: "12",
    name: "Advertisement Video Production",
    category: "video",
    categoryLabel: "Video & Motion",
    tag: "Performance",
    badgeStatus: "PRORES 4K MASTER",
    techStack: "Direct Response • Sound Design • 4K Export",
    description: "Commercials constructed on data-backed creative testing: attention-grabbing pattern interrupts, clear value propositions, and compelling calls-to-action.",
    deliverables: ["Pattern Interrupt Hooks", "Broadcast-Grade Audio Mastering", "Omni-Channel Asset Package"],
    stat: { label: "Master Output", value: "4K Master ProRes" },
    sla: "3-5 Days Turnkey",
    imageSrc: "/images/service-video.jpg",
    colorAccent: "#0284c7",
  },
  {
    id: 13,
    number: "13",
    name: "Logo Design",
    category: "visual",
    categoryLabel: "Brand & Visual",
    tag: "Vector Precision",
    badgeStatus: "GOLDEN RATIO GEOMETRY",
    techStack: "Geometric Grids • SVG Matrix • Style Guide",
    description: "Timeless, mathematically proportioned startup marks and identity lockups built for ultra-clean scaling from mobile favicons to building billboards.",
    deliverables: ["Golden Ratio Geometric Grid", "Universal SVG / EPS / PDF Export", "Full Brand Identity Guidelines"],
    stat: { label: "Scalability", value: "Vector Infinite" },
    sla: "48-72h 3 Concepts",
    imageSrc: "/images/service-poster.jpg",
    colorAccent: "#8b5cf6",
  },
  {
    id: 14,
    number: "14",
    name: "Personalized Music Creation",
    category: "publishing",
    categoryLabel: "Publishing & Research",
    tag: "Generative Audio",
    badgeStatus: "24-BIT / 48KHZ WAV",
    techStack: "Neural Synthesis • DAW Master • 48kHz WAV",
    description: "Custom AI-composed audio tracks, podcast theme music, and bespoke soundscapes scored specifically to reflect brand tone and video pacing.",
    deliverables: ["Original Neural Composition", "Stems & 48kHz 24-bit WAV", "100% Royalty-Free Rights"],
    stat: { label: "Audio Fidelity", value: "Studio 24-Bit / 48kHz" },
    sla: "24-48h Master",
    imageSrc: "/images/service-agents.jpg",
    colorAccent: "#0ea5e9",
  },
  {
    id: 15,
    number: "15",
    name: "Research Paper Writing & Assistance",
    category: "publishing",
    categoryLabel: "Publishing & Research",
    tag: "Academic Gold",
    badgeStatus: "PHD ADVISOR REVIEWED",
    techStack: "Doctoral Review • Scopus / IEEE • LaTeX",
    description: "Scholarly methodology guidance, peer-review preparation, and technical paper structuring supervised by Dr. G. Nalinipriya, Professor & PhD Advisor.",
    deliverables: ["IEEE / Scopus Journal Targeting", "Mathematical LaTeX Typesetting", "Faculty Peer-Review Rubric"],
    stat: { label: "Supervision", value: "PhD Professor Advisor" },
    sla: "Doctoral Consultation",
    imageSrc: "/images/11.webp",
    colorAccent: "#0284c7",
  },
];

/* ─── High-Performance 3D Service Card ───────────────────────── */
function ServiceCard({
  item,
  index,
  onOpenSpec,
  mode = "carousel",
  isActive = false,
}: {
  item: ServiceItem;
  index: number;
  onOpenSpec: (item: ServiceItem) => void;
  mode?: "carousel" | "grid";
  isActive?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set coordinates for the specular spotlight
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // 3D Tilt calculation (ranges from -1 to 1)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
    const rotateY = ((x - centerX) / centerX) * 9;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenSpec(item)}
      className={`card-spotlight preserve-3d group relative flex flex-col justify-between rounded-2xl border bg-white p-4.5 sm:p-5 transition-all duration-300 cursor-pointer shadow-sm ${
        isActive
          ? "border-[#0284c7] service-active-halo"
          : "border-[#e8dfd3] hover:border-[#38bdf8] hover:shadow-[0_20px_40px_rgba(2,132,199,0.14)]"
      } ${mode === "carousel" ? "w-[330px] sm:w-[370px] flex-shrink-0" : "w-full"}`}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* ─── Top Media Preview Frame with 3D Depth ─── */}
      <div className="translate-z-20 relative w-full h-36 sm:h-38 rounded-xl overflow-hidden mb-3.5 border border-[#e8dfd3] bg-[#f4efe6]">
        <Image
          src={item.imageSrc}
          alt={`${item.name} AI Capability Showcase`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          sizes="(max-width: 768px) 100vw, 400px"
        />

        {/* Cinematic dark gradient scrim for high-contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c192c]/90 via-[#0c192c]/30 to-transparent" />

        {/* Top Floating Badge Bar */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0c192c]/85 backdrop-blur-md border border-white/20 text-[9px] font-sans font-bold text-white uppercase tracking-wider shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
            <span>{item.tag}</span>
          </div>

          <div className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-[#bae6fd]">
            // {item.number}
          </div>
        </div>

        {/* Bottom Status & Key Metric */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white pointer-events-none">
          <div className="text-[9.5px] font-mono tracking-wider text-[#7dd3fc] font-semibold flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-[#38bdf8]" />
            <span>{item.badgeStatus}</span>
          </div>

          <div className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[9.5px] font-sans font-bold text-white border border-white/20">
            {item.stat.value}
          </div>
        </div>
      </div>

      {/* ─── Card Core Info with 3D Layer Elevation ─── */}
      <div className="translate-z-30 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Title in Crisp Plus Jakarta Sans */}
          <h3 className="font-heading text-[18px] sm:text-[19px] font-extrabold text-[#0c192c] group-hover:text-[#0284c7] transition-colors mb-1 leading-snug tracking-tight">
            {item.name}
          </h3>

          {/* Tech Stack Chip */}
          <div className="flex items-center gap-1.5 text-[11px] font-sans font-semibold text-[#0284c7] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span className="truncate">{item.techStack}</span>
          </div>

          {/* High-Craft Description */}
          <p className="text-[#475569] text-[12.5px] leading-relaxed mb-3 line-clamp-2 sm:line-clamp-3 font-sans">
            {item.description}
          </p>

          {/* Deliverables Checklist Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {item.deliverables.slice(0, 2).map((deliv, di) => (
              <span
                key={di}
                className="inline-flex items-center gap-1.5 text-[10px] font-sans font-medium text-[#0c192c] bg-[#f8fafc] border border-[#e2e8f0] px-2 py-0.5 rounded-lg group-hover:border-[#bae6fd] transition-colors"
              >
                <span className="text-[#0284c7] font-bold text-xs">✓</span>
                <span>{deliv}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ─── Card Footer Action Bar ─── */}
        <div className="pt-3 border-t border-[#f1e9de] flex items-center justify-between font-sans">
          <div className="flex flex-col">
            <span className="text-[9.5px] font-sans text-[#64748b] uppercase tracking-wider font-bold">
              {item.categoryLabel}
            </span>
            <span className="text-[9.5px] font-mono text-[#0284c7]">
              {item.sla}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSpec(item);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e0f2fe] hover:bg-[#0284c7] text-[#0284c7] hover:text-white border border-[#bae6fd] text-[10.5px] font-sans font-bold tracking-wider uppercase transition-all duration-300 shadow-sm group-hover:scale-105"
          >
            <span>Explore Specs</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Services Component ────────────────────────────────── */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const runwayContainerRef = useRef<HTMLDivElement>(null);
  const runwayTrackRef = useRef<HTMLDivElement>(null);
  const gridTrackRef = useRef<HTMLDivElement>(null);

  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [filter, setFilter] = useState<"all" | "visual" | "video" | "tech" | "publishing">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Filtered capabilities
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

  // ─── BUTTER-SMOOTH HORIZONTAL SCROLLTRIGGER FOR CINEMATIC RUNWAY ───
  useEffect(() => {
    if (viewMode !== "carousel") return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const container = runwayContainerRef.current;
      const track = runwayTrackRef.current;
      if (!container || !track) return;

      // Clean existing triggers for this section
      ScrollTrigger.getAll()
        .filter((t) => t.vars?.id === "services-runway-trigger")
        .forEach((t) => t.kill());

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const containerWidth = container.clientWidth;
        return Math.max(0, trackWidth - containerWidth + 60);
      };

      const distance = getScrollAmount();
      if (distance <= 0) return;

      const trigger = ScrollTrigger.create({
        id: "services-runway-trigger",
        trigger: container,
        start: "top 76px",
        end: () => `+=${Math.max(distance * 1.25, 1600)}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const totalCards = filteredServices.length;
          if (totalCards > 0) {
            const index = Math.min(
              totalCards - 1,
              Math.floor(self.progress * totalCards)
            );
            setActiveCardIndex(index);
          }
        },
        animation: gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
        }),
      });

      const ro = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      ro.observe(track);

      return () => {
        trigger.kill();
        ro.disconnect();
      };
    });

    return () => mm.revert();
  }, [viewMode, filteredServices]);

  // ─── STAGGERED 3D ENTRANCE FOR GRID MODE ───
  useEffect(() => {
    if (viewMode !== "grid") return;

    const ctx = gsap.context(() => {
      if (!gridTrackRef.current) return;
      const cards = gridTrackRef.current.querySelectorAll(".card-spotlight");

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
          rotateX: 12,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridTrackRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [viewMode, filteredServices]);

  // Close modal on Escape key
  useEffect(() => {
    if (!selectedService) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedService]);

  // Scroll Runway programmatically with navigation arrows
  const slideRunway = (direction: "left" | "right") => {
    if (!runwayTrackRef.current) return;
    const cardWidth = 410;
    const scrollOffset = direction === "left" ? -cardWidth : cardWidth;
    runwayTrackRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  // Open chatbot with pre-filled message
  const handleAskAIAboutService = (service: ServiceItem) => {
    setSelectedService(null);
    const msg = `I would like to inquire about the ${service.name} capability (${service.stat.value}, ${service.techStack}). What are the deliverables and timeline?`;
    window.dispatchEvent(new CustomEvent("open-ai-chat", { detail: { message: msg } }));
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[var(--ink)] relative"
      aria-labelledby="services-heading"
    >
      {/* ─── Background Ambient Atmosphere ─── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0284c7 1px, transparent 1px), linear-gradient(to bottom, #0284c7 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0284c7]/5 blur-[160px] rounded-full pointer-events-none" />

      {/* ─── Sticky / Pinned Stage Container ─── */}
      <div
        ref={runwayContainerRef}
        className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-between ${
          viewMode === "carousel" ? "min-h-[92vh] py-6 overflow-hidden" : "py-14"
        }`}
      >
        {/* ─── Control Bar: Brand Heading + Category Pills + View Switcher ─── */}
        <div className="relative z-20 w-full mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#e8dfd3]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0ea5e9]/40 bg-white text-[#0c192c] text-[10px] font-sans font-bold tracking-wider uppercase mb-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-ping" />
                <span>AI BIZ CHAMP</span>
                <span className="opacity-40">•</span>
                <span>BECAUSE QUALITY MATTERS</span>
              </div>
              <h2
                id="services-heading"
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0c192c] tracking-tight leading-tight"
              >
                15 Production-Grade <span className="text-[#0284c7]">AI Capabilities</span>
              </h2>
            </div>

            {/* Quick Filter Categories + View Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap items-center gap-1.5 bg-white/70 backdrop-blur-sm p-1 rounded-2xl border border-[#e8dfd3] shadow-sm">
                {[
                  { id: "all", label: "All 15", count: 15 },
                  { id: "visual", label: "Brand & Visual", count: 3 },
                  { id: "video", label: "Video & Motion", count: 6 },
                  { id: "tech", label: "Web & Agents", count: 3 },
                  { id: "publishing", label: "Publishing", count: 3 },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setFilter(cat.id as any);
                      setActiveCardIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all border flex items-center gap-1.5 cursor-pointer ${
                      filter === cat.id
                        ? "bg-[#0284c7] text-white border-[#0284c7] shadow-sm"
                        : "bg-white text-[#475569] border-transparent hover:border-[#bae6fd] hover:text-[#0284c7]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                        filter === cat.id ? "bg-white/20 text-white" : "bg-[#f4efe6] text-[#64748b]"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* View Switcher Toggle: Cinematic Runway vs 3D Grid */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#e8dfd3] shadow-sm">
                <button
                  type="button"
                  onClick={() => setViewMode("carousel")}
                  title="Cinematic Runway (Smooth 3D Scroll)"
                  className={`px-2.5 py-1 rounded-lg text-xs font-sans font-semibold flex items-center gap-1 transition-all ${
                    viewMode === "carousel"
                      ? "bg-[#0284c7] text-white shadow-xs"
                      : "text-[#64748b] hover:text-[#0c192c]"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                  <span>Runway</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  title="3D Grid View"
                  className={`px-2.5 py-1 rounded-lg text-xs font-sans font-semibold flex items-center gap-1 transition-all ${
                    viewMode === "grid"
                      ? "bg-[#0284c7] text-white shadow-xs"
                      : "text-[#64748b] hover:text-[#0c192c]"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  <span>Grid</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar + Progress Indicators */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3.5">
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0284c7]">
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
                className="w-full pl-9 pr-8 py-2 bg-white border border-[#e8dfd3] rounded-xl text-xs text-[#0c192c] placeholder-[#64748b] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 font-sans shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#64748b] hover:text-[#0c192c]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Scrubber & Arrow Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-sans text-[#475569]">
              <span>
                Showing <strong className="text-[#0c192c]">{filteredServices.length}</strong> capabilities
              </span>

              {viewMode === "carousel" && (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#0284c7]">
                      {activeCardIndex + 1 < 10 ? `0${activeCardIndex + 1}` : activeCardIndex + 1} /{" "}
                      {filteredServices.length < 10 ? `0${filteredServices.length}` : filteredServices.length}
                    </span>
                    <div className="w-24 h-1.5 bg-[#e0f2fe] rounded-full overflow-hidden border border-[#bae6fd]">
                      <div
                        className="h-full bg-[#0284c7] transition-all duration-150"
                        style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => slideRunway("left")}
                      title="Slide Left"
                      className="w-7 h-7 rounded-full bg-white border border-[#e8dfd3] flex items-center justify-center text-[#0c192c] hover:bg-[#e0f2fe] hover:border-[#0284c7] transition-colors shadow-xs"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => slideRunway("right")}
                      title="Slide Right"
                      className="w-7 h-7 rounded-full bg-white border border-[#e8dfd3] flex items-center justify-center text-[#0c192c] hover:bg-[#e0f2fe] hover:border-[#0284c7] transition-colors shadow-xs"
                    >
                      →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── CARD STAGE ─── */}
        {filteredServices.length === 0 ? (
          <div className="py-24 text-center bg-white/70 rounded-2xl border border-[#e8dfd3] p-8 shadow-sm">
            <p className="font-heading text-lg font-bold text-[#0c192c] mb-2">
              No capabilities match &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-xs text-[#64748b] mb-4">
              Try searching for &quot;Video&quot;, &quot;Agents&quot;, &quot;Reels&quot;, or &quot;Research&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilter("all");
              }}
              className="px-4 py-2 rounded-full bg-[#0284c7] text-white text-xs font-bold cursor-pointer hover:bg-[#0369a1] transition-all shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "carousel" ? (
          /* ─── CINEMATIC HORIZONTAL RUNWAY MODE ─── */
          <div className="relative w-full overflow-x-auto card-runway-track py-4">
            <div
              ref={runwayTrackRef}
              className="flex items-stretch gap-6 sm:gap-7 will-change-transform pb-2"
            >
              {filteredServices.map((item, index) => (
                <ServiceCard
                  key={item.id}
                  item={item}
                  index={index}
                  mode="carousel"
                  isActive={index === activeCardIndex}
                  onOpenSpec={(svc) => setSelectedService(svc)}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ─── 3D WATERFALL GRID MODE ─── */
          <div
            ref={gridTrackRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
            {filteredServices.map((item, index) => (
              <ServiceCard
                key={item.id}
                item={item}
                index={index}
                mode="grid"
                onOpenSpec={(svc) => setSelectedService(svc)}
              />
            ))}
          </div>
        )}

        {/* ─── Bottom Hints & Consultation Bridge ─── */}
        <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#64748b] gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
            <span>
              {viewMode === "carousel"
                ? "↓ Scroll down mouse wheel to glide smoothly through 3D capabilities"
                : "Hover on any card for 3D tilt perspective • Click for technical specification"}
            </span>
          </div>

          <Link
            href="#contact"
            className="text-[#0284c7] hover:text-[#0369a1] font-bold transition-colors flex items-center gap-1 hover:underline"
          >
            <span>Custom Enterprise Solution Matrix</span>
            <span>↗</span>
          </Link>
        </div>
      </div>

      {/* ─── BUTTER-SMOOTH CAPABILITY SPEC MODAL / DRAWER ─── */}
      {selectedService && (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 bg-[#0c192c]/65 backdrop-blur-md transition-all animate-fadeIn"
          onClick={() => setSelectedService(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#e8dfd3] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(2,132,199,0.3)] overflow-hidden transition-all transform scale-100"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f4efe6] hover:bg-[#e0f2fe] text-[#0c192c] hover:text-[#0284c7] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer border border-[#e8dfd3]"
              aria-label="Close specification modal"
            >
              ✕
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#e0f2fe] text-[#0284c7] font-mono font-bold text-xs border border-[#bae6fd]">
                // {selectedService.number} {selectedService.categoryLabel}
              </span>
              <span className="text-xs font-mono text-[#64748b]">
                {selectedService.sla}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0c192c] mb-2 leading-tight">
              {selectedService.name}
            </h3>

            {/* Tech Stack Bar */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-xs font-mono text-[#0284c7] mb-4 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>{selectedService.techStack}</span>
            </div>

            {/* Description */}
            <p className="text-[#334155] text-sm leading-relaxed mb-6 font-sans">
              {selectedService.description}
            </p>

            {/* Production Deliverables Specification */}
            <div className="mb-6">
              <h4 className="text-xs font-sans uppercase font-extrabold text-[#0c192c] tracking-wider mb-2.5">
                Exact Deliverables & Production Guarantees
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {selectedService.deliverables.map((deliv, di) => (
                  <div
                    key={di}
                    className="p-3 rounded-xl bg-[#faf7f0] border border-[#e8dfd3] flex flex-col justify-between"
                  >
                    <span className="text-[#0284c7] font-bold text-sm mb-1">0{di + 1} ✓</span>
                    <span className="text-xs font-sans font-semibold text-[#0c192c]">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Proof Badge */}
            <div className="p-3.5 rounded-2xl bg-[#e0f2fe]/50 border border-[#bae6fd] flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-sans text-[#64748b] block font-medium">Verified Benchmark</span>
                <span className="text-base font-extrabold text-[#0c192c] font-sans">{selectedService.stat.value}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-sans text-[#64748b] block font-medium">Standard SLA</span>
                <span className="text-base font-extrabold text-[#0284c7] font-mono">{selectedService.sla}</span>
              </div>
            </div>

            {/* Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => handleAskAIAboutService(selectedService)}
                className="w-full sm:flex-1 py-3 px-5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.01]"
              >
                <span>🎙️ Inquire via AI Assistant</span>
                <span>→</span>
              </button>

              <Link
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto py-3 px-6 rounded-full bg-white hover:bg-[#f4efe6] text-[#0c192c] font-sans font-bold text-xs tracking-wider uppercase border border-[#e8dfd3] text-center transition-colors shadow-sm"
              >
                Book Strategy Call
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
