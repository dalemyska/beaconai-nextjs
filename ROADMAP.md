# BeaconAI -- Roadmap

**Last updated:** 2026-03-06
**Status:** Production site live. CARE v2 assessment complete. SEO optimization deployed. v5 docs aligned.

---

## Completed: Platform Migration

- [x] Migrate from Vite/React Router (Lovable) to Next.js App Router
- [x] All 8 pages live with server-rendered SEO metadata
- [x] Supabase integration (Edge Functions, Database, Realtime)
- [x] Deploy to Vercel with custom domain (beaconai.ai)
- [x] Cloudflare redirect from beaconai.consulting to beaconai.ai
- [x] Security headers (HSTS, CSP, X-Frame-Options, etc.)

## Completed: CARE Assessment v2

- [x] 6-step wizard flow (Landing -> Company Info -> Assessment -> Processing -> Results -> Email)
- [x] Edge Function submission (bypasses RLS)
- [x] Supabase Realtime polling for assessment status
- [x] Emergency lead capture fallback
- [x] PDF report generation via Edge Functions
- [x] Health check mechanism for service availability
- [x] Input sanitization and HTML sanitization (DOMPurify)
- [x] Security hardening (polling bugfix, sanitization)

## Completed: SEO Foundation

- [x] Technical SEO optimizations (meta tags, Open Graph, canonical URLs, structured data)
- [x] Performance optimizations (AVIF/WebP images, font preloading, analytics lazy loading)
- [x] Package import optimization (Radix UI, Lucide)
- [x] 2 blog posts created (CARE Framework guide, 10 Signs Ready for AI)
- [x] Content strategy document (12-week plan with 20+ article ideas)
- [x] Backlink strategy document (4-tier acquisition framework)

## Completed: TDG SEO Tool

- [x] 13 SEO content generation prompts
- [x] Password-protected access
- [x] Market segment targeting
- [x] 5 TDG buyer personas
- [x] Live preview for Landing Page Builder
- [x] HTML extraction

---

## Current Phase: SEO Growth & Content Execution

### Active Tasks
- [ ] Publish blog posts to production blog system
- [ ] Establish content publishing cadence (1 post/week)
- [ ] Set up Google Search Console monitoring
- [ ] Execute Tier 1 backlink quick wins (directories, profiles)
- [ ] Monitor Core Web Vitals and PageSpeed scores

### Blocked
- None currently

---

## Next Phase: Platform Hardening

- [ ] Add automated tests for assessment wizard flows
- [ ] Add automated tests for Supabase service functions
- [ ] Set up quality gate hooks (validate-supabase-queries, validate-assessment-pipeline)
- [ ] Set up Ollama for local model routing (Qwen 3.5 35B or qwen3-coder-next 80B)
- [ ] Create delegation-log.md for model routing tracking

---

## Backlog

- Expand CARE assessment with additional industry-specific questions
- Add user accounts for assessment history
- Newsletter signup with email automation
- A/B testing on assessment landing page
- Podcast/webinar content integration
- Advanced analytics dashboard for assessment trends
- API for third-party CARE assessment embedding

---

## Decisions Made

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-12 | Migrate from Lovable (Vite) to Next.js | Server-side rendering for SEO, App Router for modern patterns |
| 2025-12 | Supabase for backend | Edge Functions, Realtime, PostgreSQL, free tier sufficient |
| 2025-12 | Edge Functions for assessment submission | Bypass RLS safely, server-side AI processing |
| 2026-01 | Vercel for hosting | Native Next.js support, auto-deploy from GitHub |
| 2026-01 | beaconai.ai as primary domain | Professional, memorable, .ai TLD matches brand |
| 2026-02 | DOMPurify + input sanitization | Security hardening for assessment results rendering |
| 2026-02 | Supabase Realtime for assessment polling | Real-time UX during processing, fallback to manual polling |
| 2026-03 | v4 documentation alignment | Reduce context window consumption, improve session quality |
| 2026-03 | v5 documentation alignment | Deprecate Muninn, two-tier permissions, add Reflect skill |
| 2026-03 | SEO/mobile/AI optimization | Dynamic sitemap, FAQ schema, llms.txt, AI crawlers, mobile fixes |

## Decisions Pending

- Content management: continue with markdown files or move to CMS?
- User authentication: add accounts for assessment history?
- Email automation platform selection (for newsletter/drip campaigns)
