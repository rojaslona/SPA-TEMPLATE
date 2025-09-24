import React from 'react';
import { Link } from 'react-router-dom';
import { sampleProducts, sampleServices } from '../data/sampleData';

const HomePage: React.FC = () => {
  const featuredProducts = sampleProducts.filter(product => product.featured).slice(0, 3);
  const featuredServices = sampleServices.filter(service => service.featured).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero-section position-relative"
        style={{
          background: `linear-gradient(135deg, var(--spa-light-blue) 0%, var(--spa-mauve) 100%)`,
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold text-white mb-4">
                Bienvenido a H&B SPA
                <br />
                <span style={{ color: 'var(--spa-lime-green)' }}>Jardín Balbuena</span>
              </h1>
              <p className="lead text-white mb-4">
                Tu oasis de belleza y bienestar. Disfruta de nuestros tratamientos premium
                y productos de la más alta calidad en un ambiente de relajación total.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/reservas" className="btn btn-light btn-lg px-4">
                  <i className="bi bi-calendar-check me-2"></i>
                  Reservar Cita
                </Link>
                <Link to="/servicios" className="btn btn-outline-light btn-lg px-4">
                  <i className="bi bi-eye me-2"></i>
                  Ver Servicios
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <div 
                className="hero-image-placeholder"
                style={{
                  width: '100%',
                  height: '400px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem'
                }}
              >
                <div className="text-center">
                  <i className="bi bi-flower1" style={{ fontSize: '5rem', marginBottom: '1rem', display: 'block' }}></i>
                  <p>Imagen principal del SPA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <div 
                className="feature-icon mb-3"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--spa-light-pink)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}
              >
                <i className="bi bi-award" style={{ fontSize: '2rem', color: 'var(--spa-teal-green)' }}></i>
              </div>
              <h4 className="fw-bold mb-3">Profesionales Certificados</h4>
              <p className="text-muted">
                Nuestro equipo cuenta con la mejor formación y certificaciones en tratamientos de spa.
              </p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div 
                className="feature-icon mb-3"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--spa-light-blue)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}
              >
                <i className="bi bi-heart" style={{ fontSize: '2rem', color: 'var(--spa-teal-green)' }}></i>
              </div>
              <h4 className="fw-bold mb-3">Productos Premium</h4>
              <p className="text-muted">
                Utilizamos únicamente productos de las mejores marcas internacionales para cuidar tu piel.
              </p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div 
                className="feature-icon mb-3"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--spa-lime-green)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}
              >
                <i className="bi bi-clock" style={{ fontSize: '2rem', color: 'var(--spa-teal-green)' }}></i>
              </div>
              <h4 className="fw-bold mb-3">Horarios Flexibles</h4>
              <p className="text-muted">
                Abierto todos los días con horarios adaptados a tu estilo de vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-5" style={{ backgroundColor: 'var(--spa-light-pink)', opacity: 0.1 }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Servicios Destacados</h2>
            <p className="lead text-muted">
              Descubre nuestros tratamientos más populares
            </p>
          </div>
          <div className="row">
            {featuredServices.map((service) => (
              <div key={service.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div 
                    className="card-img-top"
                    style={{
                      height: '200px',
                      background: `linear-gradient(45deg, var(--spa-light-blue), var(--spa-mauve))`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    <i className="bi bi-spa" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{service.name}</h5>
                    <p className="card-text text-muted flex-grow-1">{service.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="fw-bold" style={{ color: 'var(--spa-teal-green)', fontSize: '1.25rem' }}>
                          ${service.price.toLocaleString()}
                        </span>
                        <small className="text-muted d-block">{service.duration} minutos</small>
                      </div>
                      <Link to="/reservas" className="btn btn-primary">
                        Reservar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/servicios" className="btn btn-outline-primary btn-lg">
              Ver Todos los Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Productos Destacados</h2>
            <p className="lead text-muted">
              Los mejores productos para el cuidado de tu piel
            </p>
          </div>
          <div className="row">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div 
                    className="card-img-top"
                    style={{
                      height: '200px',
                      background: `linear-gradient(45deg, var(--spa-light-pink), var(--spa-lime-green))`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    <i className="bi bi-stars" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{product.name}</h5>
                    <p className="card-text text-muted flex-grow-1">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="fw-bold" style={{ color: 'var(--spa-teal-green)', fontSize: '1.25rem' }}>
                          ${product.price.toLocaleString()}
                        </span>
                        <div className="small">
                          <span className="text-warning">
                            {'★'.repeat(Math.floor(product.rating))}
                          </span>
                          <span className="text-muted ms-1">({product.reviews})</span>
                        </div>
                      </div>
                      <Link to="/productos" className="btn btn-primary">
                        Ver Más
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/productos" className="btn btn-outline-primary btn-lg">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-5"
        style={{
          background: `linear-gradient(135deg, var(--spa-teal-green) 0%, var(--spa-mauve) 100%)`,
          color: 'white'
        }}
      >
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-3">¿Listo para relajarte?</h2>
          <p className="lead mb-4">
            Agenda tu cita hoy mismo y disfruta de una experiencia única de bienestar.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/reservas" className="btn btn-light btn-lg px-4">
              <i className="bi bi-calendar-plus me-2"></i>
              Agendar Cita
            </Link>
            <a href="tel:+525512345678" className="btn btn-outline-light btn-lg px-4">
              <i className="bi bi-telephone me-2"></i>
              Llamar Ahora
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;