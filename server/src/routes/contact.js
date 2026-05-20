import { Router } from "express";
import { ContactSubmission } from "../models/ContactSubmission.js";
import { sendConfirmation } from "../lib/email.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const b = req.body || {};
    const email = String(b.email || "").trim().toLowerCase();
    const company = String(b.company || "").trim();
    if (!email || !company) {
      return res.status(400).json({ ok: false, error: "company and email required" });
    }
    const doc = await ContactSubmission.create({
      company,
      company_size: b.company_size || "",
      role: b.role || "",
      workflows: b.workflows || "",
      stack: b.stack || "",
      goals: b.goals || "",
      scale: b.scale || "",
      email,
      source: b.source || "contact_form",
    });

    sendConfirmation({
      to: email,
      subject: "We received your Vishra AI inquiry",
      html: `<p>Hi,</p><p>Thanks for reaching out about <b>${company}</b>. Our team will respond within 24 hours via Email or WhatsApp.</p><p>— Vishra AI</p>`,
    });

    res.json({ ok: true, id: doc._id.toString() });
  } catch (e) {
    console.error("[contact]", e);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

export default router;
