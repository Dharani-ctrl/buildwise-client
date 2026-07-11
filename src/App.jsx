import { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NewProject from './pages/NewProject';
import Estimate from './pages/Estimate';
import Results from './pages/Results';
import './App.css';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('bw_token'));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bw_user')); } catch { return null; }
  });

  const login = (t, u) => {
    localStorage.setItem('bw_token', t);
    localStorage.setItem('bw_user', JSON.stringify(u));
    setToken(t);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('bw_token');
    localStorage.removeItem('bw_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><NewProject /></PrivateRoute>} />
          <Route path="/estimate/:siteId" element={<PrivateRoute><Estimate /></PrivateRoute>} />
          <Route path="/results/:siteId" element={<PrivateRoute><Results /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
