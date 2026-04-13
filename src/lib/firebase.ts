import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithPhoneNumber, signInAnonymously, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCYYgvXs63FgQpUdOGqcnq_QEaaKZ2PwbQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "saiai-e09f8.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "saiai-e09f8",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "saiai-e09f8.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "882090337369",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:882090337369:web:0262420a69833eb7f9fd48"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export { getAuth, signInWithPopup, signInWithPhoneNumber, signInAnonymously, onAuthStateChanged, firebaseSignOut, GoogleAuthProvider, doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, getDocs, orderBy, limit, Timestamp };
export type { User as FirebaseUser, ConfirmationResult } from 'firebase/auth';
