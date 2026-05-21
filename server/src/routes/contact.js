import { Router } from "express";
import { ContactSubmission } from "../models/ContactSubmission.js";
import { sendConfirmation } from "../lib/email.js";

const router = Router();

const CONTACT_INBOX = process.env.CONTACT_INBOX || "nexvarkindustries@gmail.com";

function esc(v = "") {
  return String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

router.post("/", async (req, res) => {
  try {
    const b = req.body || {};
    const email = String(b.email || "").trim().toLowerCase();
    const name = String(b.name || "").trim();
    const company = String(b.company || "").trim();
    const message = String(b.message || "").trim();

    if (!email) {
      return res.status(400).json({ ok: false, error: "email required" });
    }

    const doc = await ContactSubmission.create({
      name,
      email,
      company,
      message,
      company_size: b.company_size || "",
      role: b.role || "",
      workflows: b.workflows || "",
      stack: b.stack || "",
      goals: b.goals || "",
      scale: b.scale || "",
      source: b.source || "contact_page",
    });

    const html = `
      <h2>New contact form submission</h2>
      <p><b>Name:</b> ${esc(name) || "—"}</p>
      <p><b>Email:</b> ${esc(email)}</p>
      <p><b>Company:</b> ${esc(company) || "—"}</p>
      <p><b>Message:</b><br/>${esc(message).replace(/\n/g, "<br/>") || "—"}</p>
      <hr/>
      <p style="color:#888;font-size:12px">Source: ${esc(b.source || "contact_page")} · Received: ${new Date().toISOString()}</p>
    `;

    sendConfirmation({
      to: CONTACT_INBOX,
      subject: `New contact form submission — ${name || email}`,
      html,
      reply_to: email,
    });

    res.json({ ok: true, id: doc._id.toString() });
  } catch (e) {
    console.error("[contact]", e);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

export default router;
