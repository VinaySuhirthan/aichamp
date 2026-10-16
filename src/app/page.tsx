import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import { site } from "@/content/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
};

export default function Home() {
  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: "https://aibizchampion.com",
            email: site.email,
            description: site.description,
            founder: {
              "@type": "Person",
              name: "Dr. G. Nalinipriya",
              jobTitle: "Professor and AI Specialist",
            },
          }),
        }}
      />
      <Hero />
      <Services />
      <About />
      <Process />
      <Work />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
