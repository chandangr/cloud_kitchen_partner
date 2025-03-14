import { SignupData } from "@/components/AuthTabs";
import { createClientAfterSignUp } from "@/services/clientService";
import { createClient, Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useState } from "react";

const VITE_SUPERBASE_URL = "https://qvkgwzkfbsahxyooshan.supabase.co";
const VITE_SUPERBASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2a2d3emtmYnNhaHh5b29zaGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1ODUyMDIsImV4cCI6MjA1NzE2MTIwMn0.on4OutbcDoj4bb1vDOc2ZmX1LwJYLqvt9QrUTz-zdsA";

const supabaseUrl = VITE_SUPERBASE_URL;
const supabaseAnonKey = VITE_SUPERBASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

type SessionData = {
  clientId?: string;
} & Session;

type AuthContextType = {
  isAuthenticated: boolean;
  signup: (formData: SignupData) => Promise<boolean>;
  signin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  authUser: User | undefined;
  session?: SessionData;
  setSessionData?: (session: SessionData) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<User>();
  const [session, setSession] = useState<SessionData | undefined>();

  const setSessionData = (session: SessionData) => {
    setSession(session);
    setAuthUser(session.user);
    setIsAuthenticated(!!session.user);
  };

  const signup = async (formdata: SignupData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formdata?.email,
        password: formdata?.password,
      });

      setIsAuthenticated(false);

      if (error) {
        console.error("Signup failed:", error.message);
        return false;
      }

      if (data?.session) {
        await createClientAfterSignUp(formdata, data?.session);
      }
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
        return;
      }

      const { data: clientData, error: clientError } = await supabase
        .from("client")
        .select("*")
        .eq("user_id", data.user.id)
        .single();

      if (clientError) {
        console.error("Error fetching client data:", clientError.message);
        return;
      }
      setSession(data?.session);
      supabase.auth?.storage?.setItem("user", JSON.stringify(data?.user));
      setAuthUser(data?.user);
      setIsAuthenticated(!!data?.user);

      return clientData;
    } catch (error) {
      console.error("Signin error:", error);
      return;
    }
  };

  const logout = () => {
    supabase.auth.signOut();
    setIsAuthenticated(false);
    setSession(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        session,
        authUser,
        signup,
        signin,
        logout,
        setSessionData,
      }}
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
