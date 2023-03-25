// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import firebase SDKs we require for the application
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'social-media-firebase-ap-af5a4.firebaseapp.com',
  projectId: 'social-media-firebase-ap-af5a4',
  storageBucket: 'social-media-firebase-ap-af5a4.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
