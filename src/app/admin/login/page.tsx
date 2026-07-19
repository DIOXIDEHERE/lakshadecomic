"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: "400px", marginTop: "4rem" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", textAlign: "center" }}>Admin Login</h1>
      
      <div className="glass-panel">
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {error && <div style={{ color: "#ef4444", fontSize: "0.875rem", textAlign: "center" }}>{error}</div>}
          
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-muted)" }}>Username</label>
            <input 
              type="text" 
              className="input" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-muted)" }}>Password</label>
            <input 
              type="password" 
              className="input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: "1rem" }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
