"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    const timer = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
    }, 1200);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          document.body.style.overflow = "";
        },
      });
      tl.to(el, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        delay: 0.5,
      });
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      setDone(true);
      document.body.style.overflow = "";
    });

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      mm.revert();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={ref} className="preloader" aria-hidden="true" role="presentation">
      <div className="preloader__wordmark">AI bis Champ</div>
      <div className="preloader__bar" />
    </div>
  );
}
