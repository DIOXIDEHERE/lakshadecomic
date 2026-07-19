import Link from "next/link";

export default function Home() {
  return (
    <div className="container animate-fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center" }}>
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem", lineHeight: 1.1 }}>
        Hi, I'm <span style={{ color: "var(--color-primary)" }}>Lak Shade</span>
      </h1>
      
      <p style={{ fontSize: "1.5rem", color: "var(--color-text-muted)", maxWidth: "800px", margin: "0 auto 3rem auto", lineHeight: 1.6 }}>
        Ye website mummy ko mat dikhana. <br/>
        Main sirf mic pakadta hoon... baaki jo hota hai bhagwan bharose.
      </p>

      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
        <a 
          href="https://www.instagram.com/lak.shade/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          Follow on Instagram
        </a>
        
        <a 
          href="https://www.youtube.com/@lakshade718" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-outline"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}
