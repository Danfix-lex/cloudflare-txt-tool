
# 🌐 Cloudflare TXT Record Creator

A simple web-based tool to create TXT records using the Cloudflare DNS API, built with **Next.js (App Router + TypeScript)** and running on the **Edge runtime**.

---

## 🚀 Features

- Add TXT DNS records to a Cloudflare zone
- Input fields for:
  - ✅ Record Name (e.g. `_acme-challenge`)
  - ✅ Record Value (any string)
  - ✅ Optional Domain field
- Real-time feedback: `Loading…`, `Success!`, `Error: [message]`
- Securely reads `CF_API_TOKEN` and `CF_ZONE_ID` from environment variables
- Uses [Cloudflare's API](https://developers.cloudflare.com/api/operations/dns-records-for-a-zone-create-dns-record) directly
- Edge runtime support for speed and scalability

---

## 🛠 Installation & Setup

```bash
# 1. Clone the project
git clone https://github.com/your-username/cloudflare-txt-tool.git
cd cloudflare-txt-tool

# 2. Install dependencies
npm install

# 3. Add your Cloudflare credentials
touch .env.local
```

Inside `.env.local`:

```env
CF_API_TOKEN=your-cloudflare-api-token
CF_ZONE_ID=your-cloudflare-zone-id
```

Then:

```bash
# 4. Run the app
npm run dev
```

Visit: `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── add-txt/
│   │       └── route.ts      # Edge API route handler
│   └── page.tsx              # Frontend form UI
├── public/                   # Static files
└── styles.css                # Basic custom styles
```

---

## ⏱ Time Spent

Roughly **2 hours** including:

- UI design with plain CSS
- Cloudflare API integration
- Edge runtime handler
- Error handling and testing

---

## 🔁 Trade-offs & Decisions

- Skipped Tailwind to reduce complexity and stay focused on core logic
- Used Edge runtime for faster deploy and lower latency
- Added optional domain field but kept initial zone lookup out of scope to stay within time limit

---

## 💡 Bonus: “If I had 1 more hour…”

- Add support for **creating the zone** via Cloudflare's Zone API if it doesn't exist
- Improve error messages from Cloudflare (e.g. if record already exists)
- Add basic tests for the API handler
- Improve UI with Tailwind or Shadcn

---

## 📦 Deployment (Optional)

You can deploy this to [Vercel](https://vercel.com) with zero config:

```bash
npx vercel
```

If deployed, include your live URL here:
> **Live Demo:** https://your-tool.vercel.app
