export default function HomeEditor({ data, onChange }: { data: any, onChange: (d: any) => void }) {
  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="input-group">
        <label>Hero Title Line 1</label>
        <input 
          type="text" 
          value={data?.heroTitle1 ?? "Not a success story."} 
          onChange={(e) => handleChange("heroTitle1", e.target.value)} 
          style={inputStyle}
        />
      </div>

      <div className="input-group">
        <label>Hero Title Line 2</label>
        <input 
          type="text" 
          value={data?.heroTitle2 ?? "Just a story."} 
          onChange={(e) => handleChange("heroTitle2", e.target.value)} 
          style={inputStyle}
        />
      </div>

      <div className="input-group">
        <label>Hero Title 1 Font Size ({data?.heroFontSize1 ?? 100}%)</label>
        <input 
          type="range" 
          min="40" 
          max="150" 
          value={data?.heroFontSize1 ?? 100} 
          onChange={(e) => handleChange("heroFontSize1", e.target.value)} 
          style={{ width: "100%", marginTop: "0.5rem" }}
        />
      </div>

      <div className="input-group">
        <label>Hero Title 2 Font Size ({data?.heroFontSize2 ?? 100}%)</label>
        <input 
          type="range" 
          min="40" 
          max="150" 
          value={data?.heroFontSize2 ?? 100} 
          onChange={(e) => handleChange("heroFontSize2", e.target.value)} 
          style={{ width: "100%", marginTop: "0.5rem" }}
        />
      </div>

      <div className="input-group">
        <label>Subtitle / Description</label>
        <input 
          type="text" 
          value={data?.subtitle ?? "Comedy, code, and the spaces between."} 
          onChange={(e) => handleChange("subtitle", e.target.value)} 
          style={inputStyle}
        />
      </div>
      
      <div className="input-group">
        <label>Button Text</label>
        <input 
          type="text" 
          value={data?.ctaText ?? "Begin Chapter 1"} 
          onChange={(e) => handleChange("ctaText", e.target.value)} 
          style={inputStyle}
        />
      </div>

      <div className="input-group">
        <label>Button Link</label>
        <input 
          type="text" 
          value={data?.ctaLink ?? "/story"} 
          onChange={(e) => handleChange("ctaLink", e.target.value)} 
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
