import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {GoogleAuthProvider, OAuthProvider } from "firebase/auth";
// 🔥 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB1VUa94MRzOgn6woyxj5-_jsJCM1jLwDI",
  authDomain: "sportex-5780e.firebaseapp.com",
  databaseURL: "https://sportex-5780e-default-rtdb.firebaseio.com",
  projectId: "sportex-5780e",
  storageBucket: "sportex-5780e.firebasestorage.app",
  messagingSenderId: "17978646482",
  appId: "1:17978646482:web:346814cb850f40739b720b",
  measurementId: "G-9HLYNBG7WK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export ONLY what you're using
export const auth = getAuth(app);
export const rtdb = getDatabase(app);

export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");

export default app;
