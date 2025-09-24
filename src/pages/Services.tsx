import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { getProductsByCategory } from '../services/mockData';
import { useCart } from '../hooks/useCart';

const Services: React.FC = () => {
  const services = getProductsByCategory('servicio');
  const { addToCart } = useCart();

  const handleBookService = (service: any) => {
    addToCart(service, 1);
    // En una implementación real, esto redirigiría a una página de reservas
    alert(`Servicio "${service.name}" agregado al carrito. Procede al carrito para seleccionar fecha y hora.`);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}min` : ''}`;
    }
    return `${minutes} min`;
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="text-success text-center mb-3">Nuestros Servicios</h1>
          <p className="text-center lead text-muted">
            Descubre nuestra amplia gama de tratamientos de belleza y relajación, 
            diseñados para brindarte la mejor experiencia de bienestar.
          </p>
        </Col>
      </Row>

      <Row>
        {services.map((service) => (
          <Col md={6} lg={4} key={service.id} className="mb-4">
            <Card className="h-100 shadow-sm service-card">
              <div 
                className="card-img-top bg-light d-flex align-items-center justify-content-center"
                style={{ height: '200px' }}
              >
                <div style={{ fontSize: '4rem' }}>
                  {service.name.includes('Masaje') ? '💆‍♀️' : 
                   service.name.includes('Facial') ? '✨' :
                   service.name.includes('Aromaterapia') ? '🧘‍♀️' :
                   service.name.includes('Piedras') ? '🔥' :
                   service.name.includes('Exfoliación') ? '🌊' :
                   service.name.includes('Reflexología') ? '🦶' : '🌿'}
                </div>
              </div>
              
              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <Badge bg="success" className="me-2">
                    Servicio
                  </Badge>
                  {service.duration && (
                    <Badge bg="info">
                      {formatDuration(service.duration)}
                    </Badge>
                  )}
                </div>
                
                <Card.Title className="text-success h5">
                  {service.name}
                </Card.Title>
                
                <Card.Text className="flex-grow-1">
                  {service.description}
                </Card.Text>
                
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h4 text-success mb-0">
                      ${service.price.toLocaleString()} MXN
                    </span>
                    {service.available ? (
                      <Badge bg="success">Disponible</Badge>
                    ) : (
                      <Badge bg="danger">No disponible</Badge>
                    )}
                  </div>
                  
                  <div className="d-grid">
                    <Button 
                      variant="success" 
                      onClick={() => handleBookService(service)}
                      disabled={!service.available}
                    >
                      {service.available ? '📅 Reservar Servicio' : 'No Disponible'}
                    </Button>
                  </div>
                  
                  <div className="text-center mt-2">
                    <small className="text-muted">
                      * La reserva requiere seleccionar fecha y hora
                    </small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Información adicional */}
      <Row className="mt-5 pt-4 border-top">
        <Col>
          <h3 className="text-success text-center mb-4">Información Importante</h3>
        </Col>
      </Row>
      
      <Row>
        <Col md={4} className="mb-3">
          <div className="text-center">
            <div style={{ fontSize: '2rem' }}>📅</div>
            <h5 className="mt-2">Reservas</h5>
            <p className="small text-muted">
              Recomendamos reservar con al menos 24 horas de anticipación. 
              Confirmaremos tu cita por teléfono.
            </p>
          </div>
        </Col>
        
        <Col md={4} className="mb-3">
          <div className="text-center">
            <div style={{ fontSize: '2rem' }}>⏰</div>
            <h5 className="mt-2">Puntualidad</h5>
            <p className="small text-muted">
              Por favor, llega 10 minutos antes de tu cita para prepararte 
              y aprovechar al máximo tu experiencia.
            </p>
          </div>
        </Col>
        
        <Col md={4} className="mb-3">
          <div className="text-center">
            <div style={{ fontSize: '2rem' }}>🌿</div>
            <h5 className="mt-2">Productos Naturales</h5>
            <p className="small text-muted">
              Todos nuestros tratamientos utilizan productos 100% naturales 
              y orgánicos, seguros para todo tipo de piel.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Services;