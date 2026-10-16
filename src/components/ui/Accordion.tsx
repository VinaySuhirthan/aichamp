"use client";

import { useState, useRef } from "react";

interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
  variant?: "dark" | "light";
}

export default function Accordion({ items, variant = "dark" }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isDark = variant === "dark";

  return (
    <div role="list" aria-label="Frequently asked questions">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `accordion-panel-${i}`;
        const triggerId = `accordion-trigger-${i}`;

        return (
          <div
            key={i}
            className={`accordion-item ${!isDark ? "accordion-item--light" : ""}`}
            role="listitem"
          >
            <button
              id={triggerId}
              className="accordion-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
              style={{ color: isDark ? "var(--paper)" : "var(--ink)", cursor: "inherit" }}
            >
              <span className="pr-4">{item.q}</span>
              <svg
                className="accordion-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="accordion-content"
              style={{
                maxHeight: isOpen
                  ? `${contentRefs.current[i]?.scrollHeight ?? 200}px`
                  : "0",
              }}
            >
              <div
                ref={(el) => { contentRefs.current[i] = el; }}
                className={`accordion-content__inner ${!isDark ? "accordion-content__inner--ink" : ""}`}
              >
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
