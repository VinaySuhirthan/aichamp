"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faq } from "@/content/content";
import Accordion from "@/components/ui/Accordion";
import Floating3DShape from "@/components/ui/Floating3DShape";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.querySelectorAll(".faq-reveal").forEach((el) => {
          (el as HTMLElement).style.opacity = "1";
          (el as HTMLElement).style.transform = "none";
        });
      }
    }, 600);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".faq-reveal"),
        { opacity: 0.3, y: 16 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 90%", once: true },
          onComplete: () => {
            if (sectionRef.current) {
              gsap.set(sectionRef.current.querySelectorAll(".faq-reveal"), { clearProps: "opacity,transform" });
            }
          }
        }
      );
    });
    return () => { clearTimeout(timer); mm.revert(); };
  }, []);

  const handleOpenAIChat = () => {
    window.dispatchEvent(
      new CustomEvent("open-ai-chat", {
        detail: { message: "Hello! I have a question about AI Biz Champ's services and deliverables." },
      })
    );
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-16 md:py-24 bg-[#faf7f0] relative overflow-hidden border-t border-[#e8dfd3]"
      aria-labelledby="faq-heading"
    >
      {/* ── Floating 3D Bubbles on Outer Borders ── */}
      <Floating3DShape
        variant="blob"
        theme="rose"
        size={170}
        path={4}
        delay={-14}
        className="-left-14 sm:-left-20 top-1/4 hidden sm:block"
      />
      <Floating3DShape
        variant="sphere"
        theme="cyan"
        size={160}
        path={8}
        delay={-26}
        className="-right-12 sm:-right-18 top-1/2 hidden sm:block"
      />

      {/* ── Visibly Luminous Continuous Ambient Background ── */}
      <div className="animate-drift-2 absolute -top-10 -left-10 w-[520px] h-[420px] rounded-full pointer-events-none z-0 ambient-glow-cyan opacity-85" />
      <div className="animate-drift-1 absolute -bottom-10 right-0 w-[480px] h-[380px] rounded-full pointer-events-none z-0 ambient-glow-lavender opacity-85" />
      <div className="absolute inset-0 bg-grid-subtle opacity-35 pointer-events-none z-0" />

      {/* Floating subtle particle sparks */}
      <div className="ambient-spark w-2 h-2 top-[22%] left-[12%] [animation-delay:0.7s]" />
      <div className="ambient-spark w-2.5 h-2.5 bottom-[20%] right-[16%] [animation-delay:2.8s]" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
          {/* Left Column: Heading & Quick Support Card */}
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0ea5e9]/30 bg-white text-[#0284c7] text-[11px] font-sans font-semibold tracking-wider uppercase mb-3 shadow-xs faq-reveal">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span>FREQUENTLY ASKED</span>
            </div>

            <h2
              id="faq-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0c192c] font-medium tracking-tight mb-4 faq-reveal leading-tight"
            >
              Frequently Asked <span className="text-[#0284c7] italic">Questions</span>
            </h2>

            <p className="text-[#475569] text-sm sm:text-base max-w-md faq-reveal leading-relaxed mb-6 font-sans">
              Everything you need to know about our engagement models, delivery timelines, guarantees, and collaboration process.
            </p>

            {/* Quick Support Card */}
            <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#e8dfd3] shadow-[0_4px_16px_rgba(12,25,44,0.04)] faq-reveal">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-xs font-bold text-[#0c192c] uppercase tracking-wider font-sans">
                  Instant AI Concierge Online
                </span>
              </div>
              <p className="text-xs text-[#64748b] leading-relaxed mb-4">
                Have a unique requirement or question not listed here? Ask our interactive voice & text assistant right now.
              </p>
              <button
                type="button"
                onClick={handleOpenAIChat}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e0f2fe] hover:bg-[#0284c7] text-[#0284c7] hover:text-white border border-[#bae6fd] text-xs font-sans font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-xs"
              >
                <span>🎙️ Ask Champ</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="md:col-span-7 faq-reveal bg-white/90 backdrop-blur-md rounded-2xl border border-[#e8dfd3] p-6 sm:p-8 shadow-[0_4px_24px_rgba(12,25,44,0.03)]">
            <Accordion items={faq.items} variant="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
