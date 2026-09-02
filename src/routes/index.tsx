import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Flame, GraduationCap, Rocket, Sparkles, Trophy } from "lucide-react";
import { useStudent } from "@/context/StudentContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillForge — Career Readiness LMS for Students" },
      {
        name: "description",
        content:
          "Log in to check your career readiness score, close skill gaps, track market demand for skills, and level up certifications with XP, quests and streaks.",
      },
      { property: "og:title", content: "SkillForge — Career Readiness LMS for Students" },
      {
        property: "og:description",
        content:
          "Readiness scores, skill-gap analysis, live market pulse and gamified certifications for students.",
      },
    ],
  }),
  component: LoginPage,
});

const floaters = [
  { label: "SQL", top: "12%", left: "8%", delay: 0 },
  { label: "Python", top: "26%", left: "62%", delay: 0.4 },
  { label: "React", top: "48%", left: "14%", delay: 0.8 },
  { label: "LLM Apps", top: "64%", left: "55%", delay: 0.2 },
  { label: "Cloud", top: "80%", left: "20%", delay: 0.6 },
  { label: "Data Viz", top: "36%", left: "34%", delay: 1 },
];

function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useStudent();
  const [email, setEmail] = useState("diane@acecollege.edu");
  const [password, setPassword] = useState("skillforge");

  const enter = () => {
    signIn();
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <div className="gradient-brand relative hidden overflow-hidden p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        {floaters.map((f) => (
          <motion.span
            key={f.label}
            className="absolute rounded-2xl bg-primary-foreground/15 px-4 py-2 text-sm font-bold backdrop-blur-md"
            style={{ top: f.top, left: f.left }}
            animate={{ y: [0, -16, 0], rotate: [-2, 3, -2] }}
            transition={{ duration: 6, repeat: Infinity, delay: f.delay, ease: "easeInOut" }}
          >
            {f.label}
          </motion.span>
        ))}

        <div className="relative flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-foreground/20">
            <GraduationCap className="h-6 w-6" />
          </span>
          <span className="font-display text-2xl font-bold">SkillForge</span>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-5xl font-bold leading-[1.05]">
            Are you actually
            <br /> job ready?
          </h1>
          <p className="mt-4 text-base text-primary-foreground/85">
            Find out in 10 seconds. Get your readiness score, see exactly which skills you're
            missing for the role you want, and earn XP closing the gap.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <span className="flex items-center gap-2 rounded-2xl bg-primary-foreground/15 px-4 py-2">
              <Sparkles className="h-4 w-4" /> AI market pulse
            </span>
            <span className="flex items-center gap-2 rounded-2xl bg-primary-foreground/15 px-4 py-2">
              <Flame className="h-4 w-4" /> Streaks & quests
            </span>
            <span className="flex items-center gap-2 rounded-2xl bg-primary-foreground/15 px-4 py-2">
              <Trophy className="h-4 w-4" /> Cohort leaderboard
            </span>
          </div>
        </div>

        <p className="relative text-xs text-primary-foreground/70">
          Ace Academy · Career Services · Demo experience
        </p>
      </div>

      <div className="relative flex items-center justify-center overflow-hidden bg-background p-6">
        <div className="blob pointer-events-none absolute -right-20 top-10 h-64 w-64 bg-lime" />
        <div className="blob pointer-events-none absolute bottom-0 left-0 h-64 w-64 bg-primary" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card-pop relative w-full max-w-md p-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-lime/25 px-3 py-1 text-xs font-bold text-lime-foreground">
            <Rocket className="h-3.5 w-3.5" /> Demo mode
          </span>
          <h2 className="mt-4 text-3xl font-bold">Welcome back 👋</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Any email and password works — you'll enter as Diane, a 2nd-year CS student.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              enter();
            }}
          >
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Student email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-input bg-muted px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-input bg-muted px-4 py-3 text-sm outline-hidden focus:ring-2 focus:ring-ring"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="gradient-brand w-full rounded-2xl px-4 py-3.5 text-sm font-bold text-primary-foreground shadow-pop"
            >
              Enter as Diane →
            </motion.button>
          </form>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { k: "72", v: "Readiness" },
              { k: "12", v: "Day streak" },
              { k: "Lvl 7", v: "Skill Voyager" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-muted p-3">
                <p className="font-display text-lg font-bold text-primary">{s.k}</p>
                <p className="text-[11px] text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
