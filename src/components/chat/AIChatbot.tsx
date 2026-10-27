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
      content: `Hello! I'm your **AI Biz Champ Assistant**.\n\nLed by **Dr. G. Nalinipriya** (Professor in IT & AI Specialist with 30+ yrs experience and 200+ AI tools), we deliver 15 high-precision services across **Design, Video, Web, AI Agents, and Academic Publishing**.\n\nFeel free to speak to me using the 🎙️ **Microphone** button or type your question below!`,
      timestamp: "Just now",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Speech-to-Text (STT) & Audio States
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const currentStreamRef = useRef<MediaStream | null>(null);

  // Text-to-Speech (TTS) Playing States
  const [playingMsgId, setPlayingMsgId] = useState<string | null>(null);
  const [audioLoadingId, setAudioLoadingId] = useState<string | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Movable / Draggable Chat Box State
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; boxX: number; boxY: number }>({
    mouseX: 0,
    mouseY: 0,
    boxX: 0,
    boxY: 0,
  });
  const chatWindowRef = useRef<HTMLElement>(null);

  const startDrag = (clientX: number, clientY: number, target: HTMLElement) => {
    if (target.closest("button") || target.closest("input") || target.closest("a")) return;
    const rect = chatWindowRef.current?.getBoundingClientRect();
    if (!rect) return;

    setIsDragging(true);
    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      boxX: rect.left,
      boxY: rect.top,
    };
  };

  const handleMouseDownHeader = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    startDrag(e.clientX, e.clientY, e.target as HTMLElement);
  };

  const handleTouchStartHeader = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    startDrag(touch.clientX, touch.clientY, e.target as HTMLElement);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;
      const boxWidth = chatWindowRef.current?.offsetWidth || 380;
      const boxHeight = chatWindowRef.current?.offsetHeight || 550;

      const minX = 8;
      const maxX = Math.max(8, window.innerWidth - boxWidth - 8);
      const minY = 8;
      const maxY = Math.max(8, window.innerHeight - boxHeight - 8);

      const newX = Math.min(Math.max(dragStartRef.current.boxX + dx, minX), maxX);
      const newY = Math.min(Math.max(dragStartRef.current.boxY + dy, minY), maxY);

      setPosition({ x: newX, y: newY });
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const dx = touch.clientX - dragStartRef.current.mouseX;
      const dy = touch.clientY - dragStartRef.current.mouseY;
      const boxWidth = chatWindowRef.current?.offsetWidth || 380;
      const boxHeight = chatWindowRef.current?.offsetHeight || 550;

      const minX = 8;
      const maxX = Math.max(8, window.innerWidth - boxWidth - 8);
      const minY = 8;
      const maxY = Math.max(8, window.innerHeight - boxHeight - 8);

      const newX = Math.min(Math.max(dragStartRef.current.boxX + dx, minX), maxX);
      const newY = Math.min(Math.max(dragStartRef.current.boxY + dy, minY), maxY);

      setPosition({ x: newX, y: newY });
    };

    const onDragEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onDragEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onDragEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onDragEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onDragEnd);
    };
  }, [isDragging]);

  const handleResetPosition = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPosition(null);
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => {
        // preventScroll prevents the browser window from scrolling down
        inputRef.current?.focus({ preventScroll: true });
        scrollToBottom("instant");
      }, 80);
    }
  }, [isOpen]);

  // Listen to open-ai-chat event or direct invocation (e.g. from MobileCTABar)
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };
    (window as any).__openAIChat = handleOpenChat;
    window.addEventListener("open-ai-chat", handleOpenChat);
    return () => {
      delete (window as any).__openAIChat;
      window.removeEventListener("open-ai-chat", handleOpenChat);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("smooth");
    }
  }, [messages, isLoading, isOpen]);

  // Clean up recording / audio when unmounting
  useEffect(() => {
    return () => {
      stopListening();
      stopAudio();
    };
  }, []);

  // Stop recording / speech recognition
  const stopListening = () => {
    setIsListening(false);

    // Stop Web Speech Recognition if running
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }

    // Stop MediaRecorder if running
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        // ignore
      }
    }

    // Release microphone hardware
    if (currentStreamRef.current) {
      currentStreamRef.current.getTracks().forEach((track) => track.stop());
      currentStreamRef.current = null;
    }
  };

  // Start recording / speech recognition (supports Web Speech API + ElevenLabs STT)
  const startListening = async () => {
    setMicError(null);

    // Request microphone access
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      currentStreamRef.current = stream;
    } catch (err: any) {
      console.warn("Microphone access denied:", err);
      setMicError("Microphone access was denied. Please allow microphone permissions in your browser.");
      return;
    }

    setIsListening(true);

    let webSpeechTranscribed = false;
    const SpeechRecognition =
      typeof window !== "undefined"
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        const baseText = inputRef.current?.value || "";

        recognition.onresult = (event: any) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + " ";
            } else {
              interimTranscript += transcript;
            }
          }

          const combined = (
            (baseText ? baseText.trim() + " " : "") +
            finalTranscript +
            interimTranscript
          ).trim();

          if (combined) {
            webSpeechTranscribed = true;
            setInput(combined);
          }
        };

        recognition.onerror = (e: any) => {
          console.warn("SpeechRecognition event:", e?.error);
        };

        recognition.onend = () => {
          if (recognitionRef.current === recognition) {
            recognitionRef.current = null;
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (err) {
        console.warn("Could not start Web Speech Recognition:", err);
      }
    }

    // Also record audio chunks for ElevenLabs Speech-to-Text API
    try {
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "";

      const mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const recordedBlob = new Blob(audioChunksRef.current, {
          type: mimeType || "audio/webm",
        });
        audioChunksRef.current = [];

        // If Web Speech API didn't transcribe text or is empty, send to ElevenLabs STT
        if (!webSpeechTranscribed && recordedBlob.size > 1500) {
          setIsTranscribing(true);
          try {
            const formData = new FormData();
            formData.append("file", recordedBlob, "recording.webm");

            const res = await fetch("/api/speech-to-text", {
              method: "POST",
              body: formData,
            });

            if (res.ok) {
              const data = await res.json();
              if (data.text && data.text.trim()) {
                setInput((prev) => (prev ? `${prev.trim()} ${data.text.trim()}` : data.text.trim()));
              }
            } else {
              const errData = await res.json().catch(() => ({}));
              if (errData.needsKey) {
                setMicError("ElevenLabs STT key required in .env.local.");
              }
            }
          } catch (err) {
            console.error("STT API upload error:", err);
          } finally {
            setIsTranscribing(false);
          }
        }
      };

      mediaRecorder.start(200);
    } catch (recorderErr) {
      console.warn("MediaRecorder initialization error:", recorderErr);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Stop any active audio playback
  const stopAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingMsgId(null);
    setAudioLoadingId(null);
  };

  // Play audio for an assistant message using ElevenLabs TTS (with browser fallback)
  const handlePlayVoice = async (msgId: string, text: string) => {
    if (playingMsgId === msgId) {
      stopAudio();
      return;
    }

    stopAudio();
    setAudioLoadingId(msgId);

    try {
      const res = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        currentAudioRef.current = audio;

        audio.onended = () => {
          setPlayingMsgId(null);
          URL.revokeObjectURL(url);
        };
        audio.onerror = () => {
          setPlayingMsgId(null);
          URL.revokeObjectURL(url);
        };

        await audio.play();
        setPlayingMsgId(msgId);
      } else {
        fallbackBrowserTTS(msgId, text);
      }
    } catch (err) {
      console.warn("ElevenLabs TTS failed, using browser speech synthesis:", err);
      fallbackBrowserTTS(msgId, text);
    } finally {
      setAudioLoadingId(null);
    }
  };

  const fallbackBrowserTTS = (msgId: string, text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const cleanText = text
        .replace(/[*_#`[\]()]/g, "")
        .replace(/https?:\/\/\S+/g, "")
        .trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setPlayingMsgId(null);
      utterance.onerror = () => setPlayingMsgId(null);
      setPlayingMsgId(msgId);
      window.speechSynthesis.speak(utterance);
    } else {
      setPlayingMsgId(null);
    }
  };

  const handleSend = async (textToSend?: string) => {
    // If user is currently dictating, stop listening before sending
    if (isListening) {
      stopListening();
    }

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
      const reply =
        data.reply ||
        "I apologize, but I could not process that request. Please feel free to book a consultation below or email aibusinesschampions@gmail.com.";

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
          content:
            "Sorry, I encountered a temporary connection issue. You can book a consultation below or email us directly at aibusinesschampions@gmail.com.",
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
    stopAudio();
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
      const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

      return (
        <p key={idx} className={line.startsWith("- ") ? "ml-3 my-0.5 list-disc" : "my-1"}>
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-semibold text-[#0c192c]">
                  {part.slice(2, -2)}
                </strong>
              );
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
      {/* Floating Trigger Button - Hidden on mobile (<768px) where bottom MobileCTABar provides Ask AI */}
      <div className="fixed bottom-7 right-4 sm:bottom-28 sm:right-7 z-50 hidden md:flex items-center">
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
              <span className="text-[11px] text-[#64748b] font-sans font-medium">
                Voice & Text Assistant
              </span>
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

      {/* Chat Window Dialog - Movable & Draggable */}
      {isOpen && (
        <aside
          ref={chatWindowRef}
          aria-label="AI Assistant Chat"
          style={
            position
              ? {
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  bottom: "auto",
                  right: "auto",
                }
              : undefined
          }
          className={`rgb-hairline fixed z-50 w-[calc(100vw-32px)] sm:w-[430px] h-[600px] max-h-[78vh] sm:max-h-[85vh] flex flex-col rounded-2xl bg-white backdrop-blur-2xl border border-[#bae6fd] shadow-[0_25px_70px_rgba(2,132,199,0.25),0_0_30px_rgba(14,165,233,0.15)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
            !position ? "bottom-20 right-4 sm:bottom-6 sm:right-6" : ""
          } ${
            isDragging
              ? "select-none shadow-[0_35px_90px_rgba(2,132,199,0.45)] scale-[1.01] transition-none cursor-grabbing"
              : ""
          }`}
        >
          {/* Header - Drag Handle */}
          <div
            onMouseDown={handleMouseDownHeader}
            onTouchStart={handleTouchStartHeader}
            onDoubleClick={handleResetPosition}
            title="Drag header to move chatbox anywhere • Double-click to snap back"
            className="relative flex items-center justify-between px-3.5 sm:px-5 py-3.5 bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#6366f1] text-white border-b border-[#0284c7] shadow-sm cursor-grab active:cursor-grabbing select-none"
          >
            <div className="flex items-center gap-2.5 sm:gap-3 pointer-events-none">
              {/* Drag Grip Handle */}
              <div
                className="flex items-center text-white/60 cursor-grab"
                title="Drag to move"
                aria-hidden="true"
              >
                <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
                  <circle cx="2.5" cy="3" r="1.5" />
                  <circle cx="7.5" cy="3" r="1.5" />
                  <circle cx="2.5" cy="8" r="1.5" />
                  <circle cx="7.5" cy="8" r="1.5" />
                  <circle cx="2.5" cy="13" r="1.5" />
                  <circle cx="7.5" cy="13" r="1.5" />
                </svg>
              </div>

              <div className="relative w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-md shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
                </svg>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10b981] rounded-full border-2 border-white" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-bold text-sm text-white tracking-tight">
                    AI Biz Champ
                  </h3>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/25 text-white font-sans font-semibold border border-white/30">
                    Voice & Chat
                  </span>
                </div>
                <p className="text-[10.5px] text-[#e0f2fe] font-sans">
                  Advisory guided by Dr. G. Nalinipriya
                </p>
              </div>
            </div>

            {/* Actions: Reset position, Clear & Close */}
            <div className="flex items-center gap-1">
              {position !== null && (
                <button
                  onClick={handleResetPosition}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                  title="Snap back to default corner"
                  aria-label="Reset chatbox position"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </button>
              )}
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
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#faf7f0] scrollbar-thin scrollbar-thumb-[#bae6fd]"
          >
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
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white rounded-tr-xs font-sans font-medium shadow-md shadow-[#0284c7]/20"
                      : "bg-white text-[#0c192c] border border-[#e8dfd3] rounded-tl-xs font-sans shadow-sm"
                  }`}
                >
                  {renderFormattedMessage(msg.content)}

                  {/* Message Bottom Row: Audio Playback & Timestamp */}
                  <div className="mt-2 pt-1.5 border-t border-black/5 flex items-center justify-between gap-2 text-[10px]">
                    {msg.role === "assistant" ? (
                      <button
                        type="button"
                        onClick={() => handlePlayVoice(msg.id, msg.content)}
                        disabled={audioLoadingId === msg.id}
                        title={
                          playingMsgId === msg.id
                            ? "Stop playback"
                            : "Listen to answer (ElevenLabs Voice)"
                        }
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-medium transition-all cursor-pointer ${
                          playingMsgId === msg.id
                            ? "bg-[#0284c7] text-white shadow-sm"
                            : "bg-[#e0f2fe] text-[#0284c7] hover:bg-[#bae6fd]"
                        }`}
                      >
                        {audioLoadingId === msg.id ? (
                          <span className="w-2.5 h-2.5 border-1.5 border-[#0284c7] border-t-transparent rounded-full animate-spin inline-block" />
                        ) : playingMsgId === msg.id ? (
                          <>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                              <rect x="6" y="6" width="12" height="12" rx="2" />
                            </svg>
                            <span>Stop</span>
                            <span className="flex items-center gap-0.5">
                              <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" />
                              <span className="w-0.5 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                              <span className="w-0.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                            </span>
                          </>
                        ) : (
                          <>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                            <span>Voice</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <span />
                    )}

                    <span
                      className={`text-[10px] ${
                        msg.role === "user" ? "text-white/80" : "text-[#64748b]"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
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
          {messages.length <= 2 && !isLoading && !isListening && (
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

          {/* Speech-to-Text Active Recording Banner */}
          {isListening && (
            <div className="px-3 py-2 bg-rose-50 border-t border-rose-200 flex items-center justify-between text-xs text-rose-700 animate-in fade-in slide-in-from-bottom-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                </span>
                <span className="font-semibold">Listening to your voice...</span>
                <div className="flex items-center gap-0.5 ml-1">
                  <span className="w-0.5 h-3 bg-rose-500 rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                  <span className="w-0.5 h-4.5 bg-rose-500 rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                  <span className="w-0.5 h-2.5 bg-rose-500 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                  <span className="w-0.5 h-4 bg-rose-500 rounded-full animate-pulse" style={{ animationDelay: "75ms" }} />
                </div>
              </div>
              <button
                type="button"
                onClick={stopListening}
                className="text-[11px] font-semibold text-rose-700 hover:text-white bg-rose-100 hover:bg-rose-600 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}

          {/* Transcribing Indicator */}
          {isTranscribing && (
            <div className="px-3 py-1.5 bg-[#e0f2fe] border-t border-[#bae6fd] flex items-center gap-2 text-xs text-[#0284c7]">
              <div className="w-3 h-3 border-2 border-[#0284c7] border-t-transparent rounded-full animate-spin" />
              <span className="font-medium">Transcribing speech with ElevenLabs AI...</span>
            </div>
          )}

          {/* Mic Error Banner */}
          {micError && (
            <div className="px-3 py-1.5 bg-amber-50 border-t border-amber-200 flex items-center justify-between text-xs text-amber-800">
              <span className="line-clamp-1">{micError}</span>
              <button
                type="button"
                onClick={() => setMicError(null)}
                className="text-amber-600 hover:text-amber-900 ml-2 font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
          )}

          {/* Footer Input Area */}
          <div className="p-3 bg-white border-t border-[#e8dfd3]">
            <div className="relative flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? "Listening... speak now" : "Ask about AI services, tools, pricing..."}
                disabled={isLoading || isTranscribing}
                className={`flex-1 bg-[#faf7f0] text-[#0c192c] placeholder-[#64748b] text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#e8dfd3] focus:outline-none focus:border-[#0284c7] focus:bg-white focus:ring-1 focus:ring-[#0284c7] transition-all ${
                  isListening ? "ring-2 ring-rose-400 border-rose-400 bg-rose-50/25" : ""
                }`}
              />

              {/* Microphone Button (Speech to Text) */}
              <button
                type="button"
                onClick={toggleListening}
                disabled={isLoading || isTranscribing}
                title={
                  isListening
                    ? "Click to stop listening"
                    : "Click to speak using Microphone (Speech-to-Text)"
                }
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  isListening
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/40 animate-pulse scale-105"
                    : "bg-[#e0f2fe] text-[#0284c7] hover:bg-[#bae6fd] hover:text-[#0369a1] border border-[#bae6fd]"
                }`}
              >
                {isListening ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                )}
              </button>

              {/* Send Button */}
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading || isTranscribing}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>

            {/* Consultation Callout */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#e8dfd3] text-[10px] text-[#64748b]">
              <span>Need custom AI scoping?</span>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="text-[#0284c7] hover:underline font-semibold flex items-center gap-1"
              >
                Book a Consultation →
              </a>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
