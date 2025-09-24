import { Product, Service } from '../types';

export const sampleServices: Service[] = [
  {
    id: 'service-1',
    name: 'Masaje Relajante Completo',
    description: 'Masaje de cuerpo completo con aceites esenciales para liberar tensiones y reducir el estrés. Incluye aromaterapia personalizada.',
    price: 800,
    category: 'servicio',
    imageUrl: '/images/masaje-relajante.jpg',
    stock: 1,
    duration: 90,
    available: true,
    therapistRequired: true
  },
  {
    id: 'service-2',
    name: 'Tratamiento Facial Anti-Edad',
    description: 'Tratamiento facial rejuvenecedor con productos naturales. Incluye limpieza profunda, exfoliación y mascarilla hidratante.',
    price: 650,
    category: 'servicio',
    imageUrl: '/images/facial-antiedad.jpg',
    stock: 1,
    duration: 75,
    available: true,
    therapistRequired: true
  },
  {
    id: 'service-3',
    name: 'Aromaterapia y Relajación',
    description: 'Sesión de aromaterapia con aceites esenciales seleccionados según tu estado emocional. Incluye música relajante y ambiente climatizado.',
    price: 500,
    category: 'servicio',
    imageUrl: '/images/aromaterapia.jpg',
    stock: 1,
    duration: 60,
    available: true,
    therapistRequired: true
  },
  {
    id: 'service-4',
    name: 'Masaje con Piedras Calientes',
    description: 'Masaje terapéutico utilizando piedras volcánicas calientes para relajar músculos y mejorar la circulación.',
    price: 900,
    category: 'servicio',
    imageUrl: '/images/piedras-calientes.jpg',
    stock: 1,
    duration: 100,
    available: true,
    therapistRequired: true
  },
  {
    id: 'service-5',
    name: 'Exfoliación Corporal',
    description: 'Exfoliación completa del cuerpo con sales marinas y aceites naturales. Deja la piel suave y renovada.',
    price: 450,
    category: 'servicio',
    imageUrl: '/images/exfoliacion.jpg',
    stock: 1,
    duration: 45,
    available: true,
    therapistRequired: true
  },
  {
    id: 'service-6',
    name: 'Reflexología Podal',
    description: 'Masaje terapéutico en los pies que estimula puntos de acupresión para mejorar la salud general del cuerpo.',
    price: 400,
    category: 'servicio',
    imageUrl: '/images/reflexologia.jpg',
    stock: 1,
    duration: 50,
    available: true,
    therapistRequired: true
  }
];

export const sampleProducts: Product[] = [
  {
    id: 'product-1',
    name: 'Aceite Esencial de Lavanda',
    description: 'Aceite esencial 100% puro de lavanda francesa. Perfecto para aromaterapia, masajes y relajación. Frasco de 15ml.',
    price: 320,
    category: 'producto',
    imageUrl: '/images/aceite-lavanda.jpg',
    stock: 25,
    available: true
  },
  {
    id: 'product-2',
    name: 'Vela Aromática de Eucalipto',
    description: 'Vela artesanal con cera de soya y aceite esencial de eucalipto. Duración aproximada de 40 horas. Ideal para crear ambiente relajante.',
    price: 250,
    category: 'producto',
    imageUrl: '/images/vela-eucalipto.jpg',
    stock: 15,
    available: true
  },
  {
    id: 'product-3',
    name: 'Jabón Artesanal de Miel y Avena',
    description: 'Jabón natural hecho a mano con miel orgánica y avena. Ideal para pieles sensibles. Sin parabenos ni sulfatos.',
    price: 150,
    category: 'producto',
    imageUrl: '/images/jabon-miel-avena.jpg',
    stock: 30,
    available: true
  },
  {
    id: 'product-4',
    name: 'Crema Hidratante de Aloe Vera',
    description: 'Crema corporal hidratante con aloe vera puro y vitamina E. Perfecta para después del baño o exposición solar. Frasco de 250ml.',
    price: 380,
    category: 'producto',
    imageUrl: '/images/crema-aloe.jpg',
    stock: 20,
    available: true
  },
  {
    id: 'product-5',
    name: 'Sales de Baño Relajantes',
    description: 'Mezcla de sales marinas con aceites esenciales de lavanda y manzanilla. Perfectas para un baño relajante. Presentación de 500g.',
    price: 200,
    category: 'producto',
    imageUrl: '/images/sales-bano.jpg',
    stock: 18,
    available: true
  },
  {
    id: 'product-6',
    name: 'Aceite Esencial de Menta',
    description: 'Aceite esencial puro de menta. Refrescante y energizante. Ideal para masajes y aromaterapia. Frasco de 10ml.',
    price: 280,
    category: 'producto',
    imageUrl: '/images/aceite-menta.jpg',
    stock: 22,
    available: true
  },
  {
    id: 'product-7',
    name: 'Exfoliante Corporal de Café',
    description: 'Exfoliante natural con granos de café molido, aceite de coco y azúcar morena. Estimula la circulación y suaviza la piel.',
    price: 220,
    category: 'producto',
    imageUrl: '/images/exfoliante-cafe.jpg',
    stock: 12,
    available: true
  },
  {
    id: 'product-8',
    name: 'Difusor de Aromas de Bambú',
    description: 'Difusor ultrasónico de bambú para aceites esenciales. Incluye 7 colores de LED y temporizador automático.',
    price: 850,
    category: 'producto',
    imageUrl: '/images/difusor-bambu.jpg',
    stock: 8,
    available: true
  }
];

export const getAllProducts = (): Product[] => {
  return [...sampleServices, ...sampleProducts];
};

export const getProductById = (id: string): Product | undefined => {
  return getAllProducts().find(product => product.id === id);
};

export const getProductsByCategory = (category: 'producto' | 'servicio'): Product[] => {
  return getAllProducts().filter(product => product.category === category);
};