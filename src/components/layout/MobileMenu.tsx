"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { nav } from "@/content/content";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  id: string;
}

export default function MobileMenu({ open, onClose, id }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const items = itemsRef.current?.querySelectorAll("li");
    if (!menu || !items) return;

    if (open) {
      gsap.to(menu, { x: "0%", duration: 0.55, ease: "power4.out" });
      gsap.fromTo(
        items,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      gsap.to(menu, { x: "100%", duration: 0.45, ease: "power4.in" });
      gsap.to(items, { opacity: 0, duration: 0.2 });
    }
  }, [open]);

  return (
    <div
      ref={menuRef}
      id={id}
      className="mobile-menu md:hidden"
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      style={{ transform: "translateX(100%)" }}
    >
      <nav aria-label="Mobile navigation">
        <ul ref={itemsRef} className="list-none flex flex-col gap-2 mt-8">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onClose}
                className="block text-[var(--paper)] font-serif text-4xl font-medium tracking-[-0.02em] py-3 no-underline hover:text-[var(--accent)] transition-colors duration-200 focus-visible:outline-[var(--accent)]"
                tabIndex={open ? 0 : -1}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <a
            href="#contact"
            onClick={onClose}
            className="btn btn--primary"
            tabIndex={open ? 0 : -1}
          >
            <span>Book a Consultation</span>
          </a>
        </div>
      </nav>
      <div className="mt-auto pt-12 border-t border-[var(--border)]">
        <p className="text-[var(--muted)] text-sm">Because Quality Matters</p>
      </div>
    </div>
  );
}
