export default function Footer() {
  return (
    <footer style={{
      padding: "var(--space-2xl) 0 var(--space-xl)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-md)",
      borderTop: "1px solid var(--color-border)",
      marginTop: "auto"
    }}>
      <div style={{ display: "flex", gap: "var(--space-md)", fontSize: "var(--text-xs)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        <a href="https://instagram.com/lakshadecomic" target="_blank" className="link-editorial">Instagram</a>
        <a href="https://youtube.com/@lakshadecomic" target="_blank" className="link-editorial">YouTube</a>
        <a href="mailto:hello@lakshade.com" className="link-editorial">Email</a>
      </div>
      
      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontFamily: "var(--font-playfair)", fontStyle: "italic", letterSpacing: "0.05em" }}>
        Made with patience. © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
