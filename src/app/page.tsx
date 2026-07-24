import Link from "next/link";
import LetterReveal from "@/components/animations/LetterReveal";
import FadeIn from "@/components/animations/FadeIn";
import { getCMSData } from "@/lib/cms";

export const revalidate = 0; // Ensures fresh data (or we can use ISR)

export default async function Home() {
  const data = await getCMSData("home", {
    heroTitle1: "Not a success story.",
    heroTitle2: "Just a story.",
    subtitle: "Comedy, code, and the spaces between.",
    ctaText: "Begin Chapter 1",
    ctaLink: "/story"
  });
  return (
    <div className="container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
      
      {/* Cinematic ambient background with soft moving gradient */}
      <div className="bg-gradient-subtle" style={{ animation: "gradientMove 15s ease infinite alternate" }} />

      {/* Floating particles (very subtle) */}
      <div className="particles-container">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }} />
        ))}
      </div>

      <main style={{ maxWidth: "800px", zIndex: 10, position: "relative" }}>
        
        <FadeIn delay={0.2} duration={1.5} yOffset={10}>
          <p style={{ 
            fontFamily: "var(--font-inter)", 
            textTransform: "uppercase", 
            letterSpacing: "0.2em",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
            marginBottom: "var(--space-md)"
          }}>
            Prologue
          </p>
        </FadeIn>

        <h1 style={{ fontSize: "var(--text-display)", marginBottom: "var(--space-lg)", marginLeft: "-0.05em", lineHeight: 1.1 }}>
          <LetterReveal text={data.heroTitle1} delay={0.4} />
          <br />
          <LetterReveal text={data.heroTitle2} delay={1.8} />
        </h1>

        <FadeIn delay={3.5} duration={1.5} yOffset={20}>
          <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center", flexWrap: "wrap" }}>
            <Link href={data.ctaLink} className="btn-editorial" style={{ fontSize: "var(--text-sm)" }}>
              {data.ctaText}
            </Link>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", fontFamily: "var(--font-inter)", fontStyle: "italic" }}>
              {data.subtitle}
            </span>
          </div>
        </FadeIn>

      </main>

      <style jsx>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; opacity: 0.5; }
          50% { background-position: 100% 50%; opacity: 0.8; }
          100% { background-position: 0% 50%; opacity: 0.5; }
        }
        .bg-gradient-subtle {
          background: radial-gradient(circle at 50% 50%, rgba(217, 200, 180, 0.05), transparent 60%);
          background-size: 200% 200%;
        }
        .particles-container {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          overflow: hidden; pointer-events: none;
        }
        .particle {
          position: absolute;
          width: 3px; height: 3px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          animation: float 15s linear infinite;
        }
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
