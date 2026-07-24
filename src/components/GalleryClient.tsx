"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";

const isVideo = (url: string) => url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm');

export default function GalleryClient({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev! + 1) % images.length);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, images.length]);

  if (!images || images.length === 0) {
    return (
      <FadeIn delay={0.2}>
        <p style={{ textAlign: "center", color: "var(--color-text-muted)" }}>Gallery is empty.</p>
      </FadeIn>
    );
  }

  return (
    <>
      <div className="masonry-grid">
        {images.map((src, index) => (
          <FadeIn key={index} delay={index * 0.1} yOffset={20}>
            <div 
              className="gallery-item"
              onClick={() => setLightboxIndex(index)}
            >
              {isVideo(src) ? (
                <video src={src} autoPlay loop muted playsInline style={{ width: "100%", display: "block" }} />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={src} alt={`Gallery item ${index + 1}`} loading="lazy" />
              )}
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
              background: "rgba(10, 10, 10, 0.95)", backdropFilter: "blur(20px)",
              zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "zoom-out"
            }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: "spring", damping: 20 }}
              style={{ maxHeight: "85vh", maxWidth: "90vw", borderRadius: "4px", boxShadow: "0 20px 50px rgba(0,0,0,0.5)", overflow: "hidden" }}
              onClick={(e) => e.stopPropagation()} 
            >
              {isVideo(images[lightboxIndex]) ? (
                <video src={images[lightboxIndex]} autoPlay loop controls style={{ maxHeight: "85vh", maxWidth: "90vw", objectFit: "contain" }} />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={images[lightboxIndex]} alt="Lightbox view" style={{ maxHeight: "85vh", maxWidth: "90vw", objectFit: "contain" }} />
              )}
            </motion.div>
            
            <button 
              className="lightbox-nav lightbox-prev"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + images.length) % images.length); }}
            >←</button>
            <button 
              className="lightbox-nav lightbox-next"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % images.length); }}
            >→</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .masonry-grid {
          column-count: 1;
          column-gap: var(--space-md);
        }
        @media (min-width: 768px) { .masonry-grid { column-count: 2; } }
        @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
        
        .gallery-item {
          break-inside: avoid;
          margin-bottom: var(--space-md);
          overflow: hidden;
          border-radius: 4px;
          cursor: zoom-in;
          position: relative;
        }
        .gallery-item img, .gallery-item video {
          width: 100%;
          display: block;
          filter: grayscale(100%);
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), filter 0.8s ease;
        }
        .gallery-item:hover img, .gallery-item:hover video {
          transform: scale(1.05);
          filter: grayscale(0%);
        }
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: none; border: none; color: white;
          font-size: 2rem; padding: 2rem; cursor: pointer;
          opacity: 0.5; transition: opacity 0.3s ease;
        }
        .lightbox-nav:hover { opacity: 1; }
        .lightbox-prev { left: 0; }
        .lightbox-next { right: 0; }
      `}</style>
    </>
  );
}
