import type { Product, Service } from '../types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Crema Hidratante Anti-Edad',
    description: 'Crema facial hidratante con propiedades anti-edad, perfecta para todo tipo de piel.',
    price: 850,
    category: 'facial',
    image: '/images/products/crema-hidratante.jpg',
    images: ['/images/products/crema-hidratante.jpg'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 124,
    benefits: [
      'Reduce líneas de expresión',
      'Hidratación profunda de 24 horas',
      'Mejora la elasticidad de la piel',
      'Ingredientes naturales'
    ],
    ingredients: [
      'Ácido hialurónico',
      'Colágeno hidrolizado',
      'Vitamina E',
      'Extracto de aloe vera'
    ],
    howToUse: 'Aplicar mañana y noche sobre rostro limpio con movimientos ascendentes.'
  },
  {
    id: '2',
    name: 'Sérum Vitamina C',
    description: 'Sérum concentrado de vitamina C para iluminar y proteger la piel del daño oxidativo.',
    price: 650,
    category: 'facial',
    image: '/images/products/serum-vitamina-c.jpg',
    images: ['/images/products/serum-vitamina-c.jpg'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 89,
    benefits: [
      'Ilumina el rostro',
      'Protección antioxidante',
      'Estimula la producción de colágeno',
      'Unifica el tono de la piel'
    ],
    ingredients: [
      'Vitamina C estabilizada',
      'Ácido ferúlico',
      'Vitamina E',
      'Extracto de rosa mosqueta'
    ],
    howToUse: 'Aplicar por las mañanas sobre piel limpia, antes de la crema hidratante.'
  },
  {
    id: '3',
    name: 'Exfoliante Corporal Natural',
    description: 'Exfoliante corporal con ingredientes naturales para una piel suave y renovada.',
    price: 450,
    category: 'corporal',
    image: '/images/products/exfoliante-corporal.jpg',
    images: ['/images/products/exfoliante-corporal.jpg'],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 67,
    benefits: [
      'Elimina células muertas',
      'Estimula la circulación',
      'Suaviza la piel',
      'Prepara para tratamientos'
    ],
    ingredients: [
      'Sal marina',
      'Aceite de coco',
      'Extracto de café',
      'Aceites esenciales'
    ],
    howToUse: 'Aplicar sobre piel húmeda con movimientos circulares. Enjuagar con agua tibia.'
  },
  {
    id: '4',
    name: 'Shampoo Nutritivo Capilar',
    description: 'Shampoo nutritivo especial para cabello dañado y con tendencia a la sequedad.',
    price: 380,
    category: 'capilar',
    image: '/images/products/shampoo-nutritivo.jpg',
    images: ['/images/products/shampoo-nutritivo.jpg'],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 145,
    benefits: [
      'Nutre profundamente',
      'Repara el cabello dañado',
      'Aporta brillo natural',
      'Fortalece desde la raíz'
    ],
    ingredients: [
      'Keratina hidrolizada',
      'Aceite de argán',
      'Proteínas de seda',
      'Extracto de bambú'
    ],
    howToUse: 'Aplicar sobre cabello húmedo, masajear y enjuagar. Repetir si es necesario.'
  },
  {
    id: '5',
    name: 'Base de Maquillaje Natural',
    description: 'Base de maquillaje con cobertura natural y protección solar SPF 30.',
    price: 720,
    category: 'maquillaje',
    image: '/images/products/base-maquillaje.jpg',
    images: ['/images/products/base-maquillaje.jpg'],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 203,
    benefits: [
      'Cobertura natural',
      'Protección solar SPF 30',
      'Larga duración',
      'No comedogénico'
    ],
    ingredients: [
      'Óxido de zinc',
      'Dióxido de titanio',
      'Ácido hialurónico',
      'Vitamina E'
    ],
    howToUse: 'Aplicar con esponja o pincel sobre rostro limpio e hidratado.'
  }
];

