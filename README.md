# Future Focus Agents

**Practice Automation That Works While You Sleep**

Website: [thefuturefocus.net](https://thefuturefocus.net)

---

## About

Future Focus Agents provides automated workflows, smart integrations, and intelligent systems for dental and healthcare practices. We help practices recover lost revenue from missed calls, reduce no-shows, automate review generation, and eliminate repetitive manual tasks for front desk staff.

## Products

| Product | Price | Type |
|---------|-------|------|
| 5 AI Automations Guide | $47 | One-time |
| Practice Automation Starter | $29/mo | Subscription |
| Practice Automation Pro | $99/mo | Subscription |
| PracticeIQ Starter | $299/mo | Subscription |
| PracticeIQ Growth | $599/mo | Subscription |
| PracticeIQ Practice | $999/mo | Subscription |
| PracticeIQ DSO / Enterprise | $2,499/mo | Subscription |

## Repository Structure

```
/
├── index.html              # Main landing page
├── README.md               # This file
├── api/
│   └── functions.js        # Serverless API functions (Stripe webhooks, lead capture)
├── scripts/
│   ├── check-stripe.js     # Stripe payment checker
│   ├── send-followups.js   # Lead follow-up email sender
│   └── revenue-report.js   # Weekly revenue report generator
├── .github/
│   └── workflows/
│       ├── daily-stripe-check.yml    # Daily: Check Stripe for new payments
│       ├── daily-lead-followup.yml   # Daily: Send follow-up emails to leads
│       └── weekly-revenue-report.yml # Weekly: Generate revenue report
└── netlify.toml            # Netlify deployment configuration
```

## Tech Stack

- **Frontend:** Static HTML + Tailwind CSS (CDN)
- **Hosting:** Netlify (free tier)
- **Payments:** Stripe
- **Email:** Resend API
- **CRM:** GoHighLevel (GHL)
- **Social:** Buffer API
- **Automation:** GitHub Actions (scheduled workflows)
- **Database:** Supabase (PostgreSQL)

## Deployment

This site auto-deploys to Netlify when changes are pushed to the `main` branch. GitHub Actions handle scheduled automation tasks (daily Stripe checks, lead follow-ups, weekly reports).

## Environment Variables

The following secrets must be configured in GitHub repository settings:

- `STRIPE_SECRET_KEY` — Stripe API key
- `RESEND_API_KEY` — Resend email API key
- `GHL_API_KEY` — GoHighLevel API key
- `GHL_LOCATION_ID` — GoHighLevel location ID
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_KEY` — Supabase anon/service key

## License

Proprietary. All rights reserved. Future Focus Agents, 2026.

