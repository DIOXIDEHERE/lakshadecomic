import Link from "next/link";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";

export default function Home() {
  return (
    <div className="container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
      
      {/* Cinematic ambient background */}
      <div className="bg-gradient-subtle" />

      <main style={{ maxWidth: "800px" }}>
        
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

        <h1 style={{ fontSize: "var(--text-display)", marginBottom: "var(--space-lg)", marginLeft: "-0.05em" }}>
          <TextReveal text="Not a success story." delay={0.4} />
          <br />
          <TextReveal text="Just a story." delay={1.2} />
        </h1>

        <FadeIn delay={2.5} duration={1.5} yOffset={20}>
          <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
            <Link href="/story" className="link-editorial" style={{ fontSize: "var(--text-base)" }}>
              Begin Chapter 1
            </Link>
            <span style={{ color: "var(--color-border)" }}>—</span>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
              Comedy, code, and the spaces between.
            </span>
          </div>
        </FadeIn>

      </main>

      <FadeIn delay={3.5} duration={2}>
        <div style={{ 
          position: "absolute", 
          bottom: "var(--space-md)", 
          left: "var(--space-md)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-muted)",
          letterSpacing: "0.05em"
        }}>
          Lak Shade © {new Date().getFullYear()}
        </div>
      </FadeIn>

    </div>
  );
}
