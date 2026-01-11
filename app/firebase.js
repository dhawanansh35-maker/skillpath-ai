import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Corrected the key below - ensure there are NO spaces inside the quotes
  apiKey: "AIzaSyAYdbJ9F0rCT6715FYqDRT1P7dTGP_PPuw", 
  authDomain: "skillpath-ai-25f0c.firebaseapp.com",
  projectId: "skillpath-ai-25f0c",
  storageBucket: "skillpath-ai-25f0c.firebasestorage.app",
  messagingSenderId: "203502908744",
  appId: "1:203502908744:web:ba5b430863ec261d6c2f7d"
};

// This check prevents the 500 error in Next.js
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);