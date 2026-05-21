import { Resend } from "resend";

let resend = null;
function client() {
  if (resend) return resend;
  if (!process.env.RESEND_API_KEY) return null;
  resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

export async function sendConfirmation({ to, subject, html, reply_to }) {
  try {
    const c = client();
    if (!c) return { skipped: true };
    const from = process.env.RESEND_FROM || "Vishra AI <noreply@vishra.ai>";
    const payload = { from, to, subject, html };
    if (reply_to) payload.reply_to = reply_to;
    await c.emails.send(payload);
    return { ok: true };
  } catch (e) {
    console.error("[email] send failed:", e?.message || e);
    return { ok: false };
  }
}
