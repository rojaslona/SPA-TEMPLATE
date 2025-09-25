# Guía de Despliegue - H&B SPA Template

**Instrucciones para poner en producción la aplicación**

---

## 📋 Requisitos del Servidor

### Frontend (React)
- **Node.js:** 18.x o superior
- **npm/yarn:** Última versión
- **Servidor web:** Nginx o Apache
- **SSL:** Certificado HTTPS obligatorio

### Backend (Java - Opcional)
- **Java:** 17 LTS
- **Maven:** 3.8+
- **Base de datos:** MySQL 8.0+ o PostgreSQL 13+
- **Redis:** 6.0+ (para cache)
- **Servidor:** Tomcat 10+ o servidor embebido Spring Boot

### Recursos Mínimos
- **RAM:** 2GB (frontend) + 4GB (backend)
- **CPU:** 2 cores
- **Almacenamiento:** 20GB SSD
- **Ancho de banda:** Ilimitado recomendado

---

## 🚀 Despliegue del Frontend

### Opción 1: Vercel (Recomendado para inicio)

1. **Configurar repositorio Git**
```bash
git remote add origin https://github.com/rojaslona/SPA-TEMPLATE.git
git push -u origin main
```

2. **Conectar con Vercel**
- Visite [vercel.com](https://vercel.com)
- Importe su repositorio
- Configure variables de entorno:
  ```
  REACT_APP_API_URL=https://api.hbspa.com
  REACT_APP_ENVIRONMENT=production
  ```

3. **Dominio personalizado**
- Agregue su dominio en Vercel
- Configure DNS apuntando a Vercel

### Opción 2: Servidor Propio con Nginx

1. **Construcción de producción**
```bash
cd /home/usuario/spa-template
npm run build
```

2. **Configuración de Nginx**
```nginx
server {
    listen 80;
    server_name hbspa.com www.hbspa.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name hbspa.com www.hbspa.com;
    
    ssl_certificate /path/to/certificate.pem;
    ssl_certificate_key /path/to/private.key;
    
    root /var/www/spa-template/build;
    index index.html;
    
    # React Router - SPA support
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Compresión Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Headers de seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Cache para archivos estáticos
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. **Deploy automático con GitHub Actions**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        REACT_APP_API_URL: ${{ secrets.REACT_APP_API_URL }}
        REACT_APP_ENVIRONMENT: production
    
    - name: Deploy to server
      uses: easingthemes/ssh-deploy@v2.1.5
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
        REMOTE_USER: ${{ secrets.REMOTE_USER }}
        SOURCE: "build/"
        TARGET: "/var/www/spa-template/"
    
    - name: Restart Nginx
      uses: appleboy/ssh-action@v0.1.4
      with:
        host: ${{ secrets.REMOTE_HOST }}
        username: ${{ secrets.REMOTE_USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: sudo systemctl reload nginx
```

---

## 🔧 Configuración de Variables de Entorno

### Archivo .env.production
```bash
# API Configuration
REACT_APP_API_URL=https://api.hbspa.com
REACT_APP_ENVIRONMENT=production

# Analytics (opcional)
REACT_APP_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX

# Payment Gateway (futuro)
REACT_APP_STRIPE_PUBLIC_KEY=pk_live_xxxxx
REACT_APP_PAYPAL_CLIENT_ID=xxxxx

# Social Media
REACT_APP_FACEBOOK_URL=https://facebook.com/hbspa
REACT_APP_INSTAGRAM_URL=https://instagram.com/hbspa
REACT_APP_WHATSAPP_NUMBER=525512345678
```

---

## 🛡️ Configuración de Seguridad

### 1. Certificado SSL/TLS

**Opción A: Let's Encrypt (Gratuito)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d hbspa.com -d www.hbspa.com
```

**Opción B: Certificado comercial**
- Comprar certificado SSL
- Instalar en servidor web
- Configurar renovación automática

### 2. Firewall
```bash
# UFW (Ubuntu)
sudo ufw enable
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw allow 8080  # Backend (si aplica)
```

### 3. Headers de Seguridad (ya incluidos en configuración Nginx)
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Content-Security-Policy

### 4. Backup Automático
```bash
#!/bin/bash
# backup.sh - Ejecutar diariamente con cron

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/spa-template"
SITE_DIR="/var/www/spa-template"

# Crear backup del sitio
tar -czf "$BACKUP_DIR/site_$DATE.tar.gz" -C "$SITE_DIR" .

# Mantener solo últimos 30 backups
find "$BACKUP_DIR" -name "site_*.tar.gz" -mtime +30 -delete

# Backup de base de datos (si existe)
if [ -n "$DB_NAME" ]; then
    mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > "$BACKUP_DIR/db_$DATE.sql.gz"
    find "$BACKUP_DIR" -name "db_*.sql.gz" -mtime +30 -delete
fi
```

---

## 📊 Monitoreo y Analytics

### 1. Google Analytics 4

1. Crear cuenta en [analytics.google.com](https://analytics.google.com)
2. Obtener Measurement ID
3. Instalar en React:

```bash
npm install gtag
```

```typescript
// src/utils/analytics.ts
import { gtag } from 'gtag';

export const GA_TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;

export const pageview = (url: string) => {
  gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = (action: string, category: string, label?: string, value?: number) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
```

### 2. Uptime Monitoring

**Opción A: UptimeRobot (Gratuito)**
- Visite [uptimerobot.com](https://uptimerobot.com)
- Configure monitoreo HTTP
- Configure alertas por email/SMS

**Opción B: Pingdom (Comercial)**
- Monitoreo más avanzado
- Reportes detallados
- Múltiples ubicaciones

### 3. Error Tracking con Sentry

```bash
npm install @sentry/react @sentry/tracing
```

```typescript
// src/index.tsx
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});
```

---

## 🔄 Actualizaciones y Mantenimiento

### Actualizaciones de Seguridad
```bash
# Servidor Ubuntu
sudo apt update && sudo apt upgrade -y

