import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import { getCMSData } from "@/lib/cms";

export const revalidate = 0;

export default async function Story() {
  const data = await getCMSData("story", {
    title: "The Story.",
    content: "An interactive cinematic timeline of my journey. (Coming Soon)"
  });

  return (
    <div className="container theme-story" style={{ minHeight: "100vh", paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}>
      <main style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-xl)" }}>
          <TextReveal text={data?.title || "The Story."} />
        </h1>
        <FadeIn delay={0.5}>
          <p style={{ fontSize: "var(--text-lg)", whiteSpace: "pre-wrap" }}>
            {data?.content || "An interactive cinematic timeline of my journey. (Coming Soon)"}
          </p>
        </FadeIn>
      </main>
    </div>
  );
}
