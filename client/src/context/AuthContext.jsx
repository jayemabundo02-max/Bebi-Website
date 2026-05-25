import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getProfile, login as loginRequest } from "../services/authService";

export const AuthContext = createContext(null);

const readStoredProfile = () => {
  try {
    return JSON.parse(localStorage.getItem("bebi_profile")) || null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("bebi_token"));
  const [profile, setProfile] = useState(readStoredProfile);
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(token));

  const login = useCallback(async (accessCode) => {
    const response = await loginRequest(accessCode);
    localStorage.setItem("bebi_token", response.token);
    localStorage.setItem("bebi_profile", JSON.stringify(response.profile));
    setToken(response.token);
    setProfile(response.profile);
    return response.profile;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("bebi_token");
    localStorage.removeItem("bebi_profile");
    setToken(null);
    setProfile(null);
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (!token) {
      setIsBootstrapping(false);
      return undefined;
    }

    getProfile()
      .then((response) => {
        if (!isMounted) return;
        setProfile(response.profile);
        localStorage.setItem("bebi_profile", JSON.stringify(response.profile));
      })
      .catch(() => {
        if (!isMounted) return;
        logout();
      })
      .finally(() => {
        if (isMounted) setIsBootstrapping(false);
      });

    return () => {
      isMounted = false;
    };
  }, [logout, token]);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      isBootstrapping,
      login,
      logout,
      profile,
      token
    }),
    [isBootstrapping, login, logout, profile, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
