# CLAUDE.md -- BeaconAI

## 0 -- Purpose

These rules ensure maintainability, safety, and developer velocity for BeaconAI,
built with Next.js 16 (App Router), React 19, TypeScript, Supabase, and Tailwind CSS.

**MUST** rules are enforced by CI or hooks. **SHOULD** rules are strongly recommended.

**Documentation structure:** This project uses four core files.

| File | Size Target | Read Frequency |
|------|-------------|----------------|
| CLAUDE.md | <600 lines | Every session |
| ROADMAP.md | <200 lines | Every session |
| ARCHITECTURE.md | Stable reference | When context needed |
| SESSION_LOG.md | Append-only | When debugging/checking history |

---

## 1 -- Before Coding

- **BP-1 (MUST)** Ask clarifying questions before starting. Draft approach in plan mode.
- **BP-2 (MUST)** Read existing code before modifying. Never propose changes to unread files.
- **BP-3 (MUST)** Check ROADMAP.md for current priorities and constraints.
- **BP-4 (SHOULD)** Use sub-agents for codebase exploration before planning changes.

---

## 2 -- While Coding

- **WC-1 (MUST)** Use TypeScript strict mode. No `any` unless unavoidable (add eslint-disable comment).
- **WC-2 (MUST)** Use domain vocabulary: CARE (Culture, Adoption, Readiness, Evolution), assessment, wizard, step, score, insights, lead.
- **WC-3 (MUST)** Components use PascalCase. Files match component name. Hooks use `use` prefix.
- **WC-4 (MUST)** All user-facing strings in components (no hardcoded in services).
- **WC-5 (SHOULD)** Prefer server components. Use `'use client'` only when needed (hooks, browser APIs, interactivity).
- **WC-6 (SHOULD)** Sanitize all HTML with DOMPurify before rendering. Sanitize user inputs with `inputSanitization.ts`.
- **WC-7 (SHOULD)** Use Zod schemas for form validation. React Hook Form for form state.

---

## 3 -- Testing

- **TS-1 (MUST)** Test assessment wizard flows (submission, polling, fallback, error states).
- **TS-2 (MUST)** Test Supabase service functions with mocked responses.
- **TS-3 (SHOULD)** Test form validation schemas independently from components.
- **TS-4 (SHOULD)** Colocate test files next to source files or in `__tests__/` subdirectories.

---

## 4 -- Database (Supabase)

- **DB-1 (MUST)** Use Supabase client from `lib/supabase/client.ts`. Never create additional clients.
- **DB-2 (MUST)** Edge Functions handle assessment submissions (bypasses RLS). Do not use direct inserts for `care_assessments`.
- **DB-3 (MUST)** Use typed Supabase client with `Database` type from `lib/supabase/types`.
- **DB-4 (SHOULD)** Use Supabase Realtime for assessment status polling (channel subscriptions).

**Silent failure patterns (Supabase-specific):**
- Empty array from `.from()` = wrong table name (no error thrown)
- Empty array from `.select()` = wrong column name or RLS blocking
- `null` from `.single()` = no matching row (check filter values)
- Edge Function 4xx = check `apikey` header and function name

---

## 5 -- Code Organization

```
app/                          # Next.js App Router pages
  readiness-assessment/       # CARE assessment wizard
  blog/[slug]/                # Dynamic blog routes
  tdgseo/                     # Internal TDG SEO tool
components/
  ui/                         # Shadcn/Radix primitives
  readiness/care/             # CARE wizard steps
  home/                       # Homepage sections
  services/                   # Service detail components
  layout/                     # Header, Footer, ScrollToTop
  shared/                     # Cross-cutting (NewsletterSignup)
services/                     # API service layers (Supabase calls)
lib/supabase/                 # Supabase client and types
hooks/                        # Custom React hooks
utils/                        # Pure helper functions
content/blog/                 # Markdown blog content
public/                       # Static assets
```

- **CO-1 (MUST)** Pages in `app/`. Components in `components/`. Services in `services/`.
- **CO-2 (MUST)** Supabase client logic stays in `services/` or `lib/`. Never call Supabase directly from components.
- **CO-3 (SHOULD)** Group related components in subdirectories (e.g., `readiness/care/steps/`).

---

## 6 -- Tooling Gates

```bash
npm run build          # TypeScript compilation + Next.js build
npm run lint           # ESLint with Next.js rules
npx tsc --noEmit       # Type checking only
```

- **TG-1 (MUST)** `npm run build` must pass before committing.
- **TG-2 (SHOULD)** Run `npm run lint` on changed files.

---

## 7 -- Git

