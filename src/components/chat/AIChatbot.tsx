"use client";

import { useState, useRef, useEffect } from "react";
import { site } from "@/content/content";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const STARTER_PROMPTS = [
  "What AI services do you offer?",
  "Tell me about Dr. G. Nalinipriya",
  "How long does a project take?",
  "How do I book a consultation?",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello! I'm your **AI Biz Champion Assistant**.\n\nLed by **Dr. G. Nalinipriya** (Professor in IT & AI Specialist with 30+ yrs experience and 200+ AI tools), we deliver 15 high-precision services across **Design, Video, Web, AI Agents, and Academic Publishing**.\n\nHow can I help you today?`,
      timestamp: "Just now",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => {
        inputRef.current?.focus();
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const reply = data.reply || "I apologize, but I could not process that request. Please feel free to reach out directly to Dr. Nalinipriya on WhatsApp at +91 99949 65489.";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);

      if (!isOpen) {
        setHasUnread(true);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I encountered a temporary connection issue. You can chat directly with Dr. Nalinipriya on WhatsApp at +91 99949 65489 or email aibusinesschampions@gmail.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: `Chat history cleared. How else can I assist your business or project today?`,
        timestamp: "Just now",
      },
    ]);
  };

  // Simple Markdown renderer for bolding, bullet points, and links
  const renderFormattedMessage = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Bold syntax **text**
      const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

      return (
        <p key={idx} className={line.startsWith("- ") ? "ml-3 my-0.5 list-disc" : "my-1"}>
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={pIdx} className="font-semibold text-[#f8f4ec]">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
              const label = part.substring(1, part.indexOf("]("));
              const url = part.substring(part.indexOf("](") + 2, part.length - 1);
              return (
                <a
                  key={pIdx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0ea5e9] hover:text-[#38bdf8] underline underline-offset-2 font-medium"
                >
                  {label}
                </a>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-24 right-4 sm:bottom-28 sm:right-7 z-50 flex items-center">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="rgb-border-pill rgb-soft-glow group relative flex items-center gap-3.5 px-5 py-3.5 rounded-full bg-white text-[#0c192c] border border-[#bae6fd] shadow-[0_12px_36px_rgba(2,132,199,0.22),0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_44px_rgba(2,132,199,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Open AI Assistant Chat"
          >
            {/* Subtle soft sky blue aura ring on hover */}
            <span className="absolute -inset-0.5 rounded-full bg-[#38bdf8]/25 blur-sm group-hover:opacity-100 opacity-0 transition duration-300 pointer-events-none" />

            {/* AI Avatar Icon with 4-point Sparkle & Chromatic Gradient */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[#0284c7] via-[#6366f1] to-[#38bdf8] text-white shadow-sm">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
              </svg>
              {/* Online indicator */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10b981] rounded-full border-2 border-white" />
            </div>

            {/* Label */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-sm tracking-tight text-[#0c192c]">
                  Ask AI
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#e0f2fe] text-[#0284c7] font-sans font-semibold border border-[#bae6fd]">
                  Online
                </span>
              </div>
              <span className="text-[11px] text-[#64748b] font-sans font-medium">Instant Assistant</span>
            </div>

            {/* Right arrow */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#64748b] group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all ml-0.5"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>

            {/* Unread dot */}
            {hasUnread && (
              <span className="w-2.5 h-2.5 bg-[#0284c7] rounded-full animate-ping" />
            )}
          </button>
        )}
      </div>

      {/* Chat Window Dialog - Luxury Creamy White & Sky Blue */}
      {isOpen && (
        <aside
          aria-label="AI Assistant Chat"
          className="rgb-hairline fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[85vh] flex flex-col rounded-2xl bg-white backdrop-blur-2xl border border-[#bae6fd] shadow-[0_25px_70px_rgba(2,132,199,0.25),0_0_30px_rgba(14,165,233,0.15)] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="relative flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#6366f1] text-white border-b border-[#0284c7] shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
                </svg>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10b981] rounded-full border-2 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-bold text-sm text-white tracking-tight">
                    AI Biz Champion
                  </h3>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/25 text-white font-sans font-semibold border border-white/30">
                    AI Specialist
                  </span>
                </div>
                <p className="text-[11px] text-[#e0f2fe] font-sans">
                  Advisory guided by Dr. G. Nalinipriya
                </p>
              </div>
            </div>

            {/* Actions: Clear & Close */}
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                title="Clear Chat History"
                aria-label="Clear chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                title="Minimize Chat"
                aria-label="Close chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#faf7f0] scrollbar-thin scrollbar-thumb-[#bae6fd]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-[#0284c7] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white rounded-tr-xs font-sans font-medium shadow-md shadow-[#0284c7]/20"
                      : "bg-white text-[#0c192c] border border-[#e8dfd3] rounded-tl-xs font-sans shadow-sm"
                  }`}
                >
                  {renderFormattedMessage(msg.content)}
                  <div
                    className={`mt-1 text-[10px] text-right ${
                      msg.role === "user" ? "text-white/80" : "text-[#64748b]"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-[#0284c7] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
                  </svg>
                </div>
                <div className="bg-white border border-[#e8dfd3] rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (only shown if few messages) */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-3 py-2 bg-[#f4efe6] border-t border-[#e8dfd3] flex gap-1.5 overflow-x-auto scrollbar-none">
              {STARTER_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-[#e0f2fe] text-[#0284c7] hover:text-[#0369a1] text-[11px] font-sans font-medium border border-[#e8dfd3] transition-colors cursor-pointer shadow-xs"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Footer Input */}
          <div className="p-3 bg-white border-t border-[#e8dfd3]">
            <div className="relative flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about AI services, tools, pricing..."
                disabled={isLoading}
                className="flex-1 bg-[#faf7f0] text-[#0c192c] placeholder-[#64748b] text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#e8dfd3] focus:outline-none focus:border-[#0284c7] focus:bg-white focus:ring-1 focus:ring-[#0284c7] transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#e8dfd3] text-[10px] text-[#64748b]">
              <span>Prefer WhatsApp?</span>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Dr. Nalinipriya & AI Biz Champion, I want to inquire about your AI services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline font-semibold flex items-center gap-1"
              >
                Chat directly on WhatsApp →
              </a>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
