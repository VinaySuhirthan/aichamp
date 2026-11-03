"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process } from "@/content/content";
import Floating3DShape from "@/components/ui/Floating3DShape";

gsap.registerPlugin(ScrollTrigger);

const stepMilestones = [
  "Strategic Discovery & Scope",
  "Design Tokens & Specs",
  "Production & AI Sprints",
  "QA Review & Deployment",
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const steps = stepsRef.current?.querySelectorAll(".process-step");
      if (steps) {
        steps.forEach((s) => {
          (s as HTMLElement).style.opacity = "1";
          (s as HTMLElement).style.transform = "none";
        });
      }
    }, 600);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const steps = stepsRef.current?.querySelectorAll(".process-step");
      if (!steps) return;

      gsap.fromTo(
        steps,
        { opacity: 0.3, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: stepsRef.current, start: "top 90%", once: true },
          onComplete: () => {
            gsap.set(steps, { clearProps: "opacity,transform" });
          }
        }
      );

      steps.forEach((step) => {
        gsap.from(step.querySelector(".process-step__number"), {
          opacity: 0,
          scale: 0.8,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 85%" },
        });
      });
    });
    return () => { clearTimeout(timer); mm.revert(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-16 md:py-24 bg-[#faf7f0] relative overflow-hidden border-t border-[#e8dfd3]"
      aria-labelledby="process-heading"
    >
      {/* ── Floating 3D Bubbles on Outer Borders ── */}
      <Floating3DShape
        variant="sphere"
        theme="ice"
        size={160}
        path={2}
        delay={-12}
        className="-left-14 sm:-left-20 top-1/4 hidden sm:block"
      />
      <Floating3DShape
        variant="pill"
        theme="lavender"
        size={135}
        path={6}
        delay={-24}
        className="-right-12 sm:-right-18 top-1/2 hidden sm:block"
      />

      {/* ── Visibly Luminous Continuous Ambient Background ── */}
      <div className="animate-drift-3 absolute -top-16 right-1/4 w-[520px] h-[400px] rounded-full pointer-events-none z-0 ambient-glow-blue opacity-85" />
      <div className="animate-drift-1 absolute bottom-4 left-1/4 w-[480px] h-[350px] rounded-full pointer-events-none z-0 ambient-glow-cyan opacity-85" />
      <div className="absolute inset-0 bg-circuit-subtle opacity-40 pointer-events-none z-0" />

      {/* Floating subtle particle sparks */}
      <div className="ambient-spark w-2 h-2 top-[30%] left-[10%] [animation-delay:2s]" />
      <div className="ambient-spark w-2.5 h-2.5 bottom-[25%] right-[14%] [animation-delay:0.8s]" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0ea5e9]/30 bg-white text-[#0284c7] text-[11px] font-sans font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span>HOW WE WORK</span>
          </div>

          <h2
            id="process-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#0c192c] font-extrabold tracking-tight leading-tight"
          >
            Engineering With <span className="text-[#0284c7]">Precision</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-xl font-sans leading-relaxed">
            Every client partnership follows an airtight four-stage operational pipeline engineered for velocity and guaranteed quality.
          </p>
        </div>

        {/* Animated Connecting Neural Beam (Desktop) */}
        <div className="hidden lg:block relative w-full h-0.5 bg-[#e8dfd3] mb-6 overflow-hidden">
          <div className="animate-flow-line absolute inset-y-0 w-48 bg-gradient-to-r from-transparent via-[#0284c7] to-transparent" />
        </div>

        {/* Steps Grid */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {process.steps.map((step, i) => (
            <div
              key={step.number}
              className="process-step group relative p-6 sm:p-7 rounded-2xl bg-white/90 backdrop-blur-md border border-[#e8dfd3] shadow-[0_2px_12px_rgba(12,25,44,0.03)] hover:shadow-[0_16px_36px_rgba(2,132,199,0.12)] hover:border-[#0284c7]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step number & Moniker */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-wider text-[#0284c7] font-bold bg-[#f0f9ff] px-2.5 py-1 rounded-md border border-[#bae6fd]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                    <span>Stage 0{i + 1}</span>
                  </span>

                  <span className="process-step__number font-heading font-black text-3xl sm:text-4xl text-[#e2e8f0] group-hover:text-[#bae6fd] transition-colors select-none tracking-tighter">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg sm:text-xl text-[#0c192c] font-bold tracking-tight mb-2.5 group-hover:text-[#0284c7] transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#475569] font-sans text-xs sm:text-[13px] leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {/* Milestone Tag Footer */}
              <div className="pt-3 border-t border-[#f1e9de] flex items-center justify-between text-[11px] font-mono text-[#64748b]">
                <span className="truncate">{stepMilestones[i]}</span>
                <span className="text-[#0284c7] font-bold group-hover:translate-x-1 transition-transform">✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
