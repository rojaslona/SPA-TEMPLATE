import React, { useState } from 'react';
import { Card, Table, Button, Badge, Modal, Alert } from 'react-bootstrap';
import { Order } from '../../types';

// Datos de ejemplo para pedidos
const mockOrders: Order[] = [
  {
    id: 'order-1',
    customer: {
      id: 'customer-1',
      name: 'María González',
      email: 'maria@ejemplo.com',
      phone: '+52 55 1234 5678'
    },
    items: [
      {
        product: {
          id: 'service-1',
          name: 'Masaje Relajante Completo',
          description: 'Masaje de cuerpo completo',
          price: 800,
          category: 'servicio',
          imageUrl: '',
          stock: 1,
          available: true
        },
        quantity: 1
      }
    ],
    total: 800,
    status: 'confirmada',
    createdAt: new Date('2025-01-10'),
  },
  {
    id: 'order-2',
    customer: {
      id: 'customer-2',
      name: 'Ana Martínez',
      email: 'ana@ejemplo.com',
      phone: '+52 55 2345 6789'
    },
    items: [
      {
        product: {
          id: 'product-1',
          name: 'Aceite Esencial de Lavanda',
          description: 'Aceite 100% puro',
          price: 320,
          category: 'producto',
          imageUrl: '',
          stock: 25,
          available: true
        },
        quantity: 2
      },
      {
        product: {
          id: 'product-2',
          name: 'Vela Aromática de Eucalipto',
          description: 'Vela artesanal',
          price: 250,
          category: 'producto',
          imageUrl: '',
          stock: 15,
          available: true
        },
        quantity: 1
      }
    ],
    total: 890,
    status: 'procesando',
    createdAt: new Date('2025-01-11'),
    shippingAddress: 'Jardín Balbuena, CDMX'
  },
  {
    id: 'order-3',
    customer: {
      id: 'customer-3',
      name: 'Carlos Rivera',
      email: 'carlos@ejemplo.com',
      phone: '+52 55 3456 7890'
    },
    items: [
      {
        product: {
          id: 'service-2',
          name: 'Tratamiento Facial Anti-Edad',
          description: 'Tratamiento rejuvenecedor',
          price: 650,
          category: 'servicio',
          imageUrl: '',
          stock: 1,
          available: true
        },
        quantity: 1
      }
    ],
    total: 650,
    status: 'pendiente',
    createdAt: new Date('2025-01-12'),
  }
];

const OrderManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState<{show: boolean, message: string, variant: string}>({
    show: false,
    message: '',
    variant: 'success'
  });

  const showAlertMessage = (message: string, variant: string = 'success') => {
    setShowAlert({ show: true, message, variant });
    setTimeout(() => setShowAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
    showAlertMessage(`Estado del pedido actualizado a: ${getStatusText(newStatus)}`);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const getStatusBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'pendiente': return 'warning';
      case 'confirmada': return 'success';
      case 'procesando': return 'info';
      case 'enviado': return 'primary';
      case 'entregado': return 'success';
      case 'cancelado': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pendiente': return 'Pendiente';
      case 'confirmada': return 'Confirmada';
      case 'procesando': return 'Procesando';
      case 'enviado': return 'Enviado';
      case 'entregado': return 'Entregado';
      case 'cancelado': return 'Cancelado';
      default: return 'Desconocido';
    }
  };

  const getItemIcon = (category: string) => {
    return category === 'servicio' ? '💆‍♀️' : '📦';
  };

  return (
    <>
      {showAlert.show && (
        <Alert variant={showAlert.variant} dismissible onClose={() => setShowAlert({...showAlert, show: false})}>
          {showAlert.message}
        </Alert>
      )}

      <Card>
        <Card.Header>
          <h5 className="mb-0">📋 Gestión de Pedidos</h5>
          <small className="text-muted">
            Administra las reservas de servicios y pedidos de productos
          </small>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Pedido #</th>
                  <th>Cliente</th>
                  <th>Artículos</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id.split('-')[1]}</strong>
                    </td>
                    <td>
                      <div>
                        <strong>{order.customer.name}</strong>
                        <br />
                        <small className="text-muted">{order.customer.email}</small>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="me-2">
                          {order.items.map((item, index) => (
                            <span key={index} style={{ fontSize: '1.2rem' }} className="me-1">
                              {getItemIcon(item.product.category)}
                            </span>
                          ))}
                        </div>
                        <Badge bg="secondary" pill>
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <strong className="text-success">
                        ${order.total.toLocaleString()} MXN
                      </strong>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-1">
                        <Badge bg={getStatusBadgeVariant(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                        <select 
                          className="form-select form-select-sm"
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="confirmada">Confirmada</option>
                          <option value="procesando">Procesando</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <small className="text-muted">
                        {order.createdAt.toLocaleDateString('es-MX')}
                      </small>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                      >
                        👁️ Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          
          {orders.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">No hay pedidos registrados</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modal para ver detalles del pedido */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            📋 Detalles del Pedido #{selectedOrder?.id.split('-')[1]}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              {/* Información del cliente */}
              <Card className="mb-3">
                <Card.Header>
                  <h6 className="mb-0">👤 Información del Cliente</h6>
                </Card.Header>
                <Card.Body>
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Nombre:</strong> {selectedOrder.customer.name}</p>
                      <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Teléfono:</strong> {selectedOrder.customer.phone}</p>
                      {selectedOrder.shippingAddress && (
                        <p><strong>Dirección:</strong> {selectedOrder.shippingAddress}</p>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Artículos del pedido */}
              <Card className="mb-3">
                <Card.Header>
                  <h6 className="mb-0">🛒 Artículos del Pedido</h6>
                </Card.Header>
                <Card.Body>
                  <Table size="sm">
                    <thead>
                      <tr>
                        <th>Artículo</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>Precio Unit.</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <span style={{ fontSize: '1.2rem' }} className="me-2">
                                {getItemIcon(item.product.category)}
                              </span>
                              <div>
                                <strong>{item.product.name}</strong>
                                <br />
                                <small className="text-muted">
                                  {item.product.description.substring(0, 40)}...
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <Badge bg={item.product.category === 'servicio' ? 'success' : 'primary'}>
                              {item.product.category === 'servicio' ? 'Servicio' : 'Producto'}
                            </Badge>
                          </td>
                          <td>{item.quantity}</td>
                          <td>${item.product.price.toLocaleString()} MXN</td>
                          <td>
                            <strong>
                              ${(item.product.price * item.quantity).toLocaleString()} MXN
                            </strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              {/* Resumen del pedido */}
              <Card>
                <Card.Header>
                  <h6 className="mb-0">💰 Resumen</h6>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.total.toLocaleString()} MXN</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>IVA (16%):</span>
                    <span>${(selectedOrder.total * 0.16).toLocaleString()} MXN</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong className="text-success">
                      ${(selectedOrder.total * 1.16).toLocaleString()} MXN
                    </strong>
                  </div>
                  
                  <div className="mt-3">
                    <p><strong>Estado actual:</strong></p>
                    <Badge bg={getStatusBadgeVariant(selectedOrder.status)} className="fs-6">
                      {getStatusText(selectedOrder.status)}
                    </Badge>
                  </div>
                  
                  <div className="mt-3">
                    <p><strong>Fecha del pedido:</strong></p>
                    <p className="text-muted">
                      {selectedOrder.createdAt.toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary">
            📞 Contactar Cliente
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderManager;