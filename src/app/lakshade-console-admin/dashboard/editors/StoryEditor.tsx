export default function StoryEditor({ data, onChange }: { data: any, onChange: (data: any) => void }) {
  const safeData = data || {};
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <label style={{ display: "block", color: "#888", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Title</label>
        <input
          value={safeData.title || ""}
          onChange={(e) => onChange({ ...safeData, title: e.target.value })}
          style={{ width: "100%", background: "#111", border: "1px solid #333", color: "#fff", padding: "0.75rem", borderRadius: "6px" }}
        />
      </div>

      <div>
        <label style={{ display: "block", color: "#888", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Content</label>
        <textarea
          value={safeData.content || ""}
          onChange={(e) => onChange({ ...safeData, content: e.target.value })}
          style={{ width: "100%", background: "#111", border: "1px solid #333", color: "#fff", padding: "0.75rem", borderRadius: "6px", minHeight: "150px", resize: "vertical" }}
        />
      </div>
    </div>
  );
}
