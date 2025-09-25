# Backend Integration - H&B SPA Jardín Balbuena

Este directorio contiene la estructura base y documentación para la integración del backend Java 17 con el frontend React del sistema H&B SPA.

## Estructura del Proyecto

```
backend-integration/
├── src/main/java/com/hbspa/          # Código fuente Java
│   ├── controller/                    # Controladores REST
│   ├── model/                        # Entidades y DTOs
│   ├── service/                      # Lógica de negocio
│   ├── repository/                   # Acceso a datos
│   └── config/                       # Configuración
├── docs/                             # Documentación de API
├── api-examples/                     # Ejemplos de uso
└── README.md                         # Este archivo
```

## Stack Tecnológico Recomendado

- **Java 17** (LTS)
- **Spring Boot 3.x** 
- **Spring Data JPA** (Base de datos)
- **Spring Security** (Autenticación y autorización)
- **MySQL/PostgreSQL** (Base de datos principal)
- **Redis** (Cache y sesiones)
- **Maven** (Gestión de dependencias)

## APIs Definidas

### 1. Autenticación (`/api/auth`)
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Información del usuario actual

### 2. Productos (`/api/products`)
- `GET /api/products` - Listar productos
- `GET /api/products/{id}` - Obtener producto por ID
- `POST /api/products` - Crear producto (admin)
- `PUT /api/products/{id}` - Actualizar producto (admin)
- `DELETE /api/products/{id}` - Eliminar producto (admin)

### 3. Servicios (`/api/services`)
- `GET /api/services` - Listar servicios
- `GET /api/services/{id}` - Obtener servicio por ID
- `POST /api/services` - Crear servicio (admin)
- `PUT /api/services/{id}` - Actualizar servicio (admin)
- `DELETE /api/services/{id}` - Eliminar servicio (admin)

### 4. Reservas (`/api/reservations`)
- `GET /api/reservations` - Listar reservas del usuario
- `POST /api/reservations` - Crear nueva reserva
- `GET /api/reservations/{id}` - Obtener reserva por ID
- `PUT /api/reservations/{id}/status` - Actualizar estado (admin)
- `DELETE /api/reservations/{id}` - Cancelar reserva

### 5. Pedidos (`/api/orders`)
- `GET /api/orders` - Listar pedidos del usuario
- `POST /api/orders` - Crear nuevo pedido
- `GET /api/orders/{id}` - Obtener pedido por ID
- `PUT /api/orders/{id}/status` - Actualizar estado (admin)

### 6. Contacto (`/api/contact`)
- `POST /api/contact` - Enviar mensaje de contacto

## Instalación y Configuración

### 1. Crear proyecto Spring Boot

```bash
# Usando Spring Initializr
curl https://start.spring.io/starter.zip \
  -d dependencies=web,data-jpa,security,mysql,data-redis,validation \
  -d type=maven-project \
  -d language=java \
  -d bootVersion=3.2.0 \
  -d baseDir=hb-spa-backend \
  -d groupId=com.hbspa \
  -d artifactId=spa-backend \
  -d name=hb-spa-backend \
  -d description="H&B SPA Backend API" \
  -d packageName=com.hbspa \
  -d packaging=jar \
  -d javaVersion=17 \
  -o hb-spa-backend.zip

unzip hb-spa-backend.zip
cd hb-spa-backend
```

### 2. Configuración de Base de Datos

Archivo `application.yml`:

```yaml
spring:
  application:
    name: hb-spa-backend
  
  datasource:
    url: jdbc:mysql://localhost:3306/hb_spa?useSSL=false&serverTimezone=UTC
    username: ${DB_USER:root}
    password: ${DB_PASSWORD:password}
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true
  
  redis:
    host: ${REDIS_HOST:localhost}
    port: ${REDIS_PORT:6379}
    password: ${REDIS_PASSWORD:}
    
  security:
    jwt:
      secret: ${JWT_SECRET:your-256-bit-secret-key-here}
      expiration: 86400000 # 24 hours

server:
  port: 8080
  
logging:
  level:
    com.hbspa: INFO
    org.springframework.web: DEBUG
```

### 3. CORS Configuration

Para permitir conexiones desde el frontend React:

```java
@Configuration
@EnableWebSecurity
public class CorsConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
```

## Integración con Frontend

### Configuración de Axios

En el frontend React, configurar Axios para conectar con el backend:

```javascript
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
```

### Variables de Entorno

Crear archivo `.env` en el frontend:

```bash
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENVIRONMENT=development
```

## Siguientes Pasos

1. **Implementar modelos JPA** basados en los tipos TypeScript del frontend
2. **Crear repositorios** para acceso a datos
3. **Implementar servicios** con lógica de negocio
4. **Desarrollar controladores REST** con validaciones
5. **Configurar seguridad** con JWT
6. **Agregar tests unitarios** e integración
7. **Documentar APIs** con Swagger/OpenAPI
8. **Configurar deployment** con Docker

## Contacto

Para dudas sobre la integración backend, contactar al equipo de desarrollo.