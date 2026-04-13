import React, { useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  googleProvider, 
  signInAnonymously, 
  firebaseSignOut, 
  signInWithPhoneNumber, 
  db,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  auth
} from '../lib/firebase';
import type { ConfirmationResult, FirebaseUser } from '../lib/firebase';
import { User, AuthProvider } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithPhone: (phone: string, recaptchaVerifier: any) => Promise<ConfirmationResult | null>;
  verifyOTP: (confirmationResult: ConfirmationResult, otp: string, phoneNumber: string) => Promise<void>;
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

const createInitialUser = (firebaseUser: FirebaseUser, provider: AuthProvider, name?: string): User => ({
  id: firebaseUser.uid,
  name: name || (provider === 'guest' ? 'Guest User' : firebaseUser.displayName || 'User'),
  email: firebaseUser.email || undefined,
  photoUrl: firebaseUser.photoURL || undefined,
  phone: firebaseUser.phoneNumber || undefined,
  provider,
  createdAt: new Date().toISOString(),
  streak: 0,
  longestStreak: 0,
  lastActiveDate: '',
  totalDaysActive: 0,
  completedParayanChapters: [],
  completedAartis: 0,
  journalEntries: []
});

export const AuthProviderComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingConfirmation, setPendingConfirmation] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          await loadOrCreateUser(fbUser);
        } catch (error) {
          console.error('Error loading user:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loadOrCreateUser = async (fbUser: FirebaseUser) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
      if (userDoc.exists()) {
        setUser(userDoc.data() as User);
      } else {
        const newUser = createInitialUser(fbUser, 'google');
        await setDoc(doc(db, 'users', fbUser.uid), newUser);
        setUser(newUser);
      }
    } catch (error) {
      console.error('Error in loadOrCreateUser:', error);
      const newUser = createInitialUser(fbUser, 'google');
      setUser(newUser);
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
        await updateDoc(doc(db, 'users', currentUser.id), updatedUser);
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
    
    return updatedUser;
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await loadOrCreateUser(result.user);
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithPhone = async (phone: string, recaptchaVerifier: any): Promise<ConfirmationResult | null> => {
    setLoading(true);
    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      setPendingConfirmation(confirmation);
      setLoading(false);
      return confirmation;
    } catch (error) {
      console.error('Phone sign in error:', error);
      setLoading(false);
      throw error;
    }
  };

  const verifyOTP = async (confirmationResult: ConfirmationResult, otp: string, phoneNumber: string) => {
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const maskedPhone = phoneNumber.replace(/(\d{3})\s+(\d{3})\s+(\d{4})/, '$1***$3');
      const newUser = createInitialUser(result.user, 'phone', maskedPhone);
      newUser.phone = phoneNumber;
      await setDoc(doc(db, 'users', result.user.uid), newUser);
      setUser(newUser);
      setPendingConfirmation(null);
    } catch (error) {
      console.error('OTP verification error:', error);
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
      await setDoc(doc(db, 'users', result.user.uid), newUser);
      setUser(newUser);
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
        await updateDoc(doc(db, 'users', user.id), data);
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
      signInWithGoogle, 
      signInWithPhone, 
      verifyOTP,
      signInAsGuest, 
      signOut,
      updateUserStreak,
      updateUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
};
