import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="text-success">H&B SPA Jardín Balbuena</h5>
            <p className="small">
              Tu oasis de relajación y bienestar en el corazón de la ciudad.
              Ofrecemos tratamientos de belleza y productos naturales de la más alta calidad.
            </p>
          </Col>
          
          <Col md={4}>
            <h6>Contacto</h6>
            <p className="small mb-1">
              📍 Jardín Balbuena, Ciudad de México
            </p>
            <p className="small mb-1">
              📞 +52 55 1234 5678
            </p>
            <p className="small mb-1">
              ✉️ info@hbspa.com
            </p>
          </Col>
          
          <Col md={4}>
            <h6>Horarios de Atención</h6>
            <p className="small mb-1">
              <strong>Lunes - Viernes:</strong> 9:00 AM - 8:00 PM
            </p>
            <p className="small mb-1">
              <strong>Sábados:</strong> 9:00 AM - 6:00 PM
            </p>
            <p className="small mb-1">
              <strong>Domingos:</strong> 10:00 AM - 5:00 PM
            </p>
          </Col>
        </Row>
        
        <hr className="my-3" />
        
        <Row>
          <Col md={6}>
            <p className="small mb-0">
              © {new Date().getFullYear()} H&B SPA Jardín Balbuena. Todos los derechos reservados.
            </p>
          </Col>
          <Col md={6} className="text-end">
            <p className="small mb-0">
              🔒 Sitio seguro • 🌱 Productos naturales • ✨ Calidad garantizada
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;