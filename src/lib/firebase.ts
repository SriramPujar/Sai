import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signOut as firebaseSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCYYgvXs63FgQpUdOGqcnq_QEaaKZ2PwbQ").trim(),
  authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "saiai-e09f8.firebaseapp.com").trim(),
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID || "saiai-e09f8").trim(),
  storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "saiai-e09f8.firebasestorage.app").trim(),
  messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "882090337369").trim(),
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID || "1:882090337369:web:0262420a69833eb7f9fd48").trim()
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { getAuth, signInAnonymously, onAuthStateChanged, firebaseSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, getDocs, orderBy, limit, Timestamp };
export type { User as FirebaseUser, ConfirmationResult } from 'firebase/auth';
