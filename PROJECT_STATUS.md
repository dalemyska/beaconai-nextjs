# BeaconAI Next.js Migration - Project Status

**Last Updated:** January 15, 2026
**Status:** DEPLOYED - Minor DNS cleanup remaining

---

## Completed

### Migration (100% Complete)
- Migrated from Vite/React Router (Lovable) to Next.js App Router
- All pages have server-rendered SEO meta tags
- Supabase integration working (Edge Functions, Database)

### Pages Live
- `/` - Home
- `/about` - About Dale Myska
- `/contact` - Contact options (email, Calendly)
- `/readiness-assessment` - CARE Assessment Wizard (full 6-step flow)
- `/blog` - Blog listing
- `/blog/[slug]` - Dynamic blog posts
- `/privacy-policy` - Privacy Policy
- `/terms-of-service` - Terms of Service

### Deployment
- **GitHub Repo:** https://github.com/dalemyska/beaconai-nextjs
- **Vercel Project:** beaconai-website
- **Preview URL:** https://beaconai-website.vercel.app/
- **Primary Domain:** https://beaconai.ai (WORKING)

### Environment Variables (in Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=https://bmnwovankwyusityxvir.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbndvdmFua3d5dXNpdHl4dmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0OTE2NjAsImV4cCI6MjA2MDA2NzY2MH0.UeUWCsg-EuZKa1iIAwxtM1cgb77-m_j4inSQnNnjwIE
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-9WXC56LQDG
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://beacon-ai-chat.n8n.app/webhook/chat
NEXT_PUBLIC_SITE_URL=https://beaconai.ai
```

---

## Remaining Task

### Cloudflare Redirect Rule for beaconai.consulting
The old domain `beaconai.consulting` needs a redirect rule to forward to `beaconai.ai`.

**Steps to complete in Cloudflare:**
1. Log into Cloudflare dashboard
2. Select `beaconai.consulting` domain
3. Go to **Rules** → **Redirect Rules**
4. Click **Create rule**
5. Configure:
   - Rule name: `Redirect to beaconai.ai`
   - When: Hostname equals `beaconai.consulting`
   - Then: Static redirect to `https://beaconai.ai`
   - Status code: `301`
   - Preserve query string: Yes
6. Click **Deploy**

---

## Browser Cache Issue (User-specific)

The user's regular browser has a cached 301 redirect from old testing. This only affects them, not new visitors.

**To fix on user's machine:**
- Go to `chrome://settings/siteData`
- Search for "beaconai" and delete all entries
- Or use incognito (already confirmed working)

---

## Architecture Summary

```
beaconai.ai (Primary Domain)
    ↓
  Vercel (Next.js hosting)
    ↓
  Supabase (Backend)
    - Edge Functions (assessment processing)
    - Database (assessments, blog posts)
    - Storage

beaconai.consulting (Redirect Domain)
    ↓
  Cloudflare (redirect rule needed)
    ↓
  → beaconai.ai
```

---

## Key Files

| File | Purpose |
|------|---------|
| `/app/layout.tsx` | Root layout with SEO metadata |
| `/app/readiness-assessment/page.tsx` | CARE Assessment entry |
| `/components/readiness/care/CAREAssessmentWizard.tsx` | Main wizard controller |
| `/services/assessmentService.ts` | Supabase Edge Function calls |
| `/services/blogService.ts` | Blog data fetching |
| `/lib/supabase/client.ts` | Supabase client |

---

## Notes

- Old Lovable hosting can be retired
- All canonical URLs point to beaconai.ai
- sitemap.xml and robots.txt updated for beaconai.ai
- Assessment wizard infinite loop bug was fixed with useCallback memoization
