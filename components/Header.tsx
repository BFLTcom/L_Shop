import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Menu, X, LogOut } from 'lucide-react';
import { ROLES, Role } from '../services/firebase';

interface NavLink {
  path: string;
  label: string;
  roles?: Role[];
}

const Header = () => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  let navLinks: NavLink[] = [];

  if (role === ROLES.PUBLIC) {
    navLinks = [
      { path: '/', label: 'Главная' },
      { path: '/catalog', label: 'Каталог' },
      { path: '/about', label: 'О нас' },
      { path: '/contacts', label: 'Контакты' },
    ];
  } else {
    navLinks = [
      { path: '/dashboard', label: 'Панель управления', roles: [ROLES.EMPLOYEE, ROLES.ADMIN] },
      { path: '/warehouse', label: 'Склад', roles: [ROLES.EMPLOYEE, ROLES.ADMIN] },
      { path: '/orders', label: 'Заказы', roles: [ROLES.EMPLOYEE, ROLES.ADMIN] },
      { path: '/sales', label: 'Продажи', roles: [ROLES.EMPLOYEE, ROLES.ADMIN] },
      { path: '/employees', label: 'Сотрудники', roles: [ROLES.ADMIN] },
      { path: '/price-tags', label: 'Ценники', roles: [ROLES.EMPLOYEE, ROLES.ADMIN] },
      { path: '/tasks', label: 'Задачи на день', roles: [ROLES.EMPLOYEE, ROLES.ADMIN] }
    ];
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">B</span>
          <span className="logo-text">BrokePrice</span>
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          {navLinks.map((link) => (
            (!link.roles || link.roles.includes(role)) ? (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : null
          ))}
        </nav>

        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <div className="user-info">
                <User size={18} />
                <span>{user.displayName || user.email}</span>
                {role === ROLES.ADMIN && <span className="badge badge-danger">ADMIN</span>}
                {role === ROLES.EMPLOYEE && <span className="badge badge-info">STAFF</span>}
              </div>
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                <LogOut size={16} />
                Выйти
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              <User size={18} />
              Вход
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .header {
          background: var(--color-bg-secondary);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--color-text);
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: var(--color-accent);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: 'Arial Black', sans-serif;
        }

        .logo-text {
          background: linear-gradient(135deg, var(--color-accent), var(--color-success));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .menu-toggle {
          display: none;
          background: transparent;
          color: var(--color-text);
          padding: 0.5rem;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          padding: 0.5rem 1rem;
          color: var(--color-text-secondary);
          border-radius: var(--radius-sm);
          transition: all 0.2s;
        }

        .nav-link:hover {
          color: var(--color-text);
          background: var(--color-bg-tertiary);
        }

        .nav-link.active {
          color: var(--color-accent);
          background: rgba(233, 69, 96, 0.1);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        @media (max-width: 1024px) {
          .menu-toggle {
            display: block;
          }

          .nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--color-bg-secondary);
            flex-direction: column;
            padding: 1rem;
            border-bottom: 1px solid var(--color-border);
          }

          .nav-open {
            display: flex;
          }

          .nav-link {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
