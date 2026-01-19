# Google Search Console Setup & Monitoring Guide

## Initial Setup (Complete Once)

### Step 1: Verify Domain Ownership

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click "Add Property"
3. Choose **"Domain"** property type
4. Enter: `beaconai.ai`

### Step 2: Verify with DNS

1. Copy the TXT record provided by Google
2. Add to your DNS settings (Vercel DNS or wherever domain is hosted)
   ```
   TXT record: google-site-verification=XXXXXXXXXXXXXXXXXXXXX
   ```
3. Wait 10-30 minutes for DNS propagation
4. Click "Verify" in Google Search Console

**Note:** If using Vercel:
- Go to Vercel dashboard → Settings → Domains
- Add DNS TXT record there

### Step 3: Submit Sitemap

1. In Google Search Console, go to "Sitemaps" (left sidebar)
2. Submit: `https://beaconai.ai/sitemap.xml`
3. Wait 24-48 hours for initial crawl

**Note:** Next.js auto-generates sitemap if configured. Verify it exists by visiting `https://beaconai.ai/sitemap.xml`

### Step 4: Enable Email Notifications

1. Go to Settings (gear icon)
2. Enable notifications for:
   - Manual actions
   - Security issues
   - New search appearance features
   - Performance degradation

---

## Daily Monitoring (5 minutes)

### What to Check:
1. **Coverage Status** - Any new errors?
2. **Performance** - Any ranking drops?
3. **Manual Actions** - Any penalties?

### How to Check:

**Coverage:**
- Navigate to Coverage → Valid pages
- Look for red/yellow warnings
- Fix any "Excluded" or "Error" pages

**Performance:**
- Check last 7 days vs. previous 7 days
- Watch for sudden traffic drops (>20%)
- Identify top-performing pages

---

## Weekly Monitoring (15 minutes)

### Performance Analysis

1. **Go to Performance → Search Results**
2. **Compare last 28 days to previous period**

**Key Metrics:**
- **Total clicks:** Is it growing week over week?
- **Total impressions:** Are you appearing in more searches?
- **Average CTR:** Target 3%+
- **Average position:** Target <20 for primary keywords

3. **Top Queries:**
   - Which keywords drive traffic?
   - Are target keywords ranking?
   - Any unexpected high-performers?

4. **Top Pages:**
   - Which pages get most traffic?
   - Are new blog posts getting indexed?
   - Any underperforming important pages?

### Link Analysis

1. **Go to Links → External links**
2. **Review:**
   - Total external links (should grow monthly)
   - Top linking sites (are they quality?)
   - Top linked pages (is homepage getting links?)

3. **Compare to last month:**
   - Did backlinks increase?
   - Any toxic links to disavow?

### Index Coverage

1. **Go to Coverage**
2. **Check for:**
   - Pages with errors (fix immediately)
   - Valid pages (should match total published pages)
   - Excluded pages (investigate why)

3. **Request indexing for new pages:**
   - Go to URL Inspection tool
   - Enter new blog post URL
   - Click "Request Indexing"

---

## Monthly Reporting (30 minutes)

### Create Monthly SEO Report

**Metrics to track in spreadsheet:**

| Metric | This Month | Last Month | Change | Goal |
|--------|-----------|-----------|--------|------|
| Organic Clicks | | | | +20% MoM |
| Impressions | | | | +30% MoM |
| Avg CTR | | | | >3% |
| Avg Position | | | | <15 |
| Indexed Pages | | | | All pages |
| Backlinks | | | | +10/month |
| Referring Domains | | | | +5/month |

### Keyword Rankings

**Track top 10 target keywords:**
1. AI readiness assessment
2. AI implementation for small business
3. AI consulting for SMB
4. CARE framework AI
5. AI transformation strategy
6. AI readiness checklist
7. AI adoption challenges
8. AI ROI measurement
9. Change management for AI
10. AI tools for operations

**For each keyword, note:**
- Current position
- Clicks from that keyword
- Impressions
- Month-over-month change

### Page Performance

**Analyze top 10 pages:**
- Which are gaining traffic?
- Which are losing traffic?
- Any correlation with recent updates?

### Technical Issues

**Run monthly health check:**
- Any 404 errors?
- Mobile usability issues?
- Core Web Vitals problems?
- Security issues?

