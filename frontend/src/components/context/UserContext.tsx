"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
  id?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // ✅ Correct: getItem, not setItem
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        setUser(JSON.parse(storedUser)); // ✅ Parse only if valid
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user"); // Clean invalid data
      }
    }
  }, []);

  // Optional: Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // ✅ Save on change
    } else {
      localStorage.removeItem("user"); // ✅ Remove if null
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
