import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDemo-ReplaceWithYourOwn",
  authDomain: "brokeprice-demo.firebaseapp.com",
  projectId: "brokeprice-demo",
  storageBucket: "brokeprice-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const ROLES = {
  PUBLIC: 'public',
  EMPLOYEE: 'employee',
  ADMIN: 'admin'
} as const;

export type Role = typeof ROLES.PUBLIC | typeof ROLES.EMPLOYEE | typeof ROLES.ADMIN;
