import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Flame, Medal } from "lucide-react";
import { leaderboard, weeklyLeaderboard, student } from "@/data/demo";
import { PageHeading } from "@/components/AppShell";

export const Route = createFileRoute("/_app/leaderboard")({
  head: () => ({
    meta: [
      { title: "Cohort Leaderboard — SkillForge" },
      {
        name: "description",
        content:
          "See where you rank in your cohort on XP, streaks and badges — weekly and all-time.",
      },
      { property: "og:title", content: "Cohort Leaderboard — SkillForge" },
      {
        property: "og:description",
        content: "XP, streaks and badge rankings across your student cohort.",
      },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const [scope, setScope] = useState<"weekly" | "all">("weekly");
  const rows = scope === "weekly" ? weeklyLeaderboard : leaderboard;
  const podium = [rows[1]!, rows[0]!, rows[2]!];
  const heights = ["h-24", "h-32", "h-20"];
  const medals = ["🥈", "🥇", "🥉"];

  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Leaderboard"
        title={`${student.cohort} 🏆`}
        blurb="Friendly pressure works. XP from lessons, quests, labs and boss challenges all count."
      />

      <div className="inline-flex rounded-2xl bg-card p-1.5 shadow-pop">
        {(["weekly", "all"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setScope(s)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
              scope === s ? "gradient-brand text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {s === "weekly" ? "This week" : "All time"}
          </button>
        ))}
      </div>

      <section className="card-pop p-6">
        <div className="flex items-end justify-center gap-3 md:gap-6">
          {podium.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex w-24 flex-col items-center md:w-32"
            >
              <span className="text-3xl">{medals[i]}</span>
              <span
                className={`gradient-brand mt-1 flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-primary-foreground ${
                  p.isYou ? "ring-3 ring-lime" : ""
                }`}
              >
                {p.initials}
              </span>
              <p className="mt-2 text-center text-xs font-bold">{p.name}</p>
              <p className="text-[11px] text-muted-foreground">{p.xp.toLocaleString()} XP</p>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                className={`mt-2 w-full rounded-t-2xl bg-linear-to-t from-primary/15 to-primary/45 ${heights[i]}`}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="card-pop overflow-hidden">
        {rows.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`flex items-center gap-4 border-b border-border px-5 py-4 last:border-b-0 ${
              r.isYou ? "bg-lime/12" : ""
            }`}
          >
            <span className="w-7 font-display text-lg font-bold text-muted-foreground">
              {r.rank}
            </span>
            <span className="gradient-brand flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-primary-foreground">
              {r.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">
                {r.name}
                {r.isYou && (
                  <span className="ml-2 rounded-full bg-lime/30 px-2 py-0.5 text-[10px] font-bold text-lime-foreground">
                    YOU
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">{r.badges} badges earned</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-coral">
              <Flame className="h-3.5 w-3.5" /> {r.streak}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-bold text-primary">
              <Medal className="h-4 w-4" /> {r.xp.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
