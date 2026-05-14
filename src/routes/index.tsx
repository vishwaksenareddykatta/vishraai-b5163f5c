import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard, SectionHeader } from "@/components/site/Glass";
import { Orb } from "@/components/site/Background";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Vishra AI — Engineering Autonomous Intelligence" },
      { name: "description", content: "AI infrastructure, autonomous systems and intelligent operations engineered for modern enterprises." },
      { property: "og:title", content: "Vishra AI — Engineering Autonomous Intelligence" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const problems = [
  { t: "Fragmented Workflows", d: "Siloed tools and disconnected handoffs slow every operation." },
  { t: "Manual Scaling", d: "Headcount grows linearly while output stagnates." },
  { t: "Data Chaos", d: "Decisions blocked by inconsistent, unstructured signal." },
  { t: "Slow Decision Pipelines", d: "Insights arrive after the window of action closes." },
];

const solutions = [
  { t: "Autonomous Business Systems", d: "End-to-end agents that execute revenue-critical workflows.", icon: "◆" },
  { t: "AI Infrastructure Engineering", d: "Production-grade pipelines, vector stores, and orchestration.", icon: "◇" },
  { t: "AI Media & Growth Automation", d: "Generative content engines tuned to your brand voice.", icon: "✦" },
  { t: "Intelligent Operations", d: "Continuous optimization layered over your existing stack.", icon: "✧" },
];

const products = [
  { t: "Vishra Flow", d: "Autonomous workflow orchestrator." },
  { t: "Vishra Orbit", d: "Multi-agent coordination layer." },
  { t: "Vishra Pulse", d: "Real-time intelligence telemetry." },
  { t: "Vishra Assist", d: "Embedded AI copilots for teams." },
  { t: "Vishra Forge", d: "Generative content infrastructure." },
  { t: "Vishra Cortex", d: "Enterprise reasoning engine." },
];

const industries = ["Healthcare", "Finance", "SaaS", "Logistics", "E-commerce", "Media"];

const steps = [
  { n: "01", t: "Intelligence Mapping", d: "We diagnose your operational graph and identify autonomy surfaces." },
  { n: "02", t: "Autonomous System Engineering", d: "Production agents and infrastructure deployed to your stack." },
  { n: "03", t: "Operational Intelligence Continuity", d: "Monitoring, optimization and continuous capability expansion." },
];

function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="mx-auto max-w-6xl text-center relative">
          <Orb className="absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-72 opacity-60 animate-float pointer-events-none" />
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary mb-6 relative">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            A division of NexVark Industries
          </span>
          <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight">
            <span className="text-gradient">Engineering</span>
            <br />
            <span className="text-glow">Autonomous Intelligence</span>
          </h1>
          <p className="relative mt-8 mx-auto max-w-2xl text-base md:text-lg text-muted-foreground">
            AI infrastructure, autonomous systems and intelligent operations engineered for the operating cadence of modern enterprises.
          </p>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow-[0_0_32px_oklch(0.78_0.18_215/0.55)] hover:opacity-90 transition">
              Request Intelligence Mapping
            </Link>
            <Link to="/solutions" className="glass rounded-full px-6 py-3 text-sm font-medium hover:border-white/20">
              Explore Systems →
            </Link>
          </div>

          {/* Floating dashboard mock */}
          <div className="relative mt-20 mx-auto max-w-4xl">
            <div className="glass-strong rounded-3xl p-6 md:p-8 glow-ring">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                <span className="ml-3 text-xs text-muted-foreground">vishra.cortex / live</span>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { l: "Autonomous Tasks/hr", v: "12,847" },
                  { l: "Latency p95", v: "184ms" },
                  { l: "System Uptime", v: "99.998%" },
                ].map((m) => (
                  <div key={m.l} className="glass rounded-2xl p-4 text-left">
                    <p className="text-xs text-muted-foreground">{m.l}</p>
                    <p className="mt-1 text-2xl font-semibold text-glow">{m.v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-32 rounded-2xl bg-gradient-to-br from-primary/20 via-sapphire/30 to-transparent relative overflow-hidden">
                <svg viewBox="0 0 400 100" className="absolute inset-0 w-full h-full">
                  <polyline
                    fill="none"
                    stroke="oklch(0.78 0.18 215)"
                    strokeWidth="2"
                    points="0,80 40,60 80,70 120,40 160,55 200,30 240,45 280,20 320,35 360,15 400,25"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="The Friction" title="Operational entropy is invisible — until it isn't." subtitle="Modern businesses don't lack tools. They lack autonomous intelligence threading them together." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {problems.map((p) => (
              <GlassCard key={p.t} glow>
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/40 to-sapphire/60 mb-4" />
                <h3 className="font-semibold text-lg">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="The System" title="Autonomous intelligence, end to end." />
          <div className="grid gap-5 md:grid-cols-2">
            {solutions.map((s) => (
              <GlassCard key={s.t} glow className="md:p-8">
                <div className="text-3xl text-glow">{s.icon}</div>
                <h3 className="mt-4 font-semibold text-2xl">{s.t}</h3>
                <p className="mt-3 text-muted-foreground">{s.d}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="Process" title="Three phases. One continuous intelligence loop." />
          <div className="relative grid gap-6 md:grid-cols-3">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            {steps.map((s) => (
              <GlassCard key={s.n} className="text-center md:p-8">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full glass-strong flex items-center justify-center text-glow font-semibold">
                  {s.n}
                </div>
                <h3 className="font-semibold text-xl">{s.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="Ecosystem" title="The Vishra Product Lattice" subtitle="Six interlocking systems composing a single intelligence fabric." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <GlassCard key={p.t} glow>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-sapphire shadow-[0_0_20px_oklch(0.78_0.18_215/0.5)]" />
                  <h3 className="font-semibold text-xl">{p.t}</h3>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{p.d}</p>
                <div className="mt-6 h-24 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10" />
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="Industries" title="Deployed across regulated and high-velocity sectors." />
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((i) => (
              <span key={i} className="glass rounded-full px-5 py-2.5 text-sm hover:border-primary/40 transition cursor-default">
                {i}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl glass-strong rounded-3xl p-10 md:p-14 glow-ring">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            {[
              { v: "4.2M+", l: "Autonomous actions / month" },
              { v: "99.998%", l: "System uptime" },
              { v: "184ms", l: "Median agent latency" },
              { v: "37x", l: "Avg ops throughput lift" },
            ].map((m) => (
              <div key={m.l}>
                <p className="text-4xl md:text-5xl font-semibold text-glow">{m.v}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-6xl font-semibold text-gradient">Build the future of operations.</h2>
          <p className="mt-6 text-muted-foreground">Map your intelligence surface in 30 minutes.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow-[0_0_32px_oklch(0.78_0.18_215/0.55)]">
              Book Intelligence Mapping
            </Link>
            <Link to="/solutions" className="glass rounded-full px-6 py-3 text-sm font-medium">
              Deploy Autonomous Systems
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
