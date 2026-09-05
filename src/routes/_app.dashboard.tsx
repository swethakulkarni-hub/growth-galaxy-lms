import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Compass, Target } from "lucide-react";
import { gapsForRole, myCourses, student, targetRoles } from "@/data/demo";
import { useStudent } from "@/context/StudentContext";
import { CountUp } from "@/components/CountUp";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Where am I — PathPilot" },
      {
        name: "description",
        content:
          "A plain-language snapshot of where you stand: the careers you're exploring, your readiness score, what you're learning now, your biggest gap and the next step to take.",
      },
      { property: "og:title", content: "Where am I — PathPilot" },
      {
        property: "og:description",
        content: "Your career goal, readiness, progress, biggest gap and next step in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function Gauge({ value }: { value: number }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-44 w-44">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={r} className="fill-none stroke-muted" strokeWidth="15" />
        <motion.circle
          cx="90"
          cy="90"
          r={r}
          className="fill-none stroke-primary"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-bold">
          <CountUp to={value} />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Readiness
        </span>
      </div>
    </div>
  );
}

function DashboardPage() {
  const { firstName, role, roleId, hasChosenTrack, setRoleId } = useStudent();
  const gaps = gapsForRole(roleId ?? targetRoles[0]!.id);
  const topGap = gaps[0]!;
  const learning = myCourses.map((c) => c.closesSkill);

  return (
    <div className="space-y-5">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-brand relative overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-lift md:p-8"
      >
        <h1 className="text-3xl font-bold md:text-4xl">
          Welcome back, {firstName} — hope your second year is going well.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/90">
          This is your starting point each time you come in. It shows where you stand today, the
          careers your subjects are already pointing towards, what's missing, and the single next
          step worth taking. Nothing here is a final decision — you're exploring, which is exactly
          right at this stage, and that's what PathPilot is for.
        </p>
      </motion.section>

      <div className="grid gap-5 xl:grid-cols-[1.25fr_1fr]">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card-pop p-6"
        >
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Compass className="h-5 w-5 text-primary" /> Career goal
          </h2>
          {hasChosenTrack ? (
            <>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                Based on the subjects you've studied and the courses you've taken, you could think
                about a career in <span className="font-bold">data analytics</span> or in{" "}
                <span className="font-bold">product management</span> type of roles. Right now
                you're exploring the <span className="font-bold">{role.title}</span> track.
              </p>
              <div className="mt-4 rounded-2xl bg-muted p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Currently exploring
                </p>
                <p className="mt-1 font-display text-lg font-bold text-primary">{role.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{role.blurb}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {targetRoles
                  .filter((r) => r.id !== roleId)
                  .map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRoleId(r.id)}
                      className="rounded-2xl bg-muted px-3 py-2 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Try {r.title}
                    </button>
                  ))}
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">
              You haven't picked a track to explore yet. Choose one and everything else here lines
              up behind it.
            </p>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-pop flex flex-wrap items-center gap-6 p-6"
        >
          <Gauge value={student.readiness} />
          <div className="min-w-[180px] flex-1 space-y-2.5">
            <h2 className="text-xl font-bold">Readiness score</h2>
            <p className="text-sm text-muted-foreground">
              How your current skills compare with what {role.title} roles ask for.
            </p>
            {student.subScores.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs font-bold">
                  <span>{s.label}</span>
                  <span className="text-muted-foreground">{s.value}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.value}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-pop p-6"
        >
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <BookOpen className="h-5 w-5 text-primary" /> Progress
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            You're currently learning {learning.join(", ")}.
          </p>
          <div className="mt-4 space-y-3">
            {myCourses.map((c) => (
              <div key={c.id}>
                <div className="flex justify-between text-sm font-bold">
                  <span>{c.title}</span>
                  <span className="text-primary">{c.completed}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="gradient-brand h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${c.completed}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {c.lessonsLeft} lessons left · builds your {c.closesSkill}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-pop flex flex-col p-6"
        >
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Target className="h-5 w-5 text-primary" /> Biggest gap
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
            <span className="font-bold">{topGap.name}</span> is the furthest behind for{" "}
            {role.title} roles — you're at {topGap.level} out of 100 where the role expects{" "}
            {topGap.required}.
          </p>
          <div className="mt-4 rounded-2xl bg-muted p-4">
            <div className="flex justify-between text-xs font-bold">
              <span>You: {topGap.level}</span>
              <span className="text-muted-foreground">Target: {topGap.required}</span>
            </div>
            <div className="relative mt-2 h-2.5 overflow-hidden rounded-full bg-background">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-primary/25"
                style={{ width: `${topGap.required}%` }}
              />
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${topGap.level}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>

          <div className="mt-auto pt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Next recommended action
            </p>
            <Link
              to="/skills"
              className="gradient-brand mt-2 flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold text-primary-foreground shadow-pop"
            >
              Explore careers and see your gaps <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
