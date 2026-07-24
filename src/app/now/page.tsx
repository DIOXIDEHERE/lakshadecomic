import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";

export default function Now() {
  return (
    <div className="container theme-thoughtful" style={{ minHeight: "100vh", paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}>
      <main style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-xl)" }}>
          <TextReveal text="Current Mission." />
        </h1>
        <FadeIn delay={0.5}>
          <p style={{ fontSize: "var(--text-lg)" }}>
            What I'm actively building, learning, and pursuing right now. (Coming Soon)
          </p>
        </FadeIn>
      </main>
    </div>
  );
}
