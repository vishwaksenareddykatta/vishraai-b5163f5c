import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Glass";
import { useRegion } from "@/hooks/use-region";
import { supabase } from "@/integrations/supabase/client";
import { RazorpayButton } from "@/components/site/RazorpayButton";
import { toast } from "sonner";

export const Route = createFileRoute("/discovery")({
  component: DiscoveryPage,
  head: () => ({
    meta: [
      { title: "Discovery Session — Vishra AI" },
      { name: "description", content: "Book a Vishra AI discovery session. Premium intelligence mapping for autonomous operations." },
      { property: "og:title", content: "Discovery Session — Vishra AI" },
      { property: "og:url", content: "/discovery" },
    ],
    links: [{ rel: "canonical", href: "/discovery" }],
  }),
});

type Form = {
  full_name: string;
  work_email: string;
  phone_cc: string;
  phone_number: string;
  whatsapp_cc: string;
  whatsapp_number: string;
  same_as_phone: boolean;
  company_name: string;
  role: string;
  company_size: string;
  industry: string;
  workflows_to_automate: string;
  current_tech_stack: string;
  automation_goals: string;
  infrastructure_scale: string;
  operations_volume: string;
  preferred_contact_method: string[];
  additional_notes: string;
  agree_contact: boolean;
  agree_updates: boolean;
};

const STEPS = ["Contact", "Business", "Operations", "Scale", "Preferences", "Payment"] as const;

const COUNTRY_CODES = ["+91", "+1", "+44", "+61", "+971", "+65", "+49", "+33", "+81", "+86"];

const PAYMENT_BUTTON_IN = "pl_Sqfl0EzY7cF6Nq";
const PAYMENT_BUTTON_INTL = "pl_SqftnOIdNHw4Sp";

