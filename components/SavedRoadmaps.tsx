"use client";
import { useState, useEffect } from "react";
import { db } from "../app/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function SavedRoadmaps({ userId }: { userId: string }) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Query Firestore for roadmaps belonging only to this user
        const q = query(collection(db, "roadmaps"), where("uid", "==", userId));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => doc.data());
        setHistory(docs);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchHistory();
  }, [userId]);

  if (loading) return <p className="text-gray-400 text-sm">Loading your history...</p>;
  if (history.length === 0) return null;

  return (
    <div className="mt-12 border-t pt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Your Previous Roadmaps</h3>
      <div className="space-y-4">
        {history.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <p className="font-bold text-purple-600">{item.interest}</p>
              <p className="text-xs text-gray-400">Saved on: {new Date(item.savedAt).toLocaleDateString()}</p>
            </div>
            <button className="text-sm bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}