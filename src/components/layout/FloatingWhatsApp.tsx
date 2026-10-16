"use client";

import { site } from "@/content/content";

export default function FloatingWhatsApp() {
  return (
    <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-7 right-7 z-50 hidden sm:block">
      <a
        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Dr. G. Nalinipriya & AI Biz Champion team, I want to inquire about your AI services.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#20ba5a] via-[#25D366] to-[#25D366] text-white font-semibold text-sm tracking-wide shadow-[0_12px_36px_rgba(37,211,102,0.55)] hover:shadow-[0_16px_44px_rgba(37,211,102,0.7)] hover:scale-108 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/30"
        aria-label={`Chat directly on WhatsApp with ${site.phone}`}
      >
        {/* Pulsing aura ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />

        {/* Large WhatsApp Icon */}
        <div className="relative flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter drop-shadow group-hover:rotate-12 transition-transform duration-300"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-[#25D366]" />
        </div>

        <div className="flex flex-col text-left">
          <span className="font-bold text-sm tracking-tight leading-tight">Chat on WhatsApp</span>
          <span className="text-[11px] font-mono opacity-90 leading-tight text-white/90">{site.whatsappFormatted}</span>
        </div>
      </a>
    </aside>
  );
}
