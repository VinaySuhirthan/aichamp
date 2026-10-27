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
          background: "radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-5 sm:gap-7">
        {/* Ribbon 1: Light Blue Flow on Deep Sapphire (-2deg) */}
        <div className="w-full transform -rotate-2 -translate-y-1 scale-105 shadow-2xl overflow-hidden py-3.5 sm:py-4 bg-[#0a1426] border-y border-[rgba(56,189,248,0.45)] backdrop-blur-md">
          <div className="flex whitespace-nowrap animate-marquee-left">
            {[...primaryKeywords, ...primaryKeywords, ...primaryKeywords].map((word, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-sm sm:text-base md:text-lg font-bold tracking-[0.18em] mx-5 sm:mx-8 uppercase text-[#fcf9f2]"
              >
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] inline-block mr-4 shadow-[0_0_10px_#38bdf8]" />
                <span className="hover:text-[#38bdf8] transition-colors">{word}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Ribbon 2: Warm Creamy White Flow on Midnight Blue (1.8deg) */}
        <div className="w-full transform rotate-[1.8deg] translate-y-[-8px] scale-105 shadow-xl overflow-hidden py-3.5 sm:py-4 bg-[#0f1d38] border-y border-[rgba(252,249,242,0.3)] backdrop-blur-md">
          <div className="flex whitespace-nowrap animate-marquee-right">
            {[...secondaryKeywords, ...secondaryKeywords, ...secondaryKeywords].map((word, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-xs sm:text-sm md:text-base font-extrabold tracking-[0.2em] mx-6 sm:mx-9 uppercase text-[#fcf9f2]"
              >
                <span className="text-[#38bdf8] mr-4 text-base drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]">✦</span>
                <span className="hover:text-[#38bdf8] transition-colors">{word}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
