# H&B SPA Jardín Balbuena - Template E-commerce

## 🌸 Descripción

Template completo de e-commerce para el spa de belleza "H&B SPA Jardín Balbuena" desarrollado con React y Bootstrap. Incluye todas las funcionalidades necesarias para un spa moderno con sistema de reservas, catálogo de productos, carrito de compras y panel administrativo.

## ✨ Características Principales

### 🎨 Diseño y UX/UI
- **Paleta de colores personalizada**: Light Pink (#F5C7D1), Mauve (#C9BDD5), Teal Green (#5B9AA1), Light Blue (#B3D6DE), Lime Green (#A5D68D)
- **Diseño responsive**: Optimizado para móvil y escritorio
- **Tema oscuro/claro**: Alternancia de temas con persistencia
- **Animaciones suaves**: Transiciones y efectos visuales refinados
- **Bootstrap 5.3.2**: Framework CSS moderno vía CDN

### 🏪 Funcionalidades E-commerce
- **Catálogo de productos**: Organizado por categorías con filtros y búsqueda
- **Carrito de compras**: Gestión completa con cálculos automáticos
- **Sistema de promociones**: Códigos de descuento y ofertas especiales
- **Checkout simulado**: Integración preparada para pasarelas de pago
- **Seguridad HTTPS**: Placeholder para implementación de seguridad

### 📅 Sistema de Reservas
- **Reserva de citas**: Formulario completo con validaciones
- **Gestión de servicios**: Catálogo de tratamientos de belleza
- **Calendario de disponibilidad**: Sistema de horarios y fechas
- **Confirmaciones automáticas**: Notificaciones y recordatorios

### 👥 Gestión de Usuarios
- **Sistema de autenticación**: Login y registro de usuarios
- **Cuentas demo**: Usuario cliente y administrador para pruebas
- **Perfiles de usuario**: Gestión de información personal
- **Roles y permisos**: Diferenciación entre clientes y administradores

### 🔧 Panel de Administración
- **Dashboard completo**: Métricas y estadísticas en tiempo real
- **Gestión de productos**: CRUD completo con actualización de precios
- **Gestión de servicios**: Control de tratamientos y tarifas
- **Monitoreo de reservas**: Calendario y estado de citas
- **Análisis y reportes**: Métricas de ventas y rendimiento

## 📱 Páginas Incluidas

1. **Inicio**: Hero section, servicios destacados, productos populares, promociones
2. **Productos**: Catálogo completo con filtros por categoría y búsqueda
3. **Servicios**: Tratamientos faciales, corporales, capilares y especiales
4. **Reservas**: Sistema completo de reserva de citas
5. **Nosotros**: Misión, visión, valores, equipo profesional
6. **Contacto**: Formulario, información de contacto, FAQ
7. **Carrito**: Gestión de compras con checkout simulado
8. **Login**: Autenticación y registro de usuarios
9. **Admin**: Panel administrativo completo

## 🛠️ Tecnologías Utilizadas

- **React 18.2.0**: Biblioteca JavaScript para interfaces de usuario
- **Bootstrap 5.3.2**: Framework CSS responsive
- **Bootstrap Icons**: Iconografía completa
- **Babel Standalone**: Transformación JSX en el navegador
- **HTML5 Semántico**: Estructura accesible y SEO-friendly
- **CSS3 Custom Properties**: Variables CSS para temas
- **JavaScript ES6+**: Funcionalidades modernas

## 🚀 Instalación y Uso

### Requisitos Previos
- Python 3.x (para servidor local)
- Navegador web moderno
- Conexión a internet (para CDNs)

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/rojaslona/SPA-TEMPLATE.git

# Navegar al directorio
cd SPA-TEMPLATE

# Iniciar servidor local
python3 -m http.server 8000

# O usar npm si tienes Node.js
npm start
```

### Acceso
- **Sitio web**: http://localhost:8000
- **Usuario demo cliente**: maria@email.com
- **Usuario demo admin**: admin@hbspa.com.mx

## 🎯 Funcionalidades por Página

### 🏠 Página de Inicio
- Hero section con llamadas a la acción
- Servicios destacados con precios
- Productos populares con descuentos
- Promociones especiales rotativas

### 🛍️ Catálogo de Productos
- 11 productos organizados en 6 categorías
- Filtros por categoría y búsqueda
- Información detallada con beneficios
- Integración directa con carrito

### 💆‍♀️ Servicios de Spa
- 10 servicios profesionales organizados por tipo
- Información detallada de procesos y beneficios
- Precios y duración claramente especificados
- Promociones especiales y paquetes

### 📅 Sistema de Reservas
- Formulario completo con validaciones
- Selección de servicios, fechas y horarios
- Información de contacto y notas especiales
- Confirmación automática por WhatsApp

### 👥 Página Nosotros
- Historia y trayectoria del spa
- Misión, visión y valores corporativos
- Equipo profesional con especialidades
- Línea de tiempo con hitos importantes

### 📞 Contacto
- Formulario de contacto con categorías
- Información completa de ubicación
- Integración con redes sociales
- FAQ con preguntas frecuentes

### 🛒 Carrito de Compras
- Gestión completa de productos
- Códigos promocionales funcionales
- Cálculo automático de envío y descuentos
- Checkout simulado con opciones de pago

### 🔐 Autenticación
- Login y registro de usuarios
- Validaciones de seguridad
- Cuentas demo para pruebas
- Información de protección de datos

### ⚙️ Panel Administrativo
- Dashboard con métricas clave
- CRUD completo de productos y servicios
- Gestión de reservas y calendario
- Análisis de ventas y rendimiento

## 🎨 Personalización

### Colores de Marca
```css
:root {
    --light-pink: #F5C7D1;
    --mauve: #C9BDD5;
    --teal-green: #5B9AA1;
    --light-blue: #B3D6DE;
    --lime-green: #A5D68D;
}
```

### Temas
- Tema claro (predeterminado)
- Tema oscuro con toggle manual
- Persistencia de preferencias

## 🔌 Integraciones Preparadas

### Sistemas de Pago
- PayPal
- Stripe
- Mercado Pago
- Tarjetas de crédito/débito
- Transferencias bancarias
- Pagos en efectivo (OXXO)

### Backend Java 17
- APIs REST preparadas para integración
- Estructura de datos compatible
- Endpoints documentados para Postman
- Autenticación JWT lista para implementar

### Servicios Externos
- Google Maps para ubicación
- Google Analytics para métricas
- WhatsApp Business API
- Sistemas de email marketing
- Redes sociales

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: sm (576px), md (768px), lg (992px), xl (1200px)
- **Navegación adaptativa**: Menú hamburguesa en móviles
- **Imágenes responsive**: Optimización automática de contenido visual
- **Touch-friendly**: Botones y elementos táctiles apropiados

## 🔒 Seguridad

- **HTTPS**: Preparado para certificados SSL
- **Validación de formularios**: Frontend y preparado para backend
- **Sanitización de datos**: Prevención de XSS
- **Autenticación segura**: Tokens y sesiones protegidas
- **GDPR Compliance**: Cumplimiento de protección de datos

## 📊 Análiticas y Métricas

- **Ventas mensuales**: Tracking de ingresos
- **Reservas activas**: Monitoreo de citas
- **Productos populares**: Análisis de ventas
- **Calificaciones**: Sistema de ratings de clientes
- **Conversiones**: Análisis de embudo de ventas

## 🌍 Idioma y Localización

- **Español completo**: UI, contenido y mensajes
- **Moneda local**: Precios en pesos mexicanos (MXN)
- **Formato de fechas**: DD/MM/YYYY
- **Números de teléfono**: Formato mexicano
- **Direcciones**: Sistema postal mexicano

## 🤝 Contribuciones

Este es un template comercial para H&B SPA Jardín Balbuena. Para contribuciones o mejoras:

1. Fork del repositorio
2. Crear rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

- **Email**: info@hbspa.com.mx
- **WhatsApp**: +52 55 1234-5678
- **Ubicación**: Jardín Balbuena, Ciudad de México

## 🔄 Actualizaciones

### Versión 1.0.0 (Diciembre 2024)
- ✅ Lanzamiento inicial completo
- ✅ Todas las páginas implementadas
- ✅ Sistema de carrito funcional
- ✅ Panel administrativo completo
- ✅ Tema oscuro/claro
- ✅ Diseño responsive
- ✅ Integraciones preparadas

---

**H&B SPA Jardín Balbuena** - *Tu destino de belleza y bienestar* 🌸