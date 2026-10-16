"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { masterclass } from "@/content/content";
import Accordion from "@/components/ui/Accordion";

gsap.registerPlugin(ScrollTrigger);

export default function Masterclass() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!contentRef.current) return;
      gsap.from(contentRef.current.querySelectorAll(".mc-reveal"), {
        opacity: 0,
        y: 32,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="masterclass"
      className="py-24 md:py-32 bg-[var(--ink)]"
      aria-labelledby="masterclass-heading"
    >
      <div className="container">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Main info */}
          <div className="lg:col-span-7">
            <p className="section-label mb-4 mc-reveal">Live Masterclass</p>
            <h2
              id="masterclass-heading"
              className="font-serif text-[clamp(28px,4vw,52px)] text-[var(--paper)] leading-[1.0] tracking-[-0.03em] font-medium mb-6 mc-reveal"
            >
              {masterclass.title}
              <br />
              <em className="italic text-[var(--accent)]">{masterclass.subtitle}</em>
            </h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-10 max-w-[540px] mc-reveal">
              {masterclass.description}
            </p>

            {/* Date / Time / Price */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[var(--border)] mb-10 mc-reveal">
              {[
                { label: "Date", value: masterclass.date },
                { label: "Time", value: masterclass.time },
                { label: "Investment", value: masterclass.price },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`p-5 ${i < 2 ? "border-b sm:border-b-0 sm:border-r border-[var(--border)]" : ""}`}
                >
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[var(--muted)] mb-1">
                    {item.label}
                  </p>
                  <p className="text-[var(--paper)] text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mc-reveal">
              <a
                href={masterclass.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                aria-label="Register for the AI bis Champ masterclass"
              >
                <span>Register Now</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Learn / For / FAQ */}
          <div className="lg:col-span-5 space-y-10">
            {/* What you learn */}
            <div className="mc-reveal">
              <p className="section-label mb-5">What You Will Learn</p>
              <ul className="space-y-3 list-none">
                {masterclass.whatYouLearn.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-[var(--muted-lt)] text-sm">
                    <span className="text-[var(--accent)] font-mono text-xs flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Who it's for */}
            <div className="mc-reveal">
              <p className="section-label mb-5">Who This Is For</p>
              <ul className="space-y-3 list-none">
                {masterclass.whoIsItFor.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-[var(--muted-lt)] text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div className="mc-reveal">
              <p className="section-label mb-5">FAQ</p>
              <Accordion items={masterclass.faq} variant="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
