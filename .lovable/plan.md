# SkillForge — Student Career Readiness LMS

A playful, high-energy student dashboard inspired by the uploaded reference: soft rounded cards and a sidebar shell, but with bolder gradients, more color, and lively motion. Demo mode — one pre-built student ("Diane Nguyen", 2nd year) with realistic data, no signup required. AI generates the market insights.

## Pages

**/ — Login (demo)**
Fun split-screen: bold gradient panel with animated floating skill badges, and a simple "Enter as Diane" card. Any email/password works; it just drops you into the dashboard. No real accounts.

**/dashboard — Home**
- Welcome banner: greeting, date, XP bar toward weekly goal, current streak with flame counter
- Career Readiness Score: big animated radial gauge (0-100) with sub-scores (Technical, Projects, Communication, Market Fit)
- My Courses: 3 course cards with progress bars, lessons left, % complete
- Active Quests: weekly missions ("finish 2 lessons", "close one skill gap") with reward XP and claim buttons
- Level card: current level, badge tier, progress to next level

**/skills — Skill Gap Analysis**
- Target role selector (e.g. Data Analyst, Frontend Engineer, Product Manager)
- Radar chart: your level vs role benchmark
- Gap list sorted by impact: skill, your level, required level, gap severity chip, recommended course to close it
- AI-written summary of your top 3 gaps and a suggested 4-week action path

**/market — Market Pulse**
- Trending skills board with demand trend sparklines and growth %
- Hot roles: salary range, openings trend, required skill chips
- Rising vs cooling skills split view
- Trending courses ranked by market relevance, each linked to a gap it closes
- AI market briefing refreshed on demand for the student's target role

**/certifications — Certification Arena**
This is the "make it fun" page.
- Certification tracks as a game map / path of stages, each stage unlocking the next
- Progress rings, "boss challenge" final quiz per track
- Reward preview: badge art, XP, market value of the cert
- Nudges: "2 lessons from a badge", countdown timers on limited quests

**/leaderboard**
Cohort ranking with podium top-3, XP, streaks, badge counts, "you" row highlighted, weekly vs all-time toggle.

**/profile — Trophy Shelf**
Earned badges, certificates, skill levels, streak calendar heatmap.

## Fun mechanics
XP and levels, daily streaks with flame states, weekly quests with claimable rewards, badge unlock animations (confetti on claim), and a cohort leaderboard. All demo state lives in a React context seeded with realistic data, so progress updates feel live within a session.

## AI insights
Market pulse, skill-gap narratives, and personalized action paths are generated through Lovable AI (Gemini via the AI gateway), called from TanStack server functions. Each AI panel has a loading skeleton, a graceful fallback to curated copy if the call fails, and a refresh button. No database — the student profile is passed into the prompt.

## Design
Bolder take on the reference: electric indigo → violet gradients with lime/coral accent pops, dark-tinted sidebar with glowing active state, oversized rounded cards, chunky friendly typography, generous soft shadows. Motion: number count-ups, gauge sweeps, card hover lift, staggered section entrances, confetti on rewards. All colors as semantic tokens in `src/styles.css`; light and dark mode supported.

## Technical notes
- Routes: `index` (login), `dashboard`, `skills`, `market`, `certifications`, `leaderboard`, `profile`; shared app shell (sidebar + topbar) as a layout route
- Charts via Recharts (radar, sparklines, gauge); animation via Motion for React
- Demo data in `src/data/*.ts`; session state in `src/context/StudentContext.tsx`
- AI calls in `src/lib/insights.functions.ts` using `createServerFn`, key read inside the handler
- Per-route `head()` metadata with unique titles/descriptions

## Not included in v1
Real authentication, persistence across reloads, actual course content/video playback, live labor-market API feeds.
