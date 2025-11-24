import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User, validateCredentials, getUserById } from "@/data/mockUsers";

type AuthContextType = {
  isLogged: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("artra:user");
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch {
      return null;
    }
  });

  const isLogged = user !== null;

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("artra:user", JSON.stringify(user));
      } else {
        localStorage.removeItem("artra:user");
      }
    } catch {
      // ignore
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    const validatedUser = validateCredentials(email, password);
    if (validatedUser) {
      setUser(validatedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
    }
  };

  const value = useMemo(
    () => ({
      isLogged,
      user,
      login,
      logout,
      updateUser,
    }),
    [isLogged, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
