import { motion } from "motion/react";
import student1 from "@/assets/student-1.jpg";
import student2 from "@/assets/student-2.jpg";
import student3 from "@/assets/student-3.jpg";

export const pathPointers = [
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

/** Left-hand rail of student pointers — mirrors the sign-in page framing. */
export function PathPointerRail() {
  return (
    <aside className="space-y-7 lg:sticky lg:top-6">
      {pathPointers.map((p, i) => (
        <motion.div
          key={p.hand}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.12, duration: 0.45 }}
          className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 lg:grid-cols-1 lg:justify-items-center lg:gap-2 lg:text-center"
        >
          <span className="relative shrink-0">
            <span className="gradient-brand absolute -inset-1 rounded-full opacity-30 blur-[6px]" />
            <img
              src={p.photo}
              alt=""
              loading="lazy"
              width={512}
              height={512}
              className="relative h-16 w-16 rounded-full object-cover ring-4 ring-card lg:h-20 lg:w-20"
            />
          </span>
          <div className="min-w-0">
            <p className="whitespace-pre-line font-hand text-2xl font-bold leading-tight text-primary">
              {p.hand}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.text}</p>
          </div>
        </motion.div>
      ))}
    </aside>
  );
}
