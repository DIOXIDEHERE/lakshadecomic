export default function ShowsEditor({ data, onChange }: { data: any, onChange: (d: any) => void }) {
  const shows = Array.isArray(data) ? data : (data?.shows || []);

  const handleShowsChange = (newShows: any[]) => {
    // If the data structure was previously just an array, keep it an array
    // Otherwise put it in a shows property
    if (Array.isArray(data)) {
      onChange(newShows);
    } else {
      onChange({ ...data, shows: newShows });
    }
  };

  const addShow = () => {
    const newShow = {
      id: Date.now().toString(),
      venue: "New Venue",
      date: "Oct 15",
      time: "8:00 PM",
      status: "upcoming",
      link: ""
    };
    handleShowsChange([...shows, newShow]);
  };

  const updateShow = (id: string, field: string, value: string) => {
    const newShows = shows.map(s => s.id === id ? { ...s, [field]: value } : s);
    handleShowsChange(newShows);
  };

  const deleteShow = (id: string) => {
    handleShowsChange(shows.filter(s => s.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Manage Shows</h3>
        <button 
          onClick={addShow}
          style={{ background: "#333", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.9rem" }}
        >
          + Add Show
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {shows.map((show: any) => (
          <div key={show.id} style={{ background: "#111", border: "1px solid #222", padding: "1.5rem", borderRadius: "8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", position: "relative" }}>
            
            <button 
              onClick={() => deleteShow(show.id)}
              style={{ position: "absolute", top: "1rem", right: "1rem", background: "transparent", color: "#ef4444", border: "none", cursor: "pointer" }}
            >
              Delete
            </button>

            <div className="input-group">
              <label style={{ fontSize: "0.8rem", color: "#888" }}>Venue</label>
              <input type="text" value={show.venue} onChange={e => updateShow(show.id, "venue", e.target.value)} style={inputStyle} />
            </div>
            
            <div className="input-group">
              <label style={{ fontSize: "0.8rem", color: "#888" }}>Date</label>
              <input type="text" value={show.date} onChange={e => updateShow(show.id, "date", e.target.value)} style={inputStyle} placeholder="e.g. Oct 15" />
            </div>

            <div className="input-group">
              <label style={{ fontSize: "0.8rem", color: "#888" }}>Time</label>
              <input type="text" value={show.time} onChange={e => updateShow(show.id, "time", e.target.value)} style={inputStyle} placeholder="e.g. 8:00 PM" />
            </div>

            <div className="input-group">
              <label style={{ fontSize: "0.8rem", color: "#888" }}>Status</label>
              <select value={show.status} onChange={e => updateShow(show.id, "status", e.target.value)} style={inputStyle}>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>

            <div className="input-group" style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontSize: "0.8rem", color: "#888" }}>Ticket Link (if upcoming)</label>
              <input type="text" value={show.link || ""} onChange={e => updateShow(show.id, "link", e.target.value)} style={inputStyle} />
            </div>

          </div>
        ))}
        {shows.length === 0 && <p style={{ color: "#666", textAlign: "center", padding: "2rem" }}>No shows currently.</p>}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "#1a1a1a",
  border: "1px solid #333",
  color: "#fff",
  borderRadius: "6px",
  fontSize: "0.95rem",
  marginTop: "0.25rem",
  outline: "none",
  fontFamily: "var(--font-inter)"
};
