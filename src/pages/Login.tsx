import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { LoginForm } from '../types';

const Login: React.FC = () => {
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsSubmitting(true);
    setShowError(false);
    
    try {
      const success = await login(data.email, data.password);
      
      if (success) {
        navigate('/');
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Header className="text-center">
              <h2 className="text-success mb-0">🔐 Iniciar Sesión</h2>
              <p className="text-muted mt-2 mb-0">
                Accede a tu cuenta de H&B SPA
              </p>
            </Card.Header>
            
            <Card.Body>
              {showError && (
                <Alert variant="danger" dismissible onClose={() => setShowError(false)}>
                  <Alert.Heading>Error de autenticación</Alert.Heading>
                  <p className="mb-0">
                    Credenciales incorrectas. Verifica tu email y contraseña.
                  </p>
                </Alert>
              )}

              {/* Credenciales de prueba */}
              <Alert variant="info" className="small">
                <strong>Credenciales de prueba:</strong><br />
                <strong>Admin:</strong> admin@hbspa.com / admin123<br />
                <strong>Cliente:</strong> cliente@ejemplo.com / cliente123
              </Alert>

              <Form onSubmit={handleSubmit(onSubmit)}>
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

                <Form.Group className="mb-4">
                  <Form.Label>
                    Contraseña <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Tu contraseña"
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
                        Iniciando sesión...
                      </>
                    ) : (
                      'Iniciar Sesión'
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <small className="text-muted">
                    ¿Aún no tienes cuenta?{' '}
                    <Link to="/registro" className="text-success text-decoration-none">
                      Regístrate aquí
                    </Link>
                  </small>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Información adicional */}
          <Card className="mt-4 shadow-sm">
            <Card.Body className="text-center">
              <h5 className="text-success">¿Por qué crear una cuenta?</h5>
              <ul className="list-unstyled small text-muted">
                <li className="mb-2">✅ Reserva servicios más fácilmente</li>
                <li className="mb-2">✅ Historial de compras y servicios</li>
                <li className="mb-2">✅ Ofertas y descuentos exclusivos</li>
                <li className="mb-2">✅ Seguimiento de tus pedidos</li>
                <li>✅ Programa de lealtad y puntos</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;