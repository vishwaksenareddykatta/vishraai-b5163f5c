import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "./mongo.server";

const DiscoveryInput = z.object({
  full_name: z.string().min(1).max(200),
  work_email: z.string().email().max(320),
  phone_number: z.string().max(40),
  whatsapp_number: z.string().max(40).nullable(),
  company_name: z.string().min(1).max(200),
  role: z.string().min(1).max(120),
  company_size: z.string().max(40),
  industry: z.string().max(120).nullable(),
  workflows_to_automate: z.string().max(4000),
  current_tech_stack: z.string().max(2000).nullable(),
  automation_goals: z.string().max(4000),
  infrastructure_scale: z.string().max(120).nullable(),
  operations_volume: z.string().max(200).nullable(),
  preferred_contact_method: z.array(z.string().max(40)).nullable(),
  additional_notes: z.string().max(4000).nullable(),
  user_country: z.string().max(8).nullable(),
  payment_region: z.enum(["IN", "INTL"]),
  selected_pricing: z.string().max(40),
  // Payment is REQUIRED to save the request.
  razorpay_payment_id: z.string().min(4).max(120),
});

export const saveDiscoveryRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => DiscoveryInput.parse(input))
  .handler(async ({ data }) => {
    const db = await getDb();
    const col = db.collection("discovery_requests");
    const doc = {
      ...data,
      payment_status: "paid" as const,
      created_at: new Date(),
    };
    const result = await col.insertOne(doc);
    return { ok: true as const, id: result.insertedId.toString() };
  });
