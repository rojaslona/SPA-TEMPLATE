# API Examples - H&B SPA Backend

Ejemplos de uso de las APIs del backend Java 17 desde el frontend React.

## Configuración Base

### 1. Cliente HTTP (api.ts)

```typescript
// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor para agregar JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## Ejemplos por Módulo

### 1. Autenticación

```typescript
// src/services/authService.ts
import { api } from './api';
import { AuthUser, LoginForm, RegisterForm } from '../types';

interface LoginResponse {
  token: string;
  user: AuthUser;
}

export const authService = {
  // POST /api/auth/login
  async login(credentials: LoginForm): Promise<LoginResponse> {
    const response = await api.post('/auth/login', credentials);
    
    // Guardar token
    localStorage.setItem('auth-token', response.data.token);
    
    return response.data;
  },

  // POST /api/auth/register
  async register(userData: RegisterForm): Promise<LoginResponse> {
    const response = await api.post('/auth/register', userData);
    
    // Guardar token
    localStorage.setItem('auth-token', response.data.token);
    
    return response.data;
  },

  // POST /api/auth/logout
  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('auth-token');
  },

  // GET /api/auth/me
  async getCurrentUser(): Promise<AuthUser> {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// Ejemplo de uso en useAuth.tsx
const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const { user, token } = await authService.login({ email, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user } });
    return true;
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE' });
    return false;
  }
};
```

### 2. Productos y Servicios

```typescript
// src/services/productService.ts
import { api } from './api';
import { Product } from '../types';

export const productService = {
  // GET /api/products?category=servicio&available=true
  async getServices(): Promise<Product[]> {
    const response = await api.get('/products', {
      params: {
        category: 'SERVICIO',
        available: true
      }
    });
    return response.data.content; // Page<ProductDTO>
  },

  // GET /api/products?category=producto
  async getProducts(page = 0, size = 20, search?: string): Promise<{
    content: Product[];
    totalElements: number;
    totalPages: number;
  }> {
    const response = await api.get('/products', {
      params: {
        category: 'PRODUCTO',
        page,
        size,
        search
      }
    });
    return response.data;
  },

  // GET /api/products/{id}
  async getProductById(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // POST /api/products (Admin only)
  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await api.post('/products', product);
    return response.data;
  },

  // PUT /api/products/{id} (Admin only)
  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },

  // DELETE /api/products/{id} (Admin only)
  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  },

  // GET /api/products/low-stock (Admin only)
  async getLowStockProducts(threshold = 5): Promise<Product[]> {
    const response = await api.get('/products/low-stock', {
      params: { threshold }
    });
    return response.data;
  }
};

// Reemplazar mockData.ts con llamadas reales
// Antes:
// export const getProductsByCategory = (category: 'producto' | 'servicio'): Product[] => {
//   return getAllProducts().filter(product => product.category === category);
// };

// Después:
export const getProductsByCategory = async (category: 'producto' | 'servicio'): Promise<Product[]> => {
  if (category === 'servicio') {
    return await productService.getServices();
  } else {
    const result = await productService.getProducts();
    return result.content;
  }
};
```

### 3. Reservas

```typescript
// src/services/reservationService.ts
import { api } from './api';
import { Reservation, ReservationForm } from '../types';

export const reservationService = {
  // POST /api/reservations
  async createReservation(reservationData: ReservationForm): Promise<Reservation> {
    const response = await api.post('/reservations', {
      serviceId: reservationData.serviceId,
      preferredDate: reservationData.date,
      preferredTime: reservationData.time,
      customerInfo: reservationData.customerInfo,
      notes: reservationData.customerInfo.notes
    });
    return response.data;
  },

  // GET /api/reservations (usuario actual)
  async getMyReservations(): Promise<Reservation[]> {
    const response = await api.get('/reservations');
    return response.data;
  },

  // GET /api/reservations/{id}
  async getReservationById(id: string): Promise<Reservation> {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  },

  // PUT /api/reservations/{id}/status (Admin only)
  async updateReservationStatus(id: string, status: Reservation['status']): Promise<Reservation> {
    const response = await api.put(`/reservations/${id}/status`, { status });
    return response.data;
  },

  // DELETE /api/reservations/{id} (cancelar)
  async cancelReservation(id: string): Promise<void> {
    await api.delete(`/reservations/${id}`);
  },

  // GET /api/reservations/availability
  async getAvailableSlots(serviceId: string, date: string): Promise<string[]> {
    const response = await api.get('/reservations/availability', {
      params: { serviceId, date }
    });
    return response.data;
  }
};

