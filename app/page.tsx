"use client";
import { useState, useEffect } from "react";
import { auth, db } from "./firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  const [interest, setInterest] = useState("");
  const [data, setData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Observer: Check user status
  useEffect(() => {
    if (typeof window !== "undefined") {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setData(null); // Clear data on logout for security
  };

  const generatePath = async () => {
    if (!interest) {
      alert("Please select an interest first!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interest }),
      });

      const json = await res.json();
      setData(json);

      // Save to Firestore if logged in
      if (user) {
        await setDoc(doc(db, "roadmaps", user.uid), {
          uid: user.uid,
          interest: interest,
          roadmap: json,
          savedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error generating path:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* ================= NAVIGATION BAR ================= */}
        <nav className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-gray-900">
            SkillPath <span className="text-purple-600">AI</span>
          </h1>
          
          <div>
            {user ? (
              <div className="flex items-center gap-4 bg-white p-2 pr-4 rounded-full shadow-sm border border-purple-100">
                <img 
                  src={user.photoURL || ""} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border-2 border-purple-500" 
                />
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-800 leading-none">{user.displayName}</p>
                  <button onClick={handleLogout} className="text-xs text-red-500 hover:underline">Log Out</button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
                Sign In
              </Link>
            )}
          </div>
        </nav>

        {/* ================= HERO SECTION ================= */}
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center mb-10 border border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Find Your Future.</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Select your field of interest and let our AI build your personalized 4-year learning roadmap.
          </p>

          <div className="max-w-md mx-auto space-y-4">
            <select
              className="w-full border-2 border-gray-100 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 text-gray-700 font-medium"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            >
              <option value="">Choose an Interest...</option>
              <option value="Web Development">Web Development</option>
              <option value="AI & ML">AI & Machine Learning</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Data Science">Data Science</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="DevOps">DevOps</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Game Development">Game Development</option>
              <option value="UI / UX Design">UI / UX Design</option>
            </select>

            <button
              onClick={generatePath}
              disabled={loading}
              className="w-full bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition font-bold text-lg shadow-lg shadow-purple-200 disabled:bg-gray-300 active:scale-95"
            >
              {loading ? "Analyzing Career Data..." : "Generate My Roadmap"}
            </button>
            
            {!user && (
              <p className="text-xs text-gray-400 mt-4">
                Tip: <Link href="/login" className="text-purple-500 underline">Sign in</Link> to save your roadmaps automatically.
              </p>
            )}
          </div>
        </div>

        {/* ================= RESULT SECTION ================= */}
        {data && (
          <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-700">
            <div className="bg-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <h2 className="text-sm uppercase tracking-widest font-bold opacity-80 mb-1">Recommended Role</h2>
              <p className="text-2xl font-black">{data.role}</p>
            </div>

            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-purple-100 text-purple-600 p-1 rounded-md text-sm">Step-by-Step</span> 
                Your Learning Path
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.roadmap.map((step: string, i: number) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold mb-4">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Learning Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.resources.map((res: any, i: number) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:bg-purple-50 hover:border-purple-200 transition group"
                  >
                    <span className="font-bold text-gray-800 group-hover:text-purple-700">🔗 {res.title}</span>
                    <span className="text-xs text-purple-400">View →</span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}