import TextReveal from "@/components/animations/TextReveal";
import GalleryClient from "@/components/GalleryClient";
import { getCMSData } from "@/lib/cms";

export const revalidate = 0;

export default async function Gallery() {
  const data = await getCMSData("gallery", { images: ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"] });
  const images = data?.images || [];

  return (
    <div className="container" style={{ minHeight: "100vh", paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}>
      <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <h1 style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-xl)", textAlign: "center" }}>
          <TextReveal text="Gallery." />
        </h1>

        <GalleryClient images={images} />

      </main>
    </div>
  );
}
