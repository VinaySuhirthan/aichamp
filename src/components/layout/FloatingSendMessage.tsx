"use client";

export default function FloatingSendMessage() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "#contact";
    }
  };

  return (
    <aside aria-label="Start a Conversation" className="fixed bottom-7 right-4 sm:bottom-7 sm:right-7 z-50 hidden sm:block">
      <a
        href="#contact"
        onClick={scrollToContact}
        className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0284c7] text-[#fcf9f2] font-semibold text-sm tracking-wide shadow-[0_12px_36px_rgba(14,165,233,0.55)] hover:shadow-[0_16px_44px_rgba(56,189,248,0.75)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-white/30"
        aria-label="Send message - Start a Conversation"
      >
        {/* Pulsing aura ring */}
        <span className="absolute -inset-1 rounded-full bg-[#0ea5e9]/35 animate-ping pointer-events-none" />

        {/* Message / Conversation Icon */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-black/25 text-white shadow-inner">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter drop-shadow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            aria-hidden="true"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </div>

        <div className="flex flex-col text-left">
          <span className="font-heading font-bold text-sm tracking-tight leading-tight text-white">
            Send Message
          </span>
          <span className="text-[11px] font-sans font-medium opacity-90 leading-tight text-[#fcf9f2]">
            Start a Conversation →
          </span>
        </div>
      </a>
    </aside>
  );
}
