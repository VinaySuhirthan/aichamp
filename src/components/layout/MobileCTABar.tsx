"use client";

export default function MobileCTABar() {
  const handleOpenAIChat = () => {
    if (typeof window !== "undefined") {
      if (typeof (window as any).__openAIChat === "function") {
        (window as any).__openAIChat();
      }
      window.dispatchEvent(new CustomEvent("open-ai-chat"));
    }
  };

  return (
    <div
      className="mobile-cta-bar flex gap-2.5 p-3 bg-[#faf7f0]/95 backdrop-blur-md border-t border-[#bae6fd] shadow-[0_-4px_20px_rgba(2,132,199,0.12)]"
      aria-label="Quick actions"
    >
      {/* Ask AI button replacing WhatsApp */}
      <button
        type="button"
        onClick={handleOpenAIChat}
        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0284c7] text-white font-bold text-xs tracking-wide uppercase transition-transform active:scale-95 shadow-md shadow-[#0284c7]/25 cursor-pointer"
        aria-label="Open Ask AI Chatbot"
      >
        <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-white">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#10b981] rounded-full" />
        </span>
        <span>Ask AI</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/20 text-white font-sans font-semibold normal-case">
          Online
        </span>
      </button>

      {/* Book Consultation */}
      <a
        href="#contact"
        className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white text-[#0c192c] border border-[#bae6fd] hover:bg-[#e0f2fe] font-bold text-xs tracking-wide uppercase transition-transform active:scale-95 shadow-sm"
        aria-label="Book a consultation"
      >
        <span>Book Consultation</span>
      </a>
    </div>
  );
}

