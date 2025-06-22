import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getFirestore, doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { UserProfile } from '../lib/firestore-types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, role: "patient" | "clinic") => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  userData: UserProfile | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      console.warn('Firebase auth is not initialized');
      setLoading(false);
      return;
    }

    const db = getFirestore();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const docSnap = await getDoc(doc(db, "users", firebaseUser.uid));
        setUserData(docSnap.exists() ? docSnap.data() as UserProfile : null);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, role: "patient" | "clinic") => {
    if (!auth) {
      throw new Error('Firebase auth is not initialized');
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const db = getFirestore();

    const userProfileData: Omit<UserProfile, 'createdAt'> = {
      uid: user.uid,
      email: user.email!,
      role,
    };

    const userDocWithTimestamp = {
      ...userProfileData,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", user.uid), userDocWithTimestamp);

    if (role === 'patient') {
      await setDoc(doc(db, "patients", user.uid), {
        uid: user.uid,
        profile: userDocWithTimestamp,
      });
    } else if (role === 'clinic') {
      await setDoc(doc(db, "clinics", user.uid), {
        uid: user.uid,
        profile: userDocWithTimestamp,
        clinicName: `${user.email}'s Clinic`, // Placeholder name
        baseFeeStatus: 'pending',
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!auth) {
      throw new Error('Firebase auth is not initialized');
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (!auth) {
      throw new Error('Firebase auth is not initialized');
    }
    await signOut(auth);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    logout,
    userData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 