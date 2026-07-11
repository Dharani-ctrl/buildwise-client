import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { calculateEstimate, getRateForTier, RATE_PER_SQFT } from '../../../shared/costCalculator.js';

const TIERS = [
  { key: 'basic', label: 'Basic', desc: 'Essential finishes' },
  { key: 'standard', label: 'Standard', desc: 'Quality mid-range' },
  { key: 'premium', label: 'Premium', desc: 'Luxury finishes' },
];

const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

export default function EstimatePage() {
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
      // Default total area from plot (length × width × floors as a starting point)
      const area = r.data.plotDimensions.length * r.data.plotDimensions.width * r.data.floors;
      setTotalArea(Math.round(area * 0.7).toString()); // ~70% as built-up area
    }).catch(() => setError('Could not load site'));
  }, [siteId]);

  // Live preview using shared logic
  useEffect(() => {
    const area = parseFloat(totalArea);
    if (!isNaN(area) && area > 0) {
      const rate = getRateForTier(tier);
      setPreview(calculateEstimate({ totalArea: area, ratePerSqft: rate }));
    }
  }, [tier, totalArea]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await api.post('/api/estimates', {
        siteId,
        qualityTier: tier,
        totalArea: parseFloat(totalArea),
      });
      navigate(`/results/${siteId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save estimate');
    } finally {
      setSaving(false);
    }
  };

  if (!site) return <div className="page"><div className="card">{error || 'Loading...'}</div></div>;

  return (
    <div className="page">
      <div className="card card-wide">
        <div className="nav-row">
          <div className="logo" style={{ margin: 0, fontSize: 20 }}>🏗️ BuildWise</div>
          <button onClick={() => navigate('/')}>← New Project</button>
        </div>
        <h2>Get Your Estimate</h2>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
          {site.bhkType} · {site.floors} floor(s) · {site.plotDimensions.length}×{site.plotDimensions.width} {site.plotDimensions.unit} · {site.location?.city}
        </p>

        <div className="form-group">
          <label>Total Built-Up Area (sqft)</label>
          <input id="total-area" type="number" value={totalArea} onChange={e => setTotalArea(e.target.value)} placeholder="e.g. 1080" />
        </div>

        <label style={{ marginBottom: 10, display: 'block' }}>Select Quality Tier</label>
        <div className="tier-grid">
          {TIERS.map(t => (
            <div key={t.key} id={`tier-${t.key}`} className={`tier-card${tier === t.key ? ' selected' : ''}`} onClick={() => setTier(t.key)}>
              <h3>{t.label}</h3>
              <div className="rate">{fmt(RATE_PER_SQFT[t.key])}/sqft</div>
              <div className="rate" style={{ marginTop: 4 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        {preview && (
          <div style={{ background: '#f8fafc', borderRadius: 10, padding: '20px 24px', marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>Live Preview</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--primary)' }}>{fmt(preview.totalCost)}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
              {fmt(getRateForTier(tier))}/sqft × {totalArea} sqft
            </div>
          </div>
        )}

        {error && <div className="error-msg">{error}</div>}
        <button id="btn-save-estimate" className="btn" onClick={handleSave} disabled={saving || !totalArea}>
          {saving ? 'Saving...' : 'Save & View Full Results →'}
        </button>
      </div>
    </div>
  );
}