- **GIT-1 (MUST)** Use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
- **GIT-2 (MUST)** Do not commit `.env.local` or any secrets.
- **GIT-3 (SHOULD)** One logical change per commit.

---

## 8 -- Context Management

- **CM-1 (MUST)** Commit after completing each logical unit of work.
- **CM-2 (MUST)** Before reading a file, check if it was already read in this session.
- **CM-3 (MUST)** At 85% context usage, commit work, write a summary to SESSION_LOG.md, and start a new session.
- **CM-4 (SHOULD)** Use sub-agents for exploration tasks.
- **CM-5 (SHOULD)** Clear context (`/clear`) between distinct features or bug fixes.
- **CM-6 (SHOULD)** If self-compaction triggers, the task scope is too broad. Break into smaller sessions.

---

## 9 -- Debugging Protocol

- **DB-1 (MUST)** Diagnose before fixing. Read the full file, check Supabase queries, check Edge Function responses.
- **DB-2 (MUST)** Check Supabase silent failures: empty array = wrong table/column name, RLS blocking returns empty not error.
- **DB-3 (MUST)** Check Edge Function responses: verify `apikey` header, check function URL path, inspect response body for error details.
- **DB-4 (MUST)** Check Supabase Realtime: verify channel subscription filter matches, check that `postgres_changes` event type is correct.

**Common misinterpretation patterns:**
- Empty assessment results after submit = Edge Function failed silently (check Supabase logs, not client)
- Assessment stuck in "processing" = Realtime subscription filter mismatch or Edge Function timeout
- Blog posts not showing = `blogService.ts` query returning empty array (check table name, published flag, RLS)
- Component not re-rendering = missing dependency in useEffect/useCallback (assessment wizard had this bug, fixed with memoization)

---

## 10 -- Pipeline Rules

- **PL-1 (MUST)** CARE assessment pipeline: submit via Edge Function -> poll status via Realtime -> display results. Never skip the Edge Function.
- **PL-2 (MUST)** Emergency lead capture: if primary submission fails, call `captureLeadFallback()`. Never lose a lead.
- **PL-3 (MUST)** Health check before showing assessment form. If unhealthy, show degraded UX with lead capture.
- **PL-4 (SHOULD)** Assessment polling uses Supabase Realtime with fallback to manual status polling.

---

## 11 -- Session Management

- **SM-1 (SHOULD)** Start every session with `qnew` to load best practices, roadmap, and context.
- **SM-2 (SHOULD)** Stay in plan mode for 90% of the work. Switch to auto-edit only when confident.
- **SM-3 (MUST)** Refresh the session after creating or modifying skills, hooks, or shared artifacts.
- **SM-4 (SHOULD)** Scope each session to one feature, one bug fix, or one focused task.

---

## 12 -- Coaching Loop

When Claude Code drifts during execution:

1. **Observe** -- Watch reasoning and tool results. Monitor the working tree for file changes.
2. **Recognize drift** -- Warning signs: solving wrong problem, misinterpreting Supabase error, adding unplanned complexity, refactoring untouched code.
3. **Interrupt early** -- Press Escape. The deeper the wrong path, the harder recovery.
4. **Provide correct framing** -- Explain what the tool is seeing vs what it should be seeing.
5. **Resume** -- Continue with corrected understanding. If context is polluted, `/clear` and restart.

---

## 13 -- Permissions

**Two-tier model:**

**Pre-authorized (no approval needed):**
- File reads, writes, and creation
- Running tests, linters, formatters
- Non-destructive bash commands (read, list, search, curl for testing)
- Git add and commit

**Require explicit approval:**
- git push / force push
- Database schema migrations (Supabase)
- File or directory deletion
- Production deployments (Vercel)
- Supabase Edge Function deployments

**PM-1 (MUST)** Never pre-authorize destructive operations. File deletion, force push, database drops, and production deployments always require explicit approval.

---

## 14 -- Quality Gates (Hooks)

| Hook | Trigger | Checks |
|------|---------|--------|
| validate-supabase-queries | Before commit touching `services/` | Table/column names match schema |
| validate-assessment-pipeline | Before commit touching `readiness/` | Edge Function calls present, fallback exists |

**Three-tier quality system:**

| Layer | Mechanism | Trigger | Purpose |
|-------|-----------|---------|---------|
| Automatic | Quality gate hooks | Every qualifying operation | Enforce hard constraints |
| On-demand | Shortcuts (qverify, qaudit, qsecurity) | Manual invocation | Deep diagnostic analysis |
| Checkpoint | Manual review | Before deploy | Pre-deployment verification |

---

## 15 -- Shared Context Artifacts

