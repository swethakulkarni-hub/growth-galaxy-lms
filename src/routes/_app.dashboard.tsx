import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Check, Compass, Flag, Gauge as GaugeIcon, Map, Target } from "lucide-react";
import { gapsForRole, myCourses, student, targetRoles } from "@/data/demo";
import { useStudent } from "@/context/StudentContext";
import { CountUp } from "@/components/CountUp";
import { SectionCard } from "@/components/AppShell";

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
  const r = 62;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-40 w-40 shrink-0">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r={r} className="fill-none stroke-muted" strokeWidth="14" />
        <motion.circle
          cx="80"
          cy="80"
          r={r}
          className="fill-none stroke-primary"
          strokeWidth="14"
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

const roadmap = [
  { label: "Choosing a track", state: "Completed", icon: Check },
  { label: "Learn & build", state: "In progress", icon: BookOpen },
  { label: "Gain experience", state: "Next", icon: Target },
  { label: "Land your first role", state: "Upcoming", icon: Flag },
] as const;

function Roadmap({ role }: { role: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {roadmap.map((step, i) => {
        const done = step.state === "Completed";
        const current = step.state === "In progress";
        return (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="relative flex items-center gap-3"
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                done
                  ? "gradient-brand text-primary-foreground"
                  : current
                    ? "border-2 border-primary bg-card text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              <step.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{step.label}</p>
              <p
                className={`text-xs font-semibold ${
                  done || current ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.state}
              </p>
            </div>
            {i < roadmap.length - 1 && (
              <span className="pointer-events-none absolute -right-3 top-5 hidden h-px w-6 bg-border xl:block" />
            )}
          </motion.div>
        );
      })}
      <p className="text-xs text-muted-foreground sm:col-span-2 xl:col-span-4">
        Your personalised journey towards <span className="font-bold text-primary">{role}</span> —
        and you can change direction at any point.
      </p>
    </div>
  );
}

function DashboardPage() {
  const { firstName, role, roleId, hasChosenTrack, setRoleId } = useStudent();
  const gaps = gapsForRole(roleId ?? targetRoles[0]!.id);
  const topGap = gaps[0]!;
  const learning = myCourses.map((c) => c.closesSkill);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-8">
      <PathPointerRail />

      <div className="min-w-0 space-y-5">
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


      <SectionCard
        icon={Map}
        title="Career roadmap"
        blurb="The four stages between today and your first role."
      >
        <Roadmap role={hasChosenTrack ? role.title : "a career you choose"} />
      </SectionCard>

      <SectionCard
        icon={Compass}
        title="Career goal"
        blurb="Where your subjects and courses are already pointing."
        delay={0.05}
      >
        {hasChosenTrack ? (
          <>
            <p className="text-sm leading-relaxed text-foreground/85">
              Based on the subjects you've studied and the courses you've taken, you could think
              about a career in <span className="font-bold">data analytics</span> or{" "}
              <span className="font-bold">product management</span> type of roles. Right now you're
              exploring the <span className="font-bold">{role.title}</span> track.
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
          <p className="text-sm leading-relaxed text-foreground/85">
            You haven't picked a track to explore yet. Choose one and everything else here lines up
            behind it.
          </p>
        )}
      </SectionCard>

      <SectionCard
        icon={GaugeIcon}
        title="Readiness score"
        blurb={`How your current skills compare with what ${role.title} roles ask for.`}
        delay={0.1}
      >
        <div className="flex flex-wrap items-center gap-6">
          <Gauge value={student.readiness} />
          <div className="min-w-[200px] flex-1 space-y-2.5">
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
        </div>
      </SectionCard>

      <SectionCard
        icon={BookOpen}
        title="Progress"
        blurb={`You're currently learning ${learning.join(", ")}.`}
        delay={0.15}
      >
        <div className="space-y-3.5">
          {myCourses.map((c) => (
            <div key={c.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{c.title}</p>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="gradient-brand h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${c.completed}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {c.lessonsLeft} lessons left · builds your {c.closesSkill}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-primary">
                {c.completed}%
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        icon={Target}
        title="Biggest gap"
        blurb="The one skill holding your readiness score back."
        delay={0.2}
      >
        <p className="text-sm leading-relaxed text-foreground/85">
          <span className="font-bold">{topGap.name}</span> is the furthest behind for {role.title}{" "}
          roles — you're at {topGap.level} out of 100 where the role expects {topGap.required}.
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

        <div className="pt-5">
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
      </SectionCard>
      </div>
    </div>
  );
}
