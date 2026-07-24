import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";

export default function GalleryEditor({ data, onChange }: { data: any, onChange: (data: any) => void }) {
  const safeData = data || {};
  const images: string[] = safeData.images || ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"];
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
        clientPayload: 'lakshade-admin-upload'
      });
      // Add the new blob URL to the gallery
      onChange({ ...safeData, images: [...images, blob.url] });
    } catch (error: any) {
      console.error(error);
      alert(`Upload failed: ${error.message || "Make sure Vercel Blob is configured correctly in Vercel."}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <p style={{ color: "#888", fontSize: "0.9rem" }}>Manage the media in your gallery. Enter absolute URLs or upload new files.</p>
      
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
            disabled={uploading}
          >
            Remove
          </button>
        </div>
      ))}
      
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button 
          onClick={handleAdd}
          style={{ flex: 1, padding: "0.75rem", background: "#222", color: "#fff", border: "1px dashed #444", borderRadius: "6px", cursor: "pointer" }}
          disabled={uploading}
        >
          + Add URL Manually
        </button>

        <button 
          onClick={() => fileInputRef.current?.click()}
          style={{ flex: 1, padding: "0.75rem", background: "#fff", color: "#000", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "↑ Upload File"}
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: "none" }} 
          accept="image/*,video/mp4"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              uploadFile(file);
              e.target.value = ''; // Reset
            }
          }}
        />
      </div>
    </div>
  );
}