Files consumed by multiple parts of the system:

| Artifact | Purpose | Consumed By |
|----------|---------|-------------|
| `content/blog/*.md` | Blog post content | `blogService.ts`, blog pages |
| `lib/supabase/types.ts` | Database type definitions | All services, typed queries |
| `utils/sanitizeHtml.ts` | HTML sanitization rules | Assessment results, blog rendering |
| `utils/inputSanitization.ts` | Input validation | All form components |
| `app/sitemap.ts` | Dynamic sitemap (7 routes) | Search engines, AI crawlers |
| `public/llms.txt` | AI crawler discoverability | ChatGPT, Perplexity, Claude, Apple |
| `components/home/FAQSection.tsx` | FAQ content (synced with JSON-LD in page.tsx) | Homepage, structured data |

---

## 16 -- Reflect

After significant sessions, run `/reflect` to capture learnings into skill files.

- **Manual:** Type `/reflect` or "reflect on this session" to analyze corrections and patterns
- **Scope:** Each learning is tagged `system` (improves skill for all users) or `personal` (specific to this workflow)
- **Confidence:** HIGH = explicit corrections/preferences -> direct skill edits. MEDIUM = repeated patterns -> "Learned Patterns" section. LOW = logged only.
- **Automatic:** When `reflect on` is enabled, session-end hook analyzes automatically (toggle with `reflect off`)

---

## Build Shortcuts

### QNEW
```
Understand all BEST PRACTICES listed in CLAUDE.md.
Your code SHOULD ALWAYS follow these best practices.
Read ROADMAP.md for current tasks and priorities.
Read ARCHITECTURE.md if this is your first session or you need system context.
```

### QPLAN
```
Analyze similar parts of the codebase and determine whether your plan:
- is consistent with rest of codebase
- introduces minimal changes
- reuses existing code
- respects component/service/lib separation (Section 5)
- respects shared context artifacts
```

### QCODE
```
Implement your plan and make sure your new tests pass.
Always run tests to make sure you didn't break anything else.
Always run npm run build on newly created files.
Always run npm run lint and npx tsc --noEmit.
```

### QCHECK
```
You are a SKEPTICAL senior software engineer.
Perform this analysis for every MAJOR code change you introduced:
1. Writing Functions Best Practices checklist.
2. Writing Tests Best Practices checklist.
3. Implementation Best Practices checklist.
4. Supabase query safety check (table/column names, RLS awareness).
```

### QGIT
```
Add all changes to staging, create a commit, and push to remote.
Follow Conventional Commits format.
SHOULD NOT refer to Claude or Anthropic in the commit message.
```

---

## Verification & Audit Shortcuts

### QVERIFY
```
Pre-deployment verification.

1. SUPABASE QUERIES: Scan all .from() and .select() calls in changed files.
   Verify table and column names against lib/supabase/types.ts. Report pass/fail with file and line.
2. EDGE FUNCTIONS: Verify all Edge Function URLs match expected paths.
3. ASSESSMENT PIPELINE: Verify submit -> poll -> results flow is intact.
4. HTML SANITIZATION: Verify DOMPurify is used on all rendered HTML content.
5. INPUT VALIDATION: Verify Zod schemas validate all form inputs.

Output: Table with File, Check, Pass/Fail status.
```

### QAUDIT
```
Full system health check. Do NOT fix anything. Report findings only.

CHECK 1 -- SUPABASE QUERIES: Scan all .from() and .select() calls. Verify names against types.ts.
CHECK 2 -- EDGE FUNCTION CALLS: Verify all fetch() calls to Supabase functions have correct headers.
CHECK 3 -- ASSESSMENT FLOW: Verify submit/poll/results/fallback chain is complete.
CHECK 4 -- ORPHANED REFERENCES: Components imported but unused, dead routes, unreferenced services.
CHECK 5 -- SECURITY HEADERS: Verify next.config.ts security headers are complete.
CHECK 6 -- SHARED ARTIFACT SYNC: Verify sanitization utils are used consistently.

OUTPUT: Table sorted by priority (P1 blocking, P2 silent failures, P3 tech debt).
```

### QSECURITY
```
Security audit. Do NOT fix anything. Report findings only.

CHECK 1 -- AUTHENTICATION: TDG tool password-gated? Assessment submission rate-limited?
CHECK 2 -- DATA SCOPING: Supabase anon key only used for public reads. Edge Functions for writes.
CHECK 3 -- PRIVILEGE ESCALATION: No SERVICE_ROLE_KEY in client code. Edge Functions use server-side keys only.
CHECK 4 -- SECRET EXPOSURE: API keys logged without truncation? Secrets in URL parameters? .env in git?
CHECK 5 -- INPUT SANITIZATION: All user inputs sanitized before database or HTML rendering?
CHECK 6 -- ANONYMOUS ACCESS: List every endpoint callable without auth. Rate limited? Could trigger paid API usage?

OUTPUT: Table sorted by severity (CRITICAL/HIGH/MEDIUM/LOW).
Include file path, line number, and specific issue.
```

