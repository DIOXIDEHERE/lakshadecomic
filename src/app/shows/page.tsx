import TextReveal from "@/components/animations/TextReveal";
import ShowsList from "@/components/ShowsList";
import { getCMSData } from "@/lib/cms";

export const revalidate = 0;

export default async function Shows() {
  // Fetch from CMS, default to empty array if not set
  let shows = await getCMSData("shows", { shows: [] });
  // If the data structure returns { shows: [...] } extract it
  if (shows && !Array.isArray(shows) && Array.isArray(shows.shows)) {
    shows = shows.shows;
  }
  if (!Array.isArray(shows)) shows = [];

  return (
    <div className="container" style={{ minHeight: "100vh", paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}>
      <main style={{ maxWidth: "600px", margin: "0 auto" }}>
        
        <h1 style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-xl)", textAlign: "center" }}>
          <TextReveal text="Shows." />
        </h1>

        <ShowsList shows={shows} />

      </main>
    </div>
  );
}
