import { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewProject from './pages/NewProject';
import Estimate from './pages/Estimate';
import FloorPlan from './pages/FloorPlan';
import ProjectSummary from './pages/ProjectSummary';
import NotFound from './pages/NotFound';
import './index.css';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}
// Export Data Updated
export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('bw_token'));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bw_user')); } catch { return null; }
  });

  const login = (t, u) => {
    localStorage.setItem('bw_token', t);
    localStorage.setItem('bw_user', JSON.stringify(u));
    setToken(t); setUser(u);
  };
  const logout = () => {
    localStorage.removeItem('bw_token');
    localStorage.removeItem('bw_user');
    setToken(null); setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Authenticated */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/new-project" element={<PrivateRoute><NewProject /></PrivateRoute>} />
          <Route path="/estimate/:siteId" element={<PrivateRoute><Estimate /></PrivateRoute>} />
          <Route path="/floor-plan/:siteId" element={<PrivateRoute><FloorPlan /></PrivateRoute>} />
          <Route path="/summary/:siteId" element={<PrivateRoute><ProjectSummary /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
