import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import api from '../api';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const { data } = await api.post('/api/auth/register', form);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>🏗️ BuildWise</div>
        <h1>Start Planning Your Dream Home Today</h1>
        <p>Join 5,000+ happy Indian families who saved an average of ₹3.5 Lakhs using BuildWise's AI platform.</p>
        <div style={{ marginTop: 32, padding: 20, background: 'rgba(255,255,255,0.08)', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
            "BuildWise saved us over ₹4 Lakhs on our 2BHK construction in Bangalore. The estimate was accurate to within 3%."
            <div style={{ marginTop: 10, fontWeight: 700, color: '#fff' }}>— Ramesh K., HSR Layout</div>
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-box">
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--navy)', marginBottom: 4 }}>🏗️ BuildWise</div>
          <h2>Create your account</h2>
          <div className="auth-sub">Free to start. No credit card required.</div>
          {error && <div className="error-msg">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input id="name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="Dharani Kumar" />
            </div>
            <div className="row">
              <div className="form-group">
                <label>Email</label>
                <input id="reg-email" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required placeholder="you@example.com" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input id="phone" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 9876543210" />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input id="reg-password" type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required placeholder="Min 6 characters" />
            </div>
            <button id="btn-register" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 13 }} type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Free Account'}
            </button>
          </form>
          <div className="link-row">Already have an account? <Link to="/login">Sign in</Link></div>
        </div>
      </div>
    </div>
  );
}
