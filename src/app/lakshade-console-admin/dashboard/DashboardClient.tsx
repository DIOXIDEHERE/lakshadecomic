"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeEditor from "./editors/HomeEditor";
import MissionEditor from "./editors/MissionEditor";
import ShowsEditor from "./editors/ShowsEditor";

const sections = [
  { id: "home", label: "Home Page", icon: "🏠" },
  { id: "mission", label: "Current Mission", icon: "🎯" },
  { id: "shows", label: "Shows", icon: "📅" },
  { id: "gallery", label: "Gallery", icon: "🖼" },
  { id: "journal", label: "Journal", icon: "📝" },
  { id: "quotes", label: "Quotes", icon: "💬" },
  { id: "settings", label: "Settings", icon: "🎨" },
];

export default function DashboardClient() {
  const [activeSection, setActiveSection] = useState("home");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const fetchData = useCallback(async (section: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cms/${section}`);
      const json = await res.json();
      setData(json.data || {});
    } catch (e) {
      console.error(e);
      setData({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(activeSection);
  }, [activeSection, fetchData]);

  const handleSave = async (newData: any) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/cms/${activeSection}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (res.ok) {
        setData(newData);
        setSaveMessage("Saved");
        setTimeout(() => setSaveMessage(""), 2000);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/lakshade-console-admin/login";
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      
      {/* Sidebar */}
      <aside style={{ width: "260px", background: "#111", borderRight: "1px solid #222", padding: "2rem 1rem", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 1rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.2rem", margin: 0, fontWeight: 600, letterSpacing: "0.05em" }}>Universe CMS</h2>
          <p style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.2rem" }}>Admin Dashboard</p>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.75rem 1rem", borderRadius: "8px", border: "none",
                background: activeSection === sec.id ? "#222" : "transparent",
                color: activeSection === sec.id ? "#fff" : "#888",
                cursor: "pointer", fontSize: "0.9rem", transition: "all 0.2s",
                textAlign: "left"
              }}
            >
              <span>{sec.icon}</span>
              {sec.label}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} style={{ padding: "0.75rem 1rem", background: "transparent", color: "#666", border: "none", cursor: "pointer", textAlign: "left", fontSize: "0.9rem" }}>
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: "auto", padding: "3rem", background: "#0a0a0a", position: "relative" }}>
        
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", borderBottom: "1px solid #222", paddingBottom: "1rem" }}>
            <h1 style={{ fontSize: "2rem", margin: 0 }}>
              {sections.find(s => s.id === activeSection)?.label}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <AnimatePresence>
                {saveMessage && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: "#4ade80", fontSize: "0.9rem" }}>
                    ✓ {saveMessage}
                  </motion.span>
                )}
              </AnimatePresence>
              <button 
                onClick={() => handleSave(data)} 
                disabled={loading || saving}
                style={{
                  background: "#fff", color: "#000", padding: "0.5rem 1.5rem", borderRadius: "6px",
                  border: "none", fontWeight: 600, cursor: "pointer", transition: "opacity 0.2s",
                  opacity: (loading || saving) ? 0.5 : 1
                }}
              >
                {saving ? "Saving..." : "Publish"}
              </button>
            </div>
          </header>

          {loading ? (
            <div style={{ color: "#666", textAlign: "center", padding: "3rem" }}>Loading...</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {activeSection === "home" && <HomeEditor data={data} onChange={setData} />}
              {activeSection === "mission" && <MissionEditor data={data} onChange={setData} />}
              {activeSection === "shows" && <ShowsEditor data={data} onChange={setData} />}
              {/* Fallback for unbuilt sections */}
              {["gallery", "journal", "quotes", "settings"].includes(activeSection) && (
                <div style={{ padding: "3rem", border: "1px dashed #333", borderRadius: "8px", textAlign: "center", color: "#666" }}>
                  Editor module for {activeSection} is under construction.
                </div>
              )}
            </div>
          )}
        </div>
      </main>

    </div>
  );
}
