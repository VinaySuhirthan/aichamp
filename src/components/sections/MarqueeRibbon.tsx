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
          background: "radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-5 sm:gap-7">
        {/* Ribbon 1: Electric Sky Blue Flow (-2deg) */}
        <div className="w-full transform -rotate-2 -translate-y-1 scale-105 shadow-md overflow-hidden py-3.5 sm:py-4 bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0284c7] border-y border-[#38bdf8] backdrop-blur-md">
          <div className="flex whitespace-nowrap animate-marquee-left">
            {[...primaryKeywords, ...primaryKeywords, ...primaryKeywords].map((word, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-sm sm:text-base md:text-lg font-bold tracking-[0.18em] mx-5 sm:mx-8 uppercase text-white"
              >
                <span className="w-2 h-2 rounded-full bg-[#bae6fd] inline-block mr-4 shadow-[0_0_8px_#bae6fd]" />
                <span>{word}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Ribbon 2: Pure White on Creamy Accent (1.8deg) */}
        <div className="w-full transform rotate-[1.8deg] translate-y-[-8px] scale-105 shadow-sm overflow-hidden py-3.5 sm:py-4 bg-white border-y border-[#e8dfd3] backdrop-blur-md">
          <div className="flex whitespace-nowrap animate-marquee-right">
            {[...secondaryKeywords, ...secondaryKeywords, ...secondaryKeywords].map((word, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-xs sm:text-sm md:text-base font-extrabold tracking-[0.2em] mx-6 sm:mx-9 uppercase text-[#0284c7]"
              >
                <span className="text-[#0ea5e9] mr-4 text-base">✦</span>
                <span className="hover:text-[#0369a1] transition-colors">{word}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
