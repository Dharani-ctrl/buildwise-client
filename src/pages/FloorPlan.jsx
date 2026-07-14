import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

const PLANS = [
  { id: 'urban-compact', badge: '2BHK', name: 'Urban Compact', desc: 'Modern efficient layout', area: 1080, rooms: { 'Master': "12×14'", 'Living': "16×18'", 'Kitchen': "8×10'", 'Utility': "4×8'" }, icon: '🏠' },
  { id: 'skyline-premier', badge: '3BHK', name: 'Skyline Premier', desc: 'Maximum utility design', area: 1150, rooms: { 'Master': "14×14'", 'Living': "18×20'", 'Study': "8×10'", 'Puja': "5×6'" }, icon: '🏡' },
  { id: 'open-concept', badge: '2BHK', name: 'Open Concept', desc: 'Spacious airy living', area: 1020, rooms: { 'Master': "13×13'", 'Living': "20×15'", 'Dining': "10×12'", 'Veranda': "6×12'" }, icon: '🏘️' },
];

export default function FloorPlan() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = PLANS.filter(p => filter === 'all' || p.badge === filter);

  return (
    <AppLayout title="Floor Plan — Preset Library">
      <div className="page-heading-row">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FEF3ED', color: 'var(--orange)', padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700, marginBottom: 10 }}>
            📏 Plot: 28'6" × 40' (1,200 sqft)
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--navy)', marginBottom: 6 }}>Preset Library</h1>
          <p style={{ color: 'var(--muted)', maxWidth: 540 }}>Precision-engineered layouts scaled to your specific plot. Select a foundation to begin your AI-assisted customisation.</p>
        </div>
        <div className="filter-actions">
          {['All Plans', '2BHK', '3BHK'].map((f, i) => {
            const val = i === 0 ? 'all' : f;
            return (
              <button key={f} className={`btn btn-sm ${filter === val ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter(val)}>{f}</button>
            );
          })}
        </div>
      </div>

      <div className="plan-grid">
        {filtered.map(plan => (
          <div key={plan.id} className="plan-card" onClick={() => setSelected(plan)} style={{ border: selected?.id === plan.id ? '2px solid var(--navy)' : undefined }}>
            <div className="plan-card-img">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 64 }}>{plan.icon}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Your Floor Plan Layout</div>
              </div>
              <span className="badge badge-orange" style={{ position: 'absolute', top: 12, left: 12 }}>{plan.badge}</span>
            </div>
            <div className="plan-card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <div>
                  <div className="plan-card-title">{plan.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>{plan.desc}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="plan-card-area">{plan.area}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>SQ FT AREA</div>
                </div>
              </div>
              <div className="plan-rooms">
                {Object.entries(plan.rooms).map(([room, size]) => (
                  <div key={room} className="plan-room">🛏️ {room}: {size}</div>
                ))}
              </div>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', color: 'var(--orange)', borderColor: 'var(--orange)' }}>
                {selected?.id === plan.id ? '✓ Selected' : 'Select and Preview'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bottom-cta">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, background: 'var(--navy)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>✦</div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 2 }}>Don't see exactly what you need?</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Our AI can generate a custom layout based on your specific Vastu or lifestyle requirements.</div>
          </div>
        </div>
        <button className="btn btn-primary">Generate Custom Plan</button>
      </div>

      {selected && (
        <div className="selection-toast">
          <div>
            <div style={{ fontWeight: 700 }}>Selected: {selected.name}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{selected.area} sqft · {selected.badge}</div>
          </div>
          <button className="btn btn-orange" onClick={() => navigate(`/summary/${siteId}`)}>Continue →</button>
        </div>
      )}
    </AppLayout>
  );
}
