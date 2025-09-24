// Tipos para la aplicación H&B SPA Jardín Balbuena

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'producto' | 'servicio';
  imageUrl: string;
  stock: number;
  duration?: number; // Para servicios en minutos
  available: boolean;
}

export interface Service extends Product {
  category: 'servicio';
  duration: number;
  therapistRequired: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedDate?: Date; // Para reservas de servicios
  selectedTime?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface Reservation {
  id: string;
  customer: Customer;
  service: Service;
  date: Date;
  time: string;
  status: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  notes?: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  status: 'pendiente' | 'confirmada' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';
  createdAt: Date;
  shippingAddress?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  isAuthenticated: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface ReservationForm {
  serviceId: string;
  date: string;
  time: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    notes?: string;
  };
}