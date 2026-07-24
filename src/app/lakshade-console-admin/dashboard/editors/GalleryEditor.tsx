export default function GalleryEditor({ data, onChange }: { data: any, onChange: (data: any) => void }) {
  const safeData = data || {};
  const images: string[] = safeData.images || ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"];

  const handleUpdate = (index: number, val: string) => {
    const newImages = [...images];
    newImages[index] = val;
    onChange({ ...safeData, images: newImages });
  };

  const handleAdd = () => {
    onChange({ ...safeData, images: [...images, ""] });
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange({ ...safeData, images: newImages });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <p style={{ color: "#888", fontSize: "0.9rem" }}>Manage the images in your gallery. Enter absolute URLs or paths to files in the public directory (e.g. /1.jpg).</p>
      
      {images.map((src, index) => (
        <div key={index} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input
            type="text"
            value={src}
            onChange={(e) => handleUpdate(index, e.target.value)}
            style={{ flex: 1, background: "#111", border: "1px solid #333", color: "#fff", padding: "0.75rem", borderRadius: "6px" }}
            placeholder="/image.jpg or https://..."
          />
          <button 
            onClick={() => handleRemove(index)}
            style={{ padding: "0.75rem", background: "#331111", color: "#ff4444", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Remove
          </button>
        </div>
      ))}
      
      <button 
        onClick={handleAdd}
        style={{ padding: "0.75rem", background: "#222", color: "#fff", border: "1px dashed #444", borderRadius: "6px", cursor: "pointer", marginTop: "1rem" }}
      >
        + Add Image
      </button>
    </div>
  );
}
