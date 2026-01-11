"use client"; // This MUST be at the very top
import { auth } from "../app/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginButton() {
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={signIn} className="bg-purple-600 text-white px-4 py-2 rounded-lg">
      Sign in with Google
    </button>
  );
}