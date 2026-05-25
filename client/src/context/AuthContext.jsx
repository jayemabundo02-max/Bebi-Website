import { getProfileRequest, loginRequest } from "../services/authService.js";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const readStoredUser = () => {
  const raw = localStorage.getItem("bebi_user");
  return raw ? JSON.parse(raw) : null;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("bebi_token"));
  const [user, setUser] = useState(() => readStoredUser());
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("bebi_token")));

  useEffect(() => {
    let active = true;

    const hydrate = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfileRequest();
        if (!active) return;
        setUser(data.user);
        localStorage.setItem("bebi_user", JSON.stringify(data.user));
      } catch {
        if (!active) return;
        localStorage.removeItem("bebi_token");
        localStorage.removeItem("bebi_user");
        setToken(null);
        setUser(null);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    hydrate();

    return () => {
      active = false;
    };
  }, [token]);

  const login = async ({ accessCode, displayName }) => {
    const data = await loginRequest({ accessCode, displayName });
    localStorage.setItem("bebi_token", data.token);
    localStorage.setItem("bebi_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("bebi_token");
    localStorage.removeItem("bebi_user");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      logout,
      isAuthenticated: Boolean(token && user)
    }),
    [loading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return value;
};
