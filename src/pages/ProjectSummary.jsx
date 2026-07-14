import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import api from '../api';

const fmt = n => '₹' + Math.round(n).toLocaleString('en-IN');
const LABELS = { structure: 'Structure & Civil', finishing: 'Finishing & Painting', plumbing: 'Plumbing', electrical: 'Electrical', flooring: 'Flooring' };
const PHASES = [
  { label: 'Phase 1: Planning', status: 'Complete', date: 'Oct 2024', done: true },
  { label: 'Phase 2: Approvals', status: 'In Progress', date: 'Est. Nov 2024', done: false },
  { label: 'Phase 3: Excavation', status: 'Upcoming', date: 'Jan 2025', done: false },
];

export default function ProjectSummary() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [site, setSite] = useState(null);
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(`/api/sites/${siteId}`),
      api.get(`/api/estimates/${siteId}`),
    ]).then(([sr, er]) => {
      setSite(sr.data);
      setEstimates(er.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [siteId]);

  if (loading) return <AppLayout title="Project Summary"><div className="card" style={{ textAlign: 'center', padding: 48 }}>Loading...</div></AppLayout>;

  const est = estimates[0];

  return (
    <AppLayout title="Project Summary">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--navy)', marginBottom: 4 }}>Project Alpha Summary</h1>
          <p style={{ color: 'var(--muted)' }}>Comprehensive technical overview and construction forecast.</p>
        </div>
        <button className="btn btn-primary" style={{ gap: 8 }}>
          📄 Export PDF
        </button>
      </div>

      {/* Top 3-col summary */}
      <div className="summary-grid">
        {/* Site specs */}
        <div className="summary-card">
          <h4>Site Specifications <span>📍</span></h4>
          {site && <>
            <div className="summary-detail-row"><span>Location</span><span className="val">{site.location?.city || '—'}, {site.location?.state?.slice(0, 2).toUpperCase() || ''}</span></div>
            <div className="summary-detail-row"><span>Plot Area</span><span className="val">{Math.round(site.plotDimensions.length * site.plotDimensions.width)} sq ft</span></div>
            <div className="summary-detail-row"><span>BHK Type</span><span className="val">{site.bhkType}</span></div>
            <div className="summary-detail-row"><span>Floors</span><span className="val">G+{site.floors - 1}</span></div>
          </>}
          <div style={{ background: '#f8fafc', borderRadius: 8, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 16, color: 'var(--muted)', fontSize: 13 }}>
            🗺️ SATELLITE VIEW
          </div>
        </div>

        {/* Floor plan */}
        <div className="summary-card">
          <h4>Ground Floor Plan <span>📐</span></h4>
          <div style={{ background: '#f8fafc', borderRadius: 8, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, marginBottom: 12 }}>🏠</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-blue">{site?.bhkType}</span>
            <span className="badge badge-green">VASTU COMPLIANT</span>
          </div>
          <button className="btn btn-outline btn-sm" style={{ marginTop: 12 }} onClick={() => navigate(`/floor-plan/${siteId}`)}>Change Layout</button>
        </div>

        {/* Elevation */}
        <div className="summary-card">
          <h4>Front Elevation <span>🏡</span></h4>
          <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #2d5a8e)', borderRadius: 8, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, marginBottom: 12, position: 'relative', overflow: 'hidden' }}>
            🏗️
            <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.5)', color: '#fff', padding: '3px 8px', borderRadius: 4, fontSize: 11 }}>AI Rendered Preview</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-navy">MODERN TROPICAL</span>
            <span className="badge badge-blue">G+1 STRUCTURE</span>
          </div>
        </div>
      </div>

      {/* Bottom 2-col: roadmap + budget */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Roadmap */}
        <div className="summary-card">
          <h4>Project Roadmap <span>📈</span></h4>
          {PHASES.map((ph, i) => (
            <div key={ph.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: i < PHASES.length - 1 ? 20 : 0, borderLeft: i < PHASES.length - 1 ? '2px solid var(--border)' : undefined, marginLeft: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: ph.done ? 'var(--orange)' : i === 1 ? 'var(--navy)' : 'var(--border)', marginLeft: -8, marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--navy)' }}>{ph.label}</div>
                <div style={{ fontSize: 12, color: ph.done ? '#059669' : i === 1 ? 'var(--blue)' : 'var(--muted)' }}>{ph.status} • {ph.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Budget */}
        {est ? (
          <div className="budget-card">
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>💰 Estimated Budget</div>
            <div className="budget-total">{fmt(est.totalCost)}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>± 5% Market Variance</div>
            <div className="budget-sub">
              <div className="budget-sub-item">
                <h5>🏗️ Material Cost</h5>
                <span>{fmt(est.breakdown.structure + est.breakdown.flooring)}</span>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 99, marginTop: 6 }}><div style={{ width: '62%', height: '100%', background: 'var(--orange)', borderRadius: 99 }} /></div>
              </div>
              <div className="budget-sub-item">
                <h5>👷 Labor & Mgmt</h5>
                <span>{fmt(est.breakdown.plumbing + est.breakdown.electrical + est.breakdown.finishing)}</span>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 99, marginTop: 6 }}><div style={{ width: '38%', height: '100%', background: 'var(--blue)', borderRadius: 99 }} /></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: 48 }}>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>No estimate saved yet.</p>
            <button className="btn btn-primary" onClick={() => navigate(`/estimate/${siteId}`)}>Get Estimate</button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <button className="btn btn-outline" onClick={() => navigate(`/estimate/${siteId}`)}>Recalculate Estimate</button>
        <button className="btn btn-outline" onClick={() => navigate(`/floor-plan/${siteId}`)}>Change Floor Plan</button>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>← Dashboard</button>
      </div>
    </AppLayout>
  );
}
