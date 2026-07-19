import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lak Shade | Stand-Up Comic",
  description: "Official website of Lak Shade, an ambitious stand-up comic learning to grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <nav style={{ padding: "1.5rem 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/" style={{ fontSize: "1.5rem", fontWeight: "bold", letterSpacing: "-0.05em" }}>
              <span style={{ color: "var(--color-primary)" }}>Lak</span> Shade
            </Link>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              <Link href="/" className="btn-outline" style={{ padding: "0.5rem 1rem", border: "none" }}>Home</Link>
              <Link href="/shows" className="btn-outline" style={{ padding: "0.5rem 1rem", border: "none" }}>Upcoming Shows</Link>
            </div>
          </div>
        </nav>
        <main style={{ minHeight: "calc(100vh - 160px)", padding: "4rem 0" }}>
          {children}
        </main>
        <footer style={{ padding: "2rem 0", borderTop: "1px solid var(--color-border)", textAlign: "center", color: "var(--color-text-muted)" }}>
          <p>© {new Date().getFullYear()} Lak Shade. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
