import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import api from '../api';
import { calculateEstimate, getRateForTier, RATE_PER_SQFT } from '../../../shared/costCalculator.js';

const TIERS = [
  { key: 'basic', label: 'Basic', desc: 'Essential finishes, functional quality' },
  { key: 'standard', label: 'Standard', desc: 'Quality mid-range, popular choice' },
  { key: 'premium', label: 'Premium', desc: 'Luxury finishes, top-tier quality' },
];

const LABELS = { structure: 'Structure & Civil', finishing: 'Finishing & Painting', plumbing: 'Plumbing', electrical: 'Electrical', flooring: 'Flooring' };
const fmt = n => '₹' + Math.round(n).toLocaleString('en-IN');

export default function Estimate() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [site, setSite] = useState(null);
  const [tier, setTier] = useState('standard');
  const [totalArea, setTotalArea] = useState('');
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get(`/api/sites/${siteId}`).then(r => {
      setSite(r.data);
      const area = Math.round(r.data.plotDimensions.length * r.data.plotDimensions.width * r.data.floors * 0.7);
      setTotalArea(area.toString());
    }).catch(() => setError('Could not load site'));
  }, [siteId]);

  useEffect(() => {
    const area = parseFloat(totalArea);
    if (!isNaN(area) && area > 0) {
      setPreview(calculateEstimate({ totalArea: area, ratePerSqft: getRateForTier(tier) }));
    }
  }, [tier, totalArea]);

  const handleSave = async () => {
    setSaving(true); setError('');
    try {
      await api.post('/api/estimates', { siteId, qualityTier: tier, totalArea: parseFloat(totalArea) });
      navigate(`/summary/${siteId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save');
    } finally { setSaving(false); }
  };

  if (!site) return <AppLayout title="Cost Estimator"><div className="card" style={{ textAlign: 'center', padding: 48 }}>{error || 'Loading...'}</div></AppLayout>;

  return (
    <AppLayout title="Cost Estimator">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--navy)', marginBottom: 4 }}>Get Your Estimate</h1>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>
          {site.bhkType} · {site.floors} floor(s) · {site.plotDimensions.width}×{site.plotDimensions.length} {site.plotDimensions.unit} · {site.location?.city}
        </p>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
        {/* Left */}
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ fontSize: 15 }}>Total Built-Up Area (sqft)</label>
              <input id="total-area" type="number" value={totalArea} onChange={e => setTotalArea(e.target.value)} placeholder="e.g. 1080" style={{ fontSize: 20, fontWeight: 700 }} />
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                Test case: 28'6" width, single storey, 2BHK ≈ 1,080 sqft
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Select Quality Tier</h3>
            <div className="tier-grid">
              {TIERS.map(t => (
                <div key={t.key} id={`tier-${t.key}`} className={`tier-card${tier === t.key ? ' selected' : ''}`} onClick={() => setTier(t.key)}>
                  <div className="badge badge-navy" style={{ marginBottom: 10 }}>{t.label}</div>
                  <div className="tier-rate">{fmt(RATE_PER_SQFT[t.key])}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>per sqft</div>
                  <div className="tier-desc" style={{ marginTop: 8 }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {preview && (
            <div className="card">
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Cost Breakdown</h3>
              {Object.entries(preview.breakdown).map(([key, val]) => {
                const pct = Math.round((val / preview.totalCost) * 100);
                return (
                  <div key={key} className="breakdown-bar-item">
                    <div className="breakdown-bar-row">
                      <span style={{ color: 'var(--text)' }}>{LABELS[key] || key}</span>
                      <span style={{ color: 'var(--navy)' }}>{fmt(val)} <span style={{ fontWeight: 400, color: 'var(--muted)' }}>({pct}%)</span></span>
                    </div>
                    <div className="bar-bg" style={{ background: 'var(--border)' }}>
                      <div className="bar-fill" style={{ width: `${pct}%`, background: 'var(--navy)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: live cost preview */}
        <div style={{ position: 'sticky', top: 88 }}>
          {preview ? (
            <div className="cost-preview">
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Live Estimate Preview</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>{TIERS.find(t => t.key === tier)?.label} Quality · {totalArea} sqft</div>
              <div className="cost-total">{fmt(preview.totalCost)}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
                {fmt(getRateForTier(tier))}/sqft × {totalArea} sqft
              </div>
              {Object.entries(preview.breakdown).map(([key, val]) => {
                const pct = Math.round((val / preview.totalCost) * 100);
                return (
                  <div key={key} className="breakdown-bar-item">
                    <div className="breakdown-bar-row" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      <span>{LABELS[key]}</span>
                      <span style={{ color: '#fff' }}>{fmt(val)}</span>
                    </div>
                    <div className="bar-bg">
                      <div className="bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: 32, color: 'var(--muted)' }}>
              Enter area and select a tier to see the estimate.
            </div>
          )}

          <button id="btn-save-estimate" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16, padding: '14px' }} onClick={handleSave} disabled={saving || !totalArea}>
            {saving ? 'Saving...' : 'Save Estimate & Continue →'}
          </button>
          <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }} onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
