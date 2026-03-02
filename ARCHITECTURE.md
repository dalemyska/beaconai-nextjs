# BeaconAI -- Architecture

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js 16.1.1 (App Router) | React 19, TypeScript 5.9.3 strict mode |
| UI | Shadcn/Radix UI + Tailwind CSS 3.4 | Framer Motion for animations |
| Database | Supabase (PostgreSQL) | Edge Functions, Realtime subscriptions |
| Auth | Password gate (TDG tool only) | No traditional user auth system |
| Hosting | Vercel | Auto-deploy from `main` branch |
| Domain | beaconai.ai | beaconai.consulting redirects via Cloudflare |
| Analytics | Google Analytics 4 + LinkedIn Insight | GA ID: G-9WXC56LQDG |
| Memory | Muninn | SQLite per project, fragility-based write gating |

---

## Infrastructure Flow

```
beaconai.ai (Primary Domain)
    |
  Vercel (Next.js App Router + Edge)
    |
  Supabase (PostgreSQL + Edge Functions + Realtime)
    +-- care_assessments table
    +-- blog_posts table
    +-- Edge Functions: submit-assessment, emergency-lead-capture
    |
  External Services
    +-- Google Analytics 4
    +-- LinkedIn Insight Tag
    +-- N8N (chat webhook)
    +-- Google Forms (optional lead capture)
```

---

## Database Schema

### care_assessments
Primary table for CARE assessment submissions and results.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key, auto-generated |
| created_at | timestamptz | Auto-set |
| user_name | text | Submitter name |
| user_email | text | Submitter email |
| company_name | text | Company name |
| company_website | text | Company URL |
| detected_industry | text | Nullable, set by Edge Function |
| user_role | text | Job role |
| responses | jsonb | Full questionnaire responses |
| company_context | text | Nullable, AI-generated context |
| insights | jsonb | Nullable, AI-generated insights |
| solution_summary | text | Nullable, AI-generated summary |
| culture_score | numeric | CARE dimension score |
| adoption_score | numeric | CARE dimension score |
| readiness_score | numeric | CARE dimension score |
| evolution_score | numeric | CARE dimension score |
| overall_score | numeric | Aggregate CARE score |
| status | text | pending -> processing -> completed |
| pdf_url | text | Nullable, generated report URL |
| email_sent | boolean | Whether results email was sent |
| email_sent_at | timestamptz | Nullable |

**RLS pattern:** Assessments submitted via Edge Function (bypasses RLS). Client reads use anon key with select-only access.

### blog_posts
Blog content managed via Supabase.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| slug | text | URL-safe identifier |
| title | text | Post title |
| content | text | Post body (markdown or HTML) |
| excerpt | text | Short description |
| published | boolean | Draft/published flag |
| tags | text[] | Category tags |
| featured | boolean | Homepage feature flag |
| created_at | timestamptz | Publish date |

**RLS pattern:** Public read access for published posts. No client-side writes.

---

## External Dependencies

### Supabase Edge Functions

**submit-assessment**
- Method: POST to `{SUPABASE_URL}/functions/v1/submit-assessment`
- Auth: `apikey` header with anon key
- Timeout: 30s client-side (AbortController)
- Purpose: Inserts assessment, triggers AI processing pipeline

**Failure handling:**

| Status | Meaning | Action |
|--------|---------|--------|
| 200 | Success | Return assessment ID, begin polling |
| 400 | Bad request | Show validation error to user |
| 401 | Bad auth | Log error, do not retry |
| 500 | Function error | Trigger emergency lead capture fallback |
| Timeout | No response in 30s | Trigger emergency lead capture fallback |

**Degraded mode:** If Edge Function is down, `captureLeadFallback()` sends data to `emergency-lead-capture` function. If that also fails, error message shown with contact info.

**emergency-lead-capture**
- Method: POST to `{SUPABASE_URL}/functions/v1/emergency-lead-capture`
- Auth: `apikey` header with anon key
- Purpose: Last-resort lead preservation when primary submission fails

### Supabase Realtime

- Channel: `assessment-{id}`
- Event: `postgres_changes` UPDATE on `care_assessments`
- Filter: `id=eq.{assessmentId}`
- Purpose: Real-time status updates during assessment processing

**Degraded mode:** If Realtime fails, manual polling via `getAssessmentStatus()` at intervals.

### Google Analytics 4

- Loaded via `next/script` with `lazyOnload` strategy
- ID from `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
- No server-side tracking

**Degraded mode:** Site fully functional without GA. No user-visible impact.

### LinkedIn Insight Tag

- Script injected in root layout
- Conversion tracking for lead generation

**Degraded mode:** Site fully functional. Marketing attribution degraded.

### N8N Chat Webhook

- URL: `NEXT_PUBLIC_N8N_WEBHOOK_URL`
- Purpose: Chat functionality integration

**Degraded mode:** Chat unavailable. Core site unaffected.

---

## Key Application Flows

### CARE Assessment Flow

```
1. Landing Step (CARELandingStep) -- CTA to start
2. Company Info Step (CompanyInfoStep) -- Name, email, company, role
3. Assessment Step (AssessmentStep) -- CARE questionnaire (Culture, Adoption, Readiness, Evolution)
4. Processing Step (ProcessingStep) -- Submit via Edge Function, poll via Realtime
5. Results Step (CAREResultsStep) -- Display scores, insights, PDF link
6. Email Step (EmailStep) -- Optional email delivery of results
```

**Critical path:** Steps 2-4 must never lose user data. Emergency lead capture activates on any failure in step 4.

### Blog Flow

```
Blog listing (/blog) -> blogService.ts -> Supabase blog_posts table
Blog detail (/blog/[slug]) -> blogService.ts -> Single post by slug
Markdown content in content/blog/ -> Rendered by blog components
```

### TDG SEO Tool Flow

```
/tdgseo -> Password gate -> 13 SEO prompt generators
Prompts stored in/fetched from Supabase
Market segment targeting + buyer persona selection
```

---

## Shared Context Artifacts

| Artifact | File | Consumers |
|----------|------|-----------|
| Supabase types | `lib/supabase/types.ts` | All services, typed queries |
| HTML sanitizer | `utils/sanitizeHtml.ts` | Assessment results, blog rendering |
| Input sanitizer | `utils/inputSanitization.ts` | All form components |
| Supabase client | `lib/supabase/client.ts` | All service files |
| Blog content | `content/blog/*.md` | Blog pages, blog service |

---

## Quality Gate Architecture

```
Commit -> Quality gate hooks (automatic) -> Developer review (working tree diff)
Pre-deploy -> QVERIFY (manual verification of changed files)
Periodic -> QAUDIT (full system health) -> QSECURITY (auth/secrets)
```

## Permissions Architecture

```
File edits -> Muninn PreToolUse hook (fragility check) -> Auto-pass or warn/block
Destructive ops -> Always require explicit user approval
Recurring patterns -> muninn_learn_add (preference) -> muninn_predict at session start
```

---

## Security Architecture

### Headers (next.config.ts)
- HSTS with preload (63072000s)
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera/microphone/geolocation disabled

### Input Handling
- DOMPurify for all rendered HTML (assessment insights, blog content)
- Input sanitization utility for form submissions
- Zod schema validation on all forms

### Supabase Security
- Anon key used client-side (public reads only)
- Edge Functions use server-side service role key (never exposed to client)
- RLS policies on user-data tables
- Assessment inserts routed through Edge Functions to bypass RLS safely

### Production Optimizations
- Console logging stripped in production (except error/warn)
- `poweredByHeader: false`
- Image optimization with AVIF/WebP
- Package import optimization for Radix UI and Lucide
