import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard, PageShell, SectionHeader } from "@/components/site/Glass";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — Vishra AI" },
      { name: "description", content: "Transparent pricing for Vishra AI engagements. Build fee + monthly maintenance. INR for India, USD international." },
      { property: "og:title", content: "Pricing — Vishra AI" },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
});

type Region = "IN" | "INTL";

const tiersINR = [
  {
    name: "Starter",
    desc: "WhatsApp bot, single workflow, basic AI chatbot",
    build: "₹75,000",
    monthly: "₹22,000",
    breakeven: "Break-even at 3.4 months",
    highlight: false,
  },
  {
    name: "Growth",
    desc: "Lead gen + CRM + multi-step automations",
    build: "₹2,50,000",
    monthly: "₹65,000",
    breakeven: "Break-even at 3.8 months",
    highlight: true,
  },
  {
    name: "Enterprise",
    desc: "Full AI agent ecosystem, unlimited integrations",
    build: "₹8,00,000+",
    monthly: "₹2,00,000",
    breakeven: "Break-even at 4 months",
    highlight: false,
  },
];

const tiersUSD = [
  {
    name: "Starter",
    desc: "Chatbot, single workflow, basic AI agent",
    build: "$2,500",
    monthly: "$700",
    breakeven: "Break-even at 3.5 months",
    highlight: false,
  },
  {
    name: "Growth",
    desc: "CRM + lead gen + multi-agent system",
    build: "$6,500",
    monthly: "$1,800",
    breakeven: "Break-even at 3.6 months",
    highlight: true,
  },
  {
    name: "Enterprise",
    desc: "Full AI ecosystem, custom-trained agents",
    build: "$18,000+",
    monthly: "$5,000",
    breakeven: "Break-even at 3.6 months",
    highlight: false,
  },
];

const discoveryINR = "₹8,000";
const discoveryUSD = "$400";

const terms = [
  { n: "01", t: "50% upfront — always", d: "We don't write a single line of code until the first payment clears. No exceptions." },
  { n: "02", t: "50% before final delivery", d: "Balance is due before handover — not after review, not \"once they check.\" Before." },
  { n: "03", t: "Retainers due on the 1st", d: "Monthly maintenance is invoiced on the 25th and due on the 1st of every month." },
  { n: "04", t: "Late payment = work paused", d: "Payment delayed beyond 7 days means all active work stops immediately until cleared." },
  { n: "05", t: "Discovery fee is pre-call", d: "The discovery session fee is paid before the call is scheduled. Not after. Not on the day." },
];

function PricingPage() {
  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    try { localStorage.removeItem("vishra-region"); } catch {}
    const ctrl = new AbortController();
    fetch("https://ipapi.co/json/", { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d: { country_code?: string }) => {
        setRegion(d?.country_code === "IN" ? "IN" : "INTL");
      })
      .catch(() => setRegion("INTL"));
    return () => ctrl.abort();
  }, []);

  const tiers = region === "IN" ? tiersINR : tiersUSD;
  const discovery = region === "IN" ? discoveryINR : discoveryUSD;
  const regionLabel = region === "IN" ? "🇮🇳 Indian pricing (INR)" : "🌍 International pricing (USD)";

  return (
    <PageShell>
      <section className="px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block glass rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary mb-6">Pricing</span>
          <h1 className="text-5xl md:text-7xl font-semibold text-gradient leading-[1.05]">
            Transparent pricing.<br />No surprises.
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-muted-foreground">
            Two line items per engagement — a one-time build fee and a monthly maintenance fee. That's it.
          </p>

          <div className="mt-10 inline-flex glass rounded-full px-5 py-2 text-sm text-muted-foreground">
            {region === null ? "Detecting your region…" : regionLabel}
          </div>
        </div>
      </section>

      {region === null ? (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass rounded-3xl p-8 h-[420px] animate-pulse opacity-50" />
            ))}
          </div>
        </section>
      ) : (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative glass rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 ${t.highlight ? "glow-ring" : "hover:border-white/20"}`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">
                  Most popular
                </span>
              )}
              <h3 className="font-display font-semibold text-2xl">{t.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground min-h-[40px]">{t.desc}</p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Build fee</p>
                  <p className="text-4xl font-semibold text-glow mt-1">{t.build}</p>
                  <p className="text-xs text-muted-foreground mt-1">One-time · 50% upfront required</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Monthly maintenance</p>
                  <p className="text-2xl font-semibold mt-1">{t.monthly}<span className="text-sm text-muted-foreground"> /mo</span></p>
                  <p className="text-xs text-muted-foreground mt-1">{t.breakeven}</p>
                </div>
              </div>

              <Link
                to="/contact"
                className={`mt-8 block text-center rounded-full px-5 py-3 text-sm font-medium transition ${t.highlight ? "bg-primary text-primary-foreground shadow-[0_0_24px_oklch(0.78_0.18_215/0.5)]" : "glass hover:border-white/20"}`}
              >
                Get started
              </Link>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-6xl mt-6">
          <GlassCard className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🔍</span>
              <div>
                <p className="font-display font-semibold text-lg">Discovery session</p>
                <p className="text-sm text-muted-foreground">Paid before the call · scoping + business audit · 60 mins</p>
              </div>
            </div>
            <p className="text-3xl font-semibold text-glow">{discovery}</p>
          </GlassCard>
        </div>
      </section>
      )}

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeader eyebrow="Non-negotiable" title="Payment terms." />
          <p className="text-muted-foreground -mt-4 mb-8 max-w-2xl">
            Every engagement runs on these terms — no exceptions, no delays, no excuses.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {terms.map((t) => (
              <div key={t.n} className="glass rounded-2xl p-6 hover:-translate-y-0.5 transition">
                <div className="flex items-start gap-4">
                  <span className="text-primary font-display font-semibold text-2xl">{t.n}</span>
                  <div>
                    <p className="font-semibold">{t.t}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <GlassCard className="mt-8 p-6">
            <p className="text-sm text-muted-foreground">
              These rules protect your project timeline as much as ours. <span className="text-foreground font-medium">Why these terms?</span> Delayed payments kill momentum. When payment is tied to milestones, both sides stay accountable. We hold ourselves to the same standard — if we miss a deadline, we make it right. We ask the same from you.
            </p>
          </GlassCard>
        </div>
      </section>
    </PageShell>
  );
}
