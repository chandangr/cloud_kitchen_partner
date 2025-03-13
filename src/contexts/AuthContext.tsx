import { createClient, Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useState } from "react";

const VITE_SUPERBASE_URL = "https://qvkgwzkfbsahxyooshan.supabase.co";
const VITE_SUPERBASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2a2d3emtmYnNhaHh5b29zaGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1ODUyMDIsImV4cCI6MjA1NzE2MTIwMn0.on4OutbcDoj4bb1vDOc2ZmX1LwJYLqvt9QrUTz-zdsA";

const supabaseUrl = VITE_SUPERBASE_URL;
const supabaseAnonKey = VITE_SUPERBASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

type AuthContextType = {
  isAuthenticated: boolean;
  signup: (email: string, password: string) => Promise<boolean>;
  signin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  authUser: User | undefined;
  session?: Session;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<User>();
  const [session, setSession] = useState<Session | undefined>();

  const signup = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Signup failed:", error.message);
        return false;
      }

      if (data?.session) {
        setSession(data.session);
      }
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Signin failed:", error.message);
        return false;
      }

      console.log("sdfsdf", data);
      setSession(data?.session);
      setAuthUser(data?.user);
      setIsAuthenticated(!!data?.user);
      return true;
    } catch (error) {
      console.error("Signin error:", error);
      return false;
    }
  };

  const logout = () => {
    supabase.auth.signOut();
    setIsAuthenticated(false);
    setSession(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, session, authUser, signup, signin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
