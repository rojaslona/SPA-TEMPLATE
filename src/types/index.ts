export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  images: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
  benefits?: string[];
  ingredients?: string[];
  howToUse?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: ServiceCategory;
  image: string;
  benefits: string[];
  featured: boolean;
  available: boolean;
}

export interface CartItem {
  id: string;
  type: 'product' | 'service';
  item: Product | Service;
  quantity: number;
  selectedDate?: Date;
  selectedTime?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  service: Service;
  date: Date;
  time: string;
  status: BookingStatus;
  notes?: string;
  createdAt: Date;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}

export type ProductCategory = 
  | 'facial'
  | 'corporal'
  | 'capilar'
  | 'maquillaje'
  | 'perfumeria'
  | 'accesorios';

export type ServiceCategory = 
  | 'facial'
  | 'corporal'
  | 'masajes'
  | 'depilacion'
  | 'manicure'
  | 'pedicure'
  | 'tratamientos-especiales';

export type BookingStatus = 
  | 'pendiente'
  | 'confirmada'
  | 'completada'
  | 'cancelada';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}