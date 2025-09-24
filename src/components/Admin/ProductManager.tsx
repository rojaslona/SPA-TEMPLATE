import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { getProductsByCategory } from '../../services/mockData';
import { Product } from '../../types';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  available: boolean;
}

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(getProductsByCategory('producto'));
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
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
  } = useForm<ProductFormData>();

  const showAlertMessage = (message: string, variant: string = 'success') => {
    setShowAlert({ show: true, message, variant });
    setTimeout(() => setShowAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    reset();
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setValue('name', product.name);
    setValue('description', product.description);
    setValue('price', product.price);
    setValue('stock', product.stock);
    setValue('available', product.available);
    setShowModal(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== productId));
      showAlertMessage('Producto eliminado exitosamente');
    }
  };

  const onSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      // Editar producto existente
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...data, imageUrl: p.imageUrl, category: p.category as 'producto' }
          : p
      );
      setProducts(updatedProducts);
      showAlertMessage('Producto actualizado exitosamente');
    } else {
      // Agregar nuevo producto
      const newProduct: Product = {
        id: `product-${Date.now()}`,
        ...data,
        category: 'producto',
        imageUrl: `/images/product-${Date.now()}.jpg`
      };
      setProducts([...products, newProduct]);
      showAlertMessage('Producto agregado exitosamente');
    }
    
    setShowModal(false);
    reset();
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

  return (
    <>
      {showAlert.show && (
        <Alert variant={showAlert.variant} dismissible onClose={() => setShowAlert({...showAlert, show: false})}>
          {showAlert.message}
        </Alert>
      )}

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">📦 Gestión de Productos</h5>
          <Button variant="success" onClick={handleAddProduct}>
            ➕ Agregar Producto
          </Button>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <span style={{ fontSize: '1.5rem' }} className="me-2">
                          {getProductIcon(product.name)}
                        </span>
                        <strong>{product.name}</strong>
                      </div>
                    </td>
                    <td>
                      <small className="text-muted">
                        {product.description.length > 50 
                          ? `${product.description.substring(0, 50)}...`
                          : product.description
                        }
                      </small>
                    </td>
                    <td>
                      <strong className="text-success">
                        ${product.price.toLocaleString()} MXN
                      </strong>
                    </td>
                    <td>
                      <Badge bg={product.stock <= 5 ? 'warning' : 'success'}>
                        {product.stock} unidades
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={product.available ? 'success' : 'danger'}>
                        {product.available ? 'Disponible' : 'No disponible'}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          ✏️
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
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
          
          {products.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">No hay productos registrados</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modal para agregar/editar producto */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del producto *</Form.Label>
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
                  <Form.Label>Stock *</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    {...register('stock', { 
                      required: 'El stock es obligatorio',
                      min: { value: 0, message: 'El stock no puede ser negativo' }
                    })}
                    isInvalid={!!errors.stock}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.stock?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Producto disponible"
                {...register('available')}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="success" type="submit">
                {editingProduct ? 'Actualizar' : 'Agregar'} Producto
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductManager;