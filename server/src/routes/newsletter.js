import { Router } from "express";
import { NewsletterSubscriber } from "../models/NewsletterSubscriber.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const source = String(req.body?.source || "footer").slice(0, 60);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }
    try {
      await NewsletterSubscriber.create({ email, source });
    } catch (e) {
      if (e?.code === 11000) {
        return res.json({ ok: true, duplicate: true, message: "You're already subscribed." });
      }
      throw e;
    }
    return res.json({ ok: true, message: "Subscribed." });
  } catch (e) {
    console.error("[newsletter]", e);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

export default router;
