import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard, PageShell, SectionHeader } from "@/components/site/Glass";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — Vishra AI" },
      { name: "description", content: "Vishra Core, Nexus and Titan — engagement tiers for autonomous intelligence deployments." },
      { property: "og:title", content: "Pricing — Vishra AI" },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How do Vishra engagements start?", acceptedAnswer: { "@type": "Answer", text: "Every engagement begins with an Intelligence Mapping session." } },
          { "@type": "Question", name: "Do you offer ongoing support?", acceptedAnswer: { "@type": "Answer", text: "Yes — Operational Intelligence Continuity plans cover monitoring and expansion." } },
        ],
      }),
    }],
  }),
});

const tiers = [
  {
    name: "Vishra Core",
    price: "$2,500",
    sub: "starting / month",
    desc: "For teams operationalizing their first autonomous workflows.",
    features: ["Up to 3 deployed agents", "Standard integrations", "Observability dashboard", "Email support"],
    highlight: false,
  },
  {
    name: "Vishra Nexus",
    price: "$6,500",
    sub: "starting / month",
    desc: "For scaled operations needing multi-agent coordination.",
    features: ["Unlimited agents", "Multi-agent orchestration", "Custom integrations", "Priority engineering"],
    highlight: true,
  },
  {
    name: "Vishra Titan",
    price: "$18,000+",
    sub: "starting / month",
    desc: "Enterprise-grade autonomous intelligence infrastructure.",
    features: ["Private model deployment", "Dedicated AI engineers", "SLA + compliance", "On-prem options"],
    highlight: false,
  },
];

const faqs = [
  { q: "How does Intelligence Mapping work?", a: "A focused diagnostic to identify the highest-leverage autonomy surfaces inside your operating graph." },
  { q: "Can Vishra deploy on-premise?", a: "Yes. Titan engagements support fully isolated and on-premise deployments." },
  { q: "What integrations are supported?", a: "All major SaaS, data warehouses, and custom internal APIs through our orchestration layer." },
  { q: "Do you replace existing teams?", a: "No — Vishra augments operating teams with autonomous capacity." },
];

function PricingPage() {
  return (
    <PageShell>
      <section className="px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block glass rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary mb-6">Pricing</span>
          <h1 className="text-5xl md:text-7xl font-semibold text-gradient leading-[1.05]">
            Engagement tiers.
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-muted-foreground">
            Transparent starting points. Every deployment is scoped through Intelligence Mapping.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`glass rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 ${
                t.highlight ? "glow-ring" : "hover:border-white/20"
              }`}
            >
              {t.highlight && (
                <span className="inline-block glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary mb-4">
                  Most deployed
                </span>
              )}
              <h3 className="font-display font-semibold text-2xl">{t.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-6">
                <p className="text-5xl font-semibold text-glow">{t.price}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.sub}</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] text-primary">✓</span>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`mt-8 block text-center rounded-full px-5 py-3 text-sm font-medium transition ${
                  t.highlight
                    ? "bg-primary text-primary-foreground shadow-[0_0_24px_oklch(0.78_0.18_215/0.5)]"
                    : "glass hover:border-white/20"
                }`}
              >
                Choose {t.name.split(" ")[1]}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Common questions." />
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="glass rounded-2xl p-5 group">
                <summary className="flex items-center justify-between cursor-pointer font-medium">
                  {f.q}
                  <span className="text-primary group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