function DiscoveryPage() {
  const { region, country } = useRegion();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<Form>({
    full_name: "", work_email: "",
    phone_cc: "+91", phone_number: "",
    whatsapp_cc: "+91", whatsapp_number: "",
    same_as_phone: false,
    company_name: "", role: "", company_size: "", industry: "",
    workflows_to_automate: "", current_tech_stack: "", automation_goals: "",
    infrastructure_scale: "", operations_volume: "",
    preferred_contact_method: [], additional_notes: "",
    agree_contact: false, agree_updates: false,
  });

  // Default phone country code to detected region
  useEffect(() => {
    if (region === "INTL" && form.phone_cc === "+91") {
      setForm((f) => ({ ...f, phone_cc: "+1", whatsapp_cc: "+1" }));
    }
  }, [region]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  // Sync whatsapp when "same as phone" toggled
  useEffect(() => {
    if (form.same_as_phone) {
      setForm((f) => ({ ...f, whatsapp_cc: f.phone_cc, whatsapp_number: f.phone_number }));
    }
  }, [form.same_as_phone, form.phone_cc, form.phone_number]);

  const pricingLabel = region === "IN" ? "₹8,000 INR" : "$400 USD";

  const canProceed = useMemo(() => {
    switch (step) {
      case 0: return !!form.full_name && !!form.work_email && !!form.phone_number;
      case 1: return !!form.company_name && !!form.role && !!form.company_size;
      case 2: return !!form.workflows_to_automate && !!form.automation_goals;
      case 3: return true;
      case 4: return true;
      case 5: return form.agree_contact && form.agree_updates;
      default: return false;
    }
  }, [step, form]);

  const submitToSupabase = async () => {
    setSubmitting(true);
    const { error } = await supabase.from("discovery_requests").insert({
      full_name: form.full_name,
      work_email: form.work_email,
      phone_number: `${form.phone_cc} ${form.phone_number}`.trim(),
      whatsapp_number: form.whatsapp_number ? `${form.whatsapp_cc} ${form.whatsapp_number}`.trim() : null,
      company_name: form.company_name,
      role: form.role,
      company_size: form.company_size,
      industry: form.industry || null,
      workflows_to_automate: form.workflows_to_automate,
      current_tech_stack: form.current_tech_stack || null,
      automation_goals: form.automation_goals,
      infrastructure_scale: form.infrastructure_scale || null,
      operations_volume: form.operations_volume || null,
      preferred_contact_method: form.preferred_contact_method.length ? form.preferred_contact_method : null,
      additional_notes: form.additional_notes || null,
      user_country: country,
      payment_region: region ?? "INTL",
      selected_pricing: region === "IN" ? "INR_8000" : "USD_400",
      payment_status: "initiated",
    });
    setSubmitting(false);
    if (error) {
      toast.error("Couldn't save your request. Please try again.");
      return false;
    }
    return true;
  };

  return (
    <PageShell>
      <section className="px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block glass rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary mb-6">Discovery</span>
          <h1 className="text-5xl md:text-7xl font-semibold text-gradient leading-[1.05]">
            Map your operations.<br />Architect autonomy.
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-muted-foreground">
            A 60-minute diagnostic with our team. Tell us about your operations — we'll respond via email and WhatsApp.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          {submitted ? (
            <SuccessCard />
          ) : (
            <div className="glass rounded-3xl p-6 md:p-10">
              <ProgressBar step={step} />

              {step === 0 && <ContactStep form={form} update={update} />}
              {step === 1 && <BusinessStep form={form} update={update} />}
              {step === 2 && <OperationsStep form={form} update={update} />}
              {step === 3 && <ScaleStep form={form} update={update} />}
              {step === 4 && <PreferencesStep form={form} update={update} />}
              {step === 5 && (
                <PaymentStep
                  form={form}
                  update={update}
                  region={region}
                  pricingLabel={pricingLabel}
                  submitting={submitting}
                  onPay={async () => {
                    const ok = await submitToSupabase();
                    if (ok) {
                      toast.success("Request saved. Complete payment to confirm.");
                      // Show success after a short delay so the Razorpay button is still usable
                      setTimeout(() => setSubmitted(true), 800);
                    }
                  }}
                />
              )}

              <div className="flex items-center justify-between pt-8">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep(step - 1)}
                  className="glass rounded-full px-5 py-2.5 text-sm disabled:opacity-30"
                >
                  Back
                </button>
                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    disabled={!canProceed}
                    onClick={() => setStep(step + 1)}
                    className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium shadow-[0_0_24px_oklch(0.78_0.18_215/0.5)] disabled:opacity-40 disabled:shadow-none"
                  >
                    Continue
                  </button>
                ) : (
                  <span className="text-xs text-muted-foreground max-w-[220px] text-right">
                    Accept both confirmations to enable payment.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-1.5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-primary shadow-[0_0_12px_oklch(0.78_0.18_215/0.6)]" : "bg-white/10"}`}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="uppercase tracking-[0.2em] text-primary">{STEPS[step]}</span>
        <span className="text-muted-foreground">Step {step + 1} of {STEPS.length}</span>
      </div>
    </div>
  );
}

