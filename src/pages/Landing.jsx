import { Link, useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Nav */}
      <nav className="pub-nav">
        <div className="brand">🏗️ BuildWise</div>
        <div className="pub-nav-links">
          <a href="#features">Solutions</a>
          <Link to="/pricing">Pricing</Link>
        </div>
        <div className="pub-nav-actions">
          <Link to="/login" className="btn btn-outline btn-sm" style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.3)' }}>Sign In</Link>
          <Link to="/register" className="btn btn-orange btn-sm">Start Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">✦ AI-Powered Construction Planning</div>
          <h1>Your Dream Home,<br /><span>Measured to Precision.</span></h1>
          <p>BuildWise bridges the gap between architectural complexity and domestic comfort. Get AI-driven cost estimates, 2D floor plans, and expert assistance tailored for Indian homeowners.</p>
          <div className="hero-btns">
            <button className="btn btn-orange btn-lg" onClick={() => navigate('/register')}>Start Free Estimator →</button>
            <button className="btn btn-outline btn-lg" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => navigate('/pricing')}>View Plans</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">5,000+</div><div className="lbl">Happy Homeowners</div></div>
            <div className="hero-stat"><div className="num">₹3.5L</div><div className="lbl">Avg. Savings</div></div>
            <div className="hero-stat"><div className="num">50+</div><div className="lbl">Indian Cities</div></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="section-tag">Precision Built For You</div>
        <h2 className="section-title">Everything You Need to Build Smart</h2>
        <p className="section-sub">Transparency is our foundation. We bring architect-level tools to your fingertips.</p>
        <div className="features-grid">
          {[
            { icon: '💰', title: 'Dynamic Cost Estimator', desc: 'Real-time localised material rates for cement, steel, and labour across 50+ Indian cities. Never overpay again.' },
            { icon: '🏠', title: 'Smart Floor Plans', desc: 'Generate Vastu-compliant 2D floor plans and extensive 3D walkthroughs in seconds.' },
            { icon: '🤖', title: 'BuildWise AI Assistant', desc: 'Our 24/7 assistant helps for legal compliances, material selection, and site management.' },
            { icon: '🛡️', title: 'Anti-Fraud Guard', desc: 'Verifying contractor quotes against a verified standard to protect your hard-earned savings.' },
          ].map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing preview */}
      <section className="pricing">
        <div className="section-tag" style={{ color: 'rgba(255,255,255,0.5)' }}>Flexible Planning</div>
        <h2 className="section-title">Choose the Right Plan</h2>
        <p className="section-sub">Start free, upgrade when you're ready.</p>
        <div className="pricing-grid">
          {[
            { name: 'Explorer', price: '₹0', desc: 'For initial budgeting only', features: ['Basic Cost Estimator', '1 Standard 2D Plan', '1 Free Elevation'], cta: 'Get Started', featured: false },
            { name: 'Planner', price: '₹4,999', desc: 'Perfect for new homeowners', features: ['Advanced AI Estimator', '3 Custom 3D Plans', 'Basic 2D Templates', 'Legal Checklists'], cta: 'Select Plan', featured: true },
            { name: 'Master', price: '₹14,999', desc: 'Full-coverage experience', features: ['Priority AI Assistance', 'Unlimited 3D Walkthrough', 'Contractor Vetting Service', 'Interior Design Consults'], cta: 'Get Master Plan', featured: false },
          ].map(p => (
            <div key={p.name} className={`pricing-card${p.featured ? ' featured' : ''}`}>
              {p.featured && <div className="popular-badge">MOST POPULAR</div>}
              <div className="plan-name">{p.name}</div>
              <div className="plan-price">{p.price}<span> /project</span></div>
              <div className="plan-desc" style={{ color: p.featured ? '#64748b' : undefined }}>{p.desc}</div>
              <ul className="plan-features">
                {p.features.map(f => <li key={f} className="plan-feature" style={{ color: p.featured ? '#1e293b' : undefined }}>{f}</li>)}
              </ul>
              <button className={`btn ${p.featured ? 'btn-primary' : 'btn-outline'} btn-lg`} style={{ width: '100%', justifyContent: 'center', color: p.featured ? undefined : '#fff', borderColor: p.featured ? undefined : 'rgba(255,255,255,0.2)' }} onClick={() => navigate('/register')}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Build Your Legacy?</h2>
        <p>Join 5,000+ happy Indian families who saved an average of ₹3.5 Lakhs using BuildWise.</p>
        <div className="cta-btns">
          <button className="btn btn-orange btn-lg" onClick={() => navigate('/register')}>Start Your Project Now</button>
          <button className="btn btn-outline btn-lg" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Book a Consultant</button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="brand">🏗️ BuildWise</div>
        <div className="links">
          <a href="#">Privacy Policy</a><a href="#">Terms of Service</a>
          <a href="#">Legal Disclaimer</a><a href="#">Support</a>
        </div>
      </footer>
    </div>
  );
}
