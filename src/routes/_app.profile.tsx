import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Flame, Sparkles } from "lucide-react";
import { earnedBadges, skills, streakHeatmap, student } from "@/data/demo";
import { PageHeading } from "@/components/AppShell";
import { useStudent } from "@/context/StudentContext";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({
    meta: [
      { title: "Trophy Shelf — SkillForge Student Profile" },
      {
        name: "description",
        content:
          "Your earned badges, certificates, skill levels and streak heatmap — proof of everything you've built so far.",
      },
      { property: "og:title", content: "Trophy Shelf — SkillForge Student Profile" },
      {
        property: "og:description",
        content: "Badges, certificates, skill levels and streak history for your profile.",
      },
    ],
  }),
  component: ProfilePage,
});

const tierTone: Record<string, string> = {
  Gold: "bg-sun/25 text-sun-foreground",
  Silver: "bg-muted text-muted-foreground",
  Bronze: "bg-coral/15 text-coral",
};

const heatTone = [
  "bg-muted",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary",
] as const;

function ProfilePage() {
  const { name, level, levelTitle, xp, streak } = useStudent();

  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Trophy shelf"
        title="Everything you've earned"
        blurb="Badges, certificates and skill levels — the receipts for your readiness score."
      />

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-brand flex flex-wrap items-center gap-5 rounded-3xl p-6 text-primary-foreground shadow-lift"
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-foreground/20 font-display text-2xl font-bold">
          {student.initials}
        </span>
        <div className="min-w-[200px] flex-1">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm text-primary-foreground/85">
            {student.program} · {student.year} · {student.cohort}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-primary-foreground/20 px-3 py-1.5">
              Lvl {level} · {levelTitle}
            </span>
            <span className="rounded-full bg-primary-foreground/20 px-3 py-1.5">
              {xp.toLocaleString()} XP
            </span>
            <span className="flex items-center gap-1 rounded-full bg-primary-foreground/20 px-3 py-1.5">
              <Flame className="h-3.5 w-3.5" /> {streak}-day streak
            </span>
            <span className="rounded-full bg-primary-foreground/20 px-3 py-1.5">
              {earnedBadges.length} badges
            </span>
          </div>
        </div>
      </motion.section>

      <section>
        <h2 className="mb-3 text-xl font-bold">Badges & certificates</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {earnedBadges.map((b, i) => (
            <motion.article
              key={b.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, rotate: -1 }}
              className="card-pop flex items-center gap-4 p-5"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-3xl">
                {b.emoji}
              </span>
              <div>
                <p className="text-sm font-bold">{b.name}</p>
                <p className="text-xs text-muted-foreground">Earned {b.date}</p>
                <span
                  className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${tierTone[b.tier]}`}
                >
                  {b.tier}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-pop p-6"
        >
          <h2 className="text-xl font-bold">Skill levels</h2>
          <p className="text-sm text-muted-foreground">Updated as you clear lessons and labs.</p>
          <div className="mt-4 space-y-3">
            {skills.map((s, i) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs font-bold">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground">{s.level}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="gradient-brand h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.level}%` }}
                    transition={{ duration: 0.8, delay: i * 0.04 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="card-pop p-6"
        >
          <h2 className="text-xl font-bold">Streak heatmap</h2>
          <p className="text-sm text-muted-foreground">
            Last 8 weeks of learning activity. Best streak: {student.bestStreak} days.
          </p>
          <div className="mt-5 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1.5">
            {streakHeatmap.map((v, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.008 }}
                className={`aspect-square rounded-md ${heatTone[v]}`}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
            <span>Chill</span>
            {heatTone.map((t) => (
              <span key={t} className={`h-3 w-3 rounded-sm ${t}`} />
            ))}
            <span>On fire</span>
          </div>
          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-lime/12 p-4">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-lime-foreground" />
            <p className="text-xs text-foreground/80">
              You learn most on Tuesdays and Thursdays. Block 25 minutes on those days and your
              streak basically maintains itself.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
