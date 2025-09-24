import React from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, Form, Alert } from 'react-bootstrap';
import { useCart } from '../hooks/useCart';
import { LinkContainer } from 'react-router-bootstrap';

const Cart: React.FC = () => {
  const { items, total, updateQuantity, removeFromCart, clearCart, getItemCount } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const getProductIcon = (productName: string) => {
    if (productName.toLowerCase().includes('aceite')) return '🧴';
    if (productName.toLowerCase().includes('vela')) return '🕯️';
    if (productName.toLowerCase().includes('jabón')) return '🧼';
    if (productName.toLowerCase().includes('crema')) return '🌸';
    if (productName.toLowerCase().includes('masaje')) return '💆‍♀️';
    if (productName.toLowerCase().includes('facial')) return '✨';
    if (productName.toLowerCase().includes('aromaterapia')) return '🧘‍♀️';
    return '🌿';
  };

  if (items.length === 0) {
    return (
      <Container>
        <Row>
          <Col>
            <div className="text-center py-5">
              <div style={{ fontSize: '5rem' }}>🛒</div>
              <h2 className="text-muted mt-3">Tu carrito está vacío</h2>
              <p className="text-muted mb-4">
                ¡Explora nuestros servicios y productos para comenzar tu experiencia de relajación!
              </p>
              <div className="d-flex justify-content-center gap-3">
                <LinkContainer to="/servicios">
                  <Button variant="success" size="lg">
                    Ver Servicios
                  </Button>
                </LinkContainer>
                <LinkContainer to="/productos">
                  <Button variant="outline-success" size="lg">
                    Ver Productos
                  </Button>
                </LinkContainer>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-success">
              🛒 Carrito de Compras
            </h1>
            <Badge bg="success" pill className="fs-6">
              {getItemCount()} {getItemCount() === 1 ? 'artículo' : 'artículos'}
            </Badge>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {/* Lista de productos */}
          <Card className="mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Artículos en tu carrito</h5>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </Button>
              </div>
            </Card.Header>
            <ListGroup variant="flush">
              {items.map((item) => (
                <ListGroup.Item key={item.product.id}>
                  <Row className="align-items-center">
                    <Col xs={2} className="text-center">
                      <div style={{ fontSize: '2.5rem' }}>
                        {getProductIcon(item.product.name)}
                      </div>
                    </Col>
                    
                    <Col xs={12} sm={6}>
                      <h6 className="mb-1">{item.product.name}</h6>
                      <p className="text-muted small mb-1">
                        {item.product.description.substring(0, 80)}...
                      </p>
                      <div>
                        <Badge 
                          bg={item.product.category === 'servicio' ? 'success' : 'primary'}
                          className="me-2"
                        >
                          {item.product.category === 'servicio' ? 'Servicio' : 'Producto'}
                        </Badge>
                        {item.product.category === 'servicio' && (
                          <small className="text-muted">
                            ⏰ {item.product.duration} min
                          </small>
                        )}
                      </div>
                    </Col>
                    
                    <Col xs={6} sm={2}>
                      <Form.Group>
                        <Form.Label className="small">Cantidad:</Form.Label>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="mx-2 fw-bold">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </Form.Group>
                    </Col>
                    
                    <Col xs={6} sm={2} className="text-end">
                      <div>
                        <p className="mb-1 fw-bold text-success">
                          ${(item.product.price * item.quantity).toLocaleString()} MXN
                        </p>
                        <small className="text-muted">
                          ${item.product.price.toLocaleString()} c/u
                        </small>
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="mt-2"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        Eliminar
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          {/* Servicios requieren reserva */}
          {items.some(item => item.product.category === 'servicio') && (
            <Alert variant="info">
              <Alert.Heading className="h6">ℹ️ Información importante</Alert.Heading>
              <p className="mb-0">
                Los servicios en tu carrito requieren programar una cita. 
                Al proceder al pago, te contactaremos para coordinar fecha y hora.
              </p>
            </Alert>
          )}
        </Col>

        {/* Resumen del pedido */}
        <Col lg={4}>
          <Card className="sticky-top">
            <Card.Header>
              <h5 className="mb-0">Resumen del pedido</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${total.toLocaleString()} MXN</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>IVA (16%):</span>
                <span>${(total * 0.16).toLocaleString()} MXN</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-success">
                  ${(total * 1.16).toLocaleString()} MXN
                </strong>
              </div>

              <div className="d-grid gap-2">
                <Button variant="success" size="lg">
                  💳 Proceder al Pago
                </Button>
                <LinkContainer to="/">
                  <Button variant="outline-success">
                    Continuar comprando
                  </Button>
                </LinkContainer>
              </div>

              <div className="mt-3">
                <small className="text-muted">
                  <strong>🔒 Pago seguro</strong><br />
                  Aceptamos todas las tarjetas de crédito y débito principales.
                </small>
              </div>
            </Card.Body>
          </Card>

          {/* Información de envío */}
          <Card className="mt-3">
            <Card.Header>
              <h6 className="mb-0">📦 Información de envío</h6>
            </Card.Header>
            <Card.Body>
              <small>
                <strong>Productos físicos:</strong><br />
                • Envío gratis en compras &gt; $500 MXN<br />
                • Entrega en 2-3 días hábiles<br />
                • Solo dentro de la CDMX<br /><br />
                
                <strong>Servicios:</strong><br />
                • Requieren cita previa<br />
                • Te contactaremos para agendar<br />
                • Ubicación: Jardín Balbuena
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;