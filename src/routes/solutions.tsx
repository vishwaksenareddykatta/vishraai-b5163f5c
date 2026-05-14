import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, PageShell, SectionHeader } from "@/components/site/Glass";

export const Route = createFileRoute("/solutions")({
  component: SolutionsPage,
  head: () => ({
    meta: [
      { title: "Solutions — Vishra AI" },
      { name: "description", content: "AI automation, AI agents, enterprise intelligence, workflow infrastructure, content automation and AI infrastructure engineered by Vishra AI." },
      { property: "og:title", content: "Solutions — Vishra AI" },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
});

const sections = [
  { t: "AI Automation", d: "Replace manual cycles with autonomous executors orchestrated across your stack.", points: ["Event-driven agents", "Cross-system actions", "Audit-grade traceability"] },
  { t: "AI Agents", d: "Multi-agent systems that plan, reason and execute long-horizon objectives.", points: ["Tool-using reasoning", "Memory + retrieval", "Coordinated subagents"] },
  { t: "Enterprise Intelligence", d: "Decision intelligence layered over your operational graph.", points: ["Realtime telemetry", "Predictive triggers", "Strategic dashboards"] },
  { t: "Workflow Infrastructure", d: "Resilient orchestration primitives for production-grade autonomy.", points: ["Queue + retry semantics", "Observability", "Policy & guardrails"] },
  { t: "Content Automation", d: "Generative content pipelines tuned to your brand and channels.", points: ["Brand-voice models", "Asset generation", "Distribution automation"] },
  { t: "AI Infrastructure", d: "Vector stores, model gateways and inference orchestration at scale.", points: ["Model routing", "Cost + latency tuning", "Private deployment"] },
];

function SolutionsPage() {
  return (
    <PageShell>
      <section className="px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block glass rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary mb-6">Solutions</span>
          <h1 className="text-5xl md:text-7xl font-semibold text-gradient leading-[1.05]">
            A composable autonomy fabric.
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-muted-foreground">
            Six engineered surfaces. One integrated intelligence platform deployable into your existing operating environment.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2">
          {sections.map((s) => (
            <GlassCard key={s.t} glow className="md:p-8">
              <h2 className="font-semibold text-2xl">{s.t}</h2>
              <p className="mt-3 text-muted-foreground">{s.d}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_oklch(0.78_0.18_215/0.8)]" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6 h-28 rounded-2xl bg-gradient-to-br from-primary/15 via-sapphire/20 to-transparent border border-white/10" />
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeader eyebrow="Architecture" title="Engineered for production reality." subtitle="Every Vishra system ships with observability, policy controls and continuity guarantees." />
        </div>
      </section>
    </PageShell>
  );
}
