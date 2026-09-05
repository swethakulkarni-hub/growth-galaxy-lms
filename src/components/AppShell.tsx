import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Target,
  TrendingUp,
  LogOut,
  Search,
  Compass,
  BookOpen,
} from "lucide-react";
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

      <div className="relative mx-auto flex max-w-[1500px] gap-4 p-3 md:gap-6 md:p-6">
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 shrink-0 flex-col rounded-3xl bg-sidebar p-5 text-sidebar-foreground shadow-lift lg:flex">
          <Link to="/dashboard" className="flex items-center gap-3">
            <span className="gradient-brand flex h-11 w-11 items-center justify-center rounded-2xl text-primary-foreground shadow-pop">
              <Compass className="h-6 w-6" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">PathPilot</span>
          </Link>
          <p className="mt-3 text-xs leading-relaxed text-sidebar-foreground/60">
            Turn what you're learning today into possibilities for tomorrow.
          </p>

          <nav className="mt-7 flex flex-1 flex-col gap-1.5">
            {nav.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-pop"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute left-0 h-7 w-1.5 rounded-r-full bg-sidebar-primary"
                    />
                  )}
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 rounded-2xl bg-sidebar-accent/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
              Exploring
            </p>
            <p className="font-display text-base font-bold">
              {hasChosenTrack ? role.title : "No track yet"}
            </p>
            <p className="mt-1 text-xs text-sidebar-foreground/70">
              You can change this any time — nothing is final.
            </p>
          </div>

          <Link
            to="/"
            className="mt-3 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          >
            <LogOut className="h-5 w-5" />
            Log out
          </Link>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center gap-3 rounded-3xl bg-card/80 p-3 shadow-pop backdrop-blur-xl md:p-4">
            <label className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl bg-muted px-4 py-2.5">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                placeholder="Search subjects, skills, roles…"
                className="min-w-0 flex-1 bg-transparent text-sm outline-hidden placeholder:text-muted-foreground"
              />
            </label>

            <div className="flex items-center gap-3 rounded-2xl bg-muted px-3 py-2">
              <span className="gradient-brand flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-primary-foreground">
                {firstName.slice(0, 1)}
                {name.split(" ")[1]?.slice(0, 1)}
              </span>
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-bold">{name}</p>
                <p className="text-xs text-muted-foreground">{year} · Computer Science</p>
              </div>
            </div>
          </header>

          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {nav.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex shrink-0 items-center gap-2 rounded-2xl px-3 py-2 text-xs font-bold ${
                    active
                      ? "gradient-brand text-primary-foreground"
                      : "bg-card text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <main className="mt-4 pb-10">{children}</main>
        </div>
      </div>
    </div>
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
