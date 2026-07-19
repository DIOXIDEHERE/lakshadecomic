import { Redis } from '@upstash/redis';

async function getShows() {
  try {
    const redis = Redis.fromEnv();
    const shows = await redis.get('shows');
    return Array.isArray(shows) ? shows : [];
  } catch (e) {
    console.error("Failed to fetch shows from Redis:", e);
    return [];
  }
}

function formatUrl(url: string) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}

export default async function Shows() {
  const shows = await getShows();

  return (
    <div className="container animate-fade-in" style={{ maxWidth: "800px" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem", textAlign: "center" }}>Upcoming Shows</h1>
      
      {shows.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
          <p>No upcoming shows at the moment. Stay tuned!</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {shows.map((show: any) => (
            <div key={show.id} className="glass-panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{show.title}</h2>
                <div style={{ color: "var(--color-text-muted)", display: "flex", gap: "1rem" }}>
                  <span>📅 {show.date}</span>
                  <span>📍 {show.location}</span>
                </div>
              </div>
              
              {show.ticketLink && (
                <a href={formatUrl(show.ticketLink)} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
                  Get Tickets
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
