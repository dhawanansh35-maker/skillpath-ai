"use client";

import { useState } from "react";

export default function Home() {
  const [interest, setInterest] = useState("");
  const [data, setData] = useState<any>(null);

  const generatePath = async () => {
    if (!interest) return;

    const res = await fetch("/api/manual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interest }),
    });

    const json = await res.json();
    setData(json);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* ================= HERO SECTION ================= */}
        <div className="bg-white rounded-xl shadow p-8 text-center mb-10">
          <h1 className="text-3xl font-bold">
            SkillPath <span className="text-purple-600">AI</span>
          </h1>

          <p className="text-gray-500 text-sm mt-2 mb-6 max-w-md mx-auto">
            Helping first-year students choose the right career path with clarity
          </p>

          {/* DROPDOWN */}
          <select
            className="w-full border p-3 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          >
            <option value="">Select your interest</option>
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
            className="bg-purple-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-purple-700 transition font-semibold"
          >
            Generate My Career Path
          </button>
        </div>

        {/* ================= RESULT SECTION ================= */}
        {data && (
          <>
            {/* ROLE CARD */}
            <div className="bg-white rounded-xl shadow p-6 mb-8">
              <h2 className="text-xl font-bold text-purple-600 mb-2">
                🎯 Recommended Career Role
              </h2>
              <p className="text-lg">{data.role}</p>
            </div>

            {/* ROADMAP CARDS */}
            <h2 className="text-xl font-bold mb-4">🛣 Learning Roadmap</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {data.roadmap.map((step: string, i: number) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  <h3 className="font-bold text-purple-600 mb-1">
                    Step {i + 1}
                  </h3>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>

            {/* RESOURCE CARDS */}
            <h2 className="text-xl font-bold mb-4">📚 Free Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {data.resources.map((res: any, i: number) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  <p className="font-semibold text-purple-600">
                    🔗 {res.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Click to open resource
                  </p>
                </a>
              ))}
            </div>
          </>
        )}

      </div>
    </main>
  );
}
