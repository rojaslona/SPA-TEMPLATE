import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ 
      backgroundColor: isDarkMode ? 'var(--spa-dark)' : 'var(--spa-white)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/" style={{ 
          color: 'var(--spa-teal-green)',
          fontSize: '1.5rem'
        }}>
          <i className="bi bi-flower1 me-2"></i>
          H&B SPA
        </Link>

        {/* Mobile toggle button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{ borderColor: 'var(--spa-teal-green)' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/') ? 'active fw-bold' : ''}`}
                to="/"
                style={{ color: isActive('/') ? 'var(--spa-teal-green)' : undefined }}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/productos') ? 'active fw-bold' : ''}`}
                to="/productos"
                style={{ color: isActive('/productos') ? 'var(--spa-teal-green)' : undefined }}
              >
                Productos
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                Servicios
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/servicios/facial">Tratamientos Faciales</Link></li>
                <li><Link className="dropdown-item" to="/servicios/corporal">Tratamientos Corporales</Link></li>
                <li><Link className="dropdown-item" to="/servicios/masajes">Masajes</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/servicios">Todos los Servicios</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/reservas') ? 'active fw-bold' : ''}`}
                to="/reservas"
                style={{ color: isActive('/reservas') ? 'var(--spa-teal-green)' : undefined }}
              >
                Reservas
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/nosotros') ? 'active fw-bold' : ''}`}
                to="/nosotros"
                style={{ color: isActive('/nosotros') ? 'var(--spa-teal-green)' : undefined }}
              >
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/contacto') ? 'active fw-bold' : ''}`}
                to="/contacto"
                style={{ color: isActive('/contacto') ? 'var(--spa-teal-green)' : undefined }}
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Right side items */}
          <ul className="navbar-nav">
            {/* Theme toggle */}
            <li className="nav-item">
              <button 
                className="btn btn-link nav-link" 
                onClick={toggleTheme}
                title={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
              >
                <i className={`bi bi-${isDarkMode ? 'sun' : 'moon'}`}></i>
              </button>
            </li>

            {/* Shopping cart */}
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/carrito">
                <i className="bi bi-bag" style={{ fontSize: '1.2rem' }}></i>
                {getTotalItems() > 0 && (
                  <span 
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    style={{ backgroundColor: 'var(--spa-light-pink)', color: 'var(--spa-dark)' }}
                  >
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </li>

            {/* User authentication */}
            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {user?.firstName}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/perfil">Mi Perfil</Link></li>
                  <li><Link className="dropdown-item" to="/mis-reservas">Mis Reservas</Link></li>
                  {isAdmin && (
                    <>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/admin">Panel Admin</Link></li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-primary" to="/login">
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;