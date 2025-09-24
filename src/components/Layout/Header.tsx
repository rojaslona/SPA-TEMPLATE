import React from 'react';
import { Navbar, Nav, Badge, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { getItemCount } = useCart();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm" style={{ backgroundColor: '#f8f5f0 !important' }}>
      <div className="container">
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold" style={{ color: '#2d5530' }}>
            🌿 H&B SPA Jardín Balbuena
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/servicios">
              <Nav.Link>Servicios</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/productos">
              <Nav.Link>Productos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contacto">
              <Nav.Link>Contacto</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav>
            <LinkContainer to="/carrito">
              <Nav.Link className="position-relative">
                🛒 Carrito
                {getItemCount() > 0 && (
                  <Badge 
                    bg="success" 
                    pill 
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {getItemCount()}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            
            {isAuthenticated ? (
              <NavDropdown 
                title={`👋 ${user?.name}`} 
                id="user-dropdown"
              >
                {isAdmin && (
                  <LinkContainer to="/admin">
                    <NavDropdown.Item>Panel de Administración</NavDropdown.Item>
                  </LinkContainer>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Iniciar Sesión</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/registro">
                  <Button variant="outline-success" size="sm" className="ms-2">
                    Registrarse
                  </Button>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;