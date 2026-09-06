import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Target, TrendingUp, Compass, BookOpen, LogOut } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useStudent } from "@/context/StudentContext";

const nav = [
  { to: "/dashboard", label: "Where am I", icon: LayoutDashboard },
  { to: "/curriculum", label: "Curriculum", icon: BookOpen },
  { to: "/skills", label: "Skill gaps", icon: Target },
  { to: "/market", label: "Market pulse", icon: TrendingUp },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { firstName, name, year, role, hasChosenTrack } = useStudent();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="blob pointer-events-none absolute -left-32 -top-24 h-72 w-72 bg-primary" />
      <div className="blob pointer-events-none absolute right-0 top-40 h-80 w-80 bg-primary-glow" />

      <div className="relative mx-auto max-w-[1280px] px-3 py-3 md:px-6 md:py-6">
        <header className="rounded-3xl bg-card/85 shadow-pop backdrop-blur-xl">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 md:px-6">
            <Link to="/dashboard" className="flex min-w-0 items-center gap-3">
              <span className="gradient-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-primary-foreground shadow-pop">
                <Compass className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-xl font-bold tracking-tight">
                  PathPilot
                </span>
                <span className="hidden truncate text-xs text-muted-foreground sm:block">
                  Turn what you're learning today into possibilities for tomorrow.
                </span>
              </span>
            </Link>

            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden rounded-2xl bg-muted px-3 py-1.5 text-right leading-tight lg:block">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Exploring
                </p>
                <p className="text-xs font-bold text-primary">
                  {hasChosenTrack ? role.title : "No track yet"}
                </p>
              </div>
              <span className="gradient-brand flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold text-primary-foreground">
                {firstName.slice(0, 1)}
                {name.split(" ")[1]?.slice(0, 1)}
              </span>
              <div className="hidden leading-tight xl:block">
                <p className="text-sm font-bold">{name}</p>
                <p className="text-xs text-muted-foreground">{year} · Computer Science</p>
              </div>
              <Link
                to="/"
                aria-label="Log out"
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-muted-foreground transition-colors hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <nav className="flex gap-1 overflow-x-auto border-t border-border px-3 md:px-5">
            {nav.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative flex shrink-0 items-center gap-2 px-4 py-3.5 text-sm font-semibold transition-colors ${
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-px h-[3px] rounded-full bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="mt-5 pb-10">{children}</main>
      </div>
    </div>
  );
}

export function SectionCard({
  icon: Icon,
  title,
  blurb,
  children,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  blurb?: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card-pop grid gap-5 p-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-8"
    >
      <div className="min-w-0">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="mt-3 text-xl font-bold">{title}</h2>
        {blurb && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{blurb}</p>}
      </div>
      <div className="min-w-0">{children}</div>
    </motion.section>
  );
}

export function PageHeading({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-5"
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h1 className="mt-1 text-3xl font-bold md:text-4xl">{title}</h1>
      <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{blurb}</p>
    </motion.div>
  );
}
