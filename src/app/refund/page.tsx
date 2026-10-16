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

export default function RefundPage() {
  return (
    <LegalPage title="Refund Policy">
      <p>
        [PLACEHOLDER: Replace this section with your actual Refund Policy. Include information about eligibility for refunds, timeframes, the process for requesting a refund, and any conditions that apply (e.g., digital products, completed work).]
      </p>
      <p>
        For service-based engagements, all terms regarding deposits, milestones, and cancellations are agreed upon in the project proposal prior to commencement of work.
      </p>
      <p>Last updated: [PLACEHOLDER: Date]</p>
    </LegalPage>
  );
}
