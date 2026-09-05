import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Compass, LineChart, Sparkles, Target } from "lucide-react";
import { useStudent } from "@/context/StudentContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PathPilot — Career Guidance for Students" },
      {
        name: "description",
        content:
          "Sign in to see where you stand today, which skills you're missing for the careers you're exploring, and what to do next.",
      },
      { property: "og:title", content: "PathPilot — Career Guidance for Students" },
      {
        property: "og:description",
        content: "Turn what you're learning today into possibilities for tomorrow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

const floaters = [
  { label: "SQL", top: "14%", left: "10%", delay: 0 },
  { label: "Python", top: "28%", left: "60%", delay: 0.4 },
  { label: "Data storytelling", top: "50%", left: "12%", delay: 0.8 },
  { label: "Product thinking", top: "66%", left: "52%", delay: 0.2 },
  { label: "Cloud basics", top: "82%", left: "22%", delay: 0.6 },
];

function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useStudent();
  const [email, setEmail] = useState("diane@acecollege.edu");
  const [password, setPassword] = useState("pathpilot");

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
            <Compass className="h-6 w-6" />
          </span>
          <span className="font-display text-2xl font-bold">PathPilot</span>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-5xl font-bold leading-[1.05]">
            Turn what you're learning today into possibilities for tomorrow.
          </h1>
          <p className="mt-4 text-base text-primary-foreground/85">
            See where you stand right now, which skills the careers you're curious about actually
            ask for, and the one thing to do next.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <span className="flex items-center gap-2 rounded-2xl bg-primary-foreground/15 px-4 py-2">
              <Target className="h-4 w-4" /> Skill gaps, explained
            </span>
            <span className="flex items-center gap-2 rounded-2xl bg-primary-foreground/15 px-4 py-2">
              <LineChart className="h-4 w-4" /> Market pulse
            </span>
          </div>
        </div>

        <p className="relative text-xs text-primary-foreground/70">
          Ace Academy · Career Services · Demo experience
        </p>
      </div>

      <div className="relative flex items-center justify-center overflow-hidden bg-background p-6">
        <div className="blob pointer-events-none absolute -right-20 top-10 h-64 w-64 bg-primary-glow" />
        <div className="blob pointer-events-none absolute bottom-0 left-0 h-64 w-64 bg-primary" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card-pop relative w-full max-w-md p-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Demo mode
          </span>
          <h2 className="mt-4 text-3xl font-bold">Welcome back</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Any email and password works — you'll sign in as Diane, a 2nd-year Computer Science
            student.
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
              Continue as Diane →
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
