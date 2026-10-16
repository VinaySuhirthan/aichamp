"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/content/content";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!sectionRef.current) return;

      // Image reveal
      gsap.from(imgRef.current, {
        opacity: 0,
        x: -40,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: imgRef.current, start: "top 85%" },
      });

      // Text stagger
      if (textRef.current) {
        gsap.from(textRef.current.querySelectorAll(".about-reveal"), {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 80%" },
        });
      }
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 section--light"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Portrait column */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center md:items-start">
            <div
              ref={imgRef}
              className="group hover-shimmer relative w-[220px] sm:w-[240px] h-[290px] sm:h-[310px] rounded-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[var(--accent)]/40 via-[var(--border-lt)] to-[var(--paper-3)] shadow-xl transition-all duration-500 hover:shadow-[0_16px_40px_rgba(184,146,74,0.35)] hover:-translate-y-1.5 cursor-pointer"
              role="img"
              aria-label={about.portrait.alt}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[var(--surface-2)]">
                <Image
                  src={about.portrait.src}
                  alt={about.portrait.alt}
                  fill
                  sizes="240px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                {/* Floating identity badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-[var(--ink)]/85 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-medium text-[var(--paper)] leading-tight">Dr. G. Nalinipriya</p>
                    <p className="text-[9px] text-[var(--accent)] tracking-wider uppercase">AI Specialist</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Active Practice" />
                </div>
              </div>
            </div>
            {/* Credentials */}
            <ul className="mt-8 space-y-4 list-none" aria-label="Credentials">
              {about.credentials.map((cred) => (
                <li key={cred.label} className="border-t border-[var(--border-lt)] pt-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--muted)] mb-1">
                    {cred.label}
                  </p>
                  <p className="text-[var(--ink)] text-sm font-medium">{cred.value}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Text column */}
          <div ref={textRef} className="md:col-span-8 lg:col-span-8">
            <p className="section-label mb-6 about-reveal">About</p>
            <h2
              id="about-heading"
              className="font-serif text-[clamp(32px,4.5vw,58px)] text-[var(--ink)] leading-[1.2] tracking-[-0.02em] font-medium mb-4 about-reveal"
            >
              {about.name}
            </h2>
            <p className="text-[var(--accent)] text-sm tracking-[0.08em] uppercase mb-8 leading-normal about-reveal">
              {about.title}
            </p>

            <div className="space-y-6 max-w-[680px]">
              {about.bio.map((para, i) => (
                <p
                  key={i}
                  className="text-[var(--muted)] text-[16px] leading-[1.85] about-reveal"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-12 about-reveal">
              <a
                href="#contact"
                className="btn btn--ghost-ink"
                aria-label="Book a consultation with Dr. G. Nalinipriya"
              >
                <span>Book a Consultation</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