---

## Core Web Vitals Monitoring

### What to Track:

1. **LCP (Largest Contentful Paint)**
   - Target: <2.5 seconds
   - Current mobile: 7.1s (needs improvement)
   - Current desktop: 0.7s (good)

2. **FID (First Input Delay)** / **INP (Interaction to Next Paint)**
   - Target: <100ms
   - Current: Good on both

3. **CLS (Cumulative Layout Shift)**
   - Target: <0.1
   - Current: 0 (excellent)

### How to Monitor:

1. **In Google Search Console:**
   - Go to Experience → Page Experience
   - Review Core Web Vitals report
   - Identify failing URLs

2. **In PageSpeed Insights:**
   - Test homepage monthly
   - Test new pages after publishing
   - Compare mobile vs desktop

3. **Track improvements:**
   - After optimization, wait 28 days
   - Real user data (CrUX) updates monthly
   - Monitor for sustained improvements

---

## Alert Setup

### Critical Alerts (Immediate Action)

**Set up email/Slack alerts for:**

1. **Manual Actions**
   - Google penalized your site
   - Action: Review and fix immediately

2. **Security Issues**
   - Site hacked or malware detected
   - Action: Clean immediately, request review

3. **Coverage Errors**
   - Pages can't be indexed
   - Action: Investigate and fix within 24 hours

### Warning Alerts (Review Within Week)

1. **Significant Traffic Drop**
   - >30% drop in clicks week-over-week
   - Action: Investigate algorithm update or technical issue

2. **New Excluded Pages**
   - Pages removed from index
   - Action: Determine if intentional or error

---

## Troubleshooting Common Issues

### Issue: Pages Not Indexing

**Diagnosis:**
1. URL Inspection → Check coverage status
2. Look for errors: "Crawled - currently not indexed", "Discovered - currently not indexed"

**Solutions:**
- Ensure robots.txt allows crawling
- Check internal linking (is page orphaned?)
- Improve page quality/content
- Request indexing via URL Inspection tool

### Issue: Sudden Traffic Drop

**Diagnosis:**
1. Check Coverage for new errors
2. Check Manual Actions for penalties
3. Check if competitor outranked you
4. Check for algorithm update (MozCast, SEMrush sensor)

**Solutions:**
- Fix technical errors
- Improve content quality
- Build more backlinks
- Update outdated content

### Issue: High Impressions, Low Clicks

**Diagnosis:**
- CTR <1% means bad titles/descriptions
- Check Performance → Queries with high impressions, low CTR

**Solutions:**
- Rewrite title tags to be more compelling
- Improve meta descriptions
- Add schema markup for rich snippets

### Issue: Good Rankings, No Traffic

**Diagnosis:**
- Ranking for low-volume keywords
- Check Search Analytics → Filter by position <10
- Review actual search volume in Keyword Planner

**Solutions:**
- Target higher-volume keywords
- Expand content to cover related topics
- Build topical authority with more content

---

## Integration with Analytics

### Link GSC with Google Analytics

1. In Google Analytics 4, go to Admin
2. Product Links → Search Console Links
3. Link your GSC property

**Benefits:**
- See landing page performance in GA4
- Combine SEO + conversion data
- Track user behavior from organic search

### Key Reports to Create:

1. **Organic Landing Pages:**
   - Sessions by landing page (organic only)
   - Conversion rate by landing page
   - Avg session duration

2. **Keyword to Conversion:**
   - Which keywords lead to assessment completions?
   - Which drive consultation requests?

3. **Content Performance:**
   - Blog posts: Views → Engagement → Conversions
   - Which topics resonate most?

---

## Quarterly Deep Dive (Every 90 Days)

### Comprehensive SEO Audit

1. **Content Audit:**
   - Which pages get zero traffic? (Consider updating or removing)
   - Which have high bounce rate? (Improve content)
   - Which convert best? (Create more similar content)

2. **Technical Audit:**
   - Run Screaming Frog crawl
   - Check for broken links
   - Verify all pages indexed
   - Review site speed across all pages

3. **Competitive Analysis:**
   - Who's ranking for your keywords?
   - What content do they have that you don't?
   - What's their backlink profile?

