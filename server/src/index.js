import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { connectDB } from "./db.js";
import newsletterRouter from "./routes/newsletter.js";
import contactRouter from "./routes/contact.js";
import rimRouter from "./routes/rim.js";

const app = express();
app.set("trust proxy", 1);

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "200kb" }));

const formLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/newsletter", formLimiter, newsletterRouter);
app.use("/api/contact", formLimiter, contactRouter);
app.use("/api/rim", formLimiter, rimRouter);

const PORT = Number(process.env.PORT || 8080);

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`[api] listening on :${PORT}`));
  })
  .catch((e) => {
    console.error("[fatal] mongo connect failed:", e?.message || e);
    process.exit(1);
  });
