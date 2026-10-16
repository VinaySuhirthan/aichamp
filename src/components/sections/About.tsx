"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/content/content";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!sectionRef.current) return;

      // Image reveal
      if (imgRef.current) {
        gsap.from(imgRef.current, {
          opacity: 0,
          x: -30,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: imgRef.current, start: "top 85%" },
        });
      }

      // Text stagger
      if (textRef.current) {
        gsap.from(textRef.current.querySelectorAll(".about-reveal"), {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 80%" },
        });
      }
    });
    return () => mm.revert();
  }, []);

  const activePhotoObj = selectedPhoto
    ? about.gallery.find((g) => g.id === selectedPhoto)
    : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const prevId = selectedPhoto > 1 ? selectedPhoto - 1 : about.gallery.length;
    setSelectedPhoto(prevId);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const nextId = selectedPhoto < about.gallery.length ? selectedPhoto + 1 : 1;
    setSelectedPhoto(nextId);
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 md:py-48 section--light relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="container relative z-10">
        {/* Founder Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Portrait column */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center md:items-start">
            <div
              ref={imgRef}
              className="group hover-shimmer relative w-[220px] sm:w-[250px] h-[300px] sm:h-[330px] rounded-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[var(--accent)]/50 via-[var(--border)] to-[var(--surface-2)] shadow-xl transition-all duration-500 hover:shadow-[0_16px_40px_rgba(184,146,74,0.35)] hover:-translate-y-1.5 cursor-pointer"
              role="img"
              aria-label={about.portrait.alt}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[var(--surface-2)]">
                <Image
                  src={about.portrait.src}
                  alt={about.portrait.alt}
                  fill
                  sizes="250px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300" />
                {/* Floating identity badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-[var(--ink)]/90 backdrop-blur-md px-3 py-2.5 rounded-xl border border-white/10 flex items-center justify-between shadow-lg">
                  <div>
                    <p className="text-[12px] font-medium text-[var(--paper)] leading-tight">Dr. G. Nalinipriya</p>
                    <p className="text-[9px] text-[var(--accent)] tracking-wider uppercase font-mono">Founder & AI Specialist</p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="Active Practice" />
                </div>
              </div>
            </div>

            {/* Credentials */}
            <ul className="w-full max-w-[270px] list-none" style={{ marginTop: "36px" }} aria-label="Credentials">
              {about.credentials.map((cred) => (
                <li key={cred.label} className="border-t border-[var(--border)]" style={{ paddingTop: "16px", marginBottom: "16px" }}>
                  <p className="text-[10px] tracking-[0.16em] uppercase text-[var(--accent)] font-mono font-medium" style={{ marginBottom: "6px" }}>
                    {cred.label}
                  </p>
                  <p className="text-[var(--paper)] text-sm font-medium leading-snug">{cred.value}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Text column */}
          <div ref={textRef} className="md:col-span-8 lg:col-span-8">
            <p className="section-label about-reveal" style={{ marginBottom: "18px" }}>About The Founder</p>
            <h2
              id="about-heading"
              className="font-serif text-[clamp(34px,4.5vw,56px)] text-[var(--paper)] font-medium about-reveal"
              style={{ lineHeight: "1.35", letterSpacing: "-0.015em", marginBottom: "16px" }}
            >
              {about.name}
            </h2>
            <p className="text-[var(--accent)] text-sm tracking-[0.1em] uppercase leading-normal about-reveal font-mono" style={{ marginBottom: "36px" }}>
              {about.title}
            </p>

            <div className="max-w-[720px]">
              {about.bio.map((para, i) => (
                <p
                  key={i}
                  className="text-[var(--muted-lt)] text-[16px] about-reveal"
                  style={{ lineHeight: "2.15", marginBottom: "26px" }}
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="about-reveal" style={{ marginTop: "40px" }}>
              <a
                href="#contact"
                className="btn btn--primary rounded-full cursor-pointer"
                aria-label="Book a consultation with Dr. G. Nalinipriya"
              >
                <span>Book a Consultation</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Global Impact Photo Showcase: All 18 Photos in Compact Perfect Size */}
        <div className="border-t border-[var(--border)]" style={{ marginTop: "96px", paddingTop: "64px" }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" style={{ marginBottom: "40px" }}>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent-lt)] text-[10px] font-mono tracking-widest uppercase mb-3">
                <span>Archive & Milestones</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-[var(--paper)] font-medium tracking-tight">
                Global Keynotes, Research & Academic Honors
              </h3>
            </div>
            <p className="text-[var(--muted-lt)] text-xs md:text-sm max-w-md font-mono">
              Capturing international keynotes, doctoral mentoring summits, and honors across 18 archival moments. Click any photo to expand.
            </p>
          </div>

          <div
            ref={galleryRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5"
          >
            {about.gallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item.id)}
                className="photo-card group hover-shimmer relative h-[130px] sm:h-[145px] rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface-2)] cursor-pointer transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_8px_24px_rgba(184,146,74,0.25)] hover:-translate-y-1"
                role="button"
                tabIndex={0}
                aria-label={`View photo ${item.id}: ${item.alt}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedPhoto(item.id);
                  }
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  unoptimized
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                
                {/* Index Pill */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="font-mono text-[9px] font-semibold text-[var(--paper)] bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 group-hover:border-[var(--accent)]/50 group-hover:text-[var(--accent)] transition-colors">
                    #{item.id < 10 ? `0${item.id}` : item.id}
                  </span>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-5 h-5 rounded-full bg-[var(--accent)] text-[var(--ink)] flex items-center justify-center text-[10px] font-bold shadow">
                    ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Compact Photo Viewer */}
      {selectedPhoto && activePhotoObj && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhotoObj.alt}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" aria-hidden="true" />
          
          <div
            className="relative bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header controls */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-4">
              <span className="text-xs font-mono text-[var(--accent)] font-semibold tracking-wider uppercase">
                Photo #{selectedPhoto < 10 ? `0${selectedPhoto}` : selectedPhoto} of {about.gallery.length}
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] text-xs text-[var(--paper)] hover:text-[var(--accent)] cursor-pointer transition-colors"
                  aria-label="Previous photo"
                >
                  ← Prev
                </button>
                <button
                  onClick={handleNext}
                  className="px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] text-xs text-[var(--paper)] hover:text-[var(--accent)] cursor-pointer transition-colors"
                  aria-label="Next photo"
                >
                  Next →
                </button>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1.5 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] text-[var(--muted-lt)] hover:text-[var(--paper)] cursor-pointer transition-colors ml-2"
                  aria-label="Close photo preview"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main photo */}
            <div className="relative w-full h-[320px] sm:h-[450px] rounded-xl overflow-hidden bg-black/50 border border-[var(--border)]">
              <Image
                src={activePhotoObj.src}
                alt={activePhotoObj.alt}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain"
                unoptimized
                priority
              />
            </div>

            {/* Caption */}
            <div className="pt-4 flex items-center justify-between">
              <p className="text-xs sm:text-sm text-[var(--muted-lt)] font-medium">
                {activePhotoObj.alt}
              </p>
              <span className="text-[11px] font-mono text-[var(--muted)] whitespace-nowrap ml-4">
                Dr. G. Nalinipriya Archive
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
