# Vishra AI Backend

Node.js + Express + Mongoose API for Vishra AI forms and Razorpay payments.

## Setup (Ubuntu)

```bash
cd server
cp .env.example .env   # fill in real values
npm install            # or: bun install
npm start              # or: pm2 start src/index.js --name vishra-api
```

MongoDB must be running locally with auth enabled:
```
mongodb://vishra_admin:PASSWORD@localhost:27017/Website?authSource=admin
```

## Endpoints

- `GET  /api/health`
- `POST /api/newsletter`            `{ email, source? }`
- `POST /api/contact`               `{ company, company_size, role, workflows, stack, goals, scale, email }`
- `POST /api/rim/create`            `{ payment_region: "IN" | "INTL" }` → `{ order_id, amount, currency, key_id }`
- `POST /api/rim/payment/verify`    `{ razorpay_order_id, razorpay_payment_id, razorpay_signature, form }`

## Collections (Website db)

- `newsletter_subscribers`
- `contact_submissions`
- `rim_submissions`

## Frontend

Set `VITE_API_BASE_URL` in the React app's `.env` to point at this API,
e.g. `VITE_API_BASE_URL=https://api.vishra.ai`.
If not set, the frontend defaults to `http://localhost:8080`.

## Reverse proxy (Nginx, recommended)

Expose only `/api/*` to the internet over HTTPS, keep MongoDB bound to `127.0.0.1`.
