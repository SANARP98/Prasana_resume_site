"use client";

import { useState } from "react";

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <h1 className="text-sm font-semibold text-darkGray uppercase tracking-widest mb-6 text-center">
          Admin Access
        </h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border border-darkGray/20 rounded-md text-sm focus:outline-none focus:border-accent bg-white"
          autoFocus
        />
        {error && (
          <p className="text-red-500 text-xs mt-2">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full mt-3 px-4 py-2 bg-accent text-cream rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
