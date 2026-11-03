"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process } from "@/content/content";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const steps = stepsRef.current?.querySelectorAll(".process-step");
      if (!steps) return;
      gsap.from(steps, {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: stepsRef.current, start: "top 80%" },
      });

      // Animate the numbers with a counter-like reveal
      steps.forEach((step) => {
        gsap.from(step.querySelector(".process-step__number"), {
          opacity: 0,
          scale: 0.7,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: step, start: "top 85%" },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-16 md:py-24 bg-[var(--ink)]"
      aria-labelledby="process-heading"
    >
      <div className="container">
        <div className="mb-10 md:mb-16">
          <p className="section-label" style={{ marginBottom: "16px" }}>Process</p>
          <h2
            id="process-heading"
            className="font-heading text-[clamp(32px,5vw,56px)] text-[#0c192c] font-bold max-w-[520px] tracking-tight leading-tight"
          >
            How We <span className="text-[#0284c7] italic font-normal">Work</span>
          </h2>
        </div>

        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
        >
          {process.steps.map((step, i) => (
            <div
              key={step.number}
              className={`process-step relative p-6 md:p-10 ${
                i < process.steps.length - 1 ? "border-b md:border-b-0 md:border-r border-[#e8dfd3]" : ""
              }`}
            >
              {/* Step number */}
              <div className="process-step__number font-heading font-black select-none text-[64px] md:text-[88px] mb-3 md:mb-5 tracking-tighter" aria-hidden="true">
                {step.number}
              </div>

              {/* Content */}
              <div className="relative">
                <p className="text-[#0284c7] text-[11px] tracking-[0.2em] uppercase font-sans font-bold" style={{ marginBottom: "12px" }}>
                  Step {step.number}
                </p>
                <h3 className="font-heading text-[22px] md:text-[24px] text-[#0c192c] font-bold tracking-tight" style={{ lineHeight: "1.3", marginBottom: "14px" }}>
                  {step.title}
                </h3>
                <p className="text-[#475569] font-sans text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector arrow (desktop) */}
              {i < process.steps.length - 1 && (
                <div
                  className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10"
                  aria-hidden="true"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="1.8"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
