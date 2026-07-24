"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";

export default function AdminLogin() {
  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Cooldown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(2);
        setResendCooldown(60); // Start 60s cooldown for resend
      } else {
        setError(data.error || "Access denied.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/lakshade-console-admin/dashboard";
      } else {
        setError(data.error || "Verification failed.");
        if (data.error && data.error.includes("expired")) {
          setStep(1); // Force back to login if OTP expired/session wiped
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "#ededed", position: "relative", overflow: "hidden" }}>
      
      {/* Subtle cinematic background glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />

      <main style={{ width: "100%", maxWidth: "380px", position: "relative", zIndex: 10 }}>
        
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontFamily: "var(--font-inter)", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 300 }}>
            <TextReveal text="Console" />
          </h1>
          <p style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem", letterSpacing: "0.1em" }}>RESTRICTED ACCESS</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              onSubmit={handleLogin}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              {error && <div style={{ color: "#ef4444", fontSize: "0.85rem", textAlign: "center", padding: "0.5rem", background: "rgba(239,68,68,0.1)", borderRadius: "4px" }}>{error}</div>}
              
              <div>
                <input 
                  type="text" 
                  className="auth-input" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="IDENTIFIER"
                  required 
                />
              </div>

              <div>
                <input 
                  type="password" 
                  className="auth-input" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="PASSPHRASE"
                  required 
                />
              </div>

              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? "AUTHENTICATING..." : "INITIATE SEQUENCE"}
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              onSubmit={handleVerify}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem", textAlign: "center" }}
            >
              <p style={{ fontSize: "0.9rem", color: "#aaa" }}>
                A 6-digit code has been dispatched.
              </p>

              {error && <div style={{ color: "#ef4444", fontSize: "0.85rem", padding: "0.5rem", background: "rgba(239,68,68,0.1)", borderRadius: "4px" }}>{error}</div>}

              <div>
                <input 
                  type="text" 
                  className="auth-input" 
                  style={{ textAlign: "center", letterSpacing: "0.5em", fontSize: "1.5rem" }}
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))} 
                  placeholder="------"
                  maxLength={6}
                  required 
                />
              </div>

              <button type="submit" className="auth-button" disabled={loading || otp.length !== 6}>
                {loading ? "VERIFYING..." : "CONFIRM AUTHENTICATION"}
              </button>

              <div style={{ marginTop: "1rem" }}>
                <button 
                  type="button" 
                  onClick={handleLogin} 
                  disabled={loading || resendCooldown > 0}
                  style={{ background: "none", border: "none", color: resendCooldown > 0 ? "#444" : "#888", fontSize: "0.8rem", cursor: resendCooldown > 0 ? "not-allowed" : "pointer", textDecoration: "underline" }}
                >
                  {resendCooldown > 0 ? `RESEND AVAILABLE IN ${resendCooldown}S` : "RESEND CODE"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

      </main>

      <style jsx>{`
        .auth-input {
          width: 100%;
          padding: 1rem;
          background: transparent;
          border: 1px solid #333;
          color: #fff;
          font-family: var(--font-inter);
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.3s;
          letter-spacing: 0.1em;
        }
        .auth-input:focus {
          border-color: #888;
        }
        .auth-button {
          width: 100%;
          padding: 1rem;
          background: #fff;
          color: #000;
          border: none;
          font-family: var(--font-inter);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: background 0.3s;
        }
        .auth-button:disabled {
          background: #444;
          color: #888;
          cursor: not-allowed;
        }
        .auth-button:not(:disabled):hover {
          background: #ddd;
        }
      `}</style>
    </div>
  );
}
