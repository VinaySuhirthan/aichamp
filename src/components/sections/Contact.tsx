"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contact, site } from "@/content/content";

gsap.registerPlugin(ScrollTrigger);

interface FormState {
  name: string;
  email: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", service: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!sectionRef.current) return;
      gsap.from(sectionRef.current.querySelectorAll(".contact-reveal"), {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
    });
    return () => mm.revert();
  }, []);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 md:py-48 bg-[var(--surface)] text-[var(--paper)] border-t border-[var(--border)] relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
          {/* Left info column */}
          <div className="md:col-span-4">
            <p className="section-label contact-reveal" style={{ marginBottom: "16px" }}>Contact</p>
            <h2
              id="contact-heading"
              className="font-serif text-[clamp(32px,4vw,52px)] text-[var(--paper)] font-medium contact-reveal"
              style={{ lineHeight: "1.35", letterSpacing: "-0.015em", marginBottom: "24px" }}
            >
              {contact.label}
            </h2>
            <p className="text-[var(--muted-lt)] text-base contact-reveal" style={{ lineHeight: "2.15", marginBottom: "36px" }}>
              {contact.intro}
            </p>

            <div className="contact-reveal">
              <div style={{ marginBottom: "28px" }}>
                <p className="text-[10px] tracking-[0.18em] uppercase text-[var(--muted)] font-mono" style={{ marginBottom: "6px" }}>
                  Email
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[var(--paper)] text-sm font-medium hover:text-[var(--accent)] transition-colors no-underline break-all focus-visible:outline-[var(--accent)]"
                  aria-label="Send us an email"
                >
                  {site.email}
                </a>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-[var(--muted)] font-mono" style={{ marginBottom: "8px" }}>
                  Direct WhatsApp Contact
                </p>
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Dr. G. Nalinipriya & AI Biz Champion team, I want to inquire about your AI services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white font-medium text-sm transition-all duration-300 shadow-sm cursor-pointer"
                  aria-label={`Chat directly on WhatsApp with ${site.phone}`}
                >
                  <WhatsAppIcon />
                  <span className="font-semibold">{site.phone}</span>
                  <span className="text-xs opacity-75 group-hover:translate-x-0.5 transition-transform">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-8 contact-reveal">
            {status === "success" ? (
              <div
                className="flex flex-col items-start justify-center min-h-[380px] p-8 rounded-2xl border border-[var(--accent)]/40 bg-[var(--surface-2)]"
                role="status"
                aria-live="polite"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mb-5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <h3 className="font-serif text-2xl text-[var(--paper)] font-medium mb-3">
                  Message received.
                </h3>
                <p className="text-[var(--muted-lt)] text-sm leading-relaxed mb-6">
                  Thank you for reaching out. We will review your enquiry and respond with a considered proposal within one business day.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", service: "", message: "" });
                  }}
                  className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] hover:underline cursor-pointer"
                >
                  ← Send another enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="grid grid-cols-1 md:grid-cols-2 gap-7 bg-[var(--surface-2)]/60 p-8 sm:p-10 rounded-2xl border border-[var(--border)]"
              >
                {/* Name */}
                <div className="form-field">
                  <label htmlFor="contact-name" className="text-xs font-mono uppercase tracking-wider text-[var(--muted-lt)] block font-medium" style={{ marginBottom: "10px" }}>
                    Full Name <span className="text-[var(--accent)]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--paper)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)]"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    aria-required="true"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-red-400 mt-2" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="form-field">
                  <label htmlFor="contact-email" className="text-xs font-mono uppercase tracking-wider text-[var(--muted-lt)] block font-medium" style={{ marginBottom: "10px" }}>
                    Email Address <span className="text-[var(--accent)]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--paper)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)]"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    aria-required="true"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-400 mt-2" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Service */}
                <div className="form-field md:col-span-2">
                  <label htmlFor="contact-service" className="text-xs font-mono uppercase tracking-wider text-[var(--muted-lt)] block font-medium" style={{ marginBottom: "10px" }}>
                    Service of Interest
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--paper)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    aria-label="Select a service"
                  >
                    <option value="" className="bg-[var(--surface-2)] text-[var(--muted)]">Select a service (optional)</option>
                    {contact.serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[var(--surface-2)] text-[var(--paper)]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="form-field md:col-span-2">
                  <label htmlFor="contact-message" className="text-xs font-mono uppercase tracking-wider text-[var(--muted-lt)] block font-medium" style={{ marginBottom: "10px" }}>
                    Message <span className="text-[var(--accent)]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--paper)] rounded-xl p-4 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)] resize-y min-h-[130px]"
                    placeholder="Describe your project, objectives, or required deliverables..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    aria-required="true"
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-red-400 mt-1.5" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit & WhatsApp */}
                <div className="md:col-span-2 flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn btn--primary rounded-xl cursor-pointer"
                    aria-label="Submit contact form"
                  >
                    <span>
                      {status === "submitting" ? "Sending..." : "Send Message"}
                    </span>
                    {status !== "submitting" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Dr. G. Nalinipriya & AI Biz Champion team, I want to inquire about your AI services.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--paper)] hover:border-[#25D366] hover:text-[#25D366] font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer"
                    aria-label={`Chat on WhatsApp with ${site.phone}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    <WhatsAppIcon />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}
