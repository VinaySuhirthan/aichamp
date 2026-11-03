"use client";

import React from "react";

const capabilities = [
  { icon: "⚡", label: "Autonomous AI Agents", category: "Core Intelligence" },
  { icon: "✦", label: "Neural Video & Avatars", category: "Generative Media" },
  { icon: "◈", label: "Custom Enterprise LLMs", category: "Deep Tech" },
  { icon: "★", label: "Smart CRM & ERP Automations", category: "Workflow" },
  { icon: "⬡", label: "Bespoke AI Publishing", category: "Authority" },
  { icon: "●", label: "Predictive Analytics", category: "Data Science" },
  { icon: "✦", label: "8K Ultra-HD Generative Art", category: "Visual Design" },
  { icon: "◈", label: "Patent-Backed Frameworks", category: "Research" },
];

const stats = [
  { value: "30+ Years", label: "Academic & AI Leadership" },
  { value: "200+", label: "Advanced AI Stacks Mastered" },
  { value: "7 Patents", label: "Digital & Deep-Tech Innovations" },
  { value: "100%", label: "Custom Human + AI Craft" },
];

export default function MarqueeRibbon() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf7f0] via-[#ffffff] to-[#faf7f0] border-y border-[#e8dfd3] py-8 sm:py-10 select-none">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        {/* Top Tier: Key Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#e8dfd3]/80">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center px-3 ${
                i > 1 ? "pt-3 sm:pt-0" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-pulse" />
                <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0c192c]">
                  {stat.value}
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#64748b] mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Divider Line */}
      <div className="relative w-full max-w-6xl mx-auto px-4 mb-5">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e8dfd3] to-transparent" />
      </div>

      {/* Bottom Tier: Infinite Luxury Capability Stream */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex whitespace-nowrap animate-marquee-left hover:[animation-play-state:paused] py-1 cursor-default">
          {[...capabilities, ...capabilities, ...capabilities].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 mx-2.5 sm:mx-3.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/90 border border-[#e8dfd3] hover:border-[#0284c7]/50 hover:bg-white hover:shadow-sm transition-all duration-300"
            >
              <span className="text-xs sm:text-sm text-[#0284c7]">
                {item.icon}
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#0c192c]">
                {item.label}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-medium tracking-widest uppercase text-[#94a3b8] pl-1 border-l border-[#e2e8f0]">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
