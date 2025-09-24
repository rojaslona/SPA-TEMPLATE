import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { getProductsByCategory } from '../services/mockData';
import { useCart } from '../hooks/useCart';
import { Product } from '../types';

const Products: React.FC = () => {
  const products = getProductsByCategory('producto');
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'Todos los productos' },
    { value: 'aceites', label: 'Aceites esenciales' },
    { value: 'velas', label: 'Velas aromáticas' },
    { value: 'jabones', label: 'Jabones artesanales' },
    { value: 'cremas', label: 'Cremas y lociones' },
    { value: 'sales', label: 'Sales y exfoliantes' },
    { value: 'accesorios', label: 'Accesorios' }
  ];

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
    alert(`"${product.name}" agregado al carrito exitosamente!`);
  };

  const getProductIcon = (productName: string) => {
    if (productName.toLowerCase().includes('aceite')) return '🧴';
    if (productName.toLowerCase().includes('vela')) return '🕯️';
    if (productName.toLowerCase().includes('jabón')) return '🧼';
    if (productName.toLowerCase().includes('crema')) return '🌸';
    if (productName.toLowerCase().includes('sales')) return '🧂';
    if (productName.toLowerCase().includes('exfoliante')) return '☕';
    if (productName.toLowerCase().includes('difusor')) return '🎋';
    return '🌿';
  };

  const filterProducts = (products: Product[]) => {
    let filtered = products;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => {
        const name = product.name.toLowerCase();
        switch (selectedCategory) {
          case 'aceites': return name.includes('aceite');
          case 'velas': return name.includes('vela');
          case 'jabones': return name.includes('jabón');
          case 'cremas': return name.includes('crema');
          case 'sales': return name.includes('sales') || name.includes('exfoliante');
          case 'accesorios': return name.includes('difusor');
          default: return true;
        }
      });
    }

    return filtered;
  };

  const filteredProducts = filterProducts(products);

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="text-success text-center mb-3">Productos Naturales</h1>
          <p className="text-center lead text-muted">
            Descubre nuestra selección de productos 100% naturales para el cuidado 
            personal y la aromaterapia en casa.
          </p>
        </Col>
      </Row>

      {/* Filtros */}
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Productos */}
      <Row>
        {filteredProducts.map((product) => (
          <Col md={6} lg={4} key={product.id} className="mb-4">
            <Card className="h-100 shadow-sm product-card">
              <div 
                className="card-img-top bg-light d-flex align-items-center justify-content-center"
                style={{ height: '200px' }}
              >
                <div style={{ fontSize: '4rem' }}>
                  {getProductIcon(product.name)}
                </div>
              </div>
              
              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <Badge bg="primary" className="me-2">
                    Producto
                  </Badge>
                  {product.stock <= 5 && product.stock > 0 && (
                    <Badge bg="warning">
                      ¡Últimas unidades!
                    </Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge bg="danger">
                      Agotado
                    </Badge>
                  )}
                </div>
                
                <Card.Title className="text-success h5">
                  {product.name}
                </Card.Title>
                
                <Card.Text className="flex-grow-1">
                  {product.description}
                </Card.Text>
                
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h4 text-success mb-0">
                      ${product.price.toLocaleString()} MXN
                    </span>
                    <small className="text-muted">
                      {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                    </small>
                  </div>
                  
                  <div className="d-grid">
                    <Button 
                      variant="success" 
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      {product.stock > 0 ? '🛒 Agregar al Carrito' : 'Agotado'}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredProducts.length === 0 && (
        <Row>
          <Col>
            <div className="text-center py-5">
              <div style={{ fontSize: '4rem' }}>🔍</div>
              <h3 className="text-muted mt-3">No se encontraron productos</h3>
              <p className="text-muted">
                Intenta ajustar tus filtros de búsqueda o explora todas las categorías.
              </p>
              <Button 
                variant="outline-success"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          </Col>
        </Row>
      )}

      {/* Información adicional */}
      <Row className="mt-5 pt-4 border-top">
        <Col>
          <h3 className="text-success text-center mb-4">¿Por qué elegir nuestros productos?</h3>
        </Col>
      </Row>
      
      <Row>
        <Col md={3} className="mb-3">
          <div className="text-center">
            <div style={{ fontSize: '2rem' }}>🌱</div>
            <h5 className="mt-2">100% Natural</h5>
            <p className="small text-muted">
              Todos nuestros productos están hechos con ingredientes naturales 
              y orgánicos, sin químicos dañinos.
            </p>
          </div>
        </Col>
        
        <Col md={3} className="mb-3">
          <div className="text-center">
            <div style={{ fontSize: '2rem' }}>🚚</div>
            <h5 className="mt-2">Envío Gratis</h5>
            <p className="small text-muted">
              Envío gratuito en compras superiores a $500 MXN dentro de la 
              Ciudad de México.
            </p>
          </div>
        </Col>
        
        <Col md={3} className="mb-3">
          <div className="text-center">
            <div style={{ fontSize: '2rem' }}>✨</div>
            <h5 className="mt-2">Calidad Garantizada</h5>
            <p className="small text-muted">
              Garantizamos la calidad de todos nuestros productos. 
              Satisfacción 100% asegurada.
            </p>
          </div>
        </Col>
        
        <Col md={3} className="mb-3">
          <div className="text-center">
            <div style={{ fontSize: '2rem' }}>♻️</div>
            <h5 className="mt-2">Eco-Friendly</h5>
            <p className="small text-muted">
              Empaques reciclables y proceso de producción responsable 
              con el medio ambiente.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;