"use client";

import { useState } from "react";

export default function ImprovementSuggestions({ docText }: { docText: string }) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function getSuggestions() {
    if (!docText) return;

    setLoading(true);
    setError(null);
    setSuggestions(null);

    try {
      const res = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: docText }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not fetch details");
      } else {
        setSuggestions(data.improved);
      }
    } catch (e) {
      setError("Failed to fetch suggestions");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 mt-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Improvement Suggestions</h2>

      <button
        onClick={getSuggestions}
        disabled={loading}
        className={`px-4 py-2 rounded text-white transition ${
          loading
            ? "bg-[tomato]/60 cursor-not-allowed"
            : "bg-[tomato] hover:bg-[#e5533d]"
        }`}
      >
        {loading ? "Loading..." : "Get Suggestions"}
      </button>

      {loading && (
        <div className="flex items-center gap-2 mt-3">
          <div className="w-5 h-5 border-2 border-[tomato] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-700">Fetching suggestions…</p>
        </div>
      )}

      {error && (
        <p className="mt-3 text-red-600 text-sm font-medium">
          {error}
        </p>
      )}

      {suggestions && (
        <div className="mt-4 p-3 border rounded bg-gray-50 whitespace-pre-wrap leading-relaxed">
          {suggestions}
        </div>
      )}
    </div>
  );
}
