import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    company: { type: String, trim: true },
    message: { type: String, trim: true },
    // legacy / optional
    company_size: String,
    role: String,
    workflows: String,
    stack: String,
    goals: String,
    scale: String,
    source: { type: String, default: "contact_page" },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "contact_submissions" }
);

export const ContactSubmission =
  mongoose.models.ContactSubmission ||
  mongoose.model("ContactSubmission", schema);
