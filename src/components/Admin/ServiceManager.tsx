import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { getProductsByCategory } from '../../services/mockData';
import { Service } from '../../types';

interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  duration: number;
  available: boolean;
  therapistRequired: boolean;
}

const ServiceManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>(
    getProductsByCategory('servicio') as Service[]
  );
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showAlert, setShowAlert] = useState<{show: boolean, message: string, variant: string}>({
    show: false,
    message: '',
    variant: 'success'
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ServiceFormData>();

  const showAlertMessage = (message: string, variant: string = 'success') => {
    setShowAlert({ show: true, message, variant });
    setTimeout(() => setShowAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleAddService = () => {
    setEditingService(null);
    reset();
    setValue('therapistRequired', true);
    setShowModal(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setValue('name', service.name);
    setValue('description', service.description);
    setValue('price', service.price);
    setValue('duration', service.duration);
    setValue('available', service.available);
    setValue('therapistRequired', service.therapistRequired);
    setShowModal(true);
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      setServices(services.filter(s => s.id !== serviceId));
      showAlertMessage('Servicio eliminado exitosamente');
    }
  };

  const onSubmit = (data: ServiceFormData) => {
    if (editingService) {
      // Editar servicio existente
      const updatedServices = services.map(s => 
        s.id === editingService.id 
          ? { ...s, ...data, imageUrl: s.imageUrl, category: 'servicio' as const, stock: 1 }
          : s
      );
      setServices(updatedServices);
      showAlertMessage('Servicio actualizado exitosamente');
    } else {
      // Agregar nuevo servicio
      const newService: Service = {
        id: `service-${Date.now()}`,
        ...data,
        category: 'servicio',
        imageUrl: `/images/service-${Date.now()}.jpg`,
        stock: 1 // Los servicios siempre tienen stock de 1
      };
      setServices([...services, newService]);
      showAlertMessage('Servicio agregado exitosamente');
    }
    
    setShowModal(false);
    reset();
  };

  const getServiceIcon = (serviceName: string) => {
    if (serviceName.toLowerCase().includes('masaje')) return '💆‍♀️';
    if (serviceName.toLowerCase().includes('facial')) return '✨';
    if (serviceName.toLowerCase().includes('aromaterapia')) return '🧘‍♀️';
    if (serviceName.toLowerCase().includes('piedras')) return '🔥';
    if (serviceName.toLowerCase().includes('exfoliación')) return '🌊';
    if (serviceName.toLowerCase().includes('reflexología')) return '🦶';
    return '🌿';
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
    <>
      {showAlert.show && (
        <Alert variant={showAlert.variant} dismissible onClose={() => setShowAlert({...showAlert, show: false})}>
          {showAlert.message}
        </Alert>
      )}

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">💆‍♀️ Gestión de Servicios</h5>
          <Button variant="success" onClick={handleAddService}>
            ➕ Agregar Servicio
          </Button>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Duración</th>
                  <th>Terapeuta</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <span style={{ fontSize: '1.5rem' }} className="me-2">
                          {getServiceIcon(service.name)}
                        </span>
                        <strong>{service.name}</strong>
                      </div>
                    </td>
                    <td>
                      <small className="text-muted">
                        {service.description.length > 50 
                          ? `${service.description.substring(0, 50)}...`
                          : service.description
                        }
                      </small>
                    </td>
                    <td>
                      <strong className="text-success">
                        ${service.price.toLocaleString()} MXN
                      </strong>
                    </td>
                    <td>
                      <Badge bg="info">
                        {formatDuration(service.duration)}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={service.therapistRequired ? 'warning' : 'secondary'}>
                        {service.therapistRequired ? 'Requerido' : 'No requerido'}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={service.available ? 'success' : 'danger'}>
                        {service.available ? 'Disponible' : 'No disponible'}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEditService(service)}
                        >
                          ✏️
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          🗑️
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          
          {services.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">No hay servicios registrados</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modal para agregar/editar servicio */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingService ? '✏️ Editar Servicio' : '➕ Agregar Nuevo Servicio'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del servicio *</Form.Label>
              <Form.Control
                type="text"
                {...register('name', { 
                  required: 'El nombre es obligatorio',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                })}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register('description', { 
                  required: 'La descripción es obligatoria',
                  minLength: { value: 10, message: 'Mínimo 10 caracteres' }
                })}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Precio (MXN) *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('price', { 
                      required: 'El precio es obligatorio',
                      min: { value: 0, message: 'El precio debe ser mayor a 0' }
                    })}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Duración (minutos) *</Form.Label>
                  <Form.Control
                    type="number"
                    min="15"
                    max="300"
                    {...register('duration', { 
                      required: 'La duración es obligatoria',
                      min: { value: 15, message: 'Mínimo 15 minutos' },
                      max: { value: 300, message: 'Máximo 300 minutos' }
                    })}
                    isInvalid={!!errors.duration}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.duration?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Servicio disponible"
                    {...register('available')}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Requiere terapeuta especializado"
                    {...register('therapistRequired')}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="success" type="submit">
                {editingService ? 'Actualizar' : 'Agregar'} Servicio
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ServiceManager;