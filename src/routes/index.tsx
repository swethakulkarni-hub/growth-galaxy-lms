import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Compass, Sparkles } from "lucide-react";
import { useStudent } from "@/context/StudentContext";
import student1 from "@/assets/student-1.jpg";
import student2 from "@/assets/student-2.jpg";
import student3 from "@/assets/student-3.jpg";

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

const pointers = [
  {
    photo: student1,
    hand: "See your path\nto success",
    text: "A clear picture of where you stand today and where your subjects could take you.",
  },
  {
    photo: student2,
    hand: "Build skills\nthat matter",
    text: "Know exactly which skills your target roles ask for, and which one to work on next.",
  },
  {
    photo: student3,
    hand: "Find the right\nopportunities",
    text: "Internships, books and podcasts matched to what you're already studying.",
  },
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
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="blob pointer-events-none absolute -left-24 -top-28 h-80 w-80 bg-primary" />
      <div className="blob pointer-events-none absolute -bottom-24 right-0 h-96 w-96 bg-primary-glow" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:py-16">
        <div>
          <div className="flex items-center gap-3">
            <span className="gradient-brand flex h-11 w-11 items-center justify-center rounded-2xl text-primary-foreground shadow-pop">
              <Compass className="h-6 w-6" />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight">PathPilot</span>
          </div>

          <h1 className="mt-7 max-w-xl text-4xl font-bold leading-[1.08] md:text-5xl">
            Turn what you're learning today into{" "}
            <span className="text-gradient-brand">possibilities for tomorrow.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            PathPilot reads your curriculum, your grades and the market, then tells you plainly
            where you stand and what to do next.
          </p>

          <ul className="mt-9 space-y-6">
            {pointers.map((p, i) => (
              <motion.li
                key={p.hand}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.45 }}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:gap-5"
              >
                <span className="relative shrink-0">
                  <span className="gradient-brand absolute -inset-1 rounded-full opacity-30 blur-[6px]" />
                  <img
                    src={p.photo}
                    alt=""
                    loading="lazy"
                    width={512}
                    height={512}
                    className="relative h-20 w-20 rounded-full object-cover ring-4 ring-card sm:h-24 sm:w-24"
                  />
                </span>
                <div className="min-w-0">
                  <p className="whitespace-pre-line font-hand text-2xl font-bold leading-tight text-primary sm:text-3xl">
                    {p.hand}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card-pop relative w-full p-7"
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

          <p className="mt-5 text-xs text-muted-foreground">
            Ace Academy · Career Services · Demo experience
          </p>
        </motion.div>
      </div>
    </div>
  );
}
