import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Only initialize Firebase on the client side
let app;
let auth;

if (typeof window !== 'undefined') {
  // Client-side only
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    // Create a fallback auth object
    auth = {
      currentUser: null,
      onAuthStateChanged: () => () => {},
      signInWithEmailAndPassword: () => Promise.reject(new Error('Firebase initialization failed')),
      createUserWithEmailAndPassword: () => Promise.reject(new Error('Firebase initialization failed')),
      signOut: () => Promise.reject(new Error('Firebase initialization failed')),
    } as any;
  }
} else {
  // Server-side: create a mock auth object
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
    signInWithEmailAndPassword: () => Promise.reject(new Error('Auth not available on server')),
    createUserWithEmailAndPassword: () => Promise.reject(new Error('Auth not available on server')),
    signOut: () => Promise.reject(new Error('Auth not available on server')),
  } as any;
}

export { auth };
export default app; 