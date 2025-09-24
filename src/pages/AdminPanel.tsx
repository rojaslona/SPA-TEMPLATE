import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tab, Tabs, Alert } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import ProductManager from '../components/Admin/ProductManager';
import ServiceManager from '../components/Admin/ServiceManager';
import OrderManager from '../components/Admin/OrderManager';
import StatsCard from '../components/Admin/StatsCard';

const AdminPanel: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Proteger ruta de administrador
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-success">🏠 Panel de Administración</h1>
              <p className="text-muted">H&B SPA Jardín Balbuena - Sistema de gestión</p>
            </div>
            <div>
              <small className="text-muted">
                Última actualización: {new Date().toLocaleString('es-MX')}
              </small>
            </div>
          </div>
        </Col>
      </Row>

      <Alert variant="info" className="mb-4">
        <Alert.Heading className="h6">ℹ️ Panel de Administración - Versión Demo</Alert.Heading>
        <p className="mb-0 small">
          Este es un panel de demostración. En producción, todos los cambios se sincronizarían 
          con la base de datos del backend. Las funcionalidades están simuladas para propósitos 
          de demostración.
        </p>
      </Alert>

      <Tabs
        id="admin-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'dashboard')}
        className="mb-4"
      >
        <Tab eventKey="dashboard" title="📊 Dashboard">
          <Row>
            <Col lg={3} md={6} className="mb-4">
              <StatsCard
                title="Ventas del Mes"
                value="$45,230"
                icon="💰"
                color="success"
                subtitle="MXN"
                change="+12%"
              />
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <StatsCard
                title="Servicios Reservados"
                value="127"
                icon="📅"
                color="primary"
                subtitle="Este mes"
                change="+8%"
              />
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <StatsCard
                title="Productos Vendidos"
                value="89"
                icon="📦"
                color="info"
                subtitle="Últimos 30 días"
                change="+15%"
              />
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <StatsCard
                title="Nuevos Clientes"
                value="34"
                icon="👥"
                color="warning"
                subtitle="Este mes"
                change="+22%"
              />
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">📈 Resumen de Actividades Recientes</h5>
                </Card.Header>
                <Card.Body>
                  <div className="activity-list">
                    <div className="activity-item mb-3 p-3 border-start border-success border-4 bg-light">
                      <strong>Nueva reserva de servicio</strong>
                      <p className="mb-1 text-muted small">
                        María González reservó "Masaje Relajante Completo" para el 15/01/2025
                      </p>
                      <small className="text-muted">Hace 2 horas</small>
                    </div>
                    
                    <div className="activity-item mb-3 p-3 border-start border-primary border-4 bg-light">
                      <strong>Producto vendido</strong>
                      <p className="mb-1 text-muted small">
                        Venta de "Aceite Esencial de Lavanda" x2 unidades
                      </p>
                      <small className="text-muted">Hace 3 horas</small>
                    </div>
                    
                    <div className="activity-item mb-3 p-3 border-start border-info border-4 bg-light">
                      <strong>Nueva cuenta creada</strong>
                      <p className="mb-1 text-muted small">
                        Cliente nuevo: Ana Martínez se registró
                      </p>
                      <small className="text-muted">Hace 5 horas</small>
                    </div>
                    
                    <div className="activity-item p-3 border-start border-warning border-4 bg-light">
                      <strong>Stock bajo</strong>
                      <p className="mb-1 text-muted small">
                        "Sales de Baño Relajantes" - Solo quedan 3 unidades
                      </p>
                      <small className="text-muted">Hace 1 día</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="mb-3">
                <Card.Header>
                  <h6 className="mb-0">🎯 Acciones Rápidas</h6>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-2">
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => setActiveTab('products')}
                    >
                      ➕ Agregar Producto
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => setActiveTab('services')}
                    >
                      🛠️ Gestionar Servicios
                    </Button>
                    <Button 
                      variant="info" 
                      size="sm"
                      onClick={() => setActiveTab('orders')}
                    >
                      📋 Ver Pedidos
                    </Button>
                  </div>
                </Card.Body>
              </Card>
              
              <Card>
                <Card.Header>
                  <h6 className="mb-0">⚠️ Alertas</h6>
                </Card.Header>
                <Card.Body>
                  <div className="alerts-list">
                    <div className="alert alert-warning alert-sm p-2 mb-2">
                      <small>
                        <strong>Stock bajo:</strong><br />
                        3 productos con menos de 5 unidades
                      </small>
                    </div>
                    <div className="alert alert-info alert-sm p-2 mb-0">
                      <small>
                        <strong>Mantenimiento:</strong><br />
                        Backup programado para esta noche
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="products" title="📦 Productos">
          <ProductManager />
        </Tab>

        <Tab eventKey="services" title="💆‍♀️ Servicios">
          <ServiceManager />
        </Tab>

        <Tab eventKey="orders" title="📋 Pedidos">
          <OrderManager />
        </Tab>

        <Tab eventKey="settings" title="⚙️ Configuración">
          <Card>
            <Card.Header>
              <h5 className="mb-0">⚙️ Configuración del Sistema</h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="warning">
                <Alert.Heading className="h6">🚧 En Desarrollo</Alert.Heading>
                <p className="mb-0">
                  Esta sección estará disponible en futuras versiones. Aquí podrás 
                  configurar horarios, precios, políticas de cancelación y más.
                </p>
              </Alert>
              
              <div className="planned-features">
                <h6 className="text-success">Funcionalidades Planificadas:</h6>
                <ul>
                  <li>Gestión de horarios de atención</li>
                  <li>Configuración de precios y descuentos</li>
                  <li>Gestión de terapeutas y disponibilidad</li>
                  <li>Configuración de notificaciones por email</li>
                  <li>Políticas de cancelación y reembolsos</li>
                  <li>Integración con sistemas de pago</li>
                  <li>Reportes y análisis avanzados</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminPanel;