import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

const LABELS = {
  structure: 'Structure & Civil',
  finishing: 'Finishing & Painting',
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  flooring: 'Flooring',
};

export default function Results() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/api/estimates/${siteId}`)
      .then(r => setEstimates(r.data))
      .catch(() => setError('Could not load estimates'))
      .finally(() => setLoading(false));
  }, [siteId]);

  if (loading) return <div className="page"><div className="card">Loading...</div></div>;
  if (error) return <div className="page"><div className="card error-msg">{error}</div></div>;
  if (!estimates.length) return <div className="page"><div className="card">No estimates found.</div></div>;

  const est = estimates[0]; // Latest estimate

  return (
    <div className="page">
      <div className="card card-wide">
        <div className="nav-row">
          <div className="logo" style={{ margin: 0, fontSize: 20 }}>🏗️ BuildWise</div>
          <button onClick={() => navigate('/')}>New Project</button>
        </div>
        <h2>Cost Breakdown</h2>
        <div className="badge">{est.qualityTier.charAt(0).toUpperCase() + est.qualityTier.slice(1)} Tier · {est.totalArea} sqft</div>
        <div className="total-cost">{fmt(est.totalCost)}</div>
        <ul className="breakdown-list">
          {Object.entries(est.breakdown).map(([key, val]) => {
            const pct = Math.round((val / est.totalCost) * 100);
            return (
              <li key={key} style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{LABELS[key] || key}</span>
                  <span>{fmt(val)} <span style={{ color: 'var(--muted)', fontWeight: 400 }}>({pct}%)</span></span>
                </div>
                <div className="bar-wrap">
                  <div className="bar-bg">
                    <div className="bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          <button className="btn btn-outline" onClick={() => navigate(`/estimate/${siteId}`)}>Recalculate</button>
          <button className="btn" onClick={() => navigate('/')}>New Project</button>
        </div>
      </div>
    </div>
  );
}
