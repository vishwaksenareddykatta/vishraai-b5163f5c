import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, PageShell, SectionHeader } from "@/components/site/Glass";

export const Route = createFileRoute("/case-studies")({
  component: CasesPage,
  head: () => ({
    meta: [
      { title: "Case Studies — Vishra AI" },
      { name: "description", content: "Autonomous intelligence deployments across SaaS, finance, healthcare and logistics." },
      { property: "og:title", content: "Case Studies — Vishra AI" },
      { property: "og:url", content: "/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
});

const cases = [
  { sector: "SaaS", t: "Autonomous revenue operations", m: [{ k: "Pipeline lift", v: "+312%" }, { k: "Manual hours saved", v: "9,400/mo" }], d: "A vertical SaaS leader replaced fragmented RevOps tooling with a Vishra Orbit deployment, coordinating prospecting, enrichment and outbound execution." },
  { sector: "Finance", t: "Reasoning-native compliance", m: [{ k: "Review throughput", v: "27x" }, { k: "False positives", v: "−68%" }], d: "Vishra Cortex deployed across compliance review surfaces — turning a multi-day workflow into a continuous, explainable reasoning loop." },
  { sector: "Healthcare", t: "Continuous operations intelligence", m: [{ k: "Scheduling accuracy", v: "99.6%" }, { k: "Staff hours recovered", v: "12,800" }], d: "Vishra Pulse provided real-time operational telemetry across a multi-site provider network, surfacing intervention windows automatically." },
  { sector: "Logistics", t: "Self-coordinating dispatch", m: [{ k: "Route efficiency", v: "+41%" }, { k: "Cost / shipment", v: "−23%" }], d: "Vishra Flow autonomously orchestrated dispatch across a multi-region fleet with adaptive policy guardrails." },
];

function CasesPage() {
  return (
    <PageShell>
      <section className="px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block glass rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary mb-6">Case Studies</span>
          <h1 className="text-5xl md:text-7xl font-semibold text-gradient leading-[1.05]">
            Autonomous outcomes.
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-muted-foreground">
            Production deployments measured in throughput, latency and recovered organizational capacity.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2">
          {cases.map((c) => (
            <GlassCard key={c.t} glow className="md:p-8">
              <span className="text-xs uppercase tracking-[0.2em] text-primary">{c.sector}</span>
              <h2 className="mt-2 font-semibold text-2xl">{c.t}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {c.m.map((m) => (
                  <div key={m.k} className="glass rounded-2xl p-4">
                    <p className="text-2xl font-semibold text-glow">{m.v}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.k}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="px-6 py-16">
        <SectionHeader eyebrow="Method" title="Outcomes engineered, not estimated." subtitle="Every Vishra deployment ships with measurable continuity guarantees and continuous capability expansion." />
      </section>
    </PageShell>
  );
}
