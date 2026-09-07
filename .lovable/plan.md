# Rename Dashboard roadmap step "Explore"

## Goal
Rename the first roadmap step on the Dashboard so it no longer sounds like exploration is finished. Instead, it should communicate that the student has simply chosen a career goal to explore for now, and that choice can change later.

## Current state
`src/routes/_app.dashboard.tsx` defines the career-roadmap steps as:

```text
Explore            → Completed
Learn & build      → In progress
Gain experience    → Next
Land your first role → Upcoming
```

The label "Explore" + "Completed" conflicts with the product message that students are still exploring and nothing is final.

## Proposed options
Pick one of these replacements for the first step:

1. **"Choose a track"** — Clear, action-oriented, implies a current (not final) choice.
2. **"Set your direction"** — Friendly, suggests a heading rather than a permanent decision.
3. **"Pick a goal to try"** — Emphasizes the trial / exploratory nature most directly.

For each option the state remains "Completed" because the student has completed the action of picking/setting something, while the surrounding copy on the page already explains the choice is not final.

## Implementation
- Update the `roadmap` array in `src/routes/_app.dashboard.tsx` to use the chosen label.
- No other files need to change; the step description below the roadmap already reads:
  "Your personalised journey towards {role} — and you can change direction at any point."

## Verification
- Type-check the project.
- Visit `/dashboard` in the preview and confirm the first roadmap step shows the new label and still renders correctly.