import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ArrowUpRight, BookOpen, Briefcase, Copy, Headphones, MapPin, TrendingUp } from "lucide-react";
import { books, curriculum, podcasts, roleInternships, roleResume } from "@/data/career";
import { trendingSkills } from "@/data/demo";
import { useStudent } from "@/context/StudentContext";
import { PageHeading } from "@/components/AppShell";

export const Route = createFileRoute("/_app/curriculum")({
  head: () => ({
    meta: [
      { title: "My Curriculum — Subjects, Next Steps & Internships | PathPilot" },
      {
        name: "description",
        content:
          "Your school subjects and grades, how to go deeper with books and podcasts, and the internships and market demand that match what you're studying.",
      },
      { property: "og:title", content: "My Curriculum — Subjects, Next Steps & Internships" },
      {
        property: "og:description",
        content: "Grades, deeper reading and listening, plus internships matched to your subjects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CurriculumPage,
});

function gradeTone(gpa: number) {
  if (gpa >= 9) return "bg-primary text-primary-foreground";
  if (gpa >= 8) return "bg-primary/15 text-primary";
  return "bg-muted text-muted-foreground";
}

function CurriculumPage() {
  const { role } = useStudent();
  const all = curriculum.flatMap((s) => s.courses);
  const cgpa = (
    all.reduce((a, c) => a + c.gpa * c.credits, 0) / all.reduce((a, c) => a + c.credits, 0)
  ).toFixed(2);
  const credits = all.reduce((a, c) => a + c.credits, 0);
  const internships = roleInternships[role.id] ?? [];
  const resume = roleResume[role.id] ?? "";
  const rising = trendingSkills.filter((s) => s.state === "rising").slice(0, 4);

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="My curriculum"
        title="What school covered — and how to go further"
        blurb="Your subjects and grades, one recommended next step for each, deeper reading and listening, and where the market is asking for these skills right now."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "CGPA", value: cgpa, hint: "out of 10" },
          { label: "Credits earned", value: String(credits), hint: "across 3 semesters" },
          { label: "Subjects", value: String(all.length), hint: "graded courses" },
        ].map((s) => (
          <div key={s.label} className="card-pop p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {s.label}
            </p>
            <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.hint}</p>
          </div>
        ))}
      </div>

      {curriculum.map((sem, si) => (
        <motion.section
          key={sem.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.05 }}
          className="card-pop p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold">{sem.label}</h2>
            <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-primary">
              Semester GPA {sem.gpa}
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {sem.courses.map((c) => (
              <div key={c.code} className="rounded-2xl bg-muted p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold">
                    {c.title}
                    <span className="ml-2 text-xs font-semibold text-muted-foreground">
                      {c.code} · {c.credits} credits
                    </span>
                  </p>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${gradeTone(c.gpa)}`}
                  >
                    Grade {c.grade}
                  </span>
                </div>
                <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-card p-3">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-xs leading-relaxed">
                    <span className="font-bold text-primary">Go one step further: </span>
                    <span className="font-semibold">{c.nextStep.title}</span>
                    <span className="block text-muted-foreground">{c.nextStep.why}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      ))}

      {[
        { title: "Books for your subjects", icon: BookOpen, items: books },
        { title: "Podcasts for your subjects", icon: Headphones, items: podcasts },
      ].map((group) => (
        <section key={group.title}>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <group.icon className="h-5 w-5 text-primary" /> {group.title}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map((r) => (
              <motion.article
                key={r.title}
                whileHover={{ y: -4 }}
                className="card-pop flex flex-col p-5"
              >
                <h3 className="text-base font-bold">{r.title}</h3>
                <p className="text-xs font-semibold text-muted-foreground">{r.author}</p>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-foreground/80">{r.why}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-bold">
                  <span className="rounded-full bg-primary/12 px-2.5 py-1 text-primary">
                    {r.subject}
                  </span>
                  <span className="text-muted-foreground">{r.length}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      ))}

      <section className="card-pop p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <TrendingUp className="h-5 w-5 text-primary" /> Market pulse for these subjects
        </h2>
        <p className="text-sm text-muted-foreground">
          Where demand is growing for the skills your coursework is building.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {rising.map((s) => (
            <div key={s.name} className="rounded-2xl bg-muted p-4">
              <p className="text-sm font-bold">{s.name}</p>
              <p className="font-display text-2xl font-bold text-primary">+{s.growth}%</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Briefcase className="h-5 w-5 text-primary" /> Internships that match your subjects
          </h2>
          <p className="text-sm text-muted-foreground">
            Openings relevant to the {role.title} track you're exploring.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {internships.map((i) => (
            <motion.article
              key={i.title}
              whileHover={{ y: -4 }}
              className="card-pop flex flex-col p-5"
            >
              <h3 className="text-base font-bold">{i.title}</h3>
              <p className="text-xs font-semibold text-muted-foreground">{i.org}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {i.mode}
              </p>
              <p className="mt-3 flex-1 text-xs leading-relaxed text-foreground/80">
                {i.fitsBecause}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-bold">
                <span className="rounded-full bg-primary/12 px-2.5 py-1 text-primary">
                  {i.stipend}
                </span>
                <span className="text-muted-foreground">{i.window}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="card-pop p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold">Add this to your resume</h3>
              <p className="text-sm text-muted-foreground">
                Written from the subjects and courses you're doing — paste it under your summary and
                edit a line or two.
              </p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(resume);
                toast.success("Resume paragraph copied");
              }}
              className="flex items-center gap-2 rounded-2xl bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
            >
              <Copy className="h-4 w-4" /> Copy
            </button>
          </div>
          <p className="mt-4 rounded-2xl bg-muted p-4 text-sm leading-relaxed text-foreground/85">
            {resume}
          </p>
        </div>
      </section>
    </div>
  );
}
