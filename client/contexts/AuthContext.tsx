import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextType = {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("artra:isLogged");
      return stored === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("artra:isLogged", String(isLogged));
    } catch {
      // ignore
    }
  }, [isLogged]);

  const value = useMemo(
    () => ({
      isLogged,
      login: () => setIsLogged(true),
      logout: () => setIsLogged(false),
    }),
    [isLogged]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
