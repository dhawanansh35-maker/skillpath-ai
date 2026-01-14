"use client";
import { useState, useEffect } from "react";
import { auth, db } from "./firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import SavedRoadmaps from "../components/SavedRoadmaps";
import confetti from "canvas-confetti"; // Celebration effect

export default function Home() {
  const [interest, setInterest] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [data, setData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setData(null);
    setCompletedSteps([]);
  };

  const generatePath = async () => {
    if (!interest) {
      alert("Please select an interest first!");
      return;
    }
    setLoading(true);
    setCompletedSteps([]); 
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
          completedSteps: [], 
          savedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStep = async (index: number) => {
    const isNowCompleted = !completedSteps.includes(index);
    let newCompleted = isNowCompleted
      ? [...completedSteps, index]
      : completedSteps.filter((i) => i !== index);
    
    setCompletedSteps(newCompleted);

    // Trigger Confetti if 100% complete
    if (isNowCompleted && newCompleted.length === data.roadmap.length) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9333ea', '#4ade80', '#ffffff']
      });
    }

    if (user) {
      const docRef = doc(db, "roadmaps", user.uid);
      await updateDoc(docRef, { completedSteps: newCompleted });
    }
  };

  const downloadPDF = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <style jsx global>{`
        @media print {
          nav, .no-print, button, select, .hero-section { display: none !important; }
          body { background-color: white !important; }
          .print-container { width: 100% !important; border: none !important; box-shadow: none !important; margin: 0 !important; padding: 0 !important; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto print-container">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-10 no-print">
          <h1 className="text-2xl font-bold text-gray-900">SkillPath <span className="text-purple-600">AI</span></h1>
          <div>
            {user ? (
              <div className="flex items-center gap-4 bg-white p-2 pr-4 rounded-full shadow-sm border border-purple-100">
                <img src={user.photoURL || ""} alt="P" className="w-10 h-10 rounded-full border-2 border-purple-500" />
                <button onClick={handleLogout} className="text-xs text-red-500 hover:underline">Log Out</button>
              </div>
            ) : (
              <Link href="/login" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold">Sign In</Link>
            )}
          </div>
        </nav>

        {/* Input Section */}
        <div className="bg-white rounded-3xl shadow-sm p-8 text-center mb-10 border border-gray-200 no-print hero-section">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Build Your Roadmap.</h2>
          <div className="max-w-md mx-auto space-y-4">
            <select className="w-full border-2 border-gray-100 p-3 rounded-xl bg-gray-50 font-medium" value={interest} onChange={(e) => setInterest(e.target.value)}>
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

            <select className="w-full border-2 border-gray-100 p-3 rounded-xl bg-gray-50 font-medium" value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="Beginner">Beginner Level</option>
              <option value="Intermediate">Intermediate Level</option>
              <option value="Advanced">Advanced Level</option>
            </select>

            <button onClick={generatePath} disabled={loading} className="w-full bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition active:scale-95 shadow-lg shadow-purple-200">
              {loading ? "Analyzing Career Data..." : "Generate My Roadmap"}
            </button>
          </div>
        </div>

        {data && (
          <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-700">
            <div className="flex justify-between items-center no-print px-2">
              <span className="text-gray-500 font-bold text-sm">PATHWAY GENERATED</span>
              <button onClick={downloadPDF} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-black">
                📥 Save as PDF
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative">
              
              {/* REFINED PROGRESS SECTION */}
              <div className="bg-purple-600 rounded-2xl p-6 text-white mb-8 shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest font-bold opacity-80 mb-1">Target Role</p>
                      <p className="text-2xl font-black">{data.role} ({level})</p>
                    </div>
                    <div className="text-right">
                      <span className="text-4xl font-black">
                        {Math.round((completedSteps.length / data.roadmap.length) * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-purple-900/40 h-4 rounded-full p-1 backdrop-blur-sm shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        completedSteps.length === data.roadmap.length ? "bg-green-400" : "bg-gradient-to-r from-purple-300 to-white"
                      }`} 
                      style={{ width: `${(completedSteps.length / data.roadmap.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-3 font-bold opacity-90 uppercase tracking-wider">
                    {completedSteps.length === data.roadmap.length 
                      ? "🏆 Roadmap Mastery Achieved!" 
                      : `${data.roadmap.length - completedSteps.length} milestones remaining`}
                  </p>
                </div>
              </div>

              <section className="mb-10">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-600 p-1.5 rounded-lg text-xs uppercase">Curriculum</span>
                  Interactive Milestones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.roadmap.map((step: string, i: number) => (
                    <div 
                      key={i} 
                      onClick={() => toggleStep(i)}
                      className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${
                        completedSteps.includes(i) 
                        ? "bg-green-50 border-green-500 shadow-inner" 
                        : "bg-gray-50 border-gray-100 hover:border-purple-300 hover:shadow-md"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4 transition-colors ${
                        completedSteps.includes(i) ? "bg-green-500 text-white" : "bg-white text-purple-600 shadow-sm border border-purple-100"
                      }`}>
                        {completedSteps.includes(i) ? "✓" : i + 1}
                      </div>
                      <p className={`text-sm font-bold leading-relaxed ${completedSteps.includes(i) ? "text-green-800 line-through opacity-60" : "text-gray-700"}`}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-800 mb-6">Curated Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.resources.map((res: any, i: number) => (
                    <a 
                      key={i} 
                      href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group p-4 bg-white rounded-xl border border-gray-100 hover:bg-purple-50 hover:border-purple-200 transition-all shadow-sm"
                    >
                      <span className="font-bold text-gray-800 group-hover:text-purple-700 text-sm block mb-1">🔗 {res.title}</span>
                      <span className="text-[10px] text-gray-400 group-hover:text-purple-400 truncate block">Visit Source →</span>
                      <span className="hidden print:block text-[9px] text-gray-400 mt-2 break-all">{res.url}</span>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {user && !data && <div className="mt-12 no-print"><SavedRoadmaps userId={user.uid} /></div>}
      </div>
    </main>
  );
}