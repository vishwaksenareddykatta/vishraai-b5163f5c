import { Router } from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import { RIMSubmission } from "../models/RIMSubmission.js";
import { sendConfirmation } from "../lib/email.js";

const router = Router();

function rzp() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

/**
 * POST /api/rim/create
 * Creates a Razorpay order. Does NOT save the submission yet.
 * Body: { payment_region: "IN" | "INTL" }
 * Returns: { ok, order_id, amount, currency, key_id }
 */
router.post("/create", async (req, res) => {
  try {
    const region = req.body?.payment_region === "IN" ? "IN" : "INTL";
    const amount = region === "IN" ? 8000 * 100 : 400 * 100; // smallest unit
    const currency = region === "IN" ? "INR" : "USD";
    const order = await rzp().orders.create({
      amount,
      currency,
      receipt: `rim_${Date.now()}`,
      notes: { region },
    });
    res.json({
      ok: true,
      order_id: order.id,
      amount,
      currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (e) {
    console.error("[rim/create]", e);
    res.status(500).json({ ok: false, error: "Could not create order" });
  }
});

/**
 * POST /api/rim/payment/verify
 * Verifies Razorpay signature + payment status, then saves the submission.
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, form: {...} }
 */
router.post("/payment/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, form } = req.body || {};
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !form) {
      return res.status(400).json({ ok: false, error: "Missing payment fields" });
    }

    // 1. Signature check
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (
      expected.length !== razorpay_signature.length ||
      !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature))
    ) {
      return res.status(400).json({ ok: false, error: "Invalid payment signature" });
    }

    // 2. Confirm payment status with Razorpay API
    const payment = await rzp().payments.fetch(razorpay_payment_id);
    if (!payment || payment.order_id !== razorpay_order_id) {
      return res.status(400).json({ ok: false, error: "Payment / order mismatch" });
    }
    if (payment.status !== "captured" && payment.status !== "authorized") {
      return res.status(400).json({ ok: false, error: `Payment not successful (${payment.status})` });
    }

    // 3. Persist submission
    const doc = await RIMSubmission.create({
      full_name: String(form.full_name || "").trim(),
      work_email: String(form.work_email || "").trim().toLowerCase(),
      phone_number: String(form.phone_number || "").trim(),
      whatsapp_number: form.whatsapp_number || "",
      company_name: String(form.company_name || "").trim(),
      role: String(form.role || "").trim(),
      company_size: form.company_size || "",
      industry: form.industry || "",
      workflows_to_automate: String(form.workflows_to_automate || ""),
      current_tech_stack: form.current_tech_stack || "",
      automation_goals: String(form.automation_goals || ""),
      infrastructure_scale: form.infrastructure_scale || "",
      operations_volume: form.operations_volume || "",
      preferred_contact_method: Array.isArray(form.preferred_contact_method)
        ? form.preferred_contact_method
        : [],
      additional_notes: form.additional_notes || "",
      user_country: form.user_country || "",
      payment_region: form.payment_region === "IN" ? "IN" : "INTL",
      selected_pricing: form.selected_pricing || "",
      payment_status: "paid",
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      submitted_at: new Date(),
    });

    sendConfirmation({
      to: doc.work_email,
      subject: "Payment received — your Vishra AI Intelligence Mapping",
      html: `<p>Hi ${doc.full_name},</p>
             <p>Payment received. Book your appointment here:</p>
             <p><a href="${process.env.BOOKING_URL}">${process.env.BOOKING_URL}</a></p>
             <p>— Vishra AI</p>`,
    });

    res.json({
      ok: true,
      id: doc._id.toString(),
      booking_url: process.env.BOOKING_URL || "https://calendar.app.google/6uwUaXwsRyPJ3yDB6",
    });
  } catch (e) {
    console.error("[rim/verify]", e);
    res.status(500).json({ ok: false, error: "Verification failed" });
  }
});

export default router;
