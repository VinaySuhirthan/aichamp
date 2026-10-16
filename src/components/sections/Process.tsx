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
      className="py-24 md:py-32 bg-[var(--ink)]"
      aria-labelledby="process-heading"
    >
      <div className="container">
        <div className="mb-16 md:mb-20">
          <p className="section-label mb-4">Process</p>
          <h2
            id="process-heading"
            className="font-serif text-[clamp(36px,5vw,64px)] text-[var(--paper)] leading-[1.2] tracking-[-0.02em] font-medium max-w-[520px]"
          >
            How We <em className="italic text-[var(--accent)]">Work</em>
          </h2>
        </div>

        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
        >
          {process.steps.map((step, i) => (
            <div
              key={step.number}
              className={`process-step relative p-8 md:p-10 ${
                i < process.steps.length - 1 ? "border-b md:border-b-0 md:border-r border-[var(--border)]" : ""
              }`}
            >
              {/* Step number (large background) */}
              <div className="process-step__number select-none" aria-hidden="true">
                {step.number}
              </div>

              {/* Content */}
              <div className="relative mt-4">
                <p className="text-[var(--muted)] text-[10px] tracking-[0.18em] uppercase mb-3">
                  Step {step.number}
                </p>
                <h3 className="font-serif text-[22px] text-[var(--paper)] font-medium tracking-[-0.02em] mb-4">
                  {step.title}
                </h3>
                <p className="text-[var(--muted)] text-sm leading-[1.75]">
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
                    stroke="var(--accent)"
                    strokeWidth="1.5"
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
