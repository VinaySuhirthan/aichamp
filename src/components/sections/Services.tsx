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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
      </svg>
    ),
  },
];

/**
 * Modern, human-crafted visual representation for each service
 * Styled with sleek sans-serif typography for maximum executive polish
 */
function ServiceVisualPreview({ id }: { id: number }) {
  switch (id) {
    case 1: // Poster Design
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-sans font-semibold tracking-wider text-[var(--muted-lt)] uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e]" />
              POSTER MOCKUP
            </span>
            <span>300 DPI CMYK</span>
          </div>
          <div className="relative border border-dashed border-[#520b12] rounded-lg p-3 bg-[#120b0c]/80 flex flex-col items-center justify-center my-1 text-center">
            <span className="font-heading text-sm font-bold tracking-wide text-[#f3eedf] uppercase">
              Typography & Art Direction
            </span>
            <span className="text-[11px] text-[#c8102e] font-sans font-medium mt-0.5">
              Swiss Grid • Vector Synthesis
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-sans text-[var(--muted)]">
            <span>A1 / A2 / A3 Formats</span>
            <span className="text-[#f3eedf] font-medium">Print Ready</span>
          </div>
        </div>
      );

    case 2: // Short Video Creation
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-sans font-semibold tracking-wider text-[var(--muted-lt)] uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-pulse" />
              TIMELINE EDITOR
            </span>
            <span>4K 60FPS</span>
          </div>
          <div className="h-16 rounded-lg bg-[#120b0c] border border-[#351f23] flex items-center justify-center relative px-3">
            <div className="w-9 h-9 rounded-full bg-[#c8102e]/20 border border-[#c8102e] flex items-center justify-center text-[#f3eedf] shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-xs ml-0.5">▶</span>
            </div>
            {/* Audio/Video waveform bars */}
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between gap-1 opacity-50">
              {[40, 70, 90, 50, 80, 100, 60, 85, 45, 95, 75, 55, 90, 60].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-[#c8102e] rounded-full"
                  style={{ height: `${h * 0.16}px` }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-sans text-[var(--muted)]">
            <span>Duration: 00:30 - 00:60</span>
            <span className="text-[#f3eedf] font-medium">Neural Motion Gen-3</span>
          </div>
        </div>
      );

    case 3: // Instagram Reels Creation
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex items-center justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          {/* 9:16 vertical phone mockup inside card */}
          <div className="w-20 h-28 rounded-xl border border-[#c8102e]/60 bg-[#120b0c] p-1.5 flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between text-[8px] font-sans font-semibold text-[var(--muted-lt)]">
              <span>9:16</span>
              <span className="w-1 h-1 rounded-full bg-[#c8102e]" />
            </div>
            <div className="text-center my-auto">
              <span className="text-[14px]">🔥</span>
              <span className="block text-[8px] font-sans text-[#f3eedf] font-bold">REEL HOOK</span>
            </div>
            <div className="space-y-0.5">
              <div className="h-1 bg-[#c8102e] rounded-full w-4/5" />
              <div className="h-0.5 bg-white/20 rounded-full w-full" />
            </div>
          </div>
          {/* Reel metrics */}
          <div className="flex-1 pl-3.5 space-y-2 text-[11px] font-sans">
            <div className="flex items-center gap-1.5 text-[#f3eedf] font-medium">
              <span className="text-[#c8102e]">♥</span>
              <span>124.5K Likes</span>
            </div>
            <div className="flex items-center gap-1.5 text-[var(--muted-lt)] font-normal">
              <span>💬</span>
              <span>2.8K Comments</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#f3eedf] font-semibold text-[10px] uppercase tracking-wider">
              <span>↗</span>
              <span>Viral Retention Hook</span>
            </div>
          </div>
        </div>
      );

    case 4: // Website Design & Development
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          {/* Mini browser chrome */}
          <div className="flex items-center gap-1.5 pb-2 border-b border-[#351f23]">
            <span className="w-2 h-2 rounded-full bg-[#c8102e]" />
            <span className="w-2 h-2 rounded-full bg-[#520b12]" />
            <span className="w-2 h-2 rounded-full bg-[#351f23]" />
            <div className="ml-2 flex-1 bg-[#120b0c] rounded px-2 py-0.5 text-[9px] font-sans text-[var(--muted-lt)] truncate">
              https://yourbrand.com
            </div>
          </div>
          {/* Browser webpage preview */}
          <div className="grid grid-cols-3 gap-2 my-1">
            <div className="col-span-2 h-12 bg-[#120b0c] rounded p-2 flex flex-col justify-center">
              <div className="w-16 h-2 bg-[#c8102e]/70 rounded mb-1" />
              <div className="w-24 h-1.5 bg-white/20 rounded" />
            </div>
            <div className="h-12 bg-[#520b12]/40 rounded border border-[#c8102e]/30 flex items-center justify-center text-xs font-sans font-bold text-[#f3eedf]">
              &lt;/&gt;
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-sans text-[var(--muted)]">
            <span>Next.js 15 • React 19</span>
            <span className="text-[#f3eedf] font-medium">100/100 Lighthouse</span>
          </div>
        </div>
      );

    case 5: // Vlog Creation
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-sans font-semibold tracking-wider text-[var(--muted-lt)] uppercase">
            <span className="flex items-center gap-1 text-[#c8102e] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#c8102e] animate-ping" />
              ● REC
            </span>
            <span>4K 60FPS • LUT ACTIVE</span>
          </div>
          {/* Viewfinder crosshairs */}
          <div className="h-16 border border-dashed border-[#520b12] rounded-lg bg-[#120b0c] relative flex items-center justify-center">
            <div className="w-6 h-6 border border-white/20 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-[#c8102e] rounded-full" />
            </div>
            <span className="absolute top-1.5 left-2.5 text-[9px] font-sans text-[var(--muted)]">ISO 400</span>
            <span className="absolute bottom-1.5 right-2.5 text-[9px] font-sans text-[var(--muted)]">SHUTTER 1/120</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-sans text-[var(--muted)]">
            <span>Multitrack Sync</span>
            <span className="text-[#f3eedf] font-medium">Narrative B-Roll</span>
          </div>
        </div>
      );

    case 6: // Chatbot Creation & Integration
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-2.5 flex flex-col justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-sans font-semibold tracking-wider text-[var(--muted-lt)] uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              WHATSAPP & WEB AI
            </span>
            <span>RAG VECTOR DB</span>
          </div>
          {/* Chat bubbles */}
          <div className="space-y-1.5 my-1">
            <div className="bg-[#120b0c] text-[11px] text-[var(--muted-lt)] px-3 py-1.5 rounded-lg rounded-tl-none w-fit max-w-[85%] font-sans">
              &ldquo;Book an AI business consultation?&rdquo;
            </div>
            <div className="bg-[#520b12]/70 border border-[#c8102e]/40 text-[11px] text-[#f3eedf] px-3 py-1.5 rounded-lg rounded-tr-none w-fit ml-auto font-sans font-medium">
              &ldquo;Confirmed for 3 PM today! Details sent ✓✓&rdquo;
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-sans text-[var(--muted)]">
            <span>&lt;240ms Latency</span>
            <span className="text-emerald-400 font-semibold">Autonomous 24/7</span>
          </div>
        </div>
      );

    case 7: // AI Agent Development
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-sans font-semibold tracking-wider text-[var(--muted-lt)] uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e]" />
              AGENT PIPELINE
            </span>
            <span>AUTONOMOUS</span>
          </div>
          {/* Step nodes */}
          <div className="flex items-center justify-between my-2 px-1 text-[10px] font-sans">
            <div className="bg-[#120b0c] border border-[#351f23] px-2.5 py-1.5 rounded font-medium">
              <span className="text-[#c8102e] font-bold">01</span> Prompt
            </div>
            <span className="text-[#c8102e]">➔</span>
            <div className="bg-[#520b12]/60 border border-[#c8102e]/50 px-2.5 py-1.5 rounded font-semibold text-[#f3eedf]">
              <span className="text-[#c8102e] font-bold">02</span> RAG Tool
            </div>
            <span className="text-[#c8102e]">➔</span>
            <div className="bg-[#120b0c] border border-[#351f23] px-2.5 py-1.5 rounded font-medium">
              <span className="text-[#c8102e] font-bold">03</span> Execute
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-sans text-[var(--muted)]">
            <span>LangChain & Tool Calling</span>
            <span className="text-[#f3eedf] font-medium">Self-Governing</span>
          </div>
        </div>
      );

    case 8: // AI Avatar Creation
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex items-center justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          {/* Avatar face frame */}
          <div className="w-20 h-28 rounded-xl border border-[#c8102e]/50 bg-[#120b0c] flex flex-col items-center justify-center relative p-1 shadow-inner">
            <div className="w-12 h-12 rounded-full bg-[#520b12]/60 border border-[#c8102e] flex items-center justify-center text-xl">
              👤
            </div>
            <span className="text-[9px] font-sans text-[#f3eedf] mt-1 font-bold tracking-wider uppercase">PRESENTER</span>
            <div className="w-12 h-1 bg-[#c8102e] rounded-full mt-1 animate-pulse" />
          </div>
          {/* Specifications */}
          <div className="flex-1 pl-3.5 space-y-1.5 text-[11px] font-sans">
            <div className="text-[#f3eedf] font-semibold">Photoreal Digital Human</div>
            <div className="text-[var(--muted-lt)]">40+ Languages Lip-Sync</div>
            <div className="text-[var(--muted-lt)]">99.4% Voice Match</div>
            <div className="text-[#c8102e] font-bold text-[10px] uppercase tracking-wider">Zero Studio Overhead</div>
          </div>
        </div>
      );

    case 9: // E-book Publishing
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex items-center justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          {/* 3D Book spine/cover mockup */}
          <div className="w-20 h-28 rounded-lg border-2 border-[#f3eedf]/40 bg-gradient-to-r from-[#520b12] to-[#1a1012] p-2 flex flex-col justify-between shadow-xl">
            <div className="text-[8px] font-sans font-bold text-[#f3eedf] uppercase tracking-wider">E-BOOK</div>
            <div className="text-[9px] font-heading font-extrabold text-[#f3eedf] leading-tight">
              AI BIZ GUIDE
            </div>
            <div className="text-[7px] font-sans font-semibold text-[var(--muted-lt)] uppercase">KDP READY</div>
          </div>
          {/* Book sales features */}
          <div className="flex-1 pl-3.5 space-y-1.5 text-[11px] font-sans">
            <div className="text-[#f3eedf] font-semibold">EPUB + Print PDF</div>
            <div className="text-amber-400 font-bold">★★★★★ Rated</div>
            <div className="text-[var(--muted-lt)]">Amazon KDP Pipeline</div>
            <div className="text-[#c8102e] font-bold text-[10px] uppercase tracking-wider">Global Royalties Engine</div>
          </div>
        </div>
      );

    case 10: // Personal Branding
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-sans font-semibold tracking-wider text-[var(--muted-lt)] uppercase">
            <span>LINKEDIN & AUTHORITY SUITE</span>
            <span className="text-[#f3eedf] font-bold">TOP 1%</span>
          </div>
          {/* Executive identity card preview */}
          <div className="bg-[#120b0c] border border-[#351f23] rounded-lg p-2.5 flex items-center gap-2.5 my-1">
            <div className="w-9 h-9 rounded-full bg-[#520b12] border border-[#c8102e] flex items-center justify-center text-xs font-bold text-[#f3eedf]">
              Dr.N
            </div>
            <div>
              <div className="flex items-center gap-1 text-[12px] font-heading font-bold text-[#f3eedf]">
                Executive Authority
                <span className="text-[#c8102e] text-[10px]">✓</span>
              </div>
              <div className="text-[10px] font-sans text-[var(--muted-lt)]">
                50,000+ Audience Reach
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-sans text-[var(--muted)]">
            <span>Signature Token Library</span>
            <span className="text-[#f3eedf] font-medium">Thought Leadership</span>
          </div>
        </div>
      );

    case 11: // UGC Video Creation
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex items-center justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          {/* Creator phone recording frame */}
          <div className="w-20 h-28 rounded-xl border border-[#351f23] bg-[#120b0c] p-1.5 flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between text-[8px] font-sans font-bold text-[#c8102e]">
              <span>UGC</span>
              <span>● REC</span>
            </div>
            <div className="text-center my-auto">
              <span className="text-base">📱</span>
              <span className="block text-[8px] font-sans text-[#f3eedf] font-semibold mt-0.5">
                Review Video
              </span>
            </div>
            <div className="bg-[#c8102e]/20 text-[#c8102e] text-[7px] font-sans font-bold text-center py-0.5 rounded uppercase">
              High ROAS
            </div>
          </div>
          {/* UGC metrics */}
          <div className="flex-1 pl-3.5 space-y-1.5 text-[11px] font-sans">
            <div className="text-[#f3eedf] font-semibold">Organic Creator Format</div>
            <div className="text-[var(--muted-lt)]">TikTok & Reels Native</div>
            <div className="text-[var(--muted-lt)]">Split-Tested Hooks</div>
            <div className="text-[#c8102e] font-bold text-[10px] uppercase tracking-wider">3.2x - 5.5x Target ROAS</div>
          </div>
        </div>
      );

    case 12: // Advertisement Video Production
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-sans font-semibold tracking-wider text-[var(--muted-lt)] uppercase">
            <span className="text-[#c8102e] font-bold">DIRECT RESPONSE AD</span>
            <span>4K PRORES</span>
          </div>
          {/* Commercial banner */}
          <div className="bg-gradient-to-r from-[#520b12] to-[#120b0c] border border-[#c8102e]/40 rounded-lg p-2.5 my-1 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-sans font-semibold text-[var(--muted-lt)] block uppercase">High-Converting Hook</span>
              <span className="text-[13px] font-heading font-bold text-[#f3eedf]">Scale Your Startup</span>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#c8102e] text-[10px] font-sans text-white font-bold uppercase tracking-wider">
              CTA ↗
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-sans text-[var(--muted)]">
            <span>Pattern Interrupt Audio</span>
            <span className="text-[#f3eedf] font-medium">Multi-Format Cutdowns</span>
          </div>
        </div>
      );

    case 13: // Logo Design
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-sans font-semibold tracking-wider text-[var(--muted-lt)] uppercase">
            <span>GOLDEN RATIO GRID</span>
            <span className="text-[#f3eedf] font-bold">SVG VECTOR</span>
          </div>
          {/* Geometric construction mark */}
          <div className="h-16 rounded-lg bg-[#120b0c] border border-dashed border-[#520b12] flex items-center justify-center relative my-1">
            <div className="w-10 h-10 border border-[#c8102e]/70 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border border-[#f3eedf]/40 rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#c8102e] rounded-full" />
              </div>
            </div>
            {/* Color swatches */}
            <div className="absolute right-3 flex flex-col gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c8102e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f3eedf]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#120b0c] border border-white/20" />
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-sans text-[var(--muted)]">
            <span>Infinite Scalability</span>
            <span className="text-[#f3eedf] font-medium">Complete Style Guide</span>
          </div>
        </div>
      );

    case 14: // Personalized Music Creation
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-sans font-semibold tracking-wider text-[var(--muted-lt)] uppercase">
            <span>NEURAL DAW SYNTHESIZER</span>
            <span className="text-[#f3eedf] font-bold">128 BPM</span>
          </div>
          {/* Multi-track audio equalizer preview */}
          <div className="space-y-1.5 my-1 bg-[#120b0c] p-2 rounded-lg border border-[#351f23]">
            <div className="flex items-center gap-1.5 text-[9px] font-sans font-medium text-[var(--muted-lt)]">
              <span className="w-10">MELODY</span>
              <div className="flex-1 flex gap-0.5 items-end h-3">
                {[4, 8, 12, 6, 10, 14, 8, 12, 10, 6, 14, 8, 4, 10, 12].map((h, i) => (
                  <span key={i} className="flex-1 bg-[#c8102e] rounded-t-sm" style={{ height: `${h}px` }} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-sans font-medium text-[var(--muted-lt)]">
              <span className="w-10">BEATS</span>
              <div className="flex-1 flex gap-0.5 items-end h-3">
                {[10, 4, 10, 4, 12, 4, 10, 4, 14, 4, 10, 4, 10, 4, 12].map((h, i) => (
                  <span key={i} className="flex-1 bg-[#f3eedf]/60 rounded-t-sm" style={{ height: `${h}px` }} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-sans text-[var(--muted)]">
            <span>Studio 24-Bit / 48kHz WAV</span>
            <span className="text-[#f3eedf] font-medium">100% Royalty Free</span>
          </div>
        </div>
      );

    case 15: // Research Paper Writing & Assistance
      return (
        <div className="w-full h-36 bg-[#160c0e] rounded-xl border border-[#351f23] p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-[#c8102e]/60 transition-colors">
          <div className="flex items-center justify-between text-[10px] font-sans font-semibold tracking-wider text-[var(--muted-lt)] uppercase">
            <span className="text-[#c8102e] font-bold">IEEE & SCOPUS FORMAT</span>
            <span>LaTeX COMPILED</span>
          </div>
          {/* Two-column academic paper layout */}
          <div className="bg-[#120b0c] border border-[#351f23] rounded-lg p-2.5 grid grid-cols-2 gap-2 my-1">
            <div className="space-y-1">
              <div className="h-1.5 bg-[#f3eedf] rounded w-full" />
              <div className="h-1 bg-white/30 rounded w-4/5" />
              <div className="h-1 bg-white/20 rounded w-full" />
              <div className="text-[8px] font-sans text-[#c8102e] mt-1 font-bold">Abstract & Methodology</div>
            </div>
            <div className="space-y-1 border-l border-[#351f23] pl-2">
              <div className="h-1 bg-white/20 rounded w-full" />
              <div className="h-1 bg-white/30 rounded w-3/4" />
              <div className="text-[9px] font-sans text-[#f3eedf] font-semibold">∑(x_i) = Accuracy</div>
              <div className="h-1 bg-white/20 rounded w-full" />
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-sans text-[var(--muted)]">
            <span>Dr. G. Nalinipriya, Professor</span>
            <span className="text-emerald-400 font-semibold">Peer-Review Ready</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [filter, setFilter] = useState<"all" | "visual" | "video" | "tech" | "publishing">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  // Heading entrance animation
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (headingRef.current) {
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
      }
    });
    return () => mm.revert();
  }, []);

  // ─── 3x5 Grid Row-by-Row Scroll Reveal Animation ─────────────────────────
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!gridRef.current) return;

      const cards = Array.from(
        gridRef.current.querySelectorAll<HTMLElement>(".service-card-item")
      );

      if (!cards || cards.length === 0) return;

      // Group cards into rows of 3 on desktop
      const groupCardsByRow = (els: HTMLElement[]) => {
        const rows: HTMLElement[][] = [];
        const rowMap = new Map<number, HTMLElement[]>();
        els.forEach((el) => {
          const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
          if (!rowMap.has(top)) rowMap.set(top, []);
          rowMap.get(top)!.push(el);
        });
        rowMap.forEach((row) => rows.push(row));
        return rows;
      };

      const buildRowTriggers = () => {
        ScrollTrigger.getAll()
          .filter((t) => t.vars?.id?.toString().startsWith("service-row-"))
          .forEach((t) => t.kill());

        const rows = groupCardsByRow(cards);
        rows.forEach((rowCards, rowIndex) => {
          gsap.fromTo(
            rowCards,
            { opacity: 0, y: 40, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: {
                id: `service-row-${rowIndex}`,
                trigger: rowCards[0],
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      };

      buildRowTriggers();

      const ro = new ResizeObserver(() => {
        ScrollTrigger.refresh();
        buildRowTriggers();
      });
      ro.observe(gridRef.current);

      return () => ro.disconnect();
    });

    return () => mm.revert();
  }, [filteredServices]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-16 md:py-32 bg-[var(--ink)] relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[var(--accent)]/6 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Block */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f3eedf]/30 bg-[#520b12]/40 text-[#f3eedf] text-[11px] font-sans font-semibold tracking-[0.18em] uppercase shadow-sm mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] animate-ping" />
            <span>AI BIZ CHAMPION</span>
            <span className="opacity-40">•</span>
            <span>BECAUSE QUALITY MATTERS</span>
          </div>

          <h2
            id="services-heading"
            className="font-heading text-[clamp(32px,5vw,56px)] text-[var(--paper)] font-extrabold tracking-[-0.02em] leading-[1.25] mb-4"
          >
            Pioneers in{" "}
            <span className="text-[#f3eedf] drop-shadow-[0_0_20px_rgba(243,238,223,0.35)]">
              AI-Powered Digital Creativity
            </span>
          </h2>

          <p
            className="text-[var(--muted-lt)] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans"
          >
            15 specialized, production-ready capabilities orchestrated by Dr. G. Nalinipriya — engineered for precision, speed, and tangible business growth.
          </p>
        </div>

        {/* ─── Search & AI Gen Phone Command Hub ────────────────────────────── */}
        <div className="mb-12 md:mb-16 rounded-3xl border border-[#351f23] bg-gradient-to-br from-[#1a1012]/95 via-[#241619]/80 to-[#120b0c]/95 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#c8102e]/10 blur-[120px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Search & Filters */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#c8102e]" />
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#f3eedf] font-semibold">
                    Capabilities Search Engine
                  </span>
                  <span className="text-xs text-[var(--muted)]">•</span>
                  <span className="text-[11px] font-sans text-[var(--muted-lt)]">
                    {filteredServices.length} of 15 Ready
                  </span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--paper)] tracking-tight mb-4">
                  Find Your Exact AI Solution
                </h3>

                {/* Search Bar Input */}
                <div className="relative mb-4 group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c8102e]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search capabilities, models, or deliverables (e.g. Video, Midjourney, Agents, LaTeX)..."
                    className="w-full pl-11 pr-10 py-3.5 bg-[#120b0c]/85 border border-[#351f23] rounded-2xl text-sm text-[var(--paper)] placeholder-[var(--muted)] focus:outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-[#c8102e]/30 transition-all duration-300 font-sans"
                    aria-label="Search all AI services"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--muted-lt)] hover:text-[#f3eedf] cursor-pointer"
                      title="Clear search"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Popular Keywords */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-[var(--muted)]">Trending:</span>
                  {[
                    "Midjourney",
                    "Runway Gen-3",
                    "AI Agents",
                    "Reels",
                    "WhatsApp Bot",
                    "Scopus LaTeX",
                  ].map((kw) => (
                    <button
                      key={kw}
                      onClick={() => setSearchQuery(kw)}
                      className={`text-[11px] font-sans font-medium px-3 py-1 rounded-full border transition-all cursor-pointer ${
                        searchQuery.toLowerCase() === kw.toLowerCase()
                          ? "bg-[#c8102e] text-white border-[#c8102e]"
                          : "bg-[#1a1012] border-[#351f23] text-[var(--muted-lt)] hover:border-[#f3eedf]/40 hover:text-[#f3eedf]"
                      }`}
                    >
                      #{kw}
                    </button>
                  ))}
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
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
                      className={`px-4 py-2 rounded-xl text-xs font-sans font-medium tracking-wide transition-all border flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                        filter === cat.id
                          ? "bg-[#c8102e] text-white border-[#c8102e] font-semibold shadow-md shadow-[#c8102e]/30"
                          : "bg-[#1a1012]/80 text-[var(--muted-lt)] border-[#351f23] hover:border-[#f3eedf]/50 hover:text-[#f3eedf]"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full ${
                          filter === cat.id ? "bg-black/30 text-white" : "bg-[#120b0c] text-[var(--muted)]"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#351f23]/80 flex items-center justify-between text-xs text-[var(--muted-lt)] font-sans">
                <div>
                  Showing <span className="font-sans font-bold text-[#f3eedf]">{filteredServices.length}</span> capabilities in a streamlined 3×5 grid
                </div>
                <span className="text-[11px] font-sans font-semibold text-[#c8102e]">3 Cards Per Row</span>
              </div>
            </div>

            {/* Right Column: AI Gen Phone Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative group max-w-[280px] sm:max-w-[310px] w-full">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#c8102e]/30 via-[#520b12]/20 to-[#f3eedf]/10 rounded-[42px] blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-[#1a1012]/95 border border-[#c8102e]/60 text-[10px] font-sans font-semibold text-[#f3eedf] shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#c8102e] animate-ping" />
                  <span>AI Biz Champion Neural Art Engine</span>
                </div>

                <div className="relative rounded-[36px] overflow-hidden border-[3px] border-[#482a30] shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#120b0c] aspect-[9/16] transition-transform duration-500 group-hover:scale-[1.02]">
                  <Image
                    src="/images/ai-phone.jpg"
                    alt="AI Biz Champion Neural Art Engine synthesizing photorealistic 8K artwork on smartphone"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 280px, 310px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />
                </div>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-[#241619]/95 border border-[#f3eedf]/30 text-[10px] font-sans font-semibold text-[#f3eedf] shadow-xl flex items-center gap-2 whitespace-nowrap">
                  <span className="text-[#c8102e]">⚡</span>
                  <span>Generative Art 100% Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── EMPTY STATE (when search has no matches) ─────────────────── */}
        {filteredServices.length === 0 && (
          <div className="py-16 text-center rounded-3xl border border-[#351f23] bg-[#1a1012]/40 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#520b12]/50 border border-[#c8102e]/40 flex items-center justify-center text-[#c8102e] mx-auto mb-4 text-xl">
              🔍
            </div>
            <h4 className="font-heading text-xl font-bold text-[var(--paper)] mb-2">No capabilities match &ldquo;{searchQuery}&rdquo;</h4>
            <p className="text-sm text-[var(--muted-lt)] max-w-sm mx-auto mb-5 font-sans">
              Try searching for terms like &ldquo;Video&rdquo;, &ldquo;Agents&rdquo;, &ldquo;Midjourney&rdquo;, or &ldquo;Research&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilter("all");
              }}
              className="px-5 py-2 rounded-full bg-[#c8102e] text-white text-xs font-sans font-semibold hover:bg-[#a60c24] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ─── 3 IN A ROW (3×5 GRID) OF CARDS ────────────────────────────── */}
        {filteredServices.length > 0 && (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 pb-16"
          >
            {filteredServices.map((item) => (
              <div
                key={item.id}
                className="service-card-item group relative rounded-2xl border border-[#351f23] bg-gradient-to-b from-[#241619] via-[#1a1012] to-[#120b0c] p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#c8102e]/80 hover:shadow-[0_16px_36px_rgba(200,16,46,0.22)] hover:-translate-y-1.5"
              >
                {/* Top ambient highlight line */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#c8102e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Instantly Understandable Service Visual Mockup */}
                  <div className="mb-4">
                    <ServiceVisualPreview id={item.id} />
                  </div>

                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#120b0c] border border-[#351f23] flex items-center justify-center text-[#c8102e] group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="font-sans text-[12px] font-bold text-[#f3eedf] tracking-wide">
                        #{item.id < 10 ? `0${item.id}` : item.id}
                      </span>
                    </div>

                    <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#140b0d] border border-[#351f23] text-[var(--muted-lt)]">
                      {item.tag}
                    </span>
                  </div>

                  {/* Service Title in Modern Professional Heading Font */}
                  <h3 className="font-heading text-[19px] sm:text-[20px] font-bold text-[var(--paper)] group-hover:text-[#f3eedf] transition-colors mb-2 tracking-[-0.015em] leading-snug">
                    {item.name}
                  </h3>

                  {/* Tech stack badge */}
                  <p className="text-[11px] font-sans font-medium text-[#f3eedf]/85 tracking-wide uppercase mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e]" />
                    <span>{item.techStack}</span>
                  </p>

                  {/* Description in Clean Sans Typography */}
                  <p className="text-[var(--muted-lt)] text-[13px] leading-[1.65] mb-4 font-sans">
                    {item.description}
                  </p>

                  {/* Deliverables Checkmarks in Clean Sans */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.deliverables.map((deliv, di) => (
                      <span
                        key={di}
                        className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium text-[var(--paper)] bg-[#140b0d] border border-[#351f23] px-2.5 py-1 rounded-md"
                      >
                        <span className="text-[#c8102e] font-bold">✓</span>
                        <span>{deliv}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer / CTA Row */}
                <div className="pt-3.5 border-t border-[#351f23] flex items-center justify-between mt-auto font-sans">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-sans uppercase font-medium text-[var(--muted)] tracking-wider">
                      {item.stat.label}
                    </span>
                    <span className="text-[13px] font-sans font-bold text-[#f3eedf]">
                      {item.stat.value}
                    </span>
                  </div>

                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#c8102e]/20 hover:bg-[#c8102e] text-[#f3eedf] hover:text-white border border-[#c8102e]/50 text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
                  >
                    <span>Inquire</span>
                    <span className="text-sm">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner Callout */}
        <div className="mt-12 md:mt-16 p-8 md:p-12 rounded-3xl border border-[#f3eedf]/25 bg-gradient-to-r from-[#241619] via-[#1a1012] to-[#241619] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="text-center md:text-left">
            <p className="text-xs font-sans uppercase tracking-widest text-[#f3eedf] font-bold mb-2 drop-shadow-[0_0_10px_rgba(243,238,223,0.35)]">
              Custom Startup Architecture
            </p>
            <p className="font-heading text-lg md:text-2xl text-[var(--paper)] font-bold tracking-tight leading-[1.35]">
              Looking for a tailored end-to-end launch package? Let AI Biz Champion build your growth engine.
            </p>
          </div>
          <Link
            href="#contact"
            className="px-7 py-3.5 rounded-full bg-[#c8102e] text-white font-bold text-xs tracking-wider uppercase hover:bg-[#a60c24] transition-all duration-300 shadow-lg shadow-[#c8102e]/30 whitespace-nowrap cursor-pointer hover:scale-105 font-sans"
          >
            Start Your Project ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
