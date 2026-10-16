"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { work } from "@/content/content";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (!cards) return;
      gsap.from(cards, {
        opacity: 0,
        y: 48,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      });
    });
    return () => mm.revert();
  }, []);

  const activeProject = work.projects.find((p) => p.id === activeModal);

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="py-32 md:py-48 section--light"
        aria-labelledby="work-heading"
      >
        <div className="container">
          <div className="mb-20">
            <p className="section-label mb-4">Work</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h2
                id="work-heading"
                className="font-serif text-[clamp(36px,5vw,64px)] text-[var(--paper)] leading-[1.38] tracking-[-0.015em] font-medium max-w-[480px]"
              >
                Selected{" "}
                <em className="italic text-[var(--accent)]">Work</em>
              </h2>
              <p className="text-[var(--muted-lt)] text-sm md:text-base max-w-sm leading-[2.1]">{work.intro}</p>
            </div>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {work.projects.map((project, i) => (
              <article
                key={project.id}
                className="project-card group relative rounded-xl overflow-hidden border border-[var(--border-lt)] bg-[var(--surface-2)] shadow-sm transition-all duration-500 hover:border-[var(--accent)] hover:shadow-[0_14px_34px_rgba(184,146,74,0.28)] hover:-translate-y-1.5"
              >
                <button
                  onClick={() => setActiveModal(project.id)}
                  className="w-full text-left block focus-visible:outline-[var(--accent)] cursor-pointer"
                  aria-label={`View case study: ${project.title}`}
                  style={{ background: "none", border: "none", padding: 0 }}
                >
                  <div
                    className="hover-shimmer relative w-full h-[200px] sm:h-[220px] overflow-hidden bg-[var(--surface-2)]"
                  >
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300" aria-hidden="true" />
                    
                    {/* Top right floating pill */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 z-20">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase bg-[var(--accent)] text-[var(--ink)] rounded-full shadow-lg">
                        View ↗
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <p className="text-[var(--accent)] text-[10px] tracking-[0.15em] uppercase font-semibold mb-1">
                        {project.category}
                      </p>
                      <h3 className="text-[var(--paper)] font-serif text-base font-medium line-clamp-1 group-hover:text-[var(--accent-lt)] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] text-[var(--muted-lt)] tracking-[0.08em] uppercase border border-white/10 px-1.5 py-0.5 bg-black/50 backdrop-blur-sm rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModal && activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${activeProject.title}`}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModal(null);
          }}
        >
          <div className="absolute inset-0 bg-[var(--ink)] opacity-90 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative bg-[var(--surface)] border border-[var(--border)] max-w-2xl w-full p-6 md:p-10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-[var(--muted)] hover:text-[var(--paper)] focus-visible:outline-[var(--accent)]"
              aria-label="Close case study"
              style={{ cursor: "pointer", background: "none", border: "none" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-48 md:h-64 mb-6 overflow-hidden rounded border border-[var(--border)]">
              <Image
                src={activeProject.image.src}
                alt={activeProject.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover"
              />
            </div>
            <p className="section-label mb-2">{activeProject.category}</p>
            <h3 className="font-serif text-2xl md:text-3xl text-[var(--paper)] font-medium tracking-[-0.02em] mb-2">
              {activeProject.title}
            </h3>
            <p className="text-[var(--muted)] text-xs mb-6">Completed {activeProject.year} • Led by Dr. G. Nalinipriya</p>
            <div className="h-px bg-[var(--border)] mb-6" />
            <div className="space-y-4 text-[var(--muted-lt)] text-sm leading-relaxed">
              <p>
                <strong className="text-[var(--paper)]">Objective:</strong> Deliver enterprise-grade creative and technical execution under rigorous quality constraints, leveraging cutting-edge AI architectures tailored to client domain needs.
              </p>
              <p>
                <strong className="text-[var(--paper)]">Methodology:</strong> Cross-disciplinary pipeline integrating generative visual systems, custom knowledge retrieval agents, and strict design token adherence.
              </p>
              <p>
                <strong className="text-[var(--paper)]">Result:</strong> Measurable acceleration in production velocity, high brand resonance, and seamless cross-platform deployment.
              </p>
            </div>
            <div className="flex gap-2 mt-6 flex-wrap">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-[var(--accent)] tracking-[0.1em] uppercase border border-[var(--accent)] px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
