import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCHoe2BKS9o0gGbhoDYqxw5krMW3Z7SAPo',
  authDomain: 'firechatclone.firebaseapp.com',
  projectId: 'firechatclone',
  storageBucket: 'firechatclone.appspot.com',
  messagingSenderId: '872409336763',
  appId: '1:872409336763:web:c32196fc48b1db8b81929e',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
