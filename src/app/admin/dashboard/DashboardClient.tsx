"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardClient({ initialShows }: { initialShows: any[] }) {
  const [shows, setShows] = useState(initialShows);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const saveShows = async (newShows: any[]) => {
    setLoading(true);
    try {
      const res = await fetch("/api/shows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newShows),
      });
      if (res.ok) {
        setShows(newShows);
      } else if (res.status === 401) {
        router.push("/admin/login");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addShow = () => {
    const newShow = {
      id: Date.now().toString(),
      title: "New Show",
      date: "2026-10-01",
      location: "City, State",
      ticketLink: ""
    };
    saveShows([...shows, newShow]);
  };

  const deleteShow = (id: string) => {
    saveShows(shows.filter(show => show.id !== id));
  };

  const updateShow = (id: string, field: string, value: string) => {
    const newShows = shows.map(show => show.id === id ? { ...show, [field]: value } : show);
    setShows(newShows);
  };

  const handleUpdate = () => {
    saveShows(shows);
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: "1000px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem" }}>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-outline" style={{ padding: "0.5rem 1rem" }}>Logout</button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "var(--color-primary)" }}>Manage Upcoming Shows</h2>
        <button onClick={addShow} className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }} disabled={loading}>
          + Add New Show
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {shows.map(show => (
          <div key={show.id} className="glass-panel" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: "1rem", alignItems: "center" }}>
            <input 
              type="text" 
              className="input" 
              value={show.title} 
              onChange={(e) => updateShow(show.id, "title", e.target.value)}
              placeholder="Title"
            />
            <input 
              type="text" 
              className="input" 
              value={show.date} 
              onChange={(e) => updateShow(show.id, "date", e.target.value)}
              placeholder="YYYY-MM-DD"
            />
            <input 
              type="text" 
              className="input" 
              value={show.location} 
              onChange={(e) => updateShow(show.id, "location", e.target.value)}
              placeholder="Location"
            />
            <input 
              type="text" 
              className="input" 
              value={show.ticketLink} 
              onChange={(e) => updateShow(show.id, "ticketLink", e.target.value)}
              placeholder="Ticket Link URL (e.g. google.com)"
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={handleUpdate} className="btn btn-primary" style={{ padding: "0.5rem 1rem", minWidth: "80px" }} disabled={loading}>
                Save
              </button>
              <button onClick={() => deleteShow(show.id)} className="btn btn-outline" style={{ padding: "0.5rem 1rem", color: "#ef4444", borderColor: "#ef4444" }} disabled={loading}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {shows.length === 0 && <p style={{ color: "var(--color-text-muted)", textAlign: "center" }}>No shows currently. Add one above!</p>}
      </div>
    </div>
  );
}
