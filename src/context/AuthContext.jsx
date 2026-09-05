import { createContext, useContext, useEffect, useState } from "react";
import { auth, isFirebaseConfigured } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const DEFAULT_ADMIN_CREDS = {
  email: "admin@portfolio.com",
  password: "admin123",
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminCreds, setAdminCreds] = useState(() => {
    try {
      const stored = localStorage.getItem("portfolio_custom_admin_creds");
      return stored ? JSON.parse(stored) : DEFAULT_ADMIN_CREDS;
    } catch {
      return DEFAULT_ADMIN_CREDS;
    }
  });

  useEffect(() => {
    if (isFirebaseConfigured() && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    } else {
      const localAdmin = localStorage.getItem("portfolio_admin_user");
      if (localAdmin) {
        setCurrentUser(JSON.parse(localAdmin));
      }
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (isFirebaseConfigured() && auth) {
      return await signInWithEmailAndPassword(auth, email, password);
    } else {
      // Local custom password check
      const validEmail = adminCreds.email.toLowerCase().trim();
      const validPassword = adminCreds.password;

      if (email.toLowerCase().trim() === validEmail && password === validPassword) {
        const userObj = { email: adminCreds.email, uid: "local-admin-123" };
        localStorage.setItem("portfolio_admin_user", JSON.stringify(userObj));
        setCurrentUser(userObj);
        return { user: userObj };
      } else {
        throw new Error(`Incorrect email or password. Hint: Default is ${adminCreds.email} / ${adminCreds.password}`);
      }
    }
  };

  const updateAdminCredentials = (newEmail, newPassword) => {
    const updated = {
      email: newEmail.trim() || adminCreds.email,
      password: newPassword || adminCreds.password,
    };
    localStorage.setItem("portfolio_custom_admin_creds", JSON.stringify(updated));
    setAdminCreds(updated);
    if (currentUser) {
      const updatedUser = { ...currentUser, email: updated.email };
      localStorage.setItem("portfolio_admin_user", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured() && auth) {
      await firebaseSignOut(auth);
    } else {
      localStorage.removeItem("portfolio_admin_user");
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    adminCreds,
    login,
    logout,
    updateAdminCredentials,
    loading,
    isFirebase: isFirebaseConfigured(),
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
