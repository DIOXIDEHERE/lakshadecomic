import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";

export default function Gallery() {
  return (
    <div className="container" style={{ minHeight: "100vh", paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}>
      <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-xl)" }}>
          <TextReveal text="Gallery." />
        </h1>
        <FadeIn delay={0.5}>
          <p style={{ fontSize: "var(--text-lg)" }}>
            Editorial photography. (Coming Soon)
          </p>
        </FadeIn>
      </main>
    </div>
  );
}
