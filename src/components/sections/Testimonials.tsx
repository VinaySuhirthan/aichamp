"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/content/content";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gridRef.current?.querySelectorAll(".testimonial-card");
      if (!cards) return;
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 md:py-32 section--light"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <div className="mb-16">
          <p className="section-label mb-4">Testimonials</p>
          <h2
            id="testimonials-heading"
            className="font-serif text-[clamp(32px,4.5vw,58px)] text-[var(--paper)] leading-[1.2] tracking-[-0.02em] font-medium"
          >
            What Clients{" "}
            <em className="italic text-[var(--accent)]">Say</em>
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.items.map((t) => (
            <article
              key={t.id}
              className="testimonial-card border border-[var(--border)] bg-[var(--surface-2)]/60 rounded-2xl p-8"
            >
              <blockquote>
                <div className="testimonial-quote">
                  <p className="text-[var(--paper)] text-[15px] leading-[1.8] italic font-serif">
                    {t.quote}
                  </p>
                </div>
                <footer className="mt-6 pt-6 border-t border-[var(--border)]">
                  <p className="text-[var(--paper)] text-sm font-medium">{t.name}</p>
                  <p className="text-[var(--muted-lt)] text-xs mt-0.5">{t.title}</p>
                </footer>
              </blockquote>
            </article>
          ))}
        </div>

        <p className="mt-8 text-[var(--muted)] text-xs text-center">
          Testimonials are placeholder entries and will be replaced with verified client feedback.
        </p>
      </div>
    </section>
  );
}
