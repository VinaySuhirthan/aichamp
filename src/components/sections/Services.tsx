"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import Floating3DShape from "@/components/ui/Floating3DShape";

gsap.registerPlugin(ScrollTrigger);

export interface ServiceItem {
  id: number;
  number: string;
  name: string;
  category: "tech" | "video" | "education" | "publishing" | "visual";
  categoryLabel: string;
  tag: string;
  techStack: string;
  description: string;
  deliverables: string[];
  stat: { label: string; value: string };
  sla: string;
  imageSrc: string;
}

export const allServices: ServiceItem[] = [
  {
    id: 1,
    number: "01",
    name: "AI Exam Tutor & Academic Coach",
    category: "education",
    categoryLabel: "Courses & Mentorship",
    tag: "Adaptive Learning",
    techStack: "GPT-4o • RAG • Vector DB • Custom Syllabus",
    description: "Personalized exam coaching and curriculum mastery with adaptive question engines, instant step-by-step solutions, and smart revision pathways.",
    deliverables: ["Adaptive Exam Practice Engine", "Syllabus-Aligned Smart Modules", "Instant Step-by-Step Explanations"],
    stat: { label: "Score Improvement", value: "+35% Average" },
    sla: "48h Deployment",
    imageSrc: "/images/service-agents.jpg",
  },
  {
    id: 2,
    number: "02",
    name: "E-Book Creation & Global Publishing",
    category: "publishing",
    categoryLabel: "Publishing & Research",
    tag: "Revenue Engine",
    techStack: "Editorial AI • InDesign • Amazon KDP • EPUB",
    description: "End-to-end digital book production: manuscript structuring, interior typography, high-impact vector covers, and turnkey global sales setup on Amazon KDP & Apple Books.",
    deliverables: ["Amazon KDP Ready EPUB & PDF", "Vector Cover & Interior Typesetting", "Automated Funnel & Royalties Setup"],
    stat: { label: "Distribution", value: "Amazon, Apple & Kobo" },
    sla: "5-7 Days Turnkey",
    imageSrc: "/images/service-poster.jpg",
  },
  {
    id: 3,
    number: "03",
    name: "YouTube Channel Growth & Automation",
    category: "video",
    categoryLabel: "Video & Growth",
    tag: "High Velocity",
    techStack: "Runway Gen-3 • Midjourney v6 • TubeBuddy • Premiere",
    description: "Algorithmic channel scaling engineered for high CTR and viral retention: hook script synthesis, automated B-roll infill, custom thumbnails, and YouTube SEO tag clustering.",
    deliverables: ["High-CTR Custom 3D Thumbnails", "Retention-Engineered Scriptwriting", "Complete YouTube SEO Optimization"],
    stat: { label: "Average CTR", value: "11.8% Hook Rate" },
    sla: "Weekly Production",
    imageSrc: "/images/service-video.jpg",
  },
  {
    id: 4,
    number: "04",
    name: "AI SEO & Google Search Dominance",
    category: "tech",
    categoryLabel: "Web & Intelligence",
    tag: "Organic Growth",
    techStack: "Google SGE • Semantic Schema • Next.js • Surfer",
    description: "Algorithmic search optimization built for Google AI Overviews: semantic keyword clustering, programmatic schema graphs, and sub-second Core Web Vitals.",
    deliverables: ["Google AI Overviews Optimization", "Complete Technical Schema Markup", "High-Intent Keyword Cluster Roadmap"],
    stat: { label: "Search Visibility", value: "Top 3 Ranking Targets" },
    sla: "2-4 Weeks Program",
    imageSrc: "/images/service-web.jpg",
  },
  {
    id: 5,
    number: "05",
    name: "Online AI Masterclasses & Courses",
    category: "education",
    categoryLabel: "Courses & Mentorship",
    tag: "Curriculum",
    techStack: "LMS Architecture • Prompt Engineering • Video Modules",
    description: "Mastery courses delivered by Dr. G. Nalinipriya, teaching educators, professionals, and entrepreneurs how to deploy and monetize 200+ advanced AI tools.",
    deliverables: ["Modular HD Video Courseware", "Curated AI Prompt & Tool Vault", "Certificate of Completion"],
    stat: { label: "Tools Covered", value: "200+ Practical Tools" },
    sla: "Instant Access & Live",
    imageSrc: "/images/10.webp",
  },
  {
    id: 6,
    number: "06",
    name: "Website Design & Development",
    category: "tech",
    categoryLabel: "Web & Intelligence",
    tag: "Enterprise",
    techStack: "Next.js 16 • React 19 • Tailwind • Supabase",
    description: "Ultra-fast, high-converting websites engineered for small businesses, creators, and modern brands with mobile responsiveness and sub-second loading.",
    deliverables: ["Lighthouse 100/100 Core Web Vitals", "Custom Responsive Component Architecture", "Integrated Lead Capture & Analytics"],
    stat: { label: "Performance", value: "100/100 Lighthouse" },
    sla: "1-2 Weeks Launch",
    imageSrc: "/images/service-web.jpg",
  },
  {
    id: 7,
    number: "07",
    name: "Dedicated 1-on-1 AI Mentorship",
    category: "education",
    categoryLabel: "Courses & Mentorship",
    tag: "Elite Advisory",
    techStack: "PhD Advisory • Strategy Sprints • Private Sessions",
    description: "Direct executive and doctoral advisory sessions with Dr. G. Nalinipriya, Professor & PhD Advisor, accelerating your AI research, business roadmap, or startup adoption.",
    deliverables: ["Custom 90-Day Execution Roadmap", "Direct 1-on-1 Strategy Video Sprints", "Ongoing WhatsApp & Email Advisory"],
    stat: { label: "Format", value: "Private 1-on-1 Advisory" },
    sla: "Flexible Scheduling",
    imageSrc: "/images/1.webp",
  },
  {
    id: 8,
    number: "08",
    name: "Short Video & Viral Reels Creation",
    category: "video",
    categoryLabel: "Video & Growth",
    tag: "Viral Reach",
    techStack: "9:16 Vertical • Kinetic Captions • Motion FX",
    description: "Trend-aware vertical storytelling engineered for peak algorithmic reach across Instagram, YouTube Shorts, and TikTok with instant 3-second hook retention.",
    deliverables: ["Algorithmic 3s Hook Engine", "Kinetic Typography & Sound FX", "Full Commercial Music Licensing"],
    stat: { label: "Retention Rate", value: "+84% Benchmark" },
    sla: "10-20 Reels / Sprint",
    imageSrc: "/images/ai-phone.jpg",
  },
  {
    id: 9,
    number: "09",
    name: "Chatbot Creation & Integration",
    category: "tech",
    categoryLabel: "Web & Intelligence",
    tag: "Autonomous",
    techStack: "RAG • Vector Database • WhatsApp API • OpenAI",
    description: "Domain-adapted conversational intelligence engines seamlessly wired to your database, website chat, WhatsApp Business, and CRM pipelines.",
    deliverables: ["Zero-Hallucination RAG Pipeline", "WhatsApp & Webhook Integration", "Automated Lead Capture & Analytics"],
    stat: { label: "Response Latency", value: "< 240ms Response" },
    sla: "48h Deployment",
    imageSrc: "/images/service-agents.jpg",
  },
  {
    id: 10,
    number: "10",
    name: "AI Agent Development & Automation",
    category: "tech",
    categoryLabel: "Web & Intelligence",
    tag: "Cognitive Mesh",
    techStack: "LangChain • Tool Calling • Cognitive Automations",
    description: "Self-governing cognitive agent systems capable of multi-step task execution, automated research synthesis, web scraping, and workflow orchestration.",
    deliverables: ["Autonomous Multi-Step Logic", "Custom API & Tool Calling Bridges", "Human-in-the-Loop Safeguards"],
    stat: { label: "Architecture", value: "Multi-Agent Mesh" },
    sla: "1-3 Weeks Custom",
    imageSrc: "/images/service-agents.jpg",
  },
  {
    id: 11,
    number: "11",
    name: "AI Avatar Creation & Neural Voice",
    category: "video",
    categoryLabel: "Video & Growth",
    tag: "Photoreal",
    techStack: "Neural Dubbing • Lip-Sync • 40+ Languages",
    description: "Photorealistic AI presenters and virtual spokespersons delivering video content at scale without studio bookings or recurring filming costs.",
    deliverables: ["Photorealistic Facial Lip-Sync", "40+ Languages Native Audio Clone", "Consistent Brand Spokesperson Token"],
    stat: { label: "Voice Cloning", value: "99.4% Fidelity" },
    sla: "24h Video Delivery",
    imageSrc: "/images/ai-phone.jpg",
  },
  {
    id: 12,
    number: "12",
    name: "Poster Design & Generative Art",
    category: "visual",
    categoryLabel: "Brand & Visual",
    tag: "Generative Art",
    techStack: "Midjourney v6.1 • Vector • Print 300DPI",
    description: "Striking promotional, brand, and architectural poster visuals synthesized via custom diffusion models, human creative direction, and Swiss typography.",
    deliverables: ["Vector & CMYK Print 300DPI", "Custom LoRA Art Direction", "Full Commercial & Resale Rights"],
    stat: { label: "Resolution", value: "8K Ultra-HD" },
    sla: "24-48h Delivery",
    imageSrc: "/images/service-poster.jpg",
  },
  {
    id: 13,
    number: "13",
    name: "Logo & Brand Mark Design",
    category: "visual",
    categoryLabel: "Brand & Visual",
    tag: "Vector Precision",
    techStack: "Geometric Grids • SVG Matrix • Style Guide",
    description: "Mathematically proportioned startup logos and brand marks designed for crisp, clean scaling from mobile favicons to physical billboards.",
    deliverables: ["Golden Ratio Geometric Grid", "Universal SVG / EPS / PDF Export", "Complete Brand Color Guidelines"],
    stat: { label: "Scalability", value: "Vector Infinite" },
    sla: "48-72h 3 Concepts",
    imageSrc: "/images/service-poster.jpg",
  },
  {
    id: 14,
    number: "14",
    name: "Personal Branding & Authority Suite",
    category: "visual",
    categoryLabel: "Brand & Visual",
    tag: "Executive",
    techStack: "Identity System • LinkedIn Suite • Bio Assets",
    description: "Transform professional and academic authority into a commanding digital presence with custom brand tokens, bio kits, and thought-leadership templates.",
    deliverables: ["Executive Presence Kit", "LinkedIn Authority Templates", "Signature Token Library"],
    stat: { label: "Positioning", value: "Top 1% Creator" },
    sla: "Full Kit in 7 Days",
    imageSrc: "/images/13.webp",
  },
  {
    id: 15,
    number: "15",
    name: "Research Paper Writing & Assistance",
    category: "publishing",
    categoryLabel: "Publishing & Research",
    tag: "Doctoral Review",
    techStack: "Doctoral Review • Scopus / IEEE • LaTeX",
    description: "Scholarly methodology guidance, peer-review preparation, and technical paper structuring supervised by Dr. G. Nalinipriya, Professor & PhD Advisor.",
    deliverables: ["IEEE / Scopus Journal Targeting", "Mathematical LaTeX Typesetting", "Faculty Peer-Review Rubric"],
    stat: { label: "Supervision", value: "PhD Professor Advisor" },
    sla: "Doctoral Consultation",
    imageSrc: "/images/11.webp",
  },
];

