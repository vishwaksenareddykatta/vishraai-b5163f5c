import { Resend } from "resend";

let resend = null;
function client() {
  if (resend) return resend;
  if (!process.env.RESEND_API_KEY) return null;
  resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

export async function sendConfirmation({ to, subject, html }) {
  try {
    const c = client();
    if (!c) return { skipped: true };
    const from = process.env.RESEND_FROM || "Vishra AI <noreply@vishra.ai>";
    await c.emails.send({ from, to, subject, html });
    return { ok: true };
  } catch (e) {
    console.error("[email] send failed:", e?.message || e);
    return { ok: false };
  }
}
