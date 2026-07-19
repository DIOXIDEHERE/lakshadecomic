"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const images = [
  { src: "/1.jpg", alt: "Stand-up comedy performance 1", delay: "0s" },
  { src: "/2.jpg", alt: "Stand-up comedy performance 2", delay: "0.2s" },
  { src: "/3.jpg", alt: "Stand-up comedy performance 3", delay: "0.4s" },
  { src: "/4.jpg", alt: "Stand-up comedy performance 4", delay: "0.6s" },
];

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={galleryRef}
      style={{
        marginTop: "4rem",
        width: "100%",
        maxWidth: "1000px",
        padding: "0 1rem"
      }}
    >
      <h2 style={{ 
        fontSize: "2rem", 
        marginBottom: "2rem", 
        textAlign: "center",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease-out"
      }}>
        In Action
      </h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
      }}>
        {images.map((img, index) => (
          <div 
            key={index}
            style={{
              position: "relative",
              aspectRatio: "3/4",
              borderRadius: "1rem",
              overflow: "hidden",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transition: `all 0.8s ease-out ${img.delay}`,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}
          >
            <div 
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "var(--color-surface)", // Placeholder color
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-text-muted)"
              }}
            >
              <img 
                src={img.src} 
                alt={img.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0
                }}
                onError={(e) => {
                  // Fallback if image not found yet
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span style={{ fontSize: "0.875rem", padding: "1rem", textAlign: "center" }}>
                Waiting for {img.src}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
