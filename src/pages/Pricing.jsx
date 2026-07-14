import { Link } from 'react-router-dom';

export default function Pricing() {
  const PLANS = [
    { name: 'Explorer', price: '₹0', period: 'Forever free', features: ['Basic Cost Estimator', '1 Standard 2D Plan', '1 Free Elevation Style', '10 Contractor Watchlist'], cta: 'Get Started Free', featured: false },
    { name: 'Planner', price: '₹4,999', period: 'per project', features: ['Advanced AI Estimator', '3 Custom 3D Plans', 'Basic 2D Templates', 'Legal Checklists', 'PDF Export'], cta: 'Select Planner', featured: true },
    { name: 'Master', price: '₹14,999', period: 'per project', features: ['Priority AI Assistance', 'Unlimited 3D Walkthrough', 'Contractor Vetting Service', 'Interior Design Consults', 'Legal Disclaimer Docs', 'Dedicated Support'], cta: 'Get Master Plan', featured: false },
  ];

  return (
    <div>
      <nav className="pub-nav">
        <div className="brand">🏗️ BuildWise</div>
        <div className="pub-nav-links"><Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link></div>
        <div className="pub-nav-actions">
          <Link to="/login" className="btn btn-outline btn-sm" style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.3)' }}>Sign In</Link>
          <Link to="/register" className="btn btn-orange btn-sm">Start Free</Link>
        </div>
      </nav>

      <div style={{ paddingTop: 80 }}>
        <section className="pricing" style={{ paddingTop: 80 }}>
          <div className="section-tag" style={{ color: 'rgba(255,255,255,0.5)' }}>Flexible Planning for Every Budget</div>
          <h2 className="section-title">Choose the plan that matches your building phase.</h2>
          <p className="section-sub">Start for free, upgrade only when you need more.</p>
          <div className="pricing-grid" style={{ maxWidth: 960 }}>
            {PLANS.map(p => (
              <div key={p.name} className={`pricing-card${p.featured ? ' featured' : ''}`}>
                {p.featured && <div className="popular-badge">MOST POPULAR</div>}
                <div className="plan-name">{p.name}</div>
                <div className="plan-price">{p.price} <span>/ {p.period}</span></div>
                <ul className="plan-features" style={{ marginBottom: 28 }}>
                  {p.features.map(f => <li key={f} className="plan-feature" style={{ color: p.featured ? '#1e293b' : undefined }}>{f}</li>)}
                </ul>
                <Link to="/register" className={`btn ${p.featured ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center', color: p.featured ? undefined : '#fff', borderColor: p.featured ? undefined : 'rgba(255,255,255,0.2)' }}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>
        <footer>
          <div className="brand">🏗️ BuildWise</div>
          <div className="links">
            <a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Support</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
