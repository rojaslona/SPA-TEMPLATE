import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col, Badge } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ReservationForm } from '../../types';
import { getProductsByCategory } from '../../services/mockData';

interface ReservationFormData extends ReservationForm {}

interface ReservationModalProps {
  serviceId?: string;
  show: boolean;
  onClose: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ serviceId, show, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const services = getProductsByCategory('servicio');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ReservationFormData>();

  const selectedServiceId = watch('serviceId') || serviceId;
  const selectedService = services.find(s => s.id === selectedServiceId);

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulación de creación de reserva (en producción sería una llamada a la API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Reserva creada:', data);
      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        reset();
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Error creando reserva:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generar horarios disponibles
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 19; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 19 && minute > 0) break; // No agendar después de las 7:30 PM
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Obtener fechas disponibles (próximos 30 días, excluyendo domingos)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Excluir domingos (0 = domingo)
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('es-MX', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        });
      }
    }
    
    return dates;
  };

  const availableDates = getAvailableDates();

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-success">📅 Reservar Servicio</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          
          <div className="modal-body">
            {showSuccess ? (
              <Alert variant="success">
                <Alert.Heading>¡Reserva creada exitosamente! ✅</Alert.Heading>
                <p className="mb-0">
                  Hemos recibido tu solicitud de reserva. Te contactaremos pronto para 
                  confirmar la disponibilidad y todos los detalles.
                </p>
              </Alert>
            ) : (
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Selección de servicio */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    Servicio <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    {...register('serviceId', {
                      required: 'Selecciona un servicio'
                    })}
                    isInvalid={!!errors.serviceId}
                    defaultValue={serviceId || ''}
                  >
                    <option value="">Selecciona un servicio...</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ${service.price} MXN ({service.duration} min)
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.serviceId?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Información del servicio seleccionado */}
                {selectedService && (
                  <Card className="mb-3 bg-light">
                    <Card.Body>
                      <h6 className="text-success">Servicio seleccionado:</h6>
                      <p className="mb-1"><strong>{selectedService.name}</strong></p>
                      <p className="mb-1">{selectedService.description}</p>
                      <div className="d-flex gap-2">
                        <Badge bg="success">
                          ${selectedService.price.toLocaleString()} MXN
                        </Badge>
                        <Badge bg="info">
                          {selectedService.duration} minutos
                        </Badge>
                      </div>
                    </Card.Body>
                  </Card>
                )}

                {/* Fecha y hora */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Fecha preferida <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        {...register('date', {
                          required: 'Selecciona una fecha'
                        })}
                        isInvalid={!!errors.date}
                      >
                        <option value="">Selecciona fecha...</option>
                        {availableDates.map((date) => (
                          <option key={date.value} value={date.value}>
                            {date.label}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.date?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Hora preferida <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        {...register('time', {
                          required: 'Selecciona una hora'
                        })}
                        isInvalid={!!errors.time}
                      >
                        <option value="">Selecciona hora...</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.time?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Información del cliente */}
                <h6 className="text-success mb-3">Información de contacto</h6>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Nombre completo <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu nombre completo"
                        {...register('customerInfo.name', {
                          required: 'El nombre es obligatorio'
                        })}
                        isInvalid={!!errors.customerInfo?.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.customerInfo?.name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Correo electrónico <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="tu@email.com"
                        {...register('customerInfo.email', {
                          required: 'El email es obligatorio',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email inválido'
                          }
                        })}
                        isInvalid={!!errors.customerInfo?.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.customerInfo?.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Teléfono <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="+52 55 1234 5678"
                        {...register('customerInfo.phone', {
                          required: 'El teléfono es obligatorio'
                        })}
                        isInvalid={!!errors.customerInfo?.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.customerInfo?.phone?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Notas especiales (opcional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Alergias, preferencias, etc..."
                        {...register('customerInfo.notes')}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Alert variant="info" className="small">
                  <strong>ℹ️ Importante:</strong> Esta es una solicitud de reserva. 
                  Te contactaremos en las próximas horas para confirmar la disponibilidad 
                  y finalizar todos los detalles de tu cita.
                </Alert>

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button 
                    variant="success" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Enviando solicitud...
                      </>
                    ) : (
                      '📅 Solicitar Reserva'
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;