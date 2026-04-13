import React, { useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInAnonymously, 
  firebaseSignOut, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  auth
} from '../lib/firebase';
import type { FirebaseUser } from '../lib/firebase';
import { User, AuthProvider } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signInWithCredentials: (username: string, pass: string) => Promise<void>;
  signUpWithCredentials: (username: string, pass: string) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserStreak: () => Promise<void>;
  updateUserData: (data: Partial<User>) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const generateId = () => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const getTodayDate = () => new Date().toISOString().split('T')[0];

const USER_CACHE_KEY = 'saiseva_user_cache';

const saveUserToCache = (user: User) => {
  try { localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user)); } catch (_) {}
};

const loadUserFromCache = (uid: string): User | null => {
  try {
    const raw = localStorage.getItem(USER_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as User;
    return parsed.id === uid ? parsed : null;
  } catch (_) { return null; }
};

const clearUserCache = () => {
  try { localStorage.removeItem(USER_CACHE_KEY); } catch (_) {}
};

// Resolves in ms or times out
const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T> =>
  Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), ms)
    )
  ]);

const createInitialUser = (firebaseUser: FirebaseUser, provider: AuthProvider, name?: string): User => {
  const user: User = {
    id: firebaseUser.uid,
    name: name || (provider === 'guest' ? 'Guest User' : firebaseUser.displayName || 'User'),
    provider,
    createdAt: new Date().toISOString(),
    streak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    totalDaysActive: 0,
    completedParayanChapters: [],
    completedAartis: 0,
    journalEntries: []
  };

  if (firebaseUser.email) user.email = firebaseUser.email;
  if (firebaseUser.photoURL) user.photoUrl = firebaseUser.photoURL;
  if (firebaseUser.phoneNumber) user.phone = firebaseUser.phoneNumber;

  return user;
};

export const AuthProviderComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // 1. Immediately restore from cache — zero wait
        const cached = loadUserFromCache(fbUser.uid);
        if (cached) {
          setUser(cached);
          setLoading(false);
          // Sync from Firestore in background (no UI block)
          syncUserFromFirestore(fbUser).then(u => { if (u) { setUser(u); saveUserToCache(u); } });
        } else {
          // No cache — must wait for Firestore, but with a timeout
          try {
            await loadOrCreateUser(fbUser);
          } catch (error) {
            console.warn('Error loading user, using fallback:', error);
            const fallback = createInitialUser(fbUser, 'credentials');
            setUser(fallback);
          }
          setLoading(false);
        }
      } else {
        setUser(null);
        clearUserCache();
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const syncUserFromFirestore = async (fbUser: FirebaseUser): Promise<User | null> => {
    try {
      const userDoc = await withTimeout(getDoc(doc(db, 'users', fbUser.uid)), 5000);
      if (userDoc.exists()) return userDoc.data() as User;
    } catch (_) {}
    return null;
  };

  const loadOrCreateUser = async (fbUser: FirebaseUser) => {
    try {
      const userDoc = await withTimeout(getDoc(doc(db, 'users', fbUser.uid)), 5000);
      if (userDoc.exists()) {
        const u = userDoc.data() as User;
        setUser(u);
        saveUserToCache(u);
      } else {
        const newUser = createInitialUser(fbUser, 'credentials');
        setUser(newUser);
        saveUserToCache(newUser);
        // Write to Firestore in background
        setDoc(doc(db, 'users', fbUser.uid), newUser).catch(console.warn);
      }
    } catch (error) {
      console.warn('Error in loadOrCreateUser (offline or timeout):', error);
      const fallback = createInitialUser(fbUser, 'credentials');
      setUser(fallback);
      saveUserToCache(fallback);
    }
  };

  const updateStreak = async (currentUser: User): Promise<User> => {
    const today = getTodayDate();
    const lastActive = currentUser.lastActiveDate;
    let newStreak = currentUser.streak;
    
    if (lastActive === today) {
      return currentUser;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split('T')[0];

    if (lastActive === yesterdayDate) {
      newStreak += 1;
    } else if (lastActive !== today) {
      newStreak = 1;
    }

    const updatedUser: User = {
      ...currentUser,
      streak: newStreak,
      longestStreak: Math.max(currentUser.longestStreak, newStreak),
      lastActiveDate: today,
      totalDaysActive: lastActive && lastActive !== today ? currentUser.totalDaysActive + 1 : currentUser.totalDaysActive
    };

    try {
      if (currentUser.id) {
        const cleanUpdate = JSON.parse(JSON.stringify(updatedUser));
        await updateDoc(doc(db, 'users', currentUser.id), cleanUpdate);
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
    
    return updatedUser;
  };

  const signInWithCredentials = async (username: string, pass: string) => {
    setLoading(true);
    try {
      const email = `${username.toLowerCase()}@saiseva.app`;
      const result = await signInWithEmailAndPassword(auth, email, pass);
      // Don't wait for Firestore — auth state listener handles it
      const cached = loadUserFromCache(result.user.uid);
      if (cached) { setUser(cached); setLoading(false); }
      syncUserFromFirestore(result.user).then(u => { if (u) { setUser(u); saveUserToCache(u); } });
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithCredentials = async (username: string, pass: string) => {
    setLoading(true);
    try {
      const email = `${username.toLowerCase()}@saiseva.app`;
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      const newUser = createInitialUser(result.user, 'credentials', username);
      setUser(newUser);
      saveUserToCache(newUser);
      // Write to Firestore in background
      setDoc(doc(db, 'users', result.user.uid), newUser).catch(console.warn);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInAsGuest = async () => {
    setLoading(true);
    try {
      const result = await signInAnonymously(auth);
      const newUser = createInitialUser(result.user, 'guest');
      setUser(newUser);
      saveUserToCache(newUser);
      // Write to Firestore in background
      setDoc(doc(db, 'users', result.user.uid), newUser).catch(console.warn);
    } catch (error) {
      console.error('Guest sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const updateUserStreak = async () => {
    if (user) {
      const updatedUser = await updateStreak(user);
      setUser(updatedUser);
    }
  };

  const updateUserData = async (data: Partial<User>) => {
    if (user && user.id) {
      try {
        const cleanData = JSON.parse(JSON.stringify(data));
        await updateDoc(doc(db, 'users', user.id), cleanData);
      } catch (error) {
        console.error('Error updating user data:', error);
      }
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      firebaseUser, 
      loading, 
      signInWithCredentials,
      signUpWithCredentials,
      signInAsGuest, 
      signOut,
      updateUserStreak,
      updateUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
};
