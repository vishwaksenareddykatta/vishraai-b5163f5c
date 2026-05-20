import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    work_email: { type: String, required: true, lowercase: true, trim: true },
    phone_number: { type: String, required: true },
    whatsapp_number: String,
    company_name: { type: String, required: true },
    role: { type: String, required: true },
    company_size: String,
    industry: String,
    workflows_to_automate: { type: String, required: true },
    current_tech_stack: String,
    automation_goals: { type: String, required: true },
    infrastructure_scale: String,
    operations_volume: String,
    preferred_contact_method: { type: [String], default: [] },
    additional_notes: String,
    user_country: String,
    payment_region: { type: String, enum: ["IN", "INTL"], required: true },
    selected_pricing: { type: String, required: true },

    // Payment
    payment_status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
    razorpay_payment_id: String,
    razorpay_order_id: String,
    razorpay_signature: String,

    submitted_at: Date,
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "rim_submissions" }
);

export const RIMSubmission =
  mongoose.models.RIMSubmission || mongoose.model("RIMSubmission", schema);
