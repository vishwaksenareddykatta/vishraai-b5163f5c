import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GlassCard, PageShell } from "@/components/site/Glass";
import { apiPost } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Get in Touch — Vishra AI" },
      { name: "description", content: "Get in touch with the Vishra AI team. We respond within 24 hours." },
      { property: "og:title", content: "Get in Touch — Vishra AI" },
      { property: "og:description", content: "Get in touch with the Vishra AI team. We respond within 24 hours." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const update = (k: keyof typeof form, v: string) => setForm({ ...form, [k]: v });

  return (
    <PageShell>
      <section className="px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block glass rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary mb-6">Contact</span>
          <h1 className="text-5xl md:text-7xl font-semibold text-gradient leading-[1.05]">
            Get in Touch
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-muted-foreground">
            Questions, partnerships, or general inquiries — drop us a line and the team will respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <GlassCard className="md:p-10">
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-2xl text-primary mb-4">✓</div>
                <h2 className="font-display text-2xl font-semibold">Message received.</h2>
                <p className="mt-2 text-muted-foreground">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  try {
                    await apiPost("/api/contact", { ...form, source: "contact_page" });
                    setSubmitted(true);
                  } catch (err: any) {
                    toast.error(err?.message || "Submission failed. Please try again.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="space-y-4"
              >
                <Field label="Your name" value={form.name} onChange={(v) => update("name", v)} required />
                <Field label="Work email" type="email" value={form.email} onChange={(v) => update("email", v)} required />
                <Field label="Company (optional)" value={form.company} onChange={(v) => update("company", v)} />
                <Field label="Message" value={form.message} onChange={(v) => update("message", v)} textarea required />

                <div className="flex items-center justify-end pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium shadow-[0_0_24px_oklch(0.78_0.18_215/0.5)] disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : "Send message"}
                  </button>
                </div>

                <p className="text-xs text-muted-foreground text-center pt-2">
                  Looking for an Intelligence Mapping session?{" "}
                  <a href="/discovery" className="text-primary hover:underline">Request Intelligence Mapping →</a>
                </p>
              </form>
            )}
          </GlassCard>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", textarea = false, required = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; textarea?: boolean; required?: boolean;
}) {
  const cls = "w-full glass rounded-xl px-4 py-3 text-sm bg-transparent outline-none focus:border-primary/60 transition";
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">{label}</span>
      {textarea ? (
        <textarea required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={5} className={cls} />
      ) : (
        <input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}
