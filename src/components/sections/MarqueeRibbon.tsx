"use client";

import React from "react";
import Floating3DShape from "@/components/ui/Floating3DShape";

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
  { value: "30+ Years", label: "Academic & AI Leadership", sub: "Doctoral Supervision" },
  { value: "200+", label: "Advanced AI Stacks Mastered", sub: "Harnessed & Taught" },
  { value: "7 Patents", label: "Digital & Deep-Tech Innovations", sub: "4 Granted Global" },
  { value: "100%", label: "Custom Human + AI Craft", sub: "Production Guaranteed" },
];

export default function MarqueeRibbon() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf7f0] via-[#ffffff] to-[#faf7f0] border-y border-[#e8dfd3] py-8 sm:py-12 select-none">
      {/* Floating 3D Shapes on Outer Flanks */}
      <Floating3DShape
        variant="sphere"
        theme="rose"
        size={140}
        animation={1}
        className="-left-10 top-1/2 -translate-y-1/2 opacity-85 hidden lg:block"
      />
      <Floating3DShape
        variant="ellipsoid"
        theme="cyan"
        size={150}
        animation={2}
        className="-right-12 top-1/2 -translate-y-1/2 opacity-85 hidden lg:block"
      />

      {/* Visibly Luminous Ambient Drifting Orbs */}
      <div className="animate-drift-1 absolute -top-12 left-1/4 w-[450px] h-[300px] rounded-full pointer-events-none z-0 ambient-glow-cyan opacity-90" />
      <div className="animate-drift-2 absolute -bottom-10 right-1/4 w-[480px] h-[320px] rounded-full pointer-events-none z-0 ambient-glow-lavender opacity-90" />
      
      {/* Floating particles */}
      <div className="ambient-spark w-2 h-2 top-4 left-[20%] [animation-delay:1s]" />
      <div className="ambient-spark w-2.5 h-2.5 bottom-4 right-[25%] [animation-delay:3.5s]" />

      {/* Subtle Dot Mesh */}
      <div className="absolute inset-0 bg-dot-subtle opacity-30 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        {/* Top Tier: Key Trust Metrics in Refined Agency Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#e8dfd3] shadow-[0_2px_10px_rgba(12,25,44,0.03)] hover:shadow-[0_12px_28px_rgba(2,132,199,0.12)] hover:border-[#0284c7]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] group-hover:scale-125 transition-transform" />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0c192c] group-hover:text-[#0284c7] transition-colors">
                  {stat.value}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight text-[#0c192c] mt-0.5">
                {stat.label}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748b] mt-1">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Animated Divider Line */}
      <div className="relative w-full max-w-6xl mx-auto px-4 mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#0284c7]/30 to-transparent" />
      </div>

      {/* Bottom Tier: Infinite Luxury Capability Stream */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex whitespace-nowrap animate-marquee-left hover:[animation-play-state:paused] py-1 cursor-default">
          {[...capabilities, ...capabilities, ...capabilities].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 mx-2.5 sm:mx-3 px-4 sm:px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#e8dfd3] hover:border-[#0284c7]/60 hover:bg-white hover:shadow-[0_6px_20px_rgba(2,132,199,0.15)] hover:scale-[1.02] transition-all duration-300"
            >
              <span className="text-xs sm:text-sm text-[#0284c7]">
                {item.icon}
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#0c192c]">
                {item.label}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-medium tracking-widest uppercase text-[#94a3b8] pl-2 border-l border-[#e2e8f0]">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
