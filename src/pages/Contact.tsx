import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ContactForm } from '../types';

interface ContactFormData extends ContactForm {}

const Contact: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulación de envío de formulario (en producción sería una llamada a la API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Formulario de contacto enviado:', data);
      setShowSuccess(true);
      reset();
      
      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setShowSuccess(false), 5000);
      
    } catch (error) {
      console.error('Error enviando formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-success text-center mb-4">Contáctanos</h1>
          <p className="text-center lead text-muted mb-5">
            Estamos aquí para ayudarte. Ponte en contacto con nosotros para 
            reservas, consultas o cualquier información que necesites.
          </p>
        </Col>
      </Row>

      <Row>
        {/* Formulario de contacto */}
        <Col lg={8} className="mb-5">
          <Card className="shadow-sm">
            <Card.Header>
              <h4 className="text-success mb-0">📝 Envíanos un mensaje</h4>
            </Card.Header>
            <Card.Body>
              {showSuccess && (
                <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
                  <Alert.Heading>¡Mensaje enviado con éxito! ✅</Alert.Heading>
                  <p className="mb-0">
                    Gracias por contactarnos. Te responderemos a la brevedad posible, 
                    generalmente en menos de 24 horas.
                  </p>
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Nombre completo <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu nombre completo"
                        {...register('name', {
                          required: 'El nombre es obligatorio',
                          minLength: {
                            value: 2,
                            message: 'El nombre debe tener al menos 2 caracteres'
                          }
                        })}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name?.message}
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
                        {...register('email', {
                          required: 'El correo electrónico es obligatorio',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Ingresa un correo electrónico válido'
                          }
                        })}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
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
                        {...register('phone', {
                          required: 'El teléfono es obligatorio',
                          pattern: {
                            value: /^[+]?[0-9\s\-()]{10,}$/,
                            message: 'Ingresa un teléfono válido'
                          }
                        })}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Asunto <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        {...register('subject', {
                          required: 'Selecciona un asunto'
                        })}
                        isInvalid={!!errors.subject}
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="reserva">Reserva de servicio</option>
                        <option value="productos">Consulta sobre productos</option>
                        <option value="precios">Información de precios</option>
                        <option value="horarios">Horarios y disponibilidad</option>
                        <option value="reclamo">Reclamo o sugerencia</option>
                        <option value="otro">Otro</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.subject?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Mensaje <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    {...register('message', {
                      required: 'El mensaje es obligatorio',
                      minLength: {
                        value: 10,
                        message: 'El mensaje debe tener al menos 10 caracteres'
                      }
                    })}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message?.message}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Comparte todos los detalles que consideres importantes.
                  </Form.Text>
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    variant="success" 
                    size="lg" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Enviando mensaje...
                      </>
                    ) : (
                      '📤 Enviar mensaje'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Información de contacto */}
        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="text-success mb-0">📍 Información de contacto</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h6>Ubicación</h6>
                <p className="text-muted small mb-0">
                  Jardín Balbuena<br />
                  Ciudad de México, CDMX<br />
                  <small className="text-success">
                    <button 
                      type="button"
                      className="btn btn-link p-0 text-success text-decoration-none"
                      onClick={() => alert('Integración con Google Maps pendiente')}
                    >
                      📍 Ver en Google Maps
                    </button>
                  </small>
                </p>
              </div>

              <div className="mb-3">
                <h6>Teléfono</h6>
                <p className="text-muted small mb-0">
                  <a href="tel:+525512345678" className="text-decoration-none">
                    📞 +52 55 1234 5678
                  </a>
                </p>
              </div>

              <div className="mb-3">
                <h6>Email</h6>
                <p className="text-muted small mb-0">
                  <a href="mailto:info@hbspa.com" className="text-decoration-none">
                    ✉️ info@hbspa.com
                  </a>
                </p>
              </div>

              <div>
                <h6>WhatsApp</h6>
                <p className="text-muted small mb-0">
                  <a 
                    href="https://wa.me/525512345678" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    💬 +52 55 1234 5678
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="text-success mb-0">⏰ Horarios de atención</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-2">
                <strong>Lunes - Viernes:</strong><br />
                <span className="text-muted">9:00 AM - 8:00 PM</span>
              </div>
              <div className="mb-2">
                <strong>Sábados:</strong><br />
                <span className="text-muted">9:00 AM - 6:00 PM</span>
              </div>
              <div className="mb-3">
                <strong>Domingos:</strong><br />
                <span className="text-muted">10:00 AM - 5:00 PM</span>
              </div>
              
              <small className="text-muted">
                <strong>Nota:</strong> Los servicios requieren cita previa. 
                Te recomendamos reservar con al menos 24 horas de anticipación.
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;