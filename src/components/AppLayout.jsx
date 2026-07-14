import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../App';

const NAV = [
  { label: 'Dashboard', path: '/dashboard', icon: '⊞' },
  { label: 'Site Details', path: '/new-project', icon: '📍' },
  { label: 'Cost Estimator', path: null, icon: '💰' },
  { label: 'Floor Plan', path: null, icon: '📐' },
  { label: 'Elevation', path: null, icon: '🏠' },
  { label: 'Interior', path: null, icon: '🛋️' },
];

export default function AppLayout({ children, title, actions }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase() || 'U';

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="brand">🏗️ BuildWise</div>
          <div className="sub">Project Alpha</div>
        </div>
        <nav className="sidebar-nav">
          {NAV.map(item => (
            item.path ? (
              <Link key={item.label} to={item.path} className={`nav-item${pathname === item.path ? ' active' : ''}`}>
                <span>{item.icon}</span> {item.label}
              </Link>
            ) : (
              <div key={item.label} className="nav-item" style={{ opacity: 0.4, cursor: 'default' }}>
                <span>{item.icon}</span> {item.label}
              </div>
            )
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="new-project-btn" onClick={() => window.location.href = '/new-project'}>
            + New Project
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-title">{title || 'Dashboard'}</div>
          <div className="topbar-actions">
            <span style={{ fontSize: 20 }}>🔔</span>
            <div className="avatar" title={`${user?.name} — Sign Out`} onClick={logout}>{initials}</div>
          </div>
        </div>
        <div className="page-body">{children}</div>
      </div>
    </div>
  );
}
