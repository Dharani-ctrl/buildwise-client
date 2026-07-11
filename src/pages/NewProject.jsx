import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import api from '../api';

export default function NewProject() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    length: '',
    width: '',
    unit: 'ft',
    city: '',
    state: '',
    bhkType: '2BHK',
    floors: '1',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        plotDimensions: {
          length: parseFloat(form.length),
          width: parseFloat(form.width),
          unit: form.unit,
        },
        location: { city: form.city, state: form.state },
        bhkType: form.bhkType,
        floors: parseInt(form.floors),
      };
      const { data } = await api.post('/api/sites', payload);
      navigate(`/estimate/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card card-wide">
        <div className="nav-row">
          <div className="logo" style={{ margin: 0, fontSize: 20 }}>🏗️ BuildWise</div>
          <button onClick={logout}>Sign out ({user?.name})</button>
        </div>
        <h2>New Construction Project</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={{ marginBottom: 8 }}>Plot Dimensions</label>
          <div className="row">
            <div className="form-group">
              <label>Length</label>
              <input id="plot-length" name="length" type="number" step="0.1" value={form.length} onChange={handleChange} required placeholder="e.g. 40" />
            </div>
            <div className="form-group">
              <label>Width</label>
              <input id="plot-width" name="width" type="number" step="0.1" value={form.width} onChange={handleChange} required placeholder="e.g. 28.5" />
            </div>
            <div className="form-group" style={{ maxWidth: 80 }}>
              <label>Unit</label>
              <select id="plot-unit" name="unit" value={form.unit} onChange={handleChange}>
                <option value="ft">ft</option>
                <option value="m">m</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label>City</label>
              <input id="city" name="city" value={form.city} onChange={handleChange} placeholder="Chennai" />
            </div>
            <div className="form-group">
              <label>State</label>
              <input id="state" name="state" value={form.state} onChange={handleChange} placeholder="Tamil Nadu" />
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label>BHK Type</label>
              <select id="bhk-type" name="bhkType" value={form.bhkType} onChange={handleChange}>
                <option value="2BHK">2 BHK</option>
                <option value="3BHK">3 BHK</option>
              </select>
            </div>
            <div className="form-group">
              <label>Number of Floors</label>
              <input id="floors" name="floors" type="number" min="1" max="10" value={form.floors} onChange={handleChange} required />
            </div>
          </div>
          <button id="btn-create-site" className="btn" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Continue to Estimate →'}
          </button>
        </form>
      </div>
    </div>
  );
}
