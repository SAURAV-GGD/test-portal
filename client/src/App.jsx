import { useEffect, useState, createContext } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FaqPage from './pages/FaqPage';
import DoubtPage from './pages/DoubtPage';
import YakshaPage from './pages/YakshaPage';
import './index.css';

export const AuthContext = createContext();

function App() {
  const [role, setRole] = useState('intern');
  const [user, setUser] = useState('You');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedRole = sessionStorage.getItem('samagama-role');
    if (savedRole) setRole(savedRole);
  }, []);

  function signIn(selectedRole) {
    setRole(selectedRole);
    setUser(selectedRole === 'admin' ? 'Admin' : 'You');
    sessionStorage.setItem('samagama-role', selectedRole);
  }

  const isHome = location.pathname === '/';

  return (
    <AuthContext.Provider value={{ role, user, signIn }}>
      <div className="app-shell">
        {!isHome && (
          <header className="app-header">
            <button className="back-btn" onClick={() => navigate('/')}>← Home</button>
            <div className="page-title">
              {location.pathname === '/faq' && 'FAQ'}
              {location.pathname === '/doubts' && 'Doubt Solver'}
              {location.pathname === '/yaksha' && 'Yaksha-mini'}
            </div>
            <nav className="nav-links">
              {location.pathname !== '/faq' && <NavLink to="/faq">FAQ</NavLink>}
              {location.pathname !== '/doubts' && <NavLink to="/doubts">Doubts</NavLink>}
              {location.pathname !== '/yaksha' && <NavLink to="/yaksha">✦ Yaksha</NavLink>}
            </nav>
          </header>
        )}
        {isHome && (
          <header className="home-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="brand">Samagama</span>
              <span className="badge">IIT Ropar</span>
            </div>
            <nav className="nav-links">
              <NavLink to="/faq">FAQ</NavLink>
              <NavLink to="/doubts">Doubts</NavLink>
              <NavLink to="/yaksha">✦ Yaksha</NavLink>
              <button className="sign-btn" onClick={() => signIn(role === 'admin' ? 'intern' : 'admin')}>
                {role === 'admin' ? 'Switch to Intern' : 'Switch to Admin'}
              </button>
            </nav>
          </header>
        )}

        <main className="page-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/doubts" element={<DoubtPage role={role} user={user} />} />
            <Route path="/yaksha" element={<YakshaPage />} />
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
