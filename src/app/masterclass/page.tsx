import type { Metadata } from "next";
import { masterclass, site } from "@/content/content";
import Accordion from "@/components/ui/Accordion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: `${masterclass.title} | ${site.name}`,
  description: masterclass.description,
};

export default function MasterclassPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: `${masterclass.title}: ${masterclass.subtitle}`,
            description: masterclass.description,
            organizer: { "@type": "Organization", name: site.name },
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
          }),
        }}
      />

      {/* Full-page layout */}
      <div className="min-h-screen bg-[var(--ink)]">
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[var(--border)]">
          <div className="container">
            <div className="max-w-[760px]">
              <p className="section-label mb-6">Live Masterclass</p>
              <h1 className="font-serif text-[clamp(32px,5vw,72px)] text-[var(--paper)] leading-[0.95] tracking-[-0.03em] font-medium mb-6">
                {masterclass.title}
                <br />
                <em className="italic text-[var(--accent)]">{masterclass.subtitle}</em>
              </h1>
              <p className="text-[var(--muted)] text-base leading-relaxed max-w-[540px] mb-10">
                {masterclass.description}
              </p>

              {/* Date / Time / Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 border border-[var(--border)] mb-10 inline-grid">
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

              <a
                href={masterclass.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                aria-label="Register for the masterclass"
              >
                <span>Secure Your Seat</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Content grid */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Learn */}
              <div>
                <p className="section-label mb-6">What You Will Learn</p>
                <ol className="space-y-4 list-none">
                  {masterclass.whatYouLearn.map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="font-mono text-[var(--accent)] text-xs flex-shrink-0 mt-1 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[var(--muted-lt)] text-sm leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* For */}
              <div>
                <p className="section-label mb-6">Who This Is For</p>
                <ul className="space-y-4 list-none">
                  {masterclass.whoIsItFor.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <p className="text-[var(--muted-lt)] text-sm leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 border-t border-[var(--border)]">
          <div className="container max-w-[720px]">
            <p className="section-label mb-8">Frequently Asked Questions</p>
            <Accordion items={masterclass.faq} variant="dark" />
          </div>
        </section>

        {/* CTA repeat */}
        <section className="py-16 md:py-24 border-t border-[var(--border)] text-center">
          <div className="container">
            <h2 className="font-serif text-[clamp(28px,4vw,52px)] text-[var(--paper)] tracking-[-0.03em] font-medium mb-6">
              Ready to join?
            </h2>
            <a
              href={masterclass.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              aria-label="Register now for the masterclass"
            >
              <span>Register Now</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
