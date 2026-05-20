import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    company_size: String,
    role: String,
    workflows: String,
    stack: String,
    goals: String,
    scale: String,
    email: { type: String, required: true, lowercase: true, trim: true },
    source: { type: String, default: "contact_form" },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "contact_submissions" }
);

export const ContactSubmission =
  mongoose.models.ContactSubmission ||
  mongoose.model("ContactSubmission", schema);