function ContactStep({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  return (
    <div className="space-y-5">
      <StepTitle title="Let's get in touch." subtitle="Where should we reach you?" />
      <Field label="Full name" value={form.full_name} onChange={(v) => update("full_name", v)} required />
      <Field label="Work email" type="email" value={form.work_email} onChange={(v) => update("work_email", v)} required />
      <PhoneField
        label="Phone number"
        cc={form.phone_cc} onCcChange={(v) => update("phone_cc", v)}
        number={form.phone_number} onNumberChange={(v) => update("phone_number", v)}
        required
      />
      <PhoneField
        label="WhatsApp number"
        cc={form.whatsapp_cc} onCcChange={(v) => update("whatsapp_cc", v)}
        number={form.whatsapp_number} onNumberChange={(v) => update("whatsapp_number", v)}
        disabled={form.same_as_phone}
      />
      <label className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer select-none">
        <input
          type="checkbox"
          checked={form.same_as_phone}
          onChange={(e) => update("same_as_phone", e.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-transparent accent-primary"
        />
        Same as phone number
      </label>
    </div>
  );
}

function BusinessStep({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  return (
    <div className="space-y-5">
      <StepTitle title="About your company." />
      <Field label="Company / organization name" value={form.company_name} onChange={(v) => update("company_name", v)} required />
      <Field label="Your role / position" placeholder="CEO, Founder, CTO, Operations Head…" value={form.role} onChange={(v) => update("role", v)} required />
      <SelectField
        label="Company size"
        value={form.company_size}
        onChange={(v) => update("company_size", v)}
        options={["1–10", "11–50", "51–200", "201–500", "500+"]}
        required
      />
      <Field label="Industry" placeholder="SaaS, Real estate, Logistics…" value={form.industry} onChange={(v) => update("industry", v)} />
    </div>
  );
}

function OperationsStep({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  return (
    <div className="space-y-5">
      <StepTitle title="Operational overview." subtitle="What are you trying to automate?" />
      <Field
        label="Core workflows you want to automate"
        textarea rows={4}
        placeholder={"Sales operations\nClient onboarding\nInternal workflows\nAI support systems\nLead management\nReporting & analytics"}
        value={form.workflows_to_automate} onChange={(v) => update("workflows_to_automate", v)}
        required
      />
      <Field
        label="Current tech stack"
        textarea rows={3}
        placeholder={"Slack, HubSpot, Notion, Salesforce, Zapier, custom internal tools…"}
        value={form.current_tech_stack} onChange={(v) => update("current_tech_stack", v)}
      />
      <Field
        label="Primary automation goals"
        textarea rows={4}
        placeholder={"Reduce manual work\nScale operations\nImprove response time\nAI-driven workflows\nCost optimization"}
        value={form.automation_goals} onChange={(v) => update("automation_goals", v)}
        required
      />
    </div>
  );
}

function ScaleStep({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  return (
    <div className="space-y-5">
      <StepTitle title="Infrastructure & scale." />
      <SelectField
        label="Infrastructure scale"
        value={form.infrastructure_scale}
        onChange={(v) => update("infrastructure_scale", v)}
        options={[
          "Early-stage setup",
          "Small operational stack",
          "Mid-scale infrastructure",
          "Enterprise-grade systems",
          "Multi-region / high-scale operations",
        ]}
      />
      <Field
        label="Estimated monthly operations volume"
        placeholder="e.g. 5,000 leads/mo, 20k support tickets, 100k workflow runs"
        value={form.operations_volume} onChange={(v) => update("operations_volume", v)}
      />
    </div>
  );
}

function PreferencesStep({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  const toggle = (m: string) => {
    const cur = new Set(form.preferred_contact_method);
    if (cur.has(m)) cur.delete(m); else cur.add(m);
    update("preferred_contact_method", Array.from(cur));
  };
  const methods = ["Email", "Phone Call", "WhatsApp"];
  return (
    <div className="space-y-5">
      <StepTitle title="Discovery preferences." />
      <div>
        <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">Preferred contact method</span>
        <div className="grid grid-cols-3 gap-2">
          {methods.map((m) => {
            const active = form.preferred_contact_method.includes(m);
            return (
              <button
                key={m}
                type="button"
                onClick={() => toggle(m)}
                className={`rounded-xl px-3 py-3 text-sm transition glass ${active ? "border-primary/60 text-primary shadow-[0_0_18px_oklch(0.78_0.18_215/0.35)]" : "hover:border-white/20"}`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>
      <Field
        label="Additional notes"
        textarea rows={4}
        placeholder="Anything specific you'd like us to know before the call?"
        value={form.additional_notes} onChange={(v) => update("additional_notes", v)}
      />
    </div>
  );
}

function PaymentStep({
  form, update, region, pricingLabel, onPay, submitting,
}: {
  form: Form;
  update: <K extends keyof Form>(k: K, v: Form[K]) => void;
  region: "IN" | "INTL" | null;
  pricingLabel: string;
  onPay: () => void;
  submitting: boolean;
}) {
  const ready = form.agree_contact && form.agree_updates;
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      <StepTitle title="Confirm & pay." subtitle="One last step before we lock in your slot." />

      <div className="glass rounded-2xl p-6 border-primary/30">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Discovery session</p>
            <p className="font-display text-2xl font-semibold mt-1">60-minute diagnostic call</p>
            <p className="text-xs text-muted-foreground mt-2">
              {region === null ? "Detecting your region…" : region === "IN" ? "🇮🇳 Indian pricing applied" : "🌍 International pricing applied"}
            </p>
          </div>
          <p className="text-3xl font-semibold text-glow">{pricingLabel}</p>
        </div>
      </div>

      <div className="space-y-3">
        <ConsentRow
          checked={form.agree_contact}
          onChange={(v) => update("agree_contact", v)}
          label="I agree to be contacted regarding my discovery session request."
        />
        <ConsentRow
          checked={form.agree_updates}
          onChange={(v) => update("agree_updates", v)}
          label="I understand that all updates will be shared via Email and/or WhatsApp — there is no website dashboard."
        />
      </div>

      <div className={`glass rounded-2xl p-6 transition ${ready ? "" : "opacity-40 pointer-events-none"}`}>
        {!saved ? (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Save your request, then complete payment with Razorpay.
            </p>
            <button
              type="button"
              disabled={!ready || submitting}
              onClick={async () => {
                onPay();
                setSaved(true);
              }}
              className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-[0_0_24px_oklch(0.78_0.18_215/0.5)] disabled:opacity-40"
            >
              {submitting ? "Saving…" : `Continue to payment — ${pricingLabel}`}
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-center text-muted-foreground mb-4">
              ✓ Request saved. Complete payment below to confirm your slot.
            </p>
            {region && (
              <RazorpayButton paymentButtonId={region === "IN" ? PAYMENT_BUTTON_IN : PAYMENT_BUTTON_INTL} />
            )}
            <p className="mt-4 text-xs text-center text-muted-foreground">
              Secure payment via Razorpay · {region === "IN" ? "UPI, cards, netbanking" : "International cards"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SuccessCard() {
  return (
    <div className="glass rounded-3xl p-10 md:p-14 text-center">
      <div className="mx-auto h-20 w-20 rounded-full bg-primary/15 border border-primary/50 flex items-center justify-center text-3xl text-primary mb-6 shadow-[0_0_32px_oklch(0.78_0.18_215/0.5)]">
        ✓
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-gradient">
        Request submitted.
      </h2>
      <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
        Your discovery session request has been successfully submitted. Our team will review your request and contact you through <span className="text-foreground font-medium">Email</span> and/or <span className="text-foreground font-medium">WhatsApp</span> with further updates.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Please monitor your inbox and WhatsApp for further communication.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 max-w-md mx-auto">
        <div className="glass rounded-2xl p-4">
          <p className="text-xs text-muted-foreground">Response window</p>
          <p className="mt-1 font-semibold text-glow">&lt; 24h</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <p className="text-xs text-muted-foreground">Channels</p>
          <p className="mt-1 font-semibold">Email · WhatsApp</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable inputs ---------- */

function StepTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-2">
      <h2 className="font-display text-2xl md:text-3xl font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", textarea, rows = 3, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; textarea?: boolean; rows?: number; required?: boolean;
}) {
  const cls = "w-full glass rounded-xl px-4 py-3 text-sm bg-transparent outline-none focus:border-primary/60 transition placeholder:text-muted-foreground/50";
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
        {label}{required && <span className="text-primary"> *</span>}
      </span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} className={cls} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}

function SelectField({
  label, value, onChange, options, required,
}: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
        {label}{required && <span className="text-primary"> *</span>}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full glass rounded-xl px-4 py-3 text-sm bg-transparent outline-none focus:border-primary/60 transition"
      >
        <option value="" className="bg-background">Select…</option>
        {options.map((o) => <option key={o} value={o} className="bg-background">{o}</option>)}
      </select>
    </label>
  );
}

function PhoneField({
  label, cc, onCcChange, number, onNumberChange, disabled, required,
}: {
  label: string; cc: string; onCcChange: (v: string) => void;
  number: string; onNumberChange: (v: string) => void;
  disabled?: boolean; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
        {label}{required && <span className="text-primary"> *</span>}
      </span>
      <div className="flex gap-2">
        <select
          value={cc}
          onChange={(e) => onCcChange(e.target.value)}
          disabled={disabled}
          className="glass rounded-xl px-3 py-3 text-sm bg-transparent outline-none focus:border-primary/60 transition disabled:opacity-50"
        >
          {COUNTRY_CODES.map((c) => <option key={c} value={c} className="bg-background">{c}</option>)}
        </select>
        <input
          type="tel"
          value={number}
          onChange={(e) => onNumberChange(e.target.value)}
          disabled={disabled}
          placeholder="Phone number"
          className="flex-1 glass rounded-xl px-4 py-3 text-sm bg-transparent outline-none focus:border-primary/60 transition disabled:opacity-50 placeholder:text-muted-foreground/50"
        />
      </div>
    </label>
  );
}

function ConsentRow({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-start gap-3 glass rounded-xl p-4 cursor-pointer select-none hover:border-white/20 transition">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent accent-primary"
      />
      <span className="text-sm text-muted-foreground">{label}</span>
    </label>
  );
}
