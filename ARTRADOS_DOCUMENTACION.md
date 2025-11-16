# 📦 ARTRADOS - Documentación del Proyecto

## 🎯 Resumen del Trabajo Realizado

Se han implementado exitosamente **3 nuevas páginas** en el proyecto ARTRADOS siguiendo los diseños de Figma proporcionados, con autenticación simulada, diseño normalizado y preparado para despliegue en Netlify.

---

## ✅ Páginas Implementadas

### 1. **Mi Cuenta** (`/mi-cuenta`)

Página donde el usuario puede gestionar su perfil personal.

**Características:**
- ✨ Foto de perfil con opción de cambiar (simulado)
- 📝 Datos personales: Nombre y teléfono con botón de editar
- 📧 Correo electrónico y contraseña con botones de editar
- 🏠 Lista de direcciones guardadas con opción de editar
- ➕ Botón para agregar nueva dirección

**Datos de prueba:**
- Usuario: Axel Langle
- Email: axellangle40@gmail.com
- Contraseña: 123456
- Teléfono: (558) 259-4361
- 2 direcciones pre-cargadas

---

### 2. **Mis Compras** (`/mis-compras`)

Página donde el usuario puede ver el historial de sus compras.

**Características:**
- 📦 **Compras activas**: Muestra pedidos en proceso con estados (Enviado, Procesando)
- 🔍 Botón "Rastrear paquete" para pedidos activos
- 📋 Botón "Ver detalles" para ver información completa
- 📅 **Compras anteriores**: Tabla con historial de pedidos entregados
- 🔄 Botón "Volver a comprar" para repetir pedidos anteriores
- 🖼️ Imágenes de productos en cada pedido
- 💰 Información de precios y fechas

