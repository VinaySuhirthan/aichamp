"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/content/content";
import Floating3DShape from "@/components/ui/Floating3DShape";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  useEffect(() => {
    // Safety fallback: guaranteed visibility so 18 images NEVER remain hidden under any circumstance
    const timer = setTimeout(() => {
      if (galleryRef.current) {
        const cards = galleryRef.current.querySelectorAll(".photo-card");
        cards.forEach((c) => {
          (c as HTMLElement).style.opacity = "1";
          (c as HTMLElement).style.transform = "none";
        });
      }
    }, 600);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!sectionRef.current) return;

      // Portrait Image reveal
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { opacity: 0.2, x: -25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: imgRef.current, start: "top 88%" },
          }
        );
      }

      // Founder Text stagger
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.querySelectorAll(".about-reveal"),
          { opacity: 0.2, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: textRef.current, start: "top 85%" },
          }
        );
      }

      // Gallery cards stagger entrance: safe fromTo with once: true
      if (galleryRef.current) {
        const cards = galleryRef.current.querySelectorAll(".photo-card");
        gsap.fromTo(
          cards,
          { opacity: 0.4, y: 14 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 95%",
              once: true,
            },
            onComplete: () => {
              gsap.set(cards, { clearProps: "opacity,transform" });
            },
          }
        );
      }
    });

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
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
      className="py-16 md:py-20 bg-[#faf7f0] relative overflow-hidden border-t border-[#e8dfd3]"
      aria-labelledby="about-heading"
    >
      {/* ── 1. Floating 3D Gradient Bubbles (Gliding Along Outer Borders) ── */}
      <Floating3DShape
        variant="sphere"
        theme="cyan"
        size={160}
        path={3}
        delay={-5}
        className="-left-14 sm:-left-20 top-20 hidden sm:block"
      />
      <Floating3DShape
        variant="blob"
        theme="lavender"
        size={185}
        path={7}
        delay={-15}
        className="-right-16 sm:-right-24 top-1/4 hidden sm:block"
      />
      <Floating3DShape
        variant="ellipsoid"
        theme="mint"
        size={150}
        path={1}
        delay={-25}
        className="-left-12 bottom-36 hidden lg:block"
      />
      <Floating3DShape
        variant="sphere"
        theme="rose"
        size={170}
        path={5}
        delay={-11}
        className="-right-16 bottom-24 hidden sm:block"
      />

      {/* ── 2. Visibly Luminous Continuous Ambient Background (Tuned for Cream #faf7f0) ── */}
      <div
        className="animate-drift-1 absolute top-[10%] -left-[5%] w-[580px] h-[580px] rounded-full pointer-events-none z-0 ambient-glow-cyan"
      />
      <div
        className="animate-drift-2 absolute top-[45%] -right-[6%] w-[540px] h-[540px] rounded-full pointer-events-none z-0 ambient-glow-lavender"
      />
      <div
        className="animate-drift-3 absolute -bottom-10 left-[15%] w-[600px] h-[400px] rounded-full pointer-events-none z-0 ambient-glow-blue"
      />

      {/* Subtle Dot Mesh */}
      <div className="absolute inset-0 bg-dot-subtle opacity-35 pointer-events-none z-0" />

      {/* Delicate floating ambient particle nodes */}
      <div className="ambient-spark w-2 h-2 top-[18%] left-[12%] [animation-delay:0s]" />
      <div className="ambient-spark w-2.5 h-2.5 top-[32%] right-[14%] [animation-delay:2.5s]" />
      <div className="ambient-spark w-2 h-2 top-[70%] left-[8%] [animation-delay:4s]" />
      <div className="ambient-spark w-2.5 h-2.5 top-[85%] right-[10%] [animation-delay:1.5s]" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Founder Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Portrait column */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center md:items-start">
            <div
              ref={imgRef}
              className="group relative w-[220px] sm:w-[260px] h-[290px] sm:h-[340px] rounded-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[#38bdf8]/40 via-[#e8dfd3] to-white shadow-[0_16px_36px_rgba(2,132,199,0.15)] transition-all duration-500 hover:shadow-[0_24px_50px_rgba(2,132,199,0.25)] hover:-translate-y-1.5 cursor-pointer"
              role="img"
              aria-label={about.portrait.alt}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#f4efe6]">
                <Image
                  src={about.portrait.src}
                  alt={about.portrait.alt}
                  fill
                  sizes="260px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  unoptimized
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300" />

                {/* Floating identity badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#e8dfd3] flex items-center justify-between shadow-lg">
                  <div>
                    <p className="text-[12px] font-bold text-[#0c192c] leading-tight">Dr. G. Nalinipriya</p>
                    <p className="text-[9.5px] text-[#0284c7] tracking-wider uppercase font-mono font-semibold">Founder & AI Specialist</p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] animate-pulse" title="Active Practice" />
                </div>
              </div>
            </div>

            {/* Elevated Interactive Credentials */}
            <div className="w-full max-w-[280px] mt-8 space-y-2.5" aria-label="Credentials">
              {about.credentials.map((cred, ci) => (
                <div
                  key={cred.label}
                  className="group/cred p-3 rounded-xl bg-white/95 border border-[#e8dfd3] hover:border-[#0284c7]/50 hover:bg-white hover:shadow-[0_4px_16px_rgba(2,132,199,0.12)] transition-all duration-300"
                >
                  <p className="text-[10px] tracking-wider uppercase text-[#0284c7] font-mono font-bold flex items-center justify-between mb-1">
                    <span>{cred.label}</span>
                    <span className="text-[#94a3b8] text-[9px] font-sans">0{ci + 1}</span>
                  </p>
                  <p className="text-[#0c192c] text-xs sm:text-[13px] font-bold leading-snug">{cred.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Text column */}
          <div ref={textRef} className="md:col-span-8 lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0ea5e9]/30 bg-white text-[#0284c7] text-[11px] font-sans font-semibold tracking-wider uppercase mb-3 shadow-xs about-reveal">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>ABOUT THE FOUNDER</span>
            </div>

            <h2
              id="about-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0c192c] font-medium tracking-tight mb-2 about-reveal leading-tight"
            >
              {about.name}
            </h2>
            <p className="text-[#0284c7] text-xs sm:text-sm tracking-wider uppercase font-mono font-semibold mb-6 about-reveal">
              {about.title}
            </p>

            <div className="max-w-[720px] space-y-4">
              {about.bio.map((para, i) => (
                <p
                  key={i}
                  className="text-[#475569] text-sm sm:text-[15px] about-reveal leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="about-reveal mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-sans font-bold text-xs tracking-wider uppercase shadow-[0_4px_18px_rgba(2,132,199,0.35)] hover:shadow-[0_8px_25px_rgba(2,132,199,0.45)] hover:-translate-y-0.5 transition-all duration-300"
                aria-label="Book a consultation with Dr. G. Nalinipriya"
              >
                <span>Book a Consultation</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Global Impact Photo Showcase: All 18 Photos in Refined Archive Gallery */}
        <div className="border-t border-[#e8dfd3] mt-12 md:mt-16 pt-8 md:pt-10 relative">
          {/* Subtle Ambient Light Ribbon Behind Gallery */}
          <div className="absolute inset-x-0 -top-6 h-48 pointer-events-none z-0 overflow-hidden">
            <div className="animate-drift-2 absolute -left-10 top-0 w-[450px] h-[180px] rounded-full ambient-glow-cyan opacity-80" />
            <div className="animate-drift-1 absolute -right-10 top-4 w-[420px] h-[180px] rounded-full ambient-glow-lavender opacity-80" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0ea5e9]/40 bg-white text-[#0c192c] text-[10px] font-mono tracking-widest uppercase mb-2.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                <span>ARCHIVE & GLOBAL HONORS</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#0c192c] font-medium tracking-tight">
                Global Keynotes, Research & Academic Honors
              </h3>
            </div>
            <p className="text-[#475569] text-xs sm:text-sm max-w-md font-sans leading-relaxed">
              International keynotes, doctoral mentoring summits, and international fellowships across 18 archival moments. Click any moment to view full details.
            </p>
          </div>

          {/* Responsive Gallery Grid: Guaranteed 100% visible, no empty space */}
          <div
            ref={galleryRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5 relative z-10"
          >
            {about.gallery.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item.id)}
                className="photo-card group relative aspect-[4/3] min-h-[120px] sm:min-h-[135px] md:min-h-[150px] rounded-xl overflow-hidden border border-[#e8dfd3] bg-white cursor-pointer transition-all duration-300 hover:border-[#0284c7] hover:shadow-[0_12px_28px_rgba(2,132,199,0.2)] hover:-translate-y-1 shadow-xs"
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
                  priority={idx < 6}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c192c]/80 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-300" />

                {/* Index Pill */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="font-mono text-[9px] font-semibold text-white bg-[#0c192c]/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 group-hover:border-[#38bdf8]/60 transition-colors">
                    #{item.id < 10 ? `0${item.id}` : item.id}
                  </span>
                </div>

                {/* Hover zoom indicator */}
                <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-6 h-6 rounded-full bg-[#0284c7] text-white flex items-center justify-center text-[11px] font-bold shadow-md shadow-[#0284c7]/40">
                    ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && activePhotoObj && (
        <div
          className="fixed inset-0 z-50 bg-[#0c192c]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
              aria-label="Close dialog"
            >
              ✕
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 text-[#0c192c] flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition-all text-lg font-bold"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 text-[#0c192c] flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition-all text-lg font-bold"
              aria-label="Next image"
            >
              ›
            </button>

            {/* Main Modal Image */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black">
              <Image
                src={activePhotoObj.src}
                alt={activePhotoObj.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Modal Info Footer */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#e8dfd3] flex items-center justify-between">
              <div>
                <p className="font-mono text-xs text-[#0284c7] font-semibold uppercase">
                  Archival Moment #{activePhotoObj.id} of {about.gallery.length}
                </p>
                <p className="text-sm sm:text-base font-bold text-[#0c192c] mt-0.5">
                  {activePhotoObj.alt}
                </p>
              </div>
              <span className="text-xs text-[#64748b] font-mono">
                {activePhotoObj.id} / {about.gallery.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
