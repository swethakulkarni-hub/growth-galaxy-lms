import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { quests as seedQuests, student, targetRoles } from "@/data/demo";

type QuestState = (typeof seedQuests)[number] & { claimed: boolean };

type StudentContextValue = {
  name: string;
  firstName: string;
  xp: number;
  level: number;
  levelTitle: string;
  xpIntoLevel: number;
  xpForNextLevel: number;
  weeklyXp: number;
  weeklyGoalXp: number;
  streak: number;
  quests: QuestState[];
  claimQuest: (id: string) => number;
  roleId: string;
  setRoleId: (id: string) => void;
  role: (typeof targetRoles)[number];
  signedIn: boolean;
  signIn: () => void;
  signOut: () => void;
};

const StudentContext = createContext<StudentContextValue | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(student.xp);
  const [xpIntoLevel, setXpIntoLevel] = useState(student.xpIntoLevel);
  const [level, setLevel] = useState(student.level);
  const [weeklyXp, setWeeklyXp] = useState(student.weeklyXp);
  const [quests, setQuests] = useState<QuestState[]>(() =>
    seedQuests.map((q) => ({ ...q, claimed: false })),
  );
  const [roleId, setRoleId] = useState(targetRoles[0].id);
  const [signedIn, setSignedIn] = useState(false);

  const claimQuest = useCallback(
    (id: string) => {
      const quest = quests.find((q) => q.id === id);
      if (!quest || quest.claimed || quest.progress < quest.target) return 0;
      setQuests((prev) => prev.map((q) => (q.id === id ? { ...q, claimed: true } : q)));
      setXp((v) => v + quest.xp);
      setWeeklyXp((v) => v + quest.xp);
      setXpIntoLevel((v) => {
        const next = v + quest.xp;
        if (next >= student.xpForNextLevel) {
          setLevel((l) => l + 1);
          return next - student.xpForNextLevel;
        }
        return next;
      });
      return quest.xp;
    },
    [quests],
  );

  const value = useMemo<StudentContextValue>(
    () => ({
      name: student.name,
      firstName: student.firstName,
      xp,
      level,
      levelTitle: student.levelTitle,
      xpIntoLevel,
      xpForNextLevel: student.xpForNextLevel,
      weeklyXp,
      weeklyGoalXp: student.weeklyGoalXp,
      streak: student.streak,
      quests,
      claimQuest,
      roleId,
      setRoleId,
      role: targetRoles.find((r) => r.id === roleId) ?? targetRoles[0],
      signedIn,
      signIn: () => setSignedIn(true),
      signOut: () => setSignedIn(false),
    }),
    [xp, level, xpIntoLevel, weeklyXp, quests, claimQuest, roleId, signedIn],
  );

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudent() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudent must be used inside StudentProvider");
  return ctx;
}
