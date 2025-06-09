// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";


// כאן הכנס את ההגדרות שלך בדיוק כמו שקיבלת מאתר Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAygQg5xGkkvuXwgzKVWWxlboTOYhoEV6A",
  authDomain: "photo-app-8980f.firebaseapp.com",
  projectId: "photo-app-8980f",
  storageBucket: "photo-app-8980f.firebasestorage.app",
  messagingSenderId: "139181749429",
  appId: "1:139181749429:web:d4c94ac096d6de198b3afc",
  measurementId: "G-ZSZ7T23F5T"
};

// הפעלת האפליקציה
const app = initializeApp(firebaseConfig);

// יצוא של auth לשימוש בקבצים אחרים (כמו App.js)
export const auth = getAuth(app);


export const storage = getStorage(app); // ← מוסיף גישה לאחסון

// Initialize services
export const db = getFirestore(app);

// Enable persistence for offline support
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support persistence.');
  }
});
