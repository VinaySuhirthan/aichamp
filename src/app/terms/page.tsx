function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--ink)] pt-32 pb-20">
      <div className="container max-w-[720px]">
        <p className="section-label mb-4">Legal</p>
        <h1 className="font-serif text-[clamp(28px,4vw,52px)] text-[var(--paper)] tracking-[-0.03em] font-medium mb-10">
          {title}
        </h1>
        <div className="text-[var(--muted-lt)] text-sm leading-relaxed space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        [PLACEHOLDER: Replace this section with your actual Terms of Service. Include information about acceptable use, intellectual property, payment terms, limitations of liability, and governing law.]
      </p>
      <p>Last updated: [PLACEHOLDER: Date]</p>
    </LegalPage>
  );
}
