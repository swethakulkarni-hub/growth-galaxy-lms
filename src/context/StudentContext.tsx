import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { readinessForRole, student, targetRoles } from "@/data/demo";

type StudentContextValue = {
  name: string;
  firstName: string;
  year: string;
  program: string;
  readiness: number;
  subScores: { label: string; value: number }[];
  skillsCompared: number;
  roleId: string | null;
  setRoleId: (id: string) => void;
  role: (typeof targetRoles)[number];
  hasChosenTrack: boolean;
  signedIn: boolean;
  signIn: () => void;
  signOut: () => void;
};

const StudentContext = createContext<StudentContextValue | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [roleId, setRoleId] = useState<string | null>(targetRoles[0]!.id);
  const [signedIn, setSignedIn] = useState(false);

  const value = useMemo<StudentContextValue>(() => {
    const role = targetRoles.find((r) => r.id === roleId) ?? targetRoles[0]!;
    const readiness = readinessForRole(role.id);
    return {
      name: student.name,
      firstName: student.firstName,
      year: student.year,
      program: student.program,
      readiness: readiness.score,
      subScores: readiness.subScores,
      skillsCompared: readiness.skillsCompared,
      roleId,
      setRoleId,
      role,
      hasChosenTrack: roleId !== null,
      signedIn,
      signIn: () => setSignedIn(true),
      signOut: () => setSignedIn(false),
    };
  }, [roleId, signedIn]);

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudent() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudent must be used inside StudentProvider");
  return ctx;
}
