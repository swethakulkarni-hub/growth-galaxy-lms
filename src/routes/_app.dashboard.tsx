import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ArrowRight, Zap } from "lucide-react";
import { myCourses, student } from "@/data/demo";
import { useStudent } from "@/context/StudentContext";
import { CountUp } from "@/components/CountUp";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SkillForge Career Readiness" },
      {
        name: "description",
        content:
          "Your career readiness score, active courses, weekly quests, XP and streak in one student dashboard.",
      },
      { property: "og:title", content: "Dashboard — SkillForge Career Readiness" },
      {
        property: "og:description",
        content: "Readiness score, courses, quests, XP and streaks for students.",
      },
    ],
  }),
  component: DashboardPage,
});

function Gauge({ value }: { value: number }) {
  const r = 76;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-52 w-52">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={r} className="fill-none stroke-muted" strokeWidth="16" />
        <motion.circle
          cx="90"
          cy="90"
          r={r}
          className="fill-none stroke-primary"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl font-bold">
          <CountUp to={value} />
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Readiness
        </span>
      </div>
    </div>
  );
}

function DashboardPage() {
  const { firstName, quests, claimQuest, weeklyXp, weeklyGoalXp, streak, level, role } =
    useStudent();
  const weeklyPct = Math.min(100, Math.round((weeklyXp / weeklyGoalXp) * 100));
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-5">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-brand relative overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-lift md:p-8"
      >
        <motion.div
          className="absolute -right-6 -top-6 text-[9rem] leading-none opacity-25"
          animate={{ rotate: [0, 8, 0], y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          🎓
        </motion.div>
        <p className="text-sm font-semibold text-primary-foreground/80">{today}</p>
        <h1 className="mt-1 text-3xl font-bold md:text-4xl">Let's go, {firstName}! 🔥</h1>
        <p className="mt-2 max-w-lg text-sm text-primary-foreground/85">
          You're <span className="font-bold">{weeklyPct}%</span> of the way to your weekly goal and
          riding a <span className="font-bold">{streak}-day streak</span>. Two lessons today keeps
          it alive.
        </p>

        <div className="relative mt-6 flex flex-wrap items-center gap-4">
          <div className="min-w-[220px] flex-1">
            <div className="flex justify-between text-xs font-bold">
              <span>
                {weeklyXp} / {weeklyGoalXp} XP this week
              </span>
              <span>Lvl {level}</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-primary-foreground/25">
              <motion.div
                className="gradient-lime h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${weeklyPct}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
          <Link
            to="/certifications"
            className="flex items-center gap-2 rounded-2xl bg-primary-foreground/20 px-4 py-2.5 text-sm font-bold backdrop-blur-md transition-colors hover:bg-primary-foreground/30"
          >
            Continue track <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.section>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card-pop p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold">Career Readiness</h2>
              <p className="text-sm text-muted-foreground">
                Measured against {role.emoji} {role.title}
              </p>
            </div>
            <Link
              to="/skills"
              className="rounded-2xl bg-primary/10 px-3 py-2 text-xs font-bold text-primary"
            >
              See my gaps
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-8">
            <Gauge value={student.readiness} />
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              {student.subScores.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="rounded-2xl bg-muted p-4"
                >
                  <p className="text-sm font-bold">
                    {s.emoji} {s.label}
                  </p>
                  <p className="font-display text-2xl font-bold text-primary">
                    <CountUp to={s.value} />
                  </p>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${s.value}%` }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.08 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-pop p-6"
        >
          <h2 className="text-xl font-bold">Active Quests</h2>
          <p className="text-sm text-muted-foreground">Claim your XP before the week resets.</p>
          <div className="mt-4 space-y-3">
            {quests.map((q) => {
              const ready = q.progress >= q.target && !q.claimed;
              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border p-4 transition-colors ${
                    ready ? "border-lime bg-lime/10" : "border-border bg-muted"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-bold">
                        {q.emoji} {q.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{q.detail}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary/12 px-2.5 py-1 text-xs font-bold text-primary">
                      +{q.xp} XP
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-background">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.min(100, (q.progress / q.target) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground">
                      {q.progress}/{q.target}
                    </span>
                    <button
                      disabled={!ready}
                      onClick={() => {
                        const xp = claimQuest(q.id);
                        if (xp) toast.success(`Quest complete! +${xp} XP 🎉`);
                      }}
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                        q.claimed
                          ? "bg-muted text-muted-foreground"
                          : ready
                            ? "gradient-lime text-lime-foreground shadow-pop hover:scale-105"
                            : "bg-background text-muted-foreground"
                      }`}
                    >
                      {q.claimed ? "Claimed ✓" : ready ? "Claim" : `Ends ${q.endsIn}`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold">My Courses</h2>
          <Link to="/market" className="text-xs font-bold text-primary">
            What's trending →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {myCourses.map((c, i) => (
            <motion.article
              key={c.id}
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="card-pop overflow-hidden"
            >
              <div
                className={`flex h-32 items-center justify-center bg-linear-to-br ${c.tint} text-6xl`}
              >
                {c.emoji}
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold">{c.title}</h3>
                <p className="text-xs text-muted-foreground">{c.instructor}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="gradient-brand h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${c.completed}%` }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.08 }}
                  />
                </div>
                <div className="mt-2.5 flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">{c.lessonsLeft} lessons left</span>
                  <span className="text-primary">{c.completed}% done</span>
                </div>
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-lime/20 px-2.5 py-1 text-[11px] font-bold text-lime-foreground">
                  <Zap className="h-3 w-3" /> Closes {c.closesSkill} gap
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
