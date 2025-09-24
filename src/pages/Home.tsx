import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-light py-5 mb-5" style={{ backgroundColor: '#f8f5f0' }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold text-success mb-3">
                Bienvenido a H&B SPA
              </h1>
              <h2 className="h4 text-secondary mb-4">
                Jardín Balbuena - Tu oasis de relajación
              </h2>
              <p className="lead mb-4">
                Descubre nuestros tratamientos de belleza, masajes relajantes y 
                productos naturales que te ayudarán a encontrar el equilibrio perfecto 
                entre cuerpo y mente.
              </p>
              <div className="d-flex gap-3">
                <LinkContainer to="/servicios">
                  <Button variant="success" size="lg">
                    Ver Servicios
                  </Button>
                </LinkContainer>
                <LinkContainer to="/contacto">
                  <Button variant="outline-success" size="lg">
                    Reservar Cita
                  </Button>
                </LinkContainer>
              </div>
            </Col>
            <Col md={6}>
              <div className="text-center">
                <div 
                  className="rounded-3 shadow-lg p-5 text-center"
                  style={{ 
                    backgroundColor: 'white',
                    minHeight: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '4rem' }}>🌿</div>
                    <h3 className="text-success mt-3">Bienestar Natural</h3>
                    <p className="text-muted">
                      Productos 100% naturales y tratamientos personalizados
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Servicios Destacados */}
      <Container className="mb-5">
        <Row>
          <Col>
            <h2 className="text-center mb-5">Servicios Destacados</h2>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <div style={{ fontSize: '3rem' }}>💆‍♀️</div>
                <Card.Title className="text-success">Masajes Relajantes</Card.Title>
                <Card.Text>
                  Libera el estrés y las tensiones con nuestros masajes 
                  terapéuticos personalizados.
                </Card.Text>
                <p className="h5 text-success">Desde $800 MXN</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <div style={{ fontSize: '3rem' }}>✨</div>
                <Card.Title className="text-success">Tratamientos Faciales</Card.Title>
                <Card.Text>
                  Rejuvenece tu piel con nuestros tratamientos faciales 
                  con productos naturales.
                </Card.Text>
                <p className="h5 text-success">Desde $600 MXN</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <div style={{ fontSize: '3rem' }}>🧘‍♀️</div>
                <Card.Title className="text-success">Aromaterapia</Card.Title>
                <Card.Text>
                  Equilibra tu energía y relaja tu mente con sesiones 
                  de aromaterapia personalizadas.
                </Card.Text>
                <p className="h5 text-success">Desde $500 MXN</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <LinkContainer to="/servicios">
              <Button variant="outline-success" size="lg">
                Ver Todos los Servicios
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Container>

      {/* Productos Destacados */}
      <div className="bg-light py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center mb-5">Productos Naturales</h2>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-4">
              <Card className="h-100">
                <Card.Body className="text-center">
                  <div style={{ fontSize: '2.5rem' }}>🧴</div>
                  <Card.Title>Aceites Esenciales</Card.Title>
                  <p className="text-success fw-bold">$250 - $450 MXN</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="h-100">
                <Card.Body className="text-center">
                  <div style={{ fontSize: '2.5rem' }}>🕯️</div>
                  <Card.Title>Velas Aromáticas</Card.Title>
                  <p className="text-success fw-bold">$180 - $320 MXN</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="h-100">
                <Card.Body className="text-center">
                  <div style={{ fontSize: '2.5rem' }}>🧼</div>
                  <Card.Title>Jabones Artesanales</Card.Title>
                  <p className="text-success fw-bold">$120 - $200 MXN</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="h-100">
                <Card.Body className="text-center">
                  <div style={{ fontSize: '2.5rem' }}>🌸</div>
                  <Card.Title>Cremas Naturales</Card.Title>
                  <p className="text-success fw-bold">$300 - $600 MXN</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <LinkContainer to="/productos">
                <Button variant="success" size="lg">
                  Explorar Productos
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Información de Contacto */}
      <Container className="py-5">
        <Row>
          <Col md={6}>
            <h3 className="text-success mb-4">¿Por qué elegirnos?</h3>
            <ul className="list-unstyled">
              <li className="mb-3">
                <strong>✅ Productos 100% naturales:</strong> Sin químicos dañinos, 
                solo ingredientes naturales y orgánicos.
              </li>
              <li className="mb-3">
                <strong>✅ Personal especializado:</strong> Terapeutas certificados 
                con años de experiencia.
              </li>
              <li className="mb-3">
                <strong>✅ Ambiente relajante:</strong> Instalaciones diseñadas 
                para tu máxima comodidad y relajación.
              </li>
              <li className="mb-3">
                <strong>✅ Atención personalizada:</strong> Tratamientos adaptados 
                a tus necesidades específicas.
              </li>
            </ul>
          </Col>
          <Col md={6}>
            <h3 className="text-success mb-4">Reserva tu cita</h3>
            <p className="mb-4">
              Estamos ubicados en el corazón de Jardín Balbuena, fácil de llegar 
              en transporte público o automóvil.
            </p>
            <div className="d-grid gap-2">
              <LinkContainer to="/contacto">
                <Button variant="success" size="lg">
                  📞 Reservar Cita
                </Button>
              </LinkContainer>
              <Button variant="outline-success" href="tel:+525512345678">
                📱 Llamar Ahora: +52 55 1234 5678
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;