/* ─── Premium Editorial Service Card (100% Fully Visible, Zero Clipping) ─── */
function ServiceCard({
  item,
  onOpenSpec,
}: {
  item: ServiceItem;
  onOpenSpec: (item: ServiceItem) => void;
}) {
  return (
    <div
      onClick={() => onOpenSpec(item)}
      className="group relative flex flex-col justify-between rounded-2xl border border-[#e8dfd3] bg-white p-4 sm:p-5 transition-all duration-300 cursor-pointer shadow-[0_2px_12px_rgba(12,25,44,0.04)] hover:shadow-[0_16px_36px_rgba(2,132,199,0.12)] hover:border-[#0284c7]/40 hover:-translate-y-1 w-full h-[390px] sm:h-[400px] select-none"
    >
      <div>
        {/* Authentic 16:9 Image Frame */}
        <div className="relative w-full aspect-[16/9] max-h-[175px] rounded-xl overflow-hidden bg-[#f4efe6] border border-[#e8dfd3] mb-2.5 shrink-0">
          <Image
            src={item.imageSrc}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
        </div>

        {/* Minimal Editorial Category & Index Moniker */}
        <div className="flex items-center justify-between text-[10.5px] font-mono tracking-wider text-[#64748b] uppercase mb-1">
          <span className="truncate max-w-[200px]">{item.categoryLabel}</span>
          <span className="font-bold text-[#0284c7] shrink-0">{item.number}</span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-base sm:text-[17px] font-bold text-[#0c192c] group-hover:text-[#0284c7] transition-colors leading-snug tracking-tight mb-1 line-clamp-1">
          {item.name}
        </h3>

        {/* Clear, readable editorial description */}
        <p className="text-[#475569] text-xs leading-relaxed mb-2 font-sans line-clamp-2">
          {item.description}
        </p>

        {/* Curated Editorial Highlights */}
        <ul className="space-y-1 border-t border-[#f1e9de] pt-2 mb-2">
          {item.deliverables.slice(0, 2).map((deliv, di) => (
            <li key={di} className="flex items-center gap-2 text-[11px] sm:text-xs text-[#334155] font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0" />
              <span className="truncate">{deliv}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Clean Footer Action Bar - Fully Visible and Anchored at Bottom */}
      <div className="pt-2 border-t border-[#f1e9de] flex items-center justify-between text-xs font-sans shrink-0">
        <span className="text-[#64748b] font-mono text-[11px]">
          Turnaround: <strong className="text-[#0c192c] font-semibold">{item.sla}</strong>
        </span>

        <span className="inline-flex items-center gap-1.5 font-bold text-[#0284c7] group-hover:text-[#0369a1] transition-colors">
          <span>Explore Service</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </div>
  );
}

/* ─── Main Section: Stable Pinned Layout (Heading + Controls Stationary Above Cards) ─── */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [filter, setFilter] = useState<"all" | "tech" | "video" | "education" | "publishing" | "visual">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentGroup, setCurrentGroup] = useState<number>(1);
  const currentGroupRef = useRef<number>(1);
  const [cardWidth, setCardWidth] = useState<number>(380);

  // Filter capabilities
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

  // Total groups of 3 cards
  const totalGroups = Math.max(1, Math.ceil(filteredServices.length / 3));
  // currentGroup is state-managed on set transitions only to eliminate 60fps React re-renders

  // ── Compute Exact Viewport-Based Card Width ──
  const updateCardDimensions = useCallback(() => {
    if (!viewportRef.current) return;
    const vw = viewportRef.current.clientWidth;
    if (vw <= 0) return;

    // Desktop: exactly 3 cards side by side, 2 gaps of 24px (48px total)
    // Tablet: exactly 2 cards side by side, 1 gap of 24px
    // Mobile: 1 card
    let w: number;
    if (window.innerWidth >= 1024) {
      w = (vw - 48) / 3;
    } else if (window.innerWidth >= 768) {
      w = (vw - 24) / 2;
    } else {
      w = vw - 24;
    }

    const finalW = Math.max(280, Math.floor(w));
    setCardWidth(finalW);
  }, []);

  // ── PINNED SECTION ANIMATION (Heading & Controls Stationary Above Cards) ──
  useEffect(() => {
    updateCardDimensions();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const pinnedStage = pinnedStageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!pinnedStage || !viewport || !track) return;

    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    const setupCarousel = () => {
      updateCardDimensions();

      const visibleWidth = viewport.clientWidth;
      const totalWidth = track.scrollWidth;
      const scrollDist = totalWidth - visibleWidth;

      // If all items fit within visible viewport (e.g. 3 or fewer), no horizontal scroll is needed
      if (scrollDist <= 10) {
        gsap.set(track, { x: 0 });
        if (progressBarRef.current) progressBarRef.current.style.width = "100%";
        setCurrentGroup(1);
        currentGroupRef.current = 1;
        return;
      }

      // Vertical distance linked to scroll: comfortable scroll pacing
      const pinDistance = (totalGroups - 1) * 750;

      // Pin the section stage at top 72px (below navbar)
      // Heading and controls remain completely stationary inside the pinned container above the cards
      const trigger = ScrollTrigger.create({
        id: "services-horizontal-carousel",
        trigger: pinnedStage,
        pin: true,
        start: "top 72px",
        end: () => `+=${pinDistance}`,
        scrub: 0.8,
        anticipatePin: 0,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const x = -self.progress * scrollDist;
          gsap.set(track, { x });

          if (progressBarRef.current) {
            const pct = Math.max(15, Math.round(self.progress * 100));
            progressBarRef.current.style.width = `${pct}%`;
          }

          const newGroup = Math.min(totalGroups, Math.floor(self.progress * (totalGroups - 1) + 0.1) + 1);
          if (newGroup !== currentGroupRef.current) {
            currentGroupRef.current = newGroup;
            setCurrentGroup(newGroup);
          }
        },
      });

      scrollTriggerRef.current = trigger;
    };

    const timer = setTimeout(() => {
      setupCarousel();
      ScrollTrigger.refresh();
    }, 120);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupCarousel();
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      if (track) {
        gsap.set(track, { x: 0 });
      }
    };
  }, [filteredServices.length, totalGroups, filter, searchQuery, updateCardDimensions]);

  // Jump to specific set/group
  const goToGroup = (groupIdx: number) => {
    const trigger = scrollTriggerRef.current;
    if (!trigger || totalGroups <= 1) return;

    const norm = groupIdx / (totalGroups - 1);
    const targetScroll = trigger.start + norm * (trigger.end - trigger.start);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
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
      className="bg-[#faf7f0] relative border-t border-[#e8dfd3]"
      aria-labelledby="services-heading"
    >
      {/* ── STABLE PINNED STAGE (Holds Stationary Header + Stationary Controls + Moving Cards) ── */}
      <div
        ref={pinnedStageRef}
        className="relative w-full h-[calc(100dvh-72px)] min-h-[580px] max-h-[820px] pt-3 pb-3 sm:pt-4 sm:pb-4 flex flex-col justify-between overflow-hidden bg-[#faf7f0]"
      >
        {/* ── Floating 3D Bubbles on Outer Margins (Preserving 3-Card Carousel) ── */}
        <Floating3DShape
          variant="sphere"
          theme="cyan"
          size={160}
          path={2}
          delay={-8}
          className="-left-14 sm:-left-20 top-1/3 hidden sm:block"
        />
        <Floating3DShape
          variant="blob"
          theme="lavender"
          size={175}
          path={6}
          delay={-18}
          className="-right-14 sm:-right-20 top-1/2 hidden sm:block"
        />

        {/* ── Visibly Luminous Continuous Ambient Background & Network Details ── */}
        <div className="animate-drift-1 absolute top-[15%] left-[8%] w-[520px] h-[360px] rounded-full pointer-events-none z-0 ambient-glow-cyan opacity-80" />
        <div className="animate-drift-2 absolute bottom-[8%] right-[10%] w-[500px] h-[340px] rounded-full pointer-events-none z-0 ambient-glow-lavender opacity-80" />
        <div className="absolute inset-0 bg-circuit-subtle opacity-30 pointer-events-none z-0" />
        
        {/* Floating subtle particle sparks */}
        <div className="ambient-spark w-2 h-2 top-[24%] left-[15%] [animation-delay:1.5s]" />
        <div className="ambient-spark w-2.5 h-2.5 bottom-[28%] right-[18%] [animation-delay:4s]" />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
          {/* ── 1. STATIONARY SECTION HEADER (Visible across all 5 sets) ── */}
          <div className="mb-2 shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-[#0ea5e9]/30 bg-white text-[#0284c7] text-[10.5px] font-sans font-semibold tracking-wider uppercase mb-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>OUR CAPABILITIES</span>
            </div>

            <h2
              id="services-heading"
              className="font-heading text-xl sm:text-2xl lg:text-[28px] font-extrabold text-[#0c192c] tracking-tight leading-tight"
            >
              AI Services, Built Around Your <span className="text-[#0284c7]">Goals</span>
            </h2>

            <p className="mt-0.5 text-xs sm:text-[13px] text-[#475569] max-w-2xl font-sans leading-normal">
              Production-ready artificial intelligence solutions, academic coaching, and scalable digital media systems tailored to accelerate your growth.
            </p>
          </div>

          {/* ── 2. STATIONARY CONTROLS: CATEGORIES & SEARCH (Visible across all 5 sets) ── */}
          <div className="mb-2.5 flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pb-2 border-b border-[#e8dfd3] shrink-0">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All Capabilities", count: 15 },
                { id: "tech", label: "Web & Intelligence", count: 4 },
                { id: "education", label: "Courses & Mentorship", count: 3 },
                { id: "video", label: "Video & Growth", count: 3 },
                { id: "publishing", label: "Publishing & Research", count: 2 },
                { id: "visual", label: "Brand & Visual", count: 3 },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFilter(cat.id as any);
                    if (trackRef.current) gsap.set(trackRef.current, { x: 0 });
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-sans font-semibold transition-all border flex items-center gap-1.5 cursor-pointer ${
                    filter === cat.id
                      ? "bg-[#0284c7] text-white border-[#0284c7] shadow-xs"
                      : "bg-white text-[#475569] border-[#e8dfd3] hover:border-[#bae6fd] hover:text-[#0284c7]"
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

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748b]">
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
                  if (trackRef.current) gsap.set(trackRef.current, { x: 0 });
                }}
                placeholder="Search capabilities or deliverables..."
                className="w-full pl-8 pr-8 py-1.5 bg-white border border-[#e8dfd3] rounded-xl text-xs text-[#0c192c] placeholder-[#64748b] focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 font-sans shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#64748b] hover:text-[#0c192c] cursor-pointer text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* ── 3. SCROLL-DRIVEN HORIZONTAL CAROUSEL VIEWPORT (ONLY THIS MOVES) ── */}
          <div
            ref={viewportRef}
            className="relative w-full overflow-hidden flex-1 flex items-center py-1"
          >
            {filteredServices.length === 0 ? (
              <div className="w-full py-12 text-center bg-white rounded-2xl border border-[#e8dfd3] p-8 shadow-xs">
                <p className="font-heading text-base font-bold text-[#0c192c] mb-1.5">
                  No capabilities match &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="text-xs text-[#64748b] mb-3">
                  Try searching for &quot;Tutor&quot;, &quot;SEO&quot;, &quot;Mentorship&quot;, or &quot;YouTube&quot;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilter("all");
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#0284c7] text-white text-xs font-bold cursor-pointer hover:bg-[#0369a1] transition-all shadow-sm"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div
                ref={trackRef}
                className="flex flex-nowrap items-stretch gap-6 will-change-transform select-none py-1"
                style={{ width: "max-content" }}
              >
                {filteredServices.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      width: `${cardWidth}px`,
                      flex: `0 0 ${cardWidth}px`,
                      minWidth: `${cardWidth}px`,
                      maxWidth: `${cardWidth}px`,
                    }}
                    className="shrink-0 flex flex-col"
                  >
                    <ServiceCard
                      item={item}
                      onOpenSpec={(svc) => setSelectedService(svc)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── 4. STATIONARY BOTTOM PROGRESS & NAVIGATION BAR (Visible across all 5 sets) ── */}
          <div className="mt-2.5 pt-2.5 border-t border-[#e8dfd3] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-sans text-[#64748b] shrink-0">
            {/* Scroll Indicator with Dynamic Progress Line */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="font-mono text-[11px] text-[#0c192c] font-semibold whitespace-nowrap">
                Set {currentGroup} of {totalGroups}
              </span>

              {/* Progress Line */}
              <div className="flex-1 sm:w-44 h-1.5 bg-[#e8dfd3] rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full bg-[#0284c7] transition-[width] duration-75 ease-out rounded-full will-change-[width]"
                  style={{
                    width: "15%",
                  }}
                />
              </div>

              <span className="text-[11px] text-[#64748b] hidden md:inline">
                Scroll to slide capabilities
              </span>
            </div>

            {/* Set Jump Dots & Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-full border border-[#e8dfd3] shadow-xs">
                {Array.from({ length: totalGroups }).map((_, gi) => (
                  <button
                    key={gi}
                    onClick={() => goToGroup(gi)}
                    title={`Jump to Set ${gi + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      gi === currentGroup - 1
                        ? "w-5 bg-[#0284c7]"
                        : "w-1.5 bg-[#bae6fd] hover:bg-[#0284c7]/60"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => goToGroup(Math.max(0, currentGroup - 2))}
                  disabled={currentGroup <= 1}
                  title="Previous Set"
                  className="w-6 h-6 rounded-full bg-white border border-[#e8dfd3] flex items-center justify-center text-[#0c192c] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#f0f9ff] hover:border-[#0284c7] transition-colors shadow-xs cursor-pointer text-xs font-bold"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => goToGroup(Math.min(totalGroups - 1, currentGroup))}
                  disabled={currentGroup >= totalGroups}
                  title="Next Set"
                  className="w-6 h-6 rounded-full bg-white border border-[#e8dfd3] flex items-center justify-center text-[#0c192c] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#f0f9ff] hover:border-[#0284c7] transition-colors shadow-xs cursor-pointer text-xs font-bold"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specification Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 bg-[#0c192c]/65 backdrop-blur-md transition-all animate-fadeIn"
          onClick={() => setSelectedService(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#e8dfd3] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(2,132,199,0.25)] overflow-hidden transition-all"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#faf7f0] hover:bg-[#e0f2fe] text-[#0c192c] hover:text-[#0284c7] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer border border-[#e8dfd3]"
              aria-label="Close specification modal"
            >
              ✕
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#e0f2fe] text-[#0284c7] font-mono font-bold text-xs border border-[#bae6fd]">
                {"//"} {selectedService.number} {selectedService.categoryLabel}
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
