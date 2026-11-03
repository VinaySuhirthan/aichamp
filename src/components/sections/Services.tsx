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
    techStack: "Next.js 16 • React 19 • Tailwind • GSAP",
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
    name: "E-book Creation & Publishing",
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
    name: "Logo & Brand Mark Design",
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

/* ─── Compact Next-Level Executive Service Card ─── */
function ServiceCard({
  item,
  onOpenSpec,
}: {
  item: ServiceItem;
  onOpenSpec: (item: ServiceItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={() => onOpenSpec(item)}
      className="group relative flex flex-col justify-between rounded-2xl border border-[#e8dfd3] bg-white p-3.5 sm:p-4 transition-all duration-300 cursor-pointer shadow-[0_4px_20px_-4px_rgba(12,25,44,0.06)] hover:shadow-[0_20px_45px_-10px_rgba(2,132,199,0.2)] hover:border-[#0284c7] hover:-translate-y-1 w-full h-[365px] sm:h-[378px] overflow-hidden select-none"
    >
      {/* Specular Spotlight Glow on Hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(2, 132, 199, 0.08), transparent 50%)`,
        }}
      />

      {/* Top Media Frame with Cinematic Overlay */}
      <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-2.5 border border-[#e8dfd3] bg-[#f4efe6] shrink-0">
        <Image
          src={item.imageSrc}
          alt={`${item.name} AI Capability`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          sizes="(max-width: 768px) 100vw, 400px"
        />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c192c]/90 via-[#0c192c]/30 to-transparent" />

        {/* Top Floating Badge Bar */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0c192c]/85 backdrop-blur-md border border-white/20 text-[8.5px] font-sans font-bold text-white uppercase tracking-wider shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
            <span>{item.tag}</span>
          </div>

          <div className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-[8.5px] font-mono font-bold text-white shadow-xs">
            {item.number}
          </div>
        </div>

        {/* Bottom Banner Status on Image */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white pointer-events-none">
          <div className="text-[9px] font-mono tracking-wider text-[#7dd3fc] font-semibold flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            <span className="truncate max-w-[140px]">{item.badgeStatus}</span>
          </div>

          <div className="px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-md text-[8.5px] font-sans font-bold text-white border border-white/20">
            {item.stat.value}
          </div>
        </div>
      </div>

      {/* Card Core Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Service Title */}
          <h3 className="font-heading text-sm sm:text-base font-extrabold text-[#0c192c] group-hover:text-[#0284c7] transition-colors leading-snug tracking-tight mb-1 line-clamp-1">
            {item.name}
          </h3>

          {/* Tech Stack Chip */}
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#f0f9ff] border border-[#bae6fd] text-[9.5px] font-mono font-semibold text-[#0284c7] mb-1.5 max-w-full truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0" />
            <span className="truncate">{item.techStack}</span>
          </div>

          {/* Description */}
          <p className="text-[#475569] text-[11px] leading-relaxed mb-2 font-sans line-clamp-2">
            {item.description}
          </p>

          {/* Deliverables Checklist Badges */}
          <div className="flex flex-wrap gap-1 mb-2">
            {item.deliverables.slice(0, 2).map((deliv, di) => (
              <span
                key={di}
                className="inline-flex items-center gap-1 text-[8.5px] font-sans font-medium text-[#0c192c] bg-[#faf7f0] border border-[#e8dfd3] px-2 py-0.5 rounded-md group-hover:border-[#bae6fd] transition-colors"
              >
                <span className="text-[#0284c7] font-bold text-[8.5px]">✓</span>
                <span className="truncate max-w-[125px]">{deliv}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Action Bar */}
        <div className="pt-2 border-t border-[#f1e9de] flex items-center justify-between font-sans shrink-0">
          <div className="flex flex-col">
            <span className="text-[8.5px] font-sans text-[#64748b] uppercase tracking-wider font-bold">
              {item.categoryLabel}
            </span>
            <span className="text-[9px] font-mono text-[#0284c7] font-semibold">
              ⚡ {item.sla}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSpec(item);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e0f2fe] group-hover:bg-[#0284c7] text-[#0284c7] group-hover:text-white border border-[#bae6fd] text-[9px] font-sans font-bold tracking-wider uppercase transition-all duration-300 shadow-xs cursor-pointer"
          >
            <span>Explore Specs</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Services Component with Compact Pinned Scroll Showcase ─── */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [filter, setFilter] = useState<"all" | "visual" | "video" | "tech" | "publishing">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeRowIndex, setActiveRowIndex] = useState<number>(0);
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

  // Chunk capabilities into sets of 3
  const rows = useMemo(() => {
    const result: ServiceItem[][] = [];
    for (let i = 0; i < filteredServices.length; i += 3) {
      result.push(filteredServices.slice(i, i + 3));
    }
    return result;
  }, [filteredServices]);

  const numRows = rows.length;

  // ─── PINNED SCROLL ANIMATION (Zero Giant Gaps, Clean 10px Subtle Glide) ───
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      if (!pinnedStageRef.current || numRows === 0) return;

      // Clean existing triggers
      ScrollTrigger.getAll()
        .filter((t) => t.vars?.id === "services-pinned-trigger")
        .forEach((t) => t.kill());

      // If only 1 row (3 cards), show statically without pinning
      if (numRows <= 1) {
        if (rowRefs.current[0]) {
          gsap.set(rowRefs.current[0], {
            y: 0,
            opacity: 1,
            visibility: "visible",
            pointerEvents: "auto",
          });
        }
        setActiveRowIndex(0);
        return;
      }

      // Initial placement: Row 0 is visible at y:0, other rows parked with visibility: hidden
      rowRefs.current.forEach((rowEl, idx) => {
        if (!rowEl) return;
        if (idx === 0) {
          gsap.set(rowEl, {
            y: 0,
            opacity: 1,
            visibility: "visible",
            pointerEvents: "auto",
          });
        } else {
          gsap.set(rowEl, {
            y: 10,
            opacity: 0,
            visibility: "hidden",
            pointerEvents: "none",
          });
        }
      });

      // Pin distance per set: comfortable scroll distance
      const scrollDistance = (numRows - 1) * 450;
      const dwellTime = 0.7;
      const transitionTime = 0.5;

      // Master ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "services-pinned-trigger",
          trigger: pinnedStageRef.current,
          start: "top 72px",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const totalDuration = tl.duration();
            if (totalDuration > 0) {
              const currentT = self.progress * totalDuration;
              let closest = 0;
              let minDiff = 9999;
              for (let i = 0; i < numRows; i++) {
                const labelT = tl.labels[`set-${i}`];
                if (typeof labelT === "number") {
                  const diff = Math.abs(currentT - labelT);
                  if (diff < minDiff) {
                    minDiff = diff;
                    closest = i;
                  }
                }
              }
              setActiveRowIndex(closest);
            }
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger || null;
      timelineRef.current = tl;

      let cursor = 0;
      tl.addLabel("set-0", cursor + dwellTime / 2);
      cursor += dwellTime;

      for (let r = 0; r < numRows - 1; r++) {
        const currentRowEl = rowRefs.current[r];
        const nextRowEl = rowRefs.current[r + 1];
        if (!currentRowEl || !nextRowEl) continue;

        const transStart = cursor;
        const transEnd = transStart + transitionTime;

        // Current row smoothly glides up by only 10px and fades out (ZERO empty gap)
        tl.to(
          currentRowEl,
          {
            y: -10,
            opacity: 0,
            duration: transitionTime,
            ease: "power2.inOut",
          },
          transStart
        )
        .set(currentRowEl, { visibility: "hidden", pointerEvents: "none" }, transEnd);

        // Next row transitions in from 10px below to y:0
        tl.set(nextRowEl, { visibility: "visible", pointerEvents: "auto" }, transStart)
        .fromTo(
          nextRowEl,
          {
            y: 10,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: transitionTime,
            ease: "power2.inOut",
          },
          transStart
        );

        cursor = transEnd;
        tl.addLabel(`set-${r + 1}`, cursor + dwellTime / 2);
        cursor += dwellTime;
      }

      tl.set({}, {}, cursor);

      return () => {
        tl.kill();
        timelineRef.current = null;
        ScrollTrigger.getAll()
          .filter((t) => t.vars?.id === "services-pinned-trigger")
          .forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, [rows, numRows]);

  // Jump to specific set
  const goToRow = (targetIdx: number) => {
    if (targetIdx < 0 || targetIdx >= numRows) return;
    setActiveRowIndex(targetIdx);

    const tl = timelineRef.current;
    const trigger = scrollTriggerRef.current;

    if (tl && trigger && numRows > 1) {
      const labelT = tl.labels[`set-${targetIdx}`];
      const totalDur = tl.duration();
      if (typeof labelT === "number" && totalDur > 0) {
        const normProgress = labelT / totalDur;
        const targetScroll = trigger.start + normProgress * (trigger.end - trigger.start);
        tl.tweenTo(`set-${targetIdx}`, { duration: 0.5, ease: "power2.out" });
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
        return;
      }
    }

    if (tl) {
      tl.tweenTo(`set-${targetIdx}`, { duration: 0.5, ease: "power2.out" });
    } else {
      // Mobile fallback
      rowRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (idx === targetIdx) {
          gsap.to(el, { y: 0, opacity: 1, visibility: "visible", duration: 0.35, ease: "power2.out" });
          el.style.pointerEvents = "auto";
        } else {
          gsap.to(el, { y: idx < targetIdx ? -10 : 10, opacity: 0, visibility: "hidden", duration: 0.35, ease: "power2.out" });
          el.style.pointerEvents = "none";
        }
      });
    }
  };

  // Close modal on Escape
  useEffect(() => {
    if (!selectedService) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedService]);

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
      {/* Background Ambient Atmosphere */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0284c7 1px, transparent 1px), linear-gradient(to bottom, #0284c7 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0284c7]/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Pinned Stage Container: Compact, tight vertical padding */}
      <div
        ref={pinnedStageRef}
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex flex-col justify-start overflow-hidden"
      >
        {/* Top Control Bar: Compact Header + Search */}
        <div className="relative z-20 w-full mb-1.5 sm:mb-2">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 pb-2 sm:pb-2.5 border-b border-[#e8dfd3]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#0ea5e9]/40 bg-white text-[#0c192c] text-[9.5px] font-sans font-bold tracking-wider uppercase mb-0.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-pulse" />
                <span>AI BIZ CHAMP SUITE</span>
                <span className="opacity-40">•</span>
                <span>PINNED 3-CARD SHOWCASE</span>
              </div>
              <h2
                id="services-heading"
                className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0c192c] tracking-tight leading-tight"
              >
                Our Master-Crafted <span className="text-[#0284c7]">AI Services</span>
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-2xl border border-[#e8dfd3] shadow-xs">
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
                    goToRow(0);
                  }}
                  className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-sans font-semibold transition-all border flex items-center gap-1.5 cursor-pointer ${
                    filter === cat.id
                      ? "bg-[#0284c7] text-white border-[#0284c7] shadow-xs"
                      : "bg-white text-[#475569] border-transparent hover:border-[#bae6fd] hover:text-[#0284c7]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                      filter === cat.id ? "bg-white/20 text-white" : "bg-[#f4efe6] text-[#64748b]"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar + Set Navigator */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2">
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#0284c7]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  goToRow(0);
                }}
                placeholder="Search capabilities, models, or deliverables (e.g. Video, Midjourney, Agents)..."
                className="w-full pl-8 pr-8 py-1.5 bg-white border border-[#e8dfd3] rounded-xl text-xs text-[#0c192c] placeholder-[#64748b] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 font-sans shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#64748b] hover:text-[#0c192c] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Set Navigator Dots & Next/Prev Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5 text-xs font-sans text-[#475569]">
              <span className="text-[11px] font-mono text-[#64748b]">
                Set <strong className="text-[#0c192c]">{activeRowIndex + 1}</strong> of{" "}
                <strong className="text-[#0c192c]">{Math.max(1, numRows)}</strong>
              </span>

              {/* Step indicator dots */}
              <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-full border border-[#e8dfd3] shadow-xs">
                {rows.map((_, ri) => (
                  <button
                    key={ri}
                    onClick={() => goToRow(ri)}
                    title={`Jump to Set ${ri + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      ri === activeRowIndex
                        ? "w-5 bg-[#0284c7]"
                        : "w-1.5 bg-[#bae6fd] hover:bg-[#0284c7]/60"
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => goToRow(activeRowIndex - 1)}
                  disabled={activeRowIndex === 0}
                  title="Previous Set"
                  className="w-6 h-6 rounded-full bg-white border border-[#e8dfd3] flex items-center justify-center text-[#0c192c] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#e0f2fe] hover:border-[#0284c7] transition-colors shadow-xs cursor-pointer text-xs font-bold"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => goToRow(activeRowIndex + 1)}
                  disabled={activeRowIndex >= numRows - 1}
                  title="Next Set"
                  className="w-6 h-6 rounded-full bg-white border border-[#e8dfd3] flex items-center justify-center text-[#0c192c] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#e0f2fe] hover:border-[#0284c7] transition-colors shadow-xs cursor-pointer text-xs font-bold"
                >
                  ↓
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── PINNED CARD STAGE: Tight, zero dead space above cards ─── */}
        {filteredServices.length === 0 ? (
          <div className="py-14 text-center bg-white rounded-2xl border border-[#e8dfd3] p-6 shadow-xs">
            <p className="font-heading text-base font-bold text-[#0c192c] mb-1.5">
              No services match &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-xs text-[#64748b] mb-3">
              Try searching for &quot;Video&quot;, &quot;Agents&quot;, &quot;Reels&quot;, or &quot;Research&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilter("all");
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#0284c7] text-white text-xs font-bold cursor-pointer hover:bg-[#0369a1] transition-all shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="relative w-full h-[375px] sm:h-[390px] overflow-hidden mt-1 mb-1.5">
            {rows.map((rowCards, rowIndex) => (
              <div
                key={rowIndex}
                ref={(el) => {
                  rowRefs.current[rowIndex] = el;
                }}
                className="absolute inset-0 w-full h-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-start bg-[var(--ink)]"
                style={{
                  opacity: rowIndex === 0 ? 1 : 0,
                  visibility: rowIndex === 0 ? "visible" : "hidden",
                  pointerEvents: rowIndex === 0 ? "auto" : "none",
                  willChange: "transform, opacity",
                }}
              >
                {rowCards.map((item) => (
                  <ServiceCard
                    key={item.id}
                    item={item}
                    onOpenSpec={(svc) => setSelectedService(svc)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Bottom Status & Scroll Instructions */}
        <div className="relative z-10 pt-1.5 border-t border-[#e8dfd3] flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#64748b] gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-pulse" />
            <span>
              Scroll down or use the ↑ ↓ arrows to smoothly advance through all {filteredServices.length} capabilities
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="text-[#0284c7] hover:text-[#0369a1] font-bold transition-colors flex items-center gap-1 hover:underline"
            >
              <span>Custom Enterprise Scoping</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal / Detailed Spec Drawer */}
      {selectedService && (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 bg-[#0c192c]/70 backdrop-blur-md transition-all animate-fadeIn"
          onClick={() => setSelectedService(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#e8dfd3] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(2,132,199,0.3)] overflow-hidden transition-all"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#f4efe6] hover:bg-[#e0f2fe] text-[#0c192c] hover:text-[#0284c7] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer border border-[#e8dfd3]"
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
                ⚡ {selectedService.sla}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0c192c] mb-2 leading-tight">
              {selectedService.name}
            </h3>

            {/* Tech Stack Bar */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#f0f9ff] border border-[#bae6fd] text-xs font-mono text-[#0284c7] mb-4 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>{selectedService.techStack}</span>
            </div>

            {/* Description */}
            <p className="text-[#334155] text-sm leading-relaxed mb-6 font-sans">
              {selectedService.description}
            </p>

            {/* Deliverables Specification */}
            <div className="mb-6">
              <h4 className="text-xs font-sans uppercase font-extrabold text-[#0c192c] tracking-wider mb-2.5">
                Exact Deliverables & Production Guarantees
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {selectedService.deliverables.map((deliv, di) => (
                  <div
                    key={di}
                    className="p-3.5 rounded-xl bg-[#faf7f0] border border-[#e8dfd3] flex flex-col justify-between"
                  >
                    <span className="text-[#0284c7] font-bold text-sm mb-1">0{di + 1} ✓</span>
                    <span className="text-xs font-sans font-semibold text-[#0c192c]">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Proof Badge */}
            <div className="p-4 rounded-2xl bg-[#e0f2fe]/60 border border-[#bae6fd] flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-sans text-[#64748b] block font-medium">Verified Benchmark</span>
                <span className="text-base font-extrabold text-[#0c192c] font-sans">{selectedService.stat.value}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-sans text-[#64748b] block font-medium">Standard SLA</span>
                <span className="text-base font-extrabold text-[#0284c7] font-mono">{selectedService.sla}</span>
              </div>
            </div>

            {/* Action Buttons */}
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
                className="w-full sm:w-auto py-3 px-6 rounded-full bg-white hover:bg-[#f4efe6] text-[#0c192c] font-sans font-bold text-xs tracking-wider uppercase border border-[#e8dfd3] text-center transition-colors shadow-xs"
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
