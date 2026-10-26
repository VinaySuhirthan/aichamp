"use client";

import React from "react";

const primaryKeywords = [
  "AI AGENTS & BOTS",
  "NEURAL VIDEO GENERATION",
  "ENTERPRISE AUTOMATION",
  "CUSTOM LLM INTEGRATION",
  "SMART CRM & ERP",
  "BESPOKE AI PUBLISHING",
  "PREDICTIVE ANALYTICS",
];

const secondaryKeywords = [
  "ENTERPRISE GRADE",
  "AI CHAMPION SUITE",
  "DR. G. NALINIPRIYA LEAD",
  "DATA DRIVEN IMPACT",
  "END-TO-END AUTOMATION",
  "RAPID AI ADOPTION",
];

export default function MarqueeRibbon() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 select-none pointer-events-none" aria-hidden="true">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255, 46, 84, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-5 sm:gap-7">
        {/* Ribbon 1: Electric Crimson Flow (-2deg) */}
        <div className="w-full transform -rotate-2 -translate-y-1 scale-105 shadow-2xl overflow-hidden py-3.5 sm:py-4 bg-[#121110] border-y border-[rgba(255,46,84,0.35)] backdrop-blur-md">
          <div className="flex whitespace-nowrap animate-marquee-left">
            {[...primaryKeywords, ...primaryKeywords, ...primaryKeywords].map((word, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-sm sm:text-base md:text-lg font-bold tracking-[0.18em] mx-5 sm:mx-8 uppercase text-white/95"
              >
                <span className="w-2 h-2 rounded-full bg-[#ff2e54] inline-block mr-4 shadow-[0_0_10px_#ff2e54]" />
                <span className="hover:text-[#ff2e54] transition-colors">{word}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Ribbon 2: Electric Cyber Cyan Flow (1.8deg) */}
        <div className="w-full transform rotate-[1.8deg] translate-y-[-8px] scale-105 shadow-xl overflow-hidden py-3.5 sm:py-4 bg-[#0a1214] border-y border-[rgba(0,240,255,0.35)] backdrop-blur-md">
          <div className="flex whitespace-nowrap animate-marquee-right">
            {[...secondaryKeywords, ...secondaryKeywords, ...secondaryKeywords].map((word, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-xs sm:text-sm md:text-base font-extrabold tracking-[0.2em] mx-6 sm:mx-9 uppercase text-[#f0fdff]"
              >
                <span className="text-[#00f0ff] mr-4 text-base drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">✦</span>
                <span className="hover:text-[#00f0ff] transition-colors">{word}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