### QDBDEBUG
```
Diagnostic-first debugging. Do NOT make any changes.

1. Read the full file(s) involved
2. Check Supabase table/column names against lib/supabase/types.ts
3. Check for Supabase silent failures (empty arrays, null from .single())
4. Check Edge Function responses (status codes, error body)
5. Verify Supabase Realtime subscription filters
6. Check if recent changes could have caused the issue (git log)

REPORT diagnosis before proposing any fix. Include:
- Root cause (confirmed or likely)
- Evidence
- Whether recent changes caused it
- Proposed fix with scope

Wait for approval before making changes.
```

### QCHECKF (Quick File Check)
```
For the file(s) I just changed, verify:
1. TypeScript strict -- no untyped variables or implicit any
2. Imports -- all used, none missing
3. Supabase calls -- table/column names correct
4. Client directive -- 'use client' only if needed
```

### QCHECKT (Quick Test Check)
```
For the test(s) I just wrote, verify:
1. Tests cover the happy path and at least one error case
2. Supabase/fetch calls are properly mocked
3. No test depends on external services
4. Test names describe the behavior being tested
```

### QUX
```
For the UI change I just made, verify:
1. Responsive -- works on mobile (375px) and desktop (1280px)
2. Accessible -- proper aria labels, keyboard navigation
3. Consistent -- matches existing Shadcn/Radix patterns in components/ui/
4. Loading states -- skeleton or spinner for async content
```

---

## Reflect Shortcuts

### /REFLECT
```
Analyze this session for corrections, approvals, and patterns.
Classify each signal as HIGH/MEDIUM/LOW confidence.
Match signals to relevant skill files.
Propose changes with confidence levels.
Wait for approval before editing any files.
Tag each learning as scope:system or scope:personal.
```

### REFLECT ON / REFLECT OFF / REFLECT STATUS
```
Toggle and check automatic session-end reflection.
- "reflect on" -- Enable automatic session-end analysis
- "reflect off" -- Disable automatic session-end analysis
- "reflect status" -- Show whether automatic reflection is enabled
```

---

## Model Routing

| Tier | Model | Use For |
|------|-------|---------|
| LOCAL | Ollama (if available) | Type definitions, Zod schemas, simple component scaffolding, test stubs |
| SONNET | Claude Sonnet | Most implementation work, debugging, refactoring, service functions |
| OPUS | Claude Opus | Architecture decisions, complex assessment logic, security review |

**ALWAYS LOCAL:** TypeScript interfaces, Zod schemas, simple React component boilerplate, test file scaffolding.
**TRY LOCALLY:** Form components, service function stubs, utility functions. Escalate if logic is complex.
**NEVER LOCAL:** Assessment pipeline logic, Supabase Edge Function integration, security-sensitive code, multi-file refactors.

**QROUTE:** When unsure which tier, describe the task and routing will be suggested.

---

## Writing Functions Best Practices

1. Single responsibility -- one function, one job
2. Descriptive names using domain vocabulary (CARE, assessment, score, insights)
3. TypeScript return types explicitly declared
4. Error handling at service boundaries (try/catch in services, not components)
5. Pure functions where possible (utils/, lib/)
6. Side effects isolated to services/ and hooks/
7. Timeout handling on all external calls (AbortController pattern)
8. Fallback behavior defined for all critical paths

## Writing Tests Best Practices

1. Test behavior, not implementation
2. Mock Supabase client and fetch calls, never hit real services
3. Test the assessment wizard step transitions
4. Test form validation with valid and invalid inputs
5. Test error states and fallback paths
6. Use descriptive test names: "should [behavior] when [condition]"
7. One assertion per test where practical
8. Test loading and error states for async operations
9. No test should depend on another test's state
10. Colocate tests with source files

---

## Bug Workflow

Bug report -> QDBDEBUG (diagnose, don't fix) -> Review diagnosis -> Approve
-> QCODE (fix) -> QVERIFY (confirm fix is clean) -> QGIT (commit)

## Proactive Workflow

QAUDIT (full scan) -> Triage P1/P2/P3 -> Fix in priority order
-> QVERIFY (confirm fixes) -> QGIT (commit)
