import React, { useEffect, useState, createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AppContainer from "@/containers/AppContainer";
import supabase from "@/utils/supabaseClient";

const AuthContext = createContext(undefined);

//eslint-disable-next-line
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthGuard = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!supabase) return;
    const fetchSession = async () => {
      if (!supabase) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user && supabase) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile) {
          setProfile(profile);
        }
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (!loading) {

        const isAuthRoute = location.pathname.startsWith("/auth");

          
        if (!user && !isAuthRoute) {
          navigate("/auth/login", { replace: true });
        }

        if (user && isAuthRoute && location.pathname !== "/auth/callback") {
          navigate("/dashboard", { replace: true });
      }
          
    }
  }, [user, loading, location.pathname, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, profile }}>
      {user ? <AppContainer>{children}</AppContainer> : children}
    </AuthContext.Provider>
  );
};

export default AuthGuard;
