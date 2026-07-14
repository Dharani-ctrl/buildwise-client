import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', textAlign: 'center', padding: 32 }}>
      <div style={{ fontSize: 80, marginBottom: 16 }}>🏗️</div>
      <h1 style={{ fontSize: 80, fontWeight: 800, color: 'var(--navy)', marginBottom: 4 }}>404</h1>
      <p style={{ fontSize: 20, color: 'var(--muted)', marginBottom: 32 }}>This page is still under construction!</p>
      <Link to="/" className="btn btn-primary btn-lg">← Back to Home</Link>
    </div>
  );
}
