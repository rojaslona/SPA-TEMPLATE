import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { RegisterForm } from '../types';

interface RegisterFormData extends RegisterForm {}

const Register: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setShowError(false);
    
    try {
      const success = await registerUser(data);
      
      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('Register error:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="text-center">
              <h2 className="text-success mb-0">📝 Crear Cuenta</h2>
              <p className="text-muted mt-2 mb-0">
                Únete a la familia H&B SPA
              </p>
            </Card.Header>
            
            <Card.Body>
              {showSuccess && (
                <Alert variant="success">
                  <Alert.Heading>¡Cuenta creada exitosamente! ✅</Alert.Heading>
                  <p className="mb-0">
                    Bienvenido a H&B SPA. Serás redirigido automáticamente...
                  </p>
                </Alert>
              )}

              {showError && (
                <Alert variant="danger" dismissible onClose={() => setShowError(false)}>
                  <Alert.Heading>Error al crear la cuenta</Alert.Heading>
                  <p className="mb-0">
                    Hubo un problema al procesar tu registro. Inténtalo nuevamente.
                  </p>
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)}>
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
                  <Form.Text className="text-muted">
                    Usaremos este email para enviarte confirmaciones de reservas y ofertas especiales.
                  </Form.Text>
                </Form.Group>

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
                  <Form.Text className="text-muted">
                    Lo usaremos para confirmar tus reservas de servicios.
                  </Form.Text>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Contraseña <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        {...register('password', {
                          required: 'La contraseña es obligatoria',
                          minLength: {
                            value: 6,
                            message: 'La contraseña debe tener al menos 6 caracteres'
                          }
                        })}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Confirmar contraseña <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Repite tu contraseña"
                        {...register('confirmPassword', {
                          required: 'Confirma tu contraseña',
                          validate: (value) =>
                            value === password || 'Las contraseñas no coinciden'
                        })}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mb-4">
                  <small className="text-muted">
                    Al crear una cuenta, aceptas nuestros{' '}
                    <button 
                      type="button"
                      className="btn btn-link p-0 text-success text-decoration-none"
                      onClick={() => alert('Términos y condiciones - Funcionalidad pendiente')}
                    >
                      términos y condiciones
                    </button>{' '}
                    y{' '}
                    <button 
                      type="button"
                      className="btn btn-link p-0 text-success text-decoration-none"
                      onClick={() => alert('Política de privacidad - Funcionalidad pendiente')}
                    >
                      política de privacidad
                    </button>.
                  </small>
                </div>

                <div className="d-grid mb-3">
                  <Button 
                    variant="success" 
                    size="lg" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Creando cuenta...
                      </>
                    ) : (
                      'Crear Cuenta'
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <small className="text-muted">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-success text-decoration-none">
                      Inicia sesión aquí
                    </Link>
                  </small>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Beneficios */}
          <Card className="mt-4 shadow-sm">
            <Card.Body>
              <h5 className="text-success text-center mb-3">
                🎉 Beneficios de ser miembro
              </h5>
              <Row className="text-center">
                <Col md={4} className="mb-3">
                  <div style={{ fontSize: '2rem' }}>🎁</div>
                  <small>
                    <strong>Ofertas exclusivas</strong><br />
                    Descuentos especiales solo para miembros
                  </small>
                </Col>
                <Col md={4} className="mb-3">
                  <div style={{ fontSize: '2rem' }}>⭐</div>
                  <small>
                    <strong>Programa de puntos</strong><br />
                    Acumula puntos con cada compra
                  </small>
                </Col>
                <Col md={4} className="mb-3">
                  <div style={{ fontSize: '2rem' }}>📱</div>
                  <small>
                    <strong>Reservas fáciles</strong><br />
                    Agenda tus servicios en línea
                  </small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;