import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto pt-5" style={{ backgroundColor: 'var(--spa-teal-green)', color: 'white' }}>
      <div className="container">
        <div className="row">
          {/* Brand and Description */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-flower1 me-2"></i>
              H&B SPA Jardín Balbuena
            </h5>
            <p className="mb-3">
              Tu oasis de belleza y bienestar en el corazón de Jardín Balbuena. 
              Ofrecemos tratamientos de spa de la más alta calidad con productos premium.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white fs-5">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-white fs-5">
                <i className="bi bi-whatsapp"></i>
              </a>
              <a href="#" className="text-white fs-5">
                <i className="bi bi-tiktok"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none">Inicio</Link>
              </li>
              <li className="mb-2">
                <Link to="/productos" className="text-white text-decoration-none">Productos</Link>
              </li>
              <li className="mb-2">
                <Link to="/servicios" className="text-white text-decoration-none">Servicios</Link>
              </li>
              <li className="mb-2">
                <Link to="/reservas" className="text-white text-decoration-none">Reservas</Link>
              </li>
              <li className="mb-2">
                <Link to="/nosotros" className="text-white text-decoration-none">Nosotros</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Nuestros Servicios</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/servicios/facial" className="text-white text-decoration-none">
                  Tratamientos Faciales
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/servicios/corporal" className="text-white text-decoration-none">
                  Tratamientos Corporales
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/servicios/masajes" className="text-white text-decoration-none">
                  Masajes Relajantes
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/servicios/manicure" className="text-white text-decoration-none">
                  Manicure y Pedicure
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Contacto</h6>
            <div className="mb-2">
              <i className="bi bi-geo-alt me-2"></i>
              Av. del Taller 123, Jardín Balbuena<br />
              Ciudad de México, CDMX 15900
            </div>
            <div className="mb-2">
              <i className="bi bi-telephone me-2"></i>
              <a href="tel:+525512345678" className="text-white text-decoration-none">
                +52 55 1234 5678
              </a>
            </div>
            <div className="mb-2">
              <i className="bi bi-envelope me-2"></i>
              <a href="mailto:info@hbspa.com" className="text-white text-decoration-none">
                info@hbspa.com
              </a>
            </div>
            <div className="mb-2">
              <i className="bi bi-clock me-2"></i>
              Lunes a Sábado: 9:00 - 19:00<br />
              Domingo: 10:00 - 17:00
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="my-4 border-white-50" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">
              &copy; {currentYear} H&B SPA Jardín Balbuena. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end gap-3 mt-2 mt-md-0">
              <Link to="/privacidad" className="text-white text-decoration-none small">
                Política de Privacidad
              </Link>
              <Link to="/terminos" className="text-white text-decoration-none small">
                Términos y Condiciones
              </Link>
              <div className="text-white small">
                <i className="bi bi-shield-check me-1"></i>
                Sitio Seguro
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;