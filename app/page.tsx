"use client";
import { useState, useEffect } from "react";
import { auth, db } from "./firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import SavedRoadmaps from "../components/SavedRoadmaps";

export default function Home() {
  const [interest, setInterest] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [data, setData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setData(null);
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
        body: JSON.stringify({ interest, level }),
      });
      const json = await res.json();
      setData(json);

      if (user) {
        await setDoc(doc(db, "roadmaps", user.uid), {
          uid: user.uid,
          interest,
          level,
          roadmap: json,
          savedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <style jsx global>{`
        @media print {
          nav, .no-print, button, select {
            display: none !important;
          }
          body { background-color: white !important; }
          .print-container {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto print-container">
        <nav className="flex justify-between items-center mb-10 no-print">
          <h1 className="text-2xl font-bold text-gray-900">
            SkillPath <span className="text-purple-600">AI</span>
          </h1>
          <div>
            {user ? (
              <div className="flex items-center gap-4 bg-white p-2 pr-4 rounded-full shadow-sm border border-purple-100">
                <img src={user.photoURL || ""} alt="Profile" className="w-10 h-10 rounded-full border-2 border-purple-500" />
                <button onClick={handleLogout} className="text-xs text-red-500 hover:underline">Log Out</button>
              </div>
            ) : (
              <Link href="/login" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700">
                Sign In
              </Link>
            )}
          </div>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm p-8 text-center mb-10 border border-gray-200 no-print">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Find Your Future.</h2>
          <div className="max-w-md mx-auto space-y-4">
            <select
              className="w-full border-2 border-gray-100 p-3 rounded-xl bg-gray-50 text-gray-700 font-medium"
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

            <select
              className="w-full border-2 border-gray-100 p-3 rounded-xl bg-gray-50 text-gray-700 font-medium"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Beginner">Beginner Level</option>
              <option value="Intermediate">Intermediate Level</option>
              <option value="Advanced">Advanced Level</option>
            </select>

            <button
              onClick={generatePath}
              disabled={loading}
              className="w-full bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition font-bold text-lg disabled:bg-gray-300"
            >
              {loading ? "Analyzing..." : "Generate My Roadmap"}
            </button>
          </div>
        </div>

        {data && (
          <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-700">
            <div className="flex justify-end no-print">
              <button 
                onClick={downloadPDF}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black flex items-center gap-2"
              >
                📥 Save as PDF
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <div className="bg-purple-600 rounded-2xl p-6 text-white mb-8">
                <h2 className="text-sm uppercase tracking-widest font-bold opacity-80 mb-1">Recommended Role</h2>
                <p className="text-2xl font-black">{data.role} ({level})</p>
              </div>

              <section className="mb-10">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Learning Path Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.roadmap.map((step: string, i: number) => (
                    <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold mb-4">{i + 1}</div>
                      <p className="text-gray-700 font-medium leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-800 mb-6">Learning Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.resources.map((res: any, i: number) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:bg-purple-50 transition group"
                    >
                      <span className="font-bold text-gray-800 group-hover:text-purple-700 mb-1">🔗 {res.title}</span>
                      <span className="text-xs text-purple-400 truncate no-print">Click to open resource</span>
                      <span className="hidden print:block text-[10px] text-gray-400 break-all">{res.url}</span>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {user && !data && (
          <div className="mt-12 no-print">
            <SavedRoadmaps userId={user.uid} />
          </div>
        )}
      </div>
    </main>
  );
}