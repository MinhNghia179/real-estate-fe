import {
  type User as FirebaseUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import type { LoginInput, RegisterInput } from '@schemas';

import type { User } from '@models/models';

import { auth, db } from '@config/firebase';

const mapFirebaseUser = async (firebaseUser: FirebaseUser): Promise<User> => {
  const docSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
  const extra = docSnap.exists() ? docSnap.data() : {};
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email ?? '',
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    phone: extra.phone,
    bio: extra.bio,
    createdAt: extra.createdAt?.toDate() ?? new Date(),
  };
};

export const authService = {
  signUp: async (data: RegisterInput): Promise<User> => {
    const { email, password, name, phone } = data;
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name });
    await setDoc(doc(db, 'users', credential.user.uid), {
      uid: credential.user.uid,
      email,
      displayName: name,
      phone: phone ?? null,
      createdAt: serverTimestamp(),
    });
    return mapFirebaseUser(credential.user);
  },

  signIn: async (data: LoginInput): Promise<User> => {
    const { email, password } = data;
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return mapFirebaseUser(credential.user);
  },

  signOut: async (): Promise<void> => {
    await signOut(auth);
  },

  resetPassword: async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  },

  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const user = await mapFirebaseUser(firebaseUser);
        callback(user);
      } else {
        callback(null);
      }
    });
  },
};