**Datos de prueba:**
- 2 compras activas (#531751 y #531752)
- 3 compras anteriores (#528943, #527821, #526543)

---

### 3. **Rastrear Pedido** (`/rastrear-pedido/:id`)

Página de seguimiento de paquetes con mapa y timeline.

**Características:**
- 🗺️ Mapa simulado mostrando la ruta de entrega
- 📍 Timeline visual con 4 estados:
  - ✅ Pedido recibido (completado)
  - ✅ Procesando (completado)
  - 🔵 En camino (actual)
  - ⚪ Entrega (pendiente)
- 📝 Notas y ubicación en cada evento
- 📊 Panel de detalles con:
  - Fecha de entrega estimada
  - Método de envío
  - Dirección completa
- 🆘 Sección de ayuda con botón de contacto

---

## 🔐 Sistema de Autenticación Simulada

Se implementó un sistema de autenticación mejorado que simula el comportamiento real:

**Características:**
- ✅ Validación de credenciales contra datos simulados
- 💾 Persistencia de sesión en localStorage
- 🔄 Estado global con React Context
- 👤 3 usuarios de prueba pre-configurados
- 🔒 Protección de rutas (redirección a login si no está autenticado)

**Usuarios de prueba:**

1. **Axel Langle**
   - Email: axellangle40@gmail.com
   - Contraseña: 123456

2. **María González**
   - Email: maria.gonzalez@example.com
   - Contraseña: password123

3. **Carlos Ramírez**
   - Email: carlos.ramirez@example.com
   - Contraseña: mypassword

---

## 🎨 Normalización del Diseño

Se creó un sistema de diseño consistente en `client/global.css`:

### Colores
- **Navy**: `#1E3A5F` (principal)
- **Blue**: `#4A90E2` (secundario)
- **Light Blue**: `#E8F4F8` (fondos)
- **Lighter Blue**: `#B8D4E8` (bordes)

### Tipografía
- **Heading 1**: 4xl, bold, navy
- **Heading 2**: 3xl, bold, navy
- **Heading 3**: 2xl, bold, navy
- **Heading 4**: xl, semibold, navy
- **Body Large**: lg
- **Body Base**: base
- **Body Small**: sm

### Componentes reutilizables
- `.btn-primary`: Botón principal navy
- `.btn-secondary`: Botón secundario light blue
- `.input-field`: Campo de entrada estándar
- `.card`: Tarjeta con borde azul

---

## 📱 Responsive Design

Se implementó diseño responsive básico con Tailwind CSS:

- 📱 **Mobile**: Oculta navegación, ajusta espaciado
- 💻 **Tablet**: Muestra navegación, ajusta grid
- 🖥️ **Desktop**: Layout completo con todas las características

**Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 🗂️ Estructura de Archivos Nuevos

```
client/
├── data/
│   ├── mockUsers.ts          # Usuarios simulados
│   └── mockOrders.ts          # Órdenes simuladas
├── pages/
│   ├── MiCuenta.tsx           # Página Mi Cuenta
│   ├── MisCompras.tsx         # Página Mis Compras
│   └── RastrearPedido.tsx     # Página Rastrear Pedido
├── contexts/
│   └── AuthContext.tsx        # Actualizado con autenticación mejorada
└── components/
    ├── UserMenu.tsx           # Actualizado con navegación
    └── Header.tsx             # Actualizado con responsive

public/
└── images/
    └── mapa-rastreo.jpg       # Imagen del mapa simulado
```

---

## 🚀 Despliegue en Netlify

### Pasos para desplegar:

1. **Conectar repositorio en Netlify:**
   - Ve a [netlify.com](https://netlify.com)
   - Clic en "Add new site" → "Import an existing project"
   - Conecta con GitHub y selecciona el repositorio `AxelLangle/ARTRADOS`

2. **Configuración automática:**
   - Netlify detectará automáticamente la configuración de `netlify.toml`
   - Build command: `pnpm run build:client`
   - Publish directory: `dist/client`

3. **Variables de entorno (opcional):**
   - No se requieren por ahora ya que todo es simulado

4. **Dominio personalizado (opcional):**
   - Puedes configurar un dominio personalizado en Settings → Domain management

### Configuración incluida:

```toml
[build]
  command = "pnpm run build:client"
  functions = "netlify/functions"
  publish = "dist/client"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🧪 Cómo Probar Localmente

```bash
# 1. Clonar el repositorio
git clone https://github.com/AxelLangle/ARTRADOS.git
cd ARTRADOS

# 2. Instalar dependencias
pnpm install

# 3. Iniciar servidor de desarrollo
pnpm dev

# 4. Abrir en navegador
# http://localhost:8080
```

### Flujo de prueba:

1. **Iniciar sesión:**
   - Clic en el icono de usuario en el header
   - Clic en "Iniciar sesión"
   - Email: `axellangle40@gmail.com`
   - Contraseña: `123456`

2. **Probar Mi Cuenta:**
   - Clic en el icono de usuario
   - Clic en "Ver cuenta"
   - Explorar secciones de datos, correo y direcciones

3. **Probar Mis Compras:**
   - Clic en el icono de usuario
   - Clic en "Mis compras"
   - Ver compras activas y anteriores

4. **Probar Rastrear Pedido:**
   - En "Mis compras", clic en "Rastrear paquete" del primer pedido
   - Ver mapa, timeline y detalles

---

## 📊 Datos Simulados

### Usuarios (3)
- Cada usuario tiene nombre, email, contraseña, teléfono y direcciones

### Órdenes (5 por usuario)
- 2 activas (estados: Enviado, Procesando)
- 3 completadas (estado: Entregado)

### Productos
- Reutiliza los productos existentes del proyecto
- Imágenes y descripciones reales

### Eventos de Tracking (4 por orden)
- Pedido recibido
- Procesando
- En camino
- Entrega

---

## 🎯 Mejoras Futuras Recomendadas

### Backend Real
- [ ] Implementar API REST con Express
- [ ] Base de datos SQLite o PostgreSQL
- [ ] JWT para autenticación real
- [ ] Endpoints para CRUD de usuarios, órdenes y productos

### Funcionalidades
- [ ] Envío de emails reales (recuperación de contraseña, notificaciones)
- [ ] Integración con Google Maps API
- [ ] Sistema de pagos real (Stripe, PayPal)
- [ ] Panel de administración para gestionar productos y órdenes
- [ ] Generación de QR codes para videos de productos
- [ ] Subida de imágenes a S3 o Cloudinary

### Optimizaciones
- [ ] Lazy loading de imágenes
- [ ] Code splitting por rutas
- [ ] Service Worker para PWA
- [ ] Optimización de bundle size
- [ ] Tests unitarios y de integración

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router DOM 6
- **Styling**: Tailwind CSS 3
- **Build**: Vite 7
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Version Control**: Git + GitHub
- **Deployment**: Netlify

---

## 📝 Notas Importantes

1. **Autenticación simulada**: Los datos se guardan en localStorage y se pierden al limpiar caché
2. **Mapa estático**: Se usa una imagen estática en lugar de Google Maps API
3. **Responsive básico**: Se implementó responsive básico, puede mejorarse para móviles
4. **Datos de prueba**: Todos los productos, órdenes y usuarios son simulados
5. **Sin backend**: No hay servidor real, todo funciona en el cliente

---

## 🎓 Créditos

**Desarrollado por:** Manus AI  
**Repositorio:** [github.com/AxelLangle/ARTRADOS](https://github.com/AxelLangle/ARTRADOS)  
**Fecha:** Noviembre 2025  
**Cliente:** Axel Langle  

---

## 📞 Soporte

Para cualquier duda o problema:
1. Revisa esta documentación
2. Consulta el código en GitHub
3. Contacta al desarrollador

---

## 🎉 ¡Proyecto Completado!

El proyecto ARTRADOS ahora cuenta con un sistema completo de gestión de cuenta de usuario, historial de compras y rastreo de pedidos, listo para ser presentado el **4 de diciembre de 2025**.

**¡Mucha suerte con tu presentación! 🚀**
