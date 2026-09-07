# Make the readiness score respond to the chosen career goal

## What's happening today

The readiness number (72) and the four bars under it (Technical, Projects, Communication, Market fit) are fixed values stored once for Diane. They are not derived from the role she is exploring, so switching from Data Analyst to Frontend Engineer changes the wording around them but not the numbers.

Everything else on the dashboard (biggest gap, comparison bar, blurbs) already recalculates per role.

## What will change

Readiness becomes a calculated score, per role:

- Compare Diane's current skill levels against what the selected role asks for, weighted so the skills a role cares about most count most.
- A role that leans on her strong skills gives a higher score; a role that leans on skills she hasn't built yet gives a lower one. Data Analyst and Frontend Engineer will read differently, as expected.
- The number animates from the old value to the new one when she switches tracks, so the change is visible rather than silent.

The four bars also become role-aware:

- Technical — her technical/data skills against the role's technical expectations.
- Projects — how far her in-progress coursework carries her towards the role's key skills.
- Communication — her communication skills against the role's expectations.
- Market fit — how the role's demand and growth compare with the others.

A short line under the gauge will say what the score means, e.g. "Based on 10 skills compared against Frontend Engineer expectations", so it doesn't look like an arbitrary number.

## Technical notes

- Add a `readinessForRole(roleId)` helper next to `gapsForRole` in `src/data/demo.ts`, returning `{ score, subScores }`. Score = weighted coverage of `skill.level / benchmark[skill]`, clamped 0–100, weights proportional to the benchmark values so high-requirement skills dominate. Market-fit sub-score derives from the role's `growth` and latest `openingsTrend` value, normalised across `targetRoles`; Projects derives from `myCourses` completion where `closesSkill` is a high-benchmark skill for the role.
- Expose `readiness` and `subScores` from `StudentContext` as memoised values keyed on `roleId`, replacing the static `student.readiness` read.
- `src/routes/_app.dashboard.tsx` reads both from the context instead of `student`; give `Gauge` and `CountUp` a `key={role.id}` so the animation replays on track change.
- Keep the static fields in `src/data/demo.ts` for any other consumer, but stop using `student.readiness` on the dashboard.
