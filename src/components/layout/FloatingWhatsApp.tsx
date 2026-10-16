"use client";

import { site } from "@/content/content";

export default function FloatingWhatsApp() {
  return (
    <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-6 right-6 z-40 hidden sm:block">
      <a
        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Dr. G. Nalinipriya & AI Biz Champion team, I want to inquire about your AI services.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-xs tracking-wider uppercase shadow-xl shadow-[#25D366]/35 hover:bg-[#20ba5a] hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20"
        aria-label={`Chat directly on WhatsApp with ${site.phone}`}
      >
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
        </svg>
        <span>WhatsApp</span>
      </a>
    </aside>
  );
}
