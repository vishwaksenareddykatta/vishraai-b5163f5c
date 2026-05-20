import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GlassCard, PageShell } from "@/components/site/Glass";
import { apiPost } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Request Intelligence Mapping" },
      { name: "description", content: "Begin a Vishra AI engagement with an Intelligence Mapping session." },
      { property: "og:title", content: "Contact — Vishra AI" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const steps = ["Company", "Operations", "Goals"] as const;

function ContactPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company: "", size: "", role: "",
    workflows: "", stack: "",
    goals: "", scale: "", email: "",
  });

  const update = (k: keyof typeof form, v: string) => setForm({ ...form, [k]: v });

  return (
    <PageShell>
      <section className="px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block glass rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary mb-6">Contact</span>
          <h1 className="text-5xl md:text-7xl font-semibold text-gradient leading-[1.05]">
            Request Intelligence Mapping
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-muted-foreground">
            A 30-minute diagnostic to identify your highest-leverage autonomy surfaces.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <GlassCard className="md:p-10">
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-2xl text-primary mb-4">✓</div>
                <h2 className="font-display text-2xl font-semibold">Mapping requested.</h2>
                <p className="mt-2 text-muted-foreground">Our intelligence team will respond within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-8">
                  {steps.map((s, i) => (
                    <div key={s} className="flex-1 flex items-center gap-2">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${i <= step ? "bg-primary text-primary-foreground shadow-[0_0_16px_oklch(0.78_0.18_215/0.6)]" : "glass text-muted-foreground"}`}>{i + 1}</div>
                      <span className={`text-sm ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                      {i < steps.length - 1 && <div className="flex-1 h-px bg-white/10" />}
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (step < steps.length - 1) {
                      setStep(step + 1);
                      return;
                    }
                    try {
                      await apiPost("/api/contact", {
                        company: form.company,
                        company_size: form.size,
                        role: form.role,
                        workflows: form.workflows,
                        stack: form.stack,
                        goals: form.goals,
                        scale: form.scale,
                        email: form.email,
                        source: "contact_form",
                      });
                      setSubmitted(true);
                    } catch (err: any) {
                      toast.error(err?.message || "Submission failed. Please try again.");
                      return;
                    }
                  }}
                  className="space-y-4"
                >
                  {step === 0 && (
                    <>
                      <Field label="Company" value={form.company} onChange={(v) => update("company", v)} />
                      <Field label="Company size" placeholder="e.g. 200–500" value={form.size} onChange={(v) => update("size", v)} />
                      <Field label="Your role" value={form.role} onChange={(v) => update("role", v)} />
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <Field label="Core workflows" placeholder="What runs your business today?" value={form.workflows} onChange={(v) => update("workflows", v)} textarea />
                      <Field label="Current stack" placeholder="Salesforce, HubSpot, Snowflake…" value={form.stack} onChange={(v) => update("stack", v)} />
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <Field label="Automation goals" value={form.goals} onChange={(v) => update("goals", v)} textarea />
                      <Field label="Infrastructure scale" placeholder="Daily volume, regions…" value={form.scale} onChange={(v) => update("scale", v)} />
                      <Field label="Work email" type="email" value={form.email} onChange={(v) => update("email", v)} />
                    </>
                  )}

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      disabled={step === 0}
                      onClick={() => setStep(step - 1)}
                      className="glass rounded-full px-4 py-2 text-sm disabled:opacity-30"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium shadow-[0_0_24px_oklch(0.78_0.18_215/0.5)]"
                    >
                      {step === steps.length - 1 ? "Submit" : "Next"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </GlassCard>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { k: "Avg response", v: "< 24h" },
              { k: "Deployment readiness", v: "Live" },
              { k: "Systems availability", v: "99.998%" },
            ].map((s) => (
              <div key={s.k} className="glass rounded-2xl p-4 text-center">
                <p className="text-xs text-muted-foreground">{s.k}</p>
                <p className="mt-1 font-semibold text-glow">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", textarea = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; textarea?: boolean;
}) {
  const cls = "w-full glass rounded-xl px-4 py-3 text-sm bg-transparent outline-none focus:border-primary/60 transition";
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">{label}</span>
      {textarea ? (
        <textarea required value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className={cls} />
      ) : (
        <input required type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}
