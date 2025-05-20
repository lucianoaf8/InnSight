import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

const IS_TEST_ENV = typeof globalThis !== 'undefined' && typeof (globalThis as any).vi !== 'undefined';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: any;
if (!IS_TEST_ENV) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (err) {
    console.error("Firebase init error:", err);
  }
}

let authInstance: any;
if (!IS_TEST_ENV) {
  try {
    authInstance = getAuth(app);
  } catch (err) {
    console.error("Firebase auth init error:", err);
    authInstance = { currentUser: null };
  }
} else {
  authInstance = { currentUser: null };
}
export const auth = authInstance;

export const googleProvider = !IS_TEST_ENV
  ? (() => {
      try {
        return new GoogleAuthProvider();
      } catch (err) {
        console.error("Google provider init error:", err);
        return {} as any;
      }
    })()
  : ({} as any);

type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (IS_TEST_ENV) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = { currentUser, loading, logout };

  return (
    <AuthContext.Provider value={value}>
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
