"use client";

import { site } from "@/content/content";

export default function MobileCTABar() {
  return (
    <div className="mobile-cta-bar flex gap-2 p-3 bg-[var(--ink)]/95 backdrop-blur-md border-t border-[var(--border)]" aria-label="Quick actions">
      <a
        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello AI Biz Champion, I want to inquire about your AI services.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-xs tracking-wide uppercase transition-transform active:scale-95 shadow-md shadow-[#25D366]/20"
        aria-label="Direct WhatsApp Chat"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
        </svg>
        <span>WhatsApp</span>
      </a>
      <a
        href="#contact"
        className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-[var(--accent)] text-[var(--ink)] font-semibold text-xs tracking-wide uppercase transition-transform active:scale-95 shadow-md shadow-[var(--accent)]/20"
        aria-label="Book a consultation"
      >
        <span>Book Consultation</span>
      </a>
    </div>
  );
}
