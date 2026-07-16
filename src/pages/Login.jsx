import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import api from '../api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
// Handle Submit Logic recreated and Updated
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', form);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };



  return (
    <div className="auth-page">
      <div className="auth-left">
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>🏗️ BuildWise</div>
        <h1>Build Your Dream Home With Confidence</h1>
        <p>AI-powered construction planning for Indian homeowners. Cost estimates, floor plans, and expert guidance.</p>
        <div style={{ display: 'flex', gap: 32, marginTop: 40 }}>
          {[['5K+', 'Projects'], ['₹3.5L', 'Avg Savings'], ['50+', 'Cities']].map(([n, l]) => (
            <div key={l}><div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{n}</div><div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{l}</div></div>
          ))}
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-box">
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--navy)', marginBottom: 4 }}>🏗️ BuildWise</div>
          <h2>Welcome back</h2>
          <div className="auth-sub">Sign in to continue to your projects</div>
          {error && <div className="error-msg">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input id="email" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input id="password" type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required placeholder="••••••••" />
            </div>
            <button id="btn-login" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 13 }} type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="link-row">Don't have an account? <Link to="/register">Create one free</Link></div>
        </div>
      </div>
    </div>
  );
}
