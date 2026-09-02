import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Check, Crown, Lock, Swords, Timer, Zap } from "lucide-react";
import { certTracks } from "@/data/demo";
import { PageHeading } from "@/components/AppShell";
import { useStudent } from "@/context/StudentContext";

export const Route = createFileRoute("/_app/certifications")({
  head: () => ({
    meta: [
      { title: "Certification Arena — SkillForge" },
      {
        name: "description",
        content:
          "Certification tracks as a game map: clear stages, beat the boss challenge, unlock badges and XP that employers actually recognize.",
      },
      { property: "og:title", content: "Certification Arena — SkillForge" },
      {
        property: "og:description",
        content: "Gamified certification tracks with stages, boss challenges, badges and XP.",
      },
    ],
  }),
  component: CertificationsPage,
});

const accentMap: Record<string, { chip: string; ring: string; bar: string }> = {
  violet: { chip: "bg-primary/12 text-primary", ring: "stroke-primary", bar: "bg-primary" },
  lime: { chip: "bg-lime/25 text-lime-foreground", ring: "stroke-lime", bar: "bg-lime" },
  orange: { chip: "bg-sun/25 text-sun-foreground", ring: "stroke-sun", bar: "bg-sun" },
};

function Ring({ pct, className }: { pct: number; className: string }) {
  const c = 2 * Math.PI * 26;
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r="26" className="fill-none stroke-muted" strokeWidth="7" />
        <motion.circle
          cx="32"
          cy="32"
          r="26"
          className={`fill-none ${className}`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * pct) / 100 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
        {pct}%
      </span>
    </div>
  );
}

function CertificationsPage() {
  const { streak } = useStudent();

  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Certification arena"
        title="Clear the map, earn the badge ⚔️"
        blurb="Each certification is a run of stages. Beat the boss challenge at the end and the badge lands on your trophy shelf — plus a fat XP payout."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: Zap,
            label: "2 lessons from a badge",
            body: "Query Tuning Lab is all that stands between you and Query Slayer.",
            tone: "bg-primary/12 text-primary",
          },
          {
            icon: Timer,
            label: "Limited quest · 3 days",
            body: "Clear any boss challenge this week for a 2× XP multiplier.",
            tone: "bg-coral/12 text-coral",
          },
          {
            icon: Crown,
            label: `${streak}-day streak bonus`,
            body: "Streaks above 10 days give +10% XP on every stage you clear.",
            tone: "bg-sun/25 text-sun-foreground",
          },
        ].map((n) => (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-pop flex items-start gap-3 p-5"
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${n.tone}`}>
              <n.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold">{n.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-5">
        {certTracks.map((track, ti) => {
          const done = track.stages.filter((s) => s.status === "done").length;
          const pct = Math.round((done / track.stages.length) * 100);
          const accent = accentMap[track.accent];
          return (
            <motion.section
              key={track.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ti * 0.08 }}
              className="card-pop p-6"
            >
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-4xl">{track.emoji}</span>
                <div className="min-w-[180px] flex-1">
                  <h2 className="text-xl font-bold">{track.title}</h2>
                  <p className="text-xs text-muted-foreground">{track.marketValue}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-bold">
                    <span className={`rounded-full px-2.5 py-1 ${accent.chip}`}>
                      +{track.xp} XP
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                      Badge: {track.badge}
                    </span>
                  </div>
                </div>
                <Ring pct={pct} className={accent.ring} />
              </div>

              <div className="mt-6 overflow-x-auto pb-2">
                <div className="flex min-w-max items-start gap-1">
                  {track.stages.map((stage, i) => (
                    <div key={stage.name} className="flex items-start">
                      <div className="flex w-32 flex-col items-center text-center">
                        <motion.div
                          whileHover={{ scale: stage.status === "locked" ? 1 : 1.08 }}
                          animate={
                            stage.status === "current"
                              ? { y: [0, -6, 0] }
                              : { y: 0 }
                          }
                          transition={
                            stage.status === "current"
                              ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                              : undefined
                          }
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold ${
                            stage.status === "done"
                              ? `${accent.bar} text-background shadow-pop`
                              : stage.status === "current"
                                ? "gradient-brand text-primary-foreground shadow-lift"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {stage.status === "done" ? (
                            <Check className="h-6 w-6" />
                          ) : stage.status === "locked" ? (
                            <Lock className="h-5 w-5" />
                          ) : stage.kind === "boss" ? (
                            <Swords className="h-6 w-6" />
                          ) : (
                            i + 1
                          )}
                        </motion.div>
                        <p className="mt-2 text-xs font-bold">{stage.name}</p>
                        <p className="text-[11px] capitalize text-muted-foreground">
                          {stage.kind === "boss" ? "Boss challenge" : stage.kind}
                        </p>
                      </div>
                      {i < track.stages.length - 1 && (
                        <div
                          className={`mt-7 h-1.5 w-8 rounded-full ${
                            stage.status === "done" ? accent.bar : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    toast.success(`Stage started — ${track.title} 🔥`, {
                      description: "Nice. Finish it today and your streak bonus applies.",
                    })
                  }
                  className="gradient-brand rounded-2xl px-5 py-3 text-sm font-bold text-primary-foreground shadow-pop"
                >
                  {pct === 0 ? "Start track" : "Continue track"}
                </motion.button>
                <button
                  onClick={() =>
                    toast(`Reward preview · ${track.badge}`, {
                      description: `${track.xp} XP, a shareable certificate, and ${track.marketValue.toLowerCase()}.`,
                    })
                  }
                  className="rounded-2xl bg-muted px-5 py-3 text-sm font-bold text-foreground"
                >
                  Peek at the reward
                </button>
                <span className="text-xs text-muted-foreground">
                  {track.stages.length - done} stages left
                </span>
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
