"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";

// Mock data
const mockImages = [
  "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1540656689874-95cb7310d65b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1628191140046-24e037cc5e2e?auto=format&fit=crop&q=80&w=800",
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev! + 1) % mockImages.length);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev! - 1 + mockImages.length) % mockImages.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <div className="container" style={{ minHeight: "100vh", paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}>
      <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <h1 style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-xl)", textAlign: "center" }}>
          <TextReveal text="Gallery." />
        </h1>

        <div className="masonry-grid">
          {mockImages.map((src, index) => (
            <FadeIn key={index} delay={index * 0.1} yOffset={20}>
              <div 
                className="gallery-item"
                onClick={() => setLightboxIndex(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Gallery image ${index + 1}`} loading="lazy" />
              </div>
            </FadeIn>
          ))}
        </div>

      </main>

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img 
              key={lightboxIndex}
              src={mockImages[lightboxIndex]} 
              alt="Lightbox view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: "spring", damping: 20 }}
              style={{ maxHeight: "85vh", maxWidth: "90vw", objectFit: "contain", borderRadius: "4px", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
            
            <button 
              className="lightbox-nav lightbox-prev"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + mockImages.length) % mockImages.length); }}
            >←</button>
            <button 
              className="lightbox-nav lightbox-next"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % mockImages.length); }}
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
        .gallery-item img {
          width: 100%;
          display: block;
          filter: grayscale(100%);
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), filter 0.8s ease;
        }
        .gallery-item:hover img {
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
    </div>
  );
}
