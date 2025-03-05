"use client";

import { ReactNode, createContext, useContext } from "react";
import { Session } from "next-auth";

// Create context
const SessionContext = createContext<Session | null>(null);

// Provider component
export function SessionProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

// Hook to use session
export function useSession() {
  const session = useContext(SessionContext);
  return session;
} 