# Dependencias de Node.js
npm audit fix
npm update
```

### Backup antes de actualizar
```bash
# Backup completo
cp -r /var/www/spa-template /backups/spa-template-$(date +%Y%m%d)
```

### Proceso de actualización
1. Hacer backup
2. Actualizar código en staging
3. Probar funcionalidad
4. Desplegar en producción
5. Verificar funcionamiento

---

## 📧 Configuración de Email

### Para formularios de contacto
```javascript
// Ejemplo con EmailJS
import emailjs from '@emailjs/browser';

const sendContactEmail = async (formData) => {
  try {
    await emailjs.send(
      'service_hbspa',
      'template_contact',
      formData,
      'public_key_here'
    );
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
```

### Para notificaciones del sistema
- Configurar SMTP (Gmail, SendGrid, etc.)
- Templates de email para:
  - Confirmación de reservas
  - Estado de pedidos
  - Recordatorios de citas

---

## 🔍 SEO y Optimización

### 1. Robots.txt
```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://hbspa.com/sitemap.xml
```

### 2. Sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hbspa.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://hbspa.com/servicios</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://hbspa.com/productos</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://hbspa.com/contacto</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.6</priority>
  </url>
</urlset>
```

### 3. Meta tags optimizados
```html
<!-- public/index.html -->
<meta name="description" content="H&B SPA Jardín Balbuena - Tratamientos de belleza y relajación con productos naturales en CDMX">
<meta name="keywords" content="spa, masajes, tratamientos faciales, aromaterapia, jardín balbuena, cdmx">
<meta property="og:title" content="H&B SPA Jardín Balbuena">
<meta property="og:description" content="Tu oasis de relajación y bienestar en el corazón de la ciudad">
<meta property="og:image" content="https://hbspa.com/og-image.jpg">
<meta property="og:url" content="https://hbspa.com">
```

---

## 🔧 Solución de Problemas Comunes

### "Sitio no carga"
1. Verificar SSL
2. Revisar logs de Nginx: `sudo tail -f /var/log/nginx/error.log`
3. Comprobar permisos de archivos
4. Verificar DNS

### "Formularios no envían"
1. Verificar configuración de email
2. Revisar CORS si hay backend
3. Comprobar variables de entorno

### "Rendimiento lento"
1. Habilitar compresión Gzip
2. Optimizar imágenes
3. Configurar CDN
4. Cache del navegador

---

## 📞 Lista de Contactos Post-Despliegue

### Servicios Críticos
- **Hosting:** [Proveedor y contacto]
- **DNS:** [Proveedor del dominio]
- **SSL:** [Proveedor del certificado]
- **Email:** [Servicio SMTP]

### Desarrollador/Soporte
- **Nombre:** [A completar]
- **Email:** [A completar]
- **Teléfono:** [A completar]
- **Horario:** [A completar]

---

**✅ Una vez completado el despliegue, el sistema estará listo para recibir clientes y procesar pedidos de manera segura y confiable.**

*Documento actualizado: Enero 2025*