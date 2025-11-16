# 🎨 ARTRADOS - Arte y Tradición

Marketplace en línea que conecta artesanos talentosos con personas que buscan productos únicos y de alta calidad hechos a mano en México.

![ARTRADOS](https://img.shields.io/badge/Status-En%20Desarrollo-yellow)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.17-blue)

---

## 🚀 Características Principales

### ✅ Páginas Implementadas

- 🏠 **Inicio**: Landing page con hero section y productos destacados
- 🛍️ **Tienda**: Catálogo completo de productos artesanales
- 🛒 **Carrito**: Gestión de productos para compra
- 💳 **Checkout**: Proceso de pago completo
- 👤 **Mi Cuenta**: Gestión de perfil, datos personales y direcciones
- 📦 **Mis Compras**: Historial de pedidos activos y anteriores
- 📍 **Rastrear Pedido**: Seguimiento en tiempo real con mapa y timeline
- ℹ️ **¿Quién es ARTRA?**: Información sobre la empresa
- 📄 **Términos y Políticas**: Documentación legal

### 🔐 Sistema de Autenticación

- Autenticación simulada con validación de credenciales
- Persistencia de sesión en localStorage
- Protección de rutas privadas
- 3 usuarios de prueba pre-configurados

### 🎨 Diseño

- Sistema de diseño normalizado y consistente
- Paleta de colores corporativa (Navy, Blue, Light Blue)
- Tipografía estandarizada
- Componentes reutilizables
- Responsive design para móvil, tablet y desktop

---

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router DOM 6
- **Styling**: Tailwind CSS 3
- **Build Tool**: Vite 7
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Deployment**: Netlify

---

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/AxelLangle/ARTRADOS.git
cd ARTRADOS

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Abrir en navegador
# http://localhost:8080
```

---

## 🧪 Usuarios de Prueba

Para probar la autenticación, usa cualquiera de estos usuarios:

### Usuario 1
- **Email**: axellangle40@gmail.com
- **Contraseña**: 123456

### Usuario 2
- **Email**: maria.gonzalez@example.com
- **Contraseña**: password123

### Usuario 3
- **Email**: carlos.ramirez@example.com
- **Contraseña**: mypassword

---

## 📁 Estructura del Proyecto

```
ARTRADOS/
├── client/                 # Código del frontend
│   ├── components/        # Componentes reutilizables
│   ├── contexts/          # Contextos de React (Auth, Cart, etc.)
│   ├── data/              # Datos simulados (usuarios, órdenes)
│   ├── pages/             # Páginas de la aplicación
│   ├── App.tsx            # Componente principal con rutas
│   └── global.css         # Estilos globales y sistema de diseño
├── public/                # Archivos estáticos
│   ├── images/           # Imágenes del proyecto
│   └── Logo-artra.ico    # Favicon
├── netlify.toml          # Configuración de Netlify
├── vite.config.ts        # Configuración de Vite
└── package.json          # Dependencias del proyecto
```

---

## 🚀 Despliegue en Netlify

El proyecto está configurado para desplegarse automáticamente en Netlify:

1. Conecta tu repositorio de GitHub con Netlify
2. Netlify detectará automáticamente la configuración de `netlify.toml`
3. El sitio se desplegará automáticamente en cada push a `main`

**Configuración automática:**
- Build command: `pnpm run build:client`
- Publish directory: `dist/client`
- Node version: 22.13.0

---

## 📝 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia servidor de desarrollo

# Producción
pnpm build            # Construye cliente y servidor
pnpm build:client     # Construye solo el cliente
pnpm build:server     # Construye solo el servidor
pnpm start            # Inicia servidor de producción

# Calidad de código
pnpm test             # Ejecuta tests
pnpm typecheck        # Verifica tipos de TypeScript
pnpm format.fix       # Formatea código con Prettier
```

---

## 🎯 Roadmap

### ✅ Completado
- [x] Diseño y estructura base
- [x] Sistema de autenticación simulada
- [x] Páginas Mi Cuenta, Mis Compras y Rastrear Pedido
- [x] Normalización de diseño
- [x] Responsive design básico
- [x] Configuración para despliegue en Netlify

### 📋 Futuras Mejoras
- [ ] Backend real con API REST
- [ ] Base de datos (SQLite/PostgreSQL)
- [ ] Autenticación real con JWT
- [ ] Integración con Google Maps API
- [ ] Sistema de pagos real (Stripe/PayPal)
- [ ] Panel de administración
- [ ] Generación de QR codes para videos
- [ ] Subida de imágenes a S3/Cloudinary
- [ ] Envío de emails (notificaciones, recuperación de contraseña)

---

## 👥 Equipo

**Desarrollador**: Axel Langle  
**Fecha**: Noviembre 2025  

---

## 📞 Contacto

- **GitHub**: [@AxelLangle](https://github.com/AxelLangle)
- **Email**: axellangle40@gmail.com

---

<div align="center">

**Hecho con ❤️ en México**

🎨 **ARTRA** - Arte y Tradición

</div>
