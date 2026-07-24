import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";

export default function NotFound() {
  return (
    <div className="container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <h1 style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-md)" }}>
        <TextReveal text="404" />
      </h1>
      
      <FadeIn delay={0.5}>
        <p style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-xl)", color: "var(--color-text-muted)" }}>
          You laughed so hard you got lost.
        </p>
      </FadeIn>

      <FadeIn delay={1}>
        <Link href="/" className="btn-editorial">
          Take me back
        </Link>
      </FadeIn>
    </div>
  );
}
