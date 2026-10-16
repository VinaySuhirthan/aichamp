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
        y: 30,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
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
    // Simulate submission — replace with your actual form handler or API
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32 section--light"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left */}
          <div className="md:col-span-4">
            <p className="section-label mb-4 contact-reveal">Contact</p>
            <h2
              id="contact-heading"
              className="font-serif text-[clamp(28px,3.5vw,48px)] text-[var(--ink)] leading-[1.2] tracking-[-0.02em] font-medium mb-6 contact-reveal"
            >
              {contact.label}
            </h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-10 contact-reveal">
              {contact.intro}
            </p>

            <div className="space-y-6 contact-reveal">
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-[var(--muted)] mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[var(--ink)] text-sm font-medium hover:text-[var(--accent)] transition-colors no-underline focus-visible:outline-[var(--accent)]"
                  aria-label="Send us an email"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-[var(--muted)] mb-2 font-medium">
                  Direct WhatsApp
                </p>
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Dr. G. Nalinipriya & AI bis Champ team, I want to inquire about your AI services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a] font-medium text-sm transition-all duration-300 shadow-md shadow-[#25D366]/20 cursor-pointer"
                  aria-label={`Chat directly on WhatsApp with ${site.phone}`}
                >
                  <WhatsAppIcon />
                  <span className="font-semibold">{site.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-8 contact-reveal">
            {status === "success" ? (
              <div
                className="flex flex-col items-start justify-center min-h-[400px] py-12"
                role="status"
                aria-live="polite"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mb-6">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <h3 className="font-serif text-2xl text-[var(--ink)] font-medium mb-3">
                  Message received.
                </h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  Thank you for reaching out. We will review your enquiry and respond within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Name */}
                <div className="form-field">
                  <label htmlFor="contact-name" className="form-label">
                    Full Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    className="form-input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    aria-required="true"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p id="name-error" className="form-error" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="form-field">
                  <label htmlFor="contact-email" className="form-label">
                    Email Address <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    aria-required="true"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" className="form-error" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Service */}
                <div className="form-field md:col-span-2">
                  <label htmlFor="contact-service" className="form-label">
                    Service of Interest
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    className="form-select"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    aria-label="Select a service"
                  >
                    <option value="">Select a service (optional)</option>
                    {contact.serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="form-field md:col-span-2">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-textarea"
                    placeholder="Describe your project or enquiry..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    aria-required="true"
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p id="message-error" className="form-error" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit & WhatsApp */}
                <div className="md:col-span-2 flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn btn--primary cursor-pointer"
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
                    href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Dr. G. Nalinipriya & AI bis Champ team, I want to inquire about your AI services.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white hover:bg-[#20ba5a] font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-md shadow-[#25D366]/20 cursor-pointer"
                    aria-label={`Chat on WhatsApp with ${site.phone}`}
                  >
                    <WhatsAppIcon />
                    <span>WhatsApp Direct ({site.phone})</span>
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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}
