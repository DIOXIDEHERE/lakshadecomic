export default function MissionEditor({ data, onChange }: { data: any, onChange: (d: any) => void }) {
  const handleChange = (field: string, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="input-group">
        <label>Status</label>
        <input 
          type="text" 
          value={data?.status || "Active"} 
          onChange={(e) => handleChange("status", e.target.value)} 
          style={inputStyle}
        />
      </div>

      <div className="input-group">
        <label>Progress Percentage (0-100)</label>
        <input 
          type="number" 
          value={data?.progress || 37} 
          onChange={(e) => handleChange("progress", parseInt(e.target.value))} 
          style={inputStyle}
          min={0}
          max={100}
        />
      </div>

      <div className="input-group">
        <label>Current Goal</label>
        <input 
          type="text" 
          value={data?.currentGoal || "Become one of Delhi's strongest upcoming comics."} 
          onChange={(e) => handleChange("currentGoal", e.target.value)} 
          style={inputStyle}
        />
      </div>

      <div className="input-group">
        <label>Current Arc</label>
        <input 
          type="text" 
          value={data?.currentArc || "Writing 15 minutes of undeniable new material."} 
          onChange={(e) => handleChange("currentArc", e.target.value)} 
          style={inputStyle}
        />
      </div>

      <div className="input-group">
        <label>Recent Achievement</label>
        <input 
          type="text" 
          value={data?.recentAchievement || "Crushed the late-night spot at The Comedy Club."} 
          onChange={(e) => handleChange("recentAchievement", e.target.value)} 
          style={inputStyle}
        />
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
  marginTop: "0.5rem",
  outline: "none",
  fontFamily: "var(--font-inter)"
};