// Actualizar ReservationModal.tsx
const onSubmit = async (data: ReservationFormData) => {
  setIsSubmitting(true);
  
  try {
    const reservation = await reservationService.createReservation(data);
    console.log('Reserva creada:', reservation);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      reset();
      onClose();
    }, 3000);
    
  } catch (error) {
    console.error('Error creando reserva:', error);
    // Mostrar error al usuario
  } finally {
    setIsSubmitting(false);
  }
};
```

### 4. Pedidos y Carrito

```typescript
// src/services/orderService.ts
import { api } from './api';
import { Order, CartItem } from '../types';

interface CreateOrderData {
  items: CartItem[];
  shippingAddress?: string;
  notes?: string;
}

export const orderService = {
  // POST /api/orders
  async createOrder(orderData: CreateOrderData): Promise<Order> {
    const response = await api.post('/orders', {
      items: orderData.items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        selectedDate: item.selectedDate,
        selectedTime: item.selectedTime
      })),
      shippingAddress: orderData.shippingAddress,
      notes: orderData.notes
    });
    return response.data;
  },

  // GET /api/orders (usuario actual)
  async getMyOrders(): Promise<Order[]> {
    const response = await api.get('/orders');
    return response.data;
  },

  // GET /api/orders/{id}
  async getOrderById(id: string): Promise<Order> {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // PUT /api/orders/{id}/status (Admin only)
  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  }
};

// Actualizar Cart.tsx para integrar con backend
const handleCheckout = async () => {
  try {
    setIsProcessing(true);
    
    const orderData: CreateOrderData = {
      items: items,
      shippingAddress: 'Dirección del usuario', // Obtener del formulario
      notes: 'Notas adicionales'
    };
    
    const order = await orderService.createOrder(orderData);
    
    // Limpiar carrito después del checkout exitoso
    clearCart();
    
    // Redirigir a página de confirmación
    navigate(`/order-confirmation/${order.id}`);
    
  } catch (error) {
    console.error('Error al procesar pedido:', error);
    // Mostrar error al usuario
  } finally {
    setIsProcessing(false);
  }
};
```

### 5. Contacto

```typescript
// src/services/contactService.ts
import { api } from './api';
import { ContactForm } from '../types';

export const contactService = {
  // POST /api/contact
  async sendContactMessage(contactData: ContactForm): Promise<void> {
    await api.post('/contact', contactData);
  }
};

// Actualizar Contact.tsx
const onSubmit = async (data: ContactFormData) => {
  setIsSubmitting(true);
  
  try {
    await contactService.sendContactMessage(data);
    setShowSuccess(true);
    reset();
    
    setTimeout(() => setShowSuccess(false), 5000);
    
  } catch (error) {
    console.error('Error enviando mensaje:', error);
    setShowError(true);
  } finally {
    setIsSubmitting(false);
  }
};
```

## Manejo de Errores

```typescript
// src/utils/errorHandler.ts
import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status: number;
  field?: string;
}

export const handleApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    return {
      message: error.response.data?.message || 'Error del servidor',
      status: error.response.status,
      field: error.response.data?.field
    };
  } else if (error.request) {
    return {
      message: 'No se pudo conectar con el servidor',
      status: 0
    };
  } else {
    return {
      message: 'Error inesperado',
      status: 0
    };
  }
};

// Hook personalizado para manejo de errores
export const useApiError = () => {
  const [error, setError] = useState<ApiError | null>(null);
  
  const handleError = (err: AxiosError) => {
    const apiError = handleApiError(err);
    setError(apiError);
  };
  
  const clearError = () => setError(null);
  
  return { error, handleError, clearError };
};
```

## Testing con Mock Service Worker

```typescript
// src/mocks/handlers.ts
import { rest } from 'msw';
import { mockProducts, mockServices } from './data';

export const handlers = [
  // Productos
  rest.get('/api/products', (req, res, ctx) => {
    const category = req.url.searchParams.get('category');
    
    if (category === 'SERVICIO') {
      return res(ctx.json({ content: mockServices }));
    }
    
    return res(ctx.json({ content: mockProducts }));
  }),
  
  // Autenticación
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        token: 'mock-jwt-token',
        user: { id: '1', email: 'test@example.com', name: 'Test User' }
      })
    );
  }),
  
  // Otras rutas...
];

// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

Esta estructura permite una transición suave de datos mock a APIs reales del backend Java 17.