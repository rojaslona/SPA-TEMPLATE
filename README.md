# H&B SPA Jardín Balbuena - E-commerce Template

**Plantilla completa de e-commerce para spa con React, TypeScript y Bootstrap**

🌿 **Demo:** [https://tu-demo-url.com](https://tu-demo-url.com)  
📧 **Contacto:** info@hbspa.com  
🔧 **Desarrollado por:** [Tu nombre/empresa]

---

## 🎯 Descripción del Proyecto

Sistema completo de e-commerce especializado para spas y centros de bienestar. Incluye funcionalidades para:

- ✅ **Catálogo de productos** naturales con filtros y búsqueda
- ✅ **Sistema de reservas** para servicios de spa
- ✅ **Carrito de compras** persistente con localStorage
- ✅ **Panel de administración** completo con CRUD
- ✅ **Autenticación** con roles (cliente/admin)
- ✅ **Formularios** validados en español
- ✅ **Diseño responsive** con Bootstrap 5
- ✅ **Estructura backend** preparada para Java 17

---

## 🚀 Inicio Rápido

### 1. Clonar e Instalar

```bash
git clone https://github.com/rojaslona/SPA-TEMPLATE.git
cd SPA-TEMPLATE
npm install
```

### 2. Ejecutar en Desarrollo

```bash
npm start
# Abre http://localhost:3000
```

### 3. Credenciales de Prueba

**Administrador:**
- Email: `admin@hbspa.com`
- Contraseña: `admin123`

**Cliente:**
- Email: `cliente@ejemplo.com`
- Contraseña: `cliente123`

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** con TypeScript
- **Bootstrap 5** + React Bootstrap
- **React Router Dom** para navegación
- **React Hook Form** para formularios
- **Axios** para peticiones HTTP
- **CSS personalizado** con tema de spa

### Backend (Estructura preparada)
- **Java 17** LTS
- **Spring Boot 3.x**
- **Spring Security** con JWT
- **Spring Data JPA**
- **MySQL/PostgreSQL**

### Herramientas de Desarrollo
- **Create React App** como base
- **TypeScript** para tipado estático
- **ESLint** para calidad de código
- **Prettier** para formato

---

## 📁 Estructura del Proyecto

```
spa-template/
├── public/                     # Archivos públicos
├── src/
│   ├── components/            # Componentes reutilizables
│   │   ├── Layout/           # Header, Footer, Layout
│   │   ├── Forms/            # ReservationModal, etc.
│   │   └── Admin/            # Componentes del panel admin
│   ├── pages/                # Páginas principales
│   │   ├── Home.tsx         # Página de inicio
│   │   ├── Products.tsx     # Catálogo de productos
│   │   ├── Services.tsx     # Catálogo de servicios
│   │   ├── Cart.tsx         # Carrito de compras
│   │   ├── Contact.tsx      # Formulario de contacto
│   │   ├── Login.tsx        # Inicio de sesión
│   │   ├── Register.tsx     # Registro de usuario
│   │   └── AdminPanel.tsx   # Panel de administración
│   ├── hooks/                # Hooks personalizados
│   │   ├── useAuth.tsx      # Manejo de autenticación
│   │   └── useCart.tsx      # Manejo del carrito
│   ├── services/             # Servicios y APIs
│   │   └── mockData.ts      # Datos de prueba
│   ├── types/                # Definiciones TypeScript
│   └── utils/                # Utilidades
├── backend-integration/       # Estructura backend Java
│   ├── src/main/java/        # Código Java
│   ├── docs/                 # Documentación API
│   └── api-examples/         # Ejemplos de integración
├── docs/                     # Documentación del proyecto
│   ├── OWNER_MANUAL.md       # Manual del propietario
│   └── DEPLOYMENT_GUIDE.md   # Guía de despliegue
└── README.md                 # Este archivo
```

---

## 🎨 Características Principales

### 🏠 Página de Inicio
- Hero section atractivo
- Servicios destacados
- Productos populares
- Información de contacto
- Call-to-actions claros

### 🛍️ Catálogo de Productos
- Filtros por categoría
- Búsqueda en tiempo real
- Cards informativas con precios
- Stock y disponibilidad
- Agregado al carrito

### 💆‍♀️ Servicios de Spa
- Lista detallada de tratamientos
- Duración y precios
- Modal de reserva integrado
- Selección de fecha y hora
- Información del cliente

### 🛒 Carrito de Compras
- Persistencia en localStorage
- Modificación de cantidades
- Resumen de pedido
- Información de envío
- Proceso de checkout

### 📝 Formularios Completos
- **Contacto:** Con validaciones y categorías
- **Registro:** Campos completos con confirmación
- **Login:** Integrado con sistema de roles
- **Reservas:** Con calendario y horarios

### 🔐 Panel de Administración
- **Dashboard:** Estadísticas y métricas
- **Productos:** CRUD completo con validaciones
- **Servicios:** Gestión especializada
- **Pedidos:** Seguimiento de estados
- **Configuración:** Preparado para expansión

---

## 📱 Responsive Design

### Breakpoints Principales
- **Mobile:** < 768px
- **Tablet:** 768px - 1199px
- **Desktop:** ≥ 1200px

### Optimizaciones
- ✅ Navigation colapsable en móvil
- ✅ Cards apilables en pantallas pequeñas
- ✅ Formularios adaptables
- ✅ Tablas con scroll horizontal
- ✅ Botones touch-friendly

---

## 🚀 Comandos Disponibles

```bash
npm start          # Servidor de desarrollo
npm test           # Ejecutar tests
npm run build      # Build de producción
npm run eject      # Eyectar CRA (irreversible)
```

---

## 📚 Documentación Adicional

### Para Desarrolladores
- [`backend-integration/README.md`](backend-integration/README.md) - Integración Java 17
- [`backend-integration/api-examples/`](backend-integration/api-examples/) - Ejemplos de API
- [`docs/DEPLOYMENT_GUIDE.md`](docs/DEPLOYMENT_GUIDE.md) - Despliegue en producción

### Para el Propietario del Spa
- [`docs/OWNER_MANUAL.md`](docs/OWNER_MANUAL.md) - Manual completo de uso
- Incluye guías paso a paso para gestionar el sitio
- Resolución de problemas comunes
- Información de contacto técnico

---

## 🔐 Seguridad y Optimización

### Implementado
- ✅ Validación de formularios client-side
- ✅ Sanitización de inputs
- ✅ Headers de seguridad (en deployment)
- ✅ HTTPS obligatorio en producción
- ✅ Roles y permisos básicos
- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ Compresión Gzip
- ✅ Cache de assets estáticos

---

## 🎉 Características Futuras

### Próximas Versiones
- [ ] **Sistema de citas online** con calendario
- [ ] **Programa de lealtad** con puntos
- [ ] **Chat en vivo** con clientes
- [ ] **Integración WhatsApp Business**
- [ ] **Reportes avanzados** y analytics
- [ ] **App móvil** (React Native)
- [ ] **Múltiples idiomas** (i18n)
- [ ] **Pagos en línea** (Stripe, PayPal)

---

## 📞 Soporte

### Soporte Técnico
- **Email:** soporte@hbspa.com
- **Horario:** Lunes a Viernes, 9 AM - 6 PM (GMT-6)
- **Respuesta:** Máximo 24 horas

### Servicios Adicionales
- Personalización de diseño
- Integración con sistemas existentes
- Capacitación del personal
- Soporte técnico extendido

---

**¿Te gusta el proyecto? ¡Dale una ⭐ en GitHub!**

*Desarrollado con ❤️ para H&B SPA Jardín Balbuena*