import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard, PageShell, SectionHeader } from "@/components/site/Glass";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Vishra AI" },
      { name: "description", content: "Vishra AI is the autonomous intelligence division of NexVark Industries — engineering the operating systems of intelligent enterprises." },
      { property: "og:title", content: "About — Vishra AI" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const roadmap = [
  { y: "2025", t: "AI Infrastructure", d: "Foundational pipelines and orchestration layer." },
  { y: "2026", t: "Enterprise Operating Systems", d: "Composable autonomous business primitives." },
  { y: "2027", t: "Autonomous Business Ecosystems", d: "Self-coordinating multi-org intelligence networks." },
  { y: "2028", t: "Intelligent Cloud Architecture", d: "Substrate-level reasoning native to compute." },
];

function AboutPage() {
  return (
    <PageShell>
      <section className="px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block glass rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary mb-6">About</span>
          <h1 className="text-5xl md:text-7xl font-semibold text-gradient leading-[1.05]">
            Powered by NexVark Industries
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-muted-foreground">
            Vishra AI is the autonomous intelligence division of NexVark Industries — engineering the operating systems of the intelligent enterprise.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <GlassCard className="md:p-12 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-primary">Mission</span>
            <p className="mt-4 text-3xl md:text-4xl font-display font-semibold text-gradient">
              "Intelligence that operates without friction."
            </p>
          </GlassCard>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="Structure" title="The NexVark intelligence ecosystem." />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { t: "NexVark Industries", d: "Parent holding entity coordinating advanced engineering ventures." },
              { t: "Vishra AI", d: "Autonomous intelligence and AI infrastructure division." },
              { t: "Adjacent Divisions", d: "Hardware, infra and applied research arms." },
            ].map((c) => (
              <GlassCard key={c.t} glow>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-sapphire mb-4 shadow-[0_0_24px_oklch(0.78_0.18_215/0.5)]" />
                <h3 className="font-semibold text-lg">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeader eyebrow="Roadmap" title="The trajectory of autonomous intelligence." />
          <div className="space-y-4">
            {roadmap.map((r) => (
              <GlassCard key={r.y} className="md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                <span className="text-glow font-display font-semibold text-3xl md:w-32">{r.y}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl">{r.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.d}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center">
        <Link to="/discovery" className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow-[0_0_32px_oklch(0.78_0.18_215/0.55)]">
          Partner with Vishra
        </Link>
      </section>
    </PageShell>
  );
}