4. **Strategy Adjustment:**
   - Based on data, what's working?
   - What should you double down on?
   - What should you stop doing?

---

## Benchmarks & Goals

### Month 1 (Current State)
- Organic keywords: 0
- Organic traffic: 0 sessions
- Backlinks: 4
- Referring domains: 2

### Month 3 Goals
- Organic keywords: 20+
- Organic traffic: 50+ sessions/month
- Backlinks: 30+
- Referring domains: 15+
- 3+ keywords in top 20

### Month 6 Goals
- Organic keywords: 50+
- Organic traffic: 150+ sessions/month
- Backlinks: 60+
- Referring domains: 30+
- 5+ keywords in top 10

### Month 12 Goals
- Organic keywords: 100+
- Organic traffic: 500+ sessions/month
- Backlinks: 150+
- Referring domains: 60+
- 10+ keywords in top 5

---

## Tools Integration

### Essential Tools:

1. **Google Search Console** (Free)
   - Primary source of truth
   - Actual Google data

2. **Google Analytics 4** (Free)
   - User behavior
   - Conversion tracking

3. **PageSpeed Insights** (Free)
   - Performance monitoring
   - Core Web Vitals

### Nice-to-Have Tools:

4. **Ahrefs** ($99/mo)
   - Comprehensive backlink analysis
   - Keyword research
   - Competitor analysis

5. **SEMrush** ($119/mo)
   - Keyword tracking
   - Technical SEO audits
   - Content optimization

6. **Screaming Frog** (Free up to 500 URLs)
   - Technical SEO crawling
   - Find broken links
   - Analyze site structure

---

## Action Items Checklist

### One-Time Setup
- [ ] Verify domain in Google Search Console
- [ ] Submit sitemap
- [ ] Enable email notifications
- [ ] Link to Google Analytics
- [ ] Set up tracking spreadsheet

### Daily (5 min)
- [ ] Check for critical errors
- [ ] Review manual actions
- [ ] Quick performance glance

### Weekly (15 min)
- [ ] Review performance trends
- [ ] Check new backlinks
- [ ] Request indexing for new pages
- [ ] Identify top/bottom performers

### Monthly (30 min)
- [ ] Generate performance report
- [ ] Track keyword rankings
- [ ] Analyze Core Web Vitals
- [ ] Review technical issues
- [ ] Update tracking spreadsheet

### Quarterly (2 hours)
- [ ] Comprehensive SEO audit
- [ ] Competitive analysis
- [ ] Strategy review and adjustment
- [ ] Content performance analysis

---

## Emergency Response Plan

### If You Get a Manual Action:

1. **Don't Panic** - Most are reversible
2. **Read the Details** - Understand specific violation
3. **Fix the Issue:**
   - Unnatural links? Disavow or remove
   - Thin content? Improve or delete
   - Security issue? Clean malware
4. **Request Reconsideration** - Explain what you fixed
5. **Wait** - Can take 1-4 weeks for review

### If Traffic Drops >50% Overnight:

1. **Check GSC** - Any errors or penalties?
2. **Check Analytics** - Is it tracking correctly?
3. **Check Competitors** - Did they launch new content?
4. **Check Algorithm Updates** - Recent Google update?
5. **Check Technical** - Is site down or blocking crawlers?

---

## Next Steps

1. **Complete setup checklist above**
2. **Create tracking spreadsheet** (template below)
3. **Set calendar reminders:**
   - Daily: 9am check
   - Weekly: Monday 10am review
   - Monthly: 1st of month, full report
   - Quarterly: Beginning of Q, comprehensive audit

### Tracking Spreadsheet Template:

[Create in Google Sheets]

**Tab 1: Monthly Overview**
- Date, Clicks, Impressions, CTR, Position, Backlinks, Referring Domains

**Tab 2: Keyword Rankings**
- Keyword, Position, Clicks, Impressions, Change MoM

**Tab 3: Page Performance**
- URL, Clicks, Impressions, Position, Goal (index/rank/convert)

**Tab 4: Backlinks**
- Date Acquired, Source URL, Target URL, Domain Authority, Type

---

**Pro Tip:** Set up a dashboard in Google Data Studio (Looker Studio) to visualize all this data in one place. Saves hours of manual reporting.