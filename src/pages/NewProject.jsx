import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import api from '../api';

const INDIAN_STATES = ['Andhra Pradesh','Karnataka','Kerala','Tamil Nadu','Telangana','Maharashtra','Gujarat','Rajasthan','Delhi','Uttar Pradesh','West Bengal','Punjab','Haryana','Madhya Pradesh','Bihar'];

export default function NewProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ length: '', width: '', unit: 'ft', city: '', state: '', bhkType: '2BHK', floors: 1 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const area = form.length && form.width ? Math.round(parseFloat(form.length) * parseFloat(form.width)) : null;
  const builtUp = area ? Math.round(area * 0.7) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.length || !form.width) return setError('Plot dimensions are required.');
    setLoading(true);
    try {
      const { data } = await api.post('/api/sites', {
        plotDimensions: { length: parseFloat(form.length), width: parseFloat(form.width), unit: form.unit },
        location: { city: form.city, state: form.state },
        bhkType: form.bhkType,
        floors: form.floors,
      });
      navigate(`/estimate/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Create New Project">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--navy)', marginBottom: 8 }}>Create New Project</h1>
        <p style={{ color: 'var(--muted)' }}>Tell us about your plot. Our AI uses this data to calculate the most efficient structural blueprints and material estimates.</p>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32, maxWidth: 600 }}>
        {['Site Details', 'Planning', 'Review'].map((s, i) => (
          <div key={s} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === 0 ? 'var(--orange)' : 'var(--border)', color: i === 0 ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{i + 1}</div>
                <span style={{ fontSize: 13, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? 'var(--orange)' : 'var(--muted)' }}>{s}</span>
              </div>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 2, background: 'var(--border)', margin: '0 8px', marginBottom: 16 }} />}
          </div>
        ))}
      </div>

      <div className="form-layout">
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {error && <div className="error-msg">{error}</div>}

          <div className="card" style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              📏 Plot Dimensions
            </h3>
            <div className="row">
              <div className="form-group">
                <label>Plot Length</label>
                <input id="plot-length" type="number" step="0.1" value={form.length} onChange={e => set('length', e.target.value)} placeholder="e.g. 40" required />
              </div>
              <div className="form-group">
                <label>Plot Width</label>
                <input id="plot-width" type="number" step="0.1" value={form.width} onChange={e => set('width', e.target.value)} placeholder="28'6&quot;" required />
              </div>
            </div>
            <div className="form-group">
              <label>Measurement Unit</label>
              <div className="toggle-group" style={{ maxWidth: 300 }}>
                {['ft', 'm', 'yards'].map(u => (
                  <button key={u} type="button" className={`toggle-btn${form.unit === u ? ' active' : ''}`} onClick={() => set('unit', u)}>
                    {u === 'ft' ? 'Feet' : u === 'm' ? 'Meters' : 'Yards'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              📍 Project Scope
            </h3>
            <div className="row">
              <div className="form-group">
                <label>City</label>
                <input id="city" value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Bangalore" />
              </div>
              <div className="form-group">
                <label>State</label>
                <select id="state" value={form.state} onChange={e => set('state', e.target.value)}>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>BHK Type</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['2BHK', '3BHK', '4BHK+'].map(t => (
                  <button key={t} type="button" className={`btn btn-sm ${form.bhkType === t ? 'btn-orange' : 'btn-outline'}`} onClick={() => set('bhkType', t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Number of Floors</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => set('floors', Math.max(1, form.floors - 1))}>−</button>
                <span style={{ fontSize: 16, fontWeight: 700, minWidth: 60, textAlign: 'center' }}>G+{form.floors - 1}</span>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => set('floors', form.floors + 1)}>+</button>
              </div>
            </div>
            <div className="form-group">
              <label>Upload Existing Plan (Optional)</label>
              <div style={{ border: '2px dashed var(--border)', borderRadius: 8, padding: '32px 20px', textAlign: 'center', color: 'var(--muted)', cursor: 'pointer' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
                <div style={{ fontSize: 14 }}>Drop your PDF or DWG file here or <span style={{ color: 'var(--blue)', fontWeight: 600 }}>browse</span></div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
            <button type="button" className="btn btn-outline" onClick={() => window.history.back()}>← Back</button>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? 'Creating...' : 'Continue to Planning →'}
            </button>
          </div>
        </form>

        {/* Live preview sidebar */}
        <div className="plot-preview">
          <div className="live-badge"><span className="live-dot" />LIVE PREVIEW</div>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>Dimensions updated based on your input.</p>
          <div className="plot-box-wrap">
            {area ? (
              <div className="plot-box" style={{ width: 120, height: Math.round(120 * (parseFloat(form.length) / parseFloat(form.width))), maxHeight: 160, minHeight: 80, position: 'relative' }}>
                <span style={{ position: 'absolute', top: -20, right: 0, fontSize: 11, fontWeight: 600 }}>{form.width}"{form.unit}</span>
                <span style={{ position: 'absolute', left: -36, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: 11, fontWeight: 600 }}>{form.length}"{form.unit}</span>
                <div className="plot-box-area">{area} sqft</div>
                <div className="plot-box-label">Plot Area</div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>Enter dimensions to preview</div>
            )}
          </div>
          {builtUp && (
            <div style={{ background: 'var(--bg)', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Estimated Built-Up Area</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)' }}>{builtUp} sqft</div>
            </div>
          )}
          <div style={{ background: '#FEF8F0', border: '1px solid #FDDBB5', borderRadius: 8, padding: 16, marginTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange)', marginBottom: 6 }}>💡 Expert Tip</div>
            <p style={{ fontSize: 13, color: '#7C4A1A', lineHeight: 1.5 }}>In most Indian urban centers, G+1 construction for a 3BHK on a 30×40 plot offers the best balance between garden space and natural ventilation.</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
