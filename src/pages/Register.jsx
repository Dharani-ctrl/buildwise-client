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

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/register', form);
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="logo">🏗️ BuildWise</div>
        <div className="subtitle">Create your free account</div>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Dharani Kumar" />
          </div>
          <div className="row">
            <div className="form-group">
              <label>Email</label>
              <input id="reg-email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9876543210" />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input id="reg-password" name="password" type="password" value={form.password} onChange={handleChange} required placeholder="Min 6 characters" />
          </div>
          <button id="btn-register" className="btn" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <div className="link-row">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
