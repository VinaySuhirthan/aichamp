"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faq } from "@/content/content";
import Accordion from "@/components/ui/Accordion";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!sectionRef.current) return;
      gsap.from(sectionRef.current.querySelectorAll(".faq-reveal"), {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-24 md:py-32 bg-[var(--ink)]"
      aria-labelledby="faq-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="section-label mb-4 faq-reveal">FAQ</p>
            <h2
              id="faq-heading"
              className="font-serif text-[clamp(32px,4.5vw,52px)] text-[var(--paper)] leading-[1.2] tracking-[-0.02em] font-medium faq-reveal"
            >
              Common{" "}
              <em className="italic text-[var(--accent)]">Questions</em>
            </h2>
            <p className="text-[var(--muted)] text-sm mt-6 leading-relaxed max-w-[280px] faq-reveal">
              If you have a question not answered here, please reach out via the contact form below.
            </p>
          </div>
          <div className="md:col-span-8 faq-reveal">
            <Accordion items={faq.items} variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
