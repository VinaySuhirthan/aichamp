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

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <p>
        The information provided on this website is for general informational and educational purposes only. AI bis Champ makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of any information.
      </p>
      <p>
        Results described in any service or masterclass context are not guaranteed. Individual outcomes will vary depending on factors including, but not limited to, the nature of each project, client input, and market conditions.
      </p>
      <p>
        [PLACEHOLDER: Add any additional disclaimers relevant to your jurisdiction or services. Consult a legal professional before publishing.]
      </p>
      <p>Last updated: [PLACEHOLDER: Date]</p>
    </LegalPage>
  );
}