export const sampleServices: Service[] = [
  {
    id: '1',
    name: 'Limpieza Facial Profunda',
    description: 'Tratamiento completo de limpieza facial con extracción de comedones y aplicación de mascarilla purificante.',
    price: 1200,
    duration: 90,
    category: 'facial',
    image: '/images/services/limpieza-facial.jpg',
    benefits: [
      'Elimina impurezas profundas',
      'Desobstruye poros',
      'Mejora textura de la piel',
      'Hidratación profunda'
    ],
    featured: true,
    available: true
  },
  {
    id: '2',
    name: 'Masaje Relajante Completo',
    description: 'Masaje corporal completo con aceites esenciales para aliviar tensiones y promover la relajación.',
    price: 1800,
    duration: 120,
    category: 'masajes',
    image: '/images/services/masaje-relajante.jpg',
    benefits: [
      'Reduce estrés y tensión',
      'Mejora circulación',
      'Relaja músculos',
      'Promueve bienestar general'
    ],
    featured: true,
    available: true
  },
  {
    id: '3',
    name: 'Tratamiento Corporal Reafirmante',
    description: 'Tratamiento especializado para reafirmar y tonificar la piel del cuerpo con productos específicos.',
    price: 2200,
    duration: 150,
    category: 'corporal',
    image: '/images/services/tratamiento-reafirmante.jpg',
    benefits: [
      'Reafirma la piel',
      'Mejora elasticidad',
      'Reduce flacidez',
      'Tonifica músculos'
    ],
    featured: false,
    available: true
  },
  {
    id: '4',
    name: 'Depilación con Cera Completa',
    description: 'Servicio de depilación con cera de alta calidad, incluye piernas, axilas y bikini.',
    price: 900,
    duration: 60,
    category: 'depilacion',
    image: '/images/services/depilacion-cera.jpg',
    benefits: [
      'Resultado duradero',
      'Piel suave y lisa',
      'Cera hipoalergénica',
      'Técnica profesional'
    ],
    featured: false,
    available: true
  },
  {
    id: '5',
    name: 'Manicure Completo con Gel',
    description: 'Manicure profesional con aplicación de esmalte en gel de larga duración.',
    price: 450,
    duration: 75,
    category: 'manicure',
    image: '/images/services/manicure-gel.jpg',
    benefits: [
      'Duración hasta 3 semanas',
      'Acabado profesional',
      'Cuidado de cutículas',
      'Amplia gama de colores'
    ],
    featured: true,
    available: true
  },
  {
    id: '6',
    name: 'Pedicure Spa Completo',
    description: 'Tratamiento completo de pedicure con exfoliación, hidratación y esmaltado.',
    price: 550,
    duration: 90,
    category: 'pedicure',
    image: '/images/services/pedicure-spa.jpg',
    benefits: [
      'Exfoliación profunda',
      'Hidratación intensiva',
      'Cuidado de uñas',
      'Masaje relajante'
    ],
    featured: false,
    available: true
  }
];

export const productCategories = [
  { id: 'facial', name: 'Cuidado Facial', icon: 'person-circle' },
  { id: 'corporal', name: 'Cuidado Corporal', icon: 'person-standing' },
  { id: 'capilar', name: 'Cuidado Capilar', icon: 'scissors' },
  { id: 'maquillaje', name: 'Maquillaje', icon: 'palette' },
  { id: 'perfumeria', name: 'Perfumería', icon: 'flower1' },
  { id: 'accesorios', name: 'Accesorios', icon: 'bag' }
];

export const serviceCategories = [
  { id: 'facial', name: 'Tratamientos Faciales', icon: 'person-circle' },
  { id: 'corporal', name: 'Tratamientos Corporales', icon: 'person-standing' },
  { id: 'masajes', name: 'Masajes', icon: 'hand-thumbs-up' },
  { id: 'depilacion', name: 'Depilación', icon: 'scissors' },
  { id: 'manicure', name: 'Manicure', icon: 'hand-index' },
  { id: 'pedicure', name: 'Pedicure', icon: 'foot-print' },
  { id: 'tratamientos-especiales', name: 'Tratamientos Especiales', icon: 'star' }
];