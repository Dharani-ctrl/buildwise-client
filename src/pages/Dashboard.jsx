import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import api from '../api';

const STEPS = ['Plot Details', 'Estimation', 'Architecture', 'Legal Check', 'Execution'];

export default function Dashboard() {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/sites').then(r => setSites(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const readiness = 2; // demo: 2 steps complete

  return (
    <AppLayout title="Dashboard">
      <div className="dashboard-layout">
        {/* Left */}
        <div>
          <div className="page-heading-row">
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800 }}>My Projects</h2>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>Manage your home construction journey and site details.</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/new-project')}>+ New Project</button>
          </div>

          {loading ? (
            <div className="card" style={{ textAlign: 'center', padding: 48, color: 'var(--muted)' }}>Loading projects...</div>
          ) : sites.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 64 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🏗️</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No Projects Yet</h3>
              <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Create your first construction project to get started.</p>
              <button className="btn btn-primary" onClick={() => navigate('/new-project')}>+ Create Project</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 20 }}>
              {sites.map(site => (
                <div key={site._id} className="project-card">
                  <div className="project-card-img">
                    <span>🏗️</span>
                    <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 8 }}>
                      <span className="badge badge-orange">PLAN DONE</span>
                      <span className="badge badge-green">ESTIMATE</span>
                    </div>
                  </div>
                  <div className="project-card-body">
                    <div className="project-card-title">Project: {site.plotDimensions.width}'×{site.plotDimensions.length}' Plot</div>
                    <div className="project-card-meta">📍 {site.location?.city || 'Unknown'}, {site.location?.state || ''}</div>
                    <div className="project-stats">
                      <div><div className="project-stat-label">Plot Size</div><div className="project-stat-val">{site.plotDimensions.width}' × {site.plotDimensions.length}'</div></div>
                      <div><div className="project-stat-label">Built-Up Area</div><div className="project-stat-val">~{Math.round(site.plotDimensions.length * site.plotDimensions.width * 0.7)} sqft</div></div>
                      <div><div className="project-stat-label">Floors</div><div className="project-stat-val">G+{site.floors - 1}</div></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline btn-sm" onClick={() => navigate(`/estimate/${site._id}`)}>View Full Project →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Construction Readiness */}
          <div className="readiness">
            <h3>Overall Construction Readiness</h3>
            <div className="steps">
              {STEPS.map((step, i) => (
                <>
                  <div className="step" key={step}>
                    <div className={`step-dot ${i < readiness ? 'done' : 'pending'}`}>{i < readiness ? '✓' : i + 1}</div>
                    <div className="step-label">{step}</div>
                  </div>
                  {i < STEPS.length - 1 && <div className={`step-line ${i < readiness - 1 ? 'done' : ''}`} />}
                </>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="dashboard-side">
          <div className="ai-card">
            <h4>✦ AI Insights</h4>
            <p>Based on your pilot plot, material prices in Bangalore have increased by 4.2% this week. Shall we update your estimate?</p>
            <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Update Costing</button>
          </div>
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent Projects</div>
            {sites.slice(0, 3).map(site => (
              <div key={site._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => navigate(`/estimate/${site._id}`)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>🏗️</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{site.bhkType} — {site.location?.city || 'Unknown'}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>Status: <span style={{ color: 'var(--orange)' }}>Planning</span></div>
                  </div>
                </div>
                <span style={{ color: 'var(--muted)' }}>›</span>
              </div>
            ))}
            {sites.length === 0 && <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13, padding: '16px 0' }}>No recent projects</div>}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
