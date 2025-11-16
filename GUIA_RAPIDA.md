# 🚀 Guía Rápida - ARTRADOS

## Inicio Rápido en 5 Minutos

### 1. Clonar el Repositorio
```bash
git clone https://github.com/AxelLangle/ARTRADOS.git
cd ARTRADOS
```

### 2. Instalar Dependencias
```bash
pnpm install
```

### 3. Iniciar el Proyecto

**Opción A: Solo Frontend (datos simulados)**
```bash
pnpm run dev
```
Abre http://localhost:8081

**Opción B: Frontend + Backend (API real)**

Terminal 1 - Backend:
```bash
pnpm run build:server
pnpm start
```

Terminal 2 - Frontend:
```bash
pnpm run dev
```

---

## 👤 Usuarios de Prueba

### Admin:
- Email: `admin@artrados.com`
- Contraseña: `admin123`
- Acceso: Panel de administración en `/admin`

### Usuario Regular:
- Email: `axellangle40@gmail.com`
- Contraseña: `123456`

---

## 🎯 Funcionalidades Principales

### Para Usuarios:
1. **Explorar Productos** → `/tienda`
2. **Ver Favoritos** → `/favoritos`
3. **Mi Cuenta** → `/mi-cuenta`
4. **Mis Compras** → `/mis-compras`
5. **Ayuda** → `/ayuda`
6. **Contacto** → `/contactanos`

### Para Administradores:
1. **Panel Admin** → `/admin`
   - Agregar productos
   - Editar productos
   - Eliminar productos
   - Ver QR codes generados automáticamente

---

## 🔑 Características Destacadas

### ✨ Nuevas Funcionalidades:

1. **Sistema de Filtros**
   - Filtrar por categoría
   - Búsqueda por nombre
   - Resultados en tiempo real

2. **Listas Múltiples de Favoritos**
   - Crear listas personalizadas
   - Organizar productos por listas
   - Eliminar listas (excepto la principal)

3. **Formularios de Dirección Completos**
   - Todos los campos necesarios
   - Validación de datos
   - Edición y eliminación

4. **Panel de Administración**
   - Gestión completa de productos
   - Generación automática de QR codes
   - Interfaz intuitiva

5. **Páginas de Soporte**
   - Centro de ayuda con FAQ
   - Formulario de contacto funcional

---

## 🌐 Despliegue Rápido en Netlify

1. Haz push de tus cambios a GitHub
2. Ve a https://netlify.com
3. Conecta tu repositorio
4. Deploy automático ✅

---

## 📝 Notas Importantes

- La base de datos se crea automáticamente al iniciar el backend
- Los datos de prueba se cargan automáticamente
- Los QR codes se generan al agregar productos con video_url
- El backend corre en puerto 3000, frontend en 8081

---

## 🐛 Problemas Comunes

**Error: "Puerto en uso"**
```bash
# Matar procesos en puerto 3000
killall -9 node
```

**Error: "Base de datos corrupta"**
```bash
# Eliminar y recrear
rm artrados.db
pnpm start
```

**Error: "Dependencias faltantes"**
```bash
# Reinstalar
rm -rf node_modules
pnpm install
```

---

## 📞 Ayuda

¿Necesitas ayuda? Revisa:
1. `DOCUMENTACION_FINAL.md` - Documentación completa
2. `README.md` - Información del proyecto
3. `/ayuda` - Centro de ayuda en la app

---

**¡Listo para usar!** 🎉
