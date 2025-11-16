# 🚀 Guía Rápida: Desplegar ARTRADOS en Netlify

## Paso 1: Crear cuenta en Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Clic en "Sign up" (Registrarse)
3. Selecciona "Continue with GitHub" para vincular tu cuenta de GitHub
4. Autoriza a Netlify para acceder a tus repositorios

---

## Paso 2: Importar el proyecto

1. En el dashboard de Netlify, clic en **"Add new site"**
2. Selecciona **"Import an existing project"**
3. Elige **"Deploy with GitHub"**
4. Busca y selecciona el repositorio **`AxelLangle/ARTRADOS`**

---

## Paso 3: Configurar el despliegue

Netlify detectará automáticamente la configuración del archivo `netlify.toml`, pero verifica que los valores sean:

- **Branch to deploy**: `main`
- **Build command**: `pnpm run build:client`
- **Publish directory**: `dist/client`
- **Node version**: 22.13.0 (se configura automáticamente)

---

## Paso 4: Desplegar

1. Clic en **"Deploy [nombre-del-sitio]"**
2. Espera de 2-5 minutos mientras Netlify:
   - Clona el repositorio
   - Instala las dependencias con pnpm
   - Construye el proyecto
   - Publica los archivos

3. Una vez completado, verás el mensaje **"Site is live"** ✅

---

## Paso 5: Obtener la URL

Tu sitio estará disponible en una URL como:

```
https://[nombre-aleatorio].netlify.app
```

Por ejemplo: `https://artrados-2024.netlify.app`

---

## Paso 6: Configurar dominio personalizado (Opcional)

Si quieres un nombre más fácil de recordar:

1. En el dashboard del sitio, ve a **"Site settings"**
2. Clic en **"Domain management"**
3. Clic en **"Options"** → **"Edit site name"**
4. Cambia el nombre a algo como: `artrados` o `artrados-proyecto`
5. Tu nueva URL será: `https://artrados.netlify.app`

---

## Paso 7: Configurar despliegues automáticos

¡Ya está configurado! 🎉

Cada vez que hagas `git push` al repositorio, Netlify automáticamente:
- Detectará los cambios
- Construirá el proyecto
- Desplegará la nueva versión

---

## 🔧 Solución de Problemas

### Error: "Build failed"

**Problema**: El build falla durante la construcción.

**Solución**:
1. Ve a "Deploys" en el dashboard
2. Clic en el deploy fallido
3. Revisa los logs para ver el error específico
4. Común: Verifica que `netlify.toml` tenga la configuración correcta

### Error: "Page not found" al navegar

**Problema**: Las rutas de React Router no funcionan.

**Solución**:
- Verifica que `netlify.toml` tenga la configuración de redirects:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### El sitio se ve diferente que en local

**Problema**: Estilos o funcionalidades no funcionan igual.

**Solución**:
1. Limpia el caché del navegador
2. Verifica que todas las imágenes estén en `public/`
3. Revisa la consola del navegador para errores

---

## 📱 Compartir tu sitio

Una vez desplegado, puedes compartir la URL con:
- Profesores
- Compañeros
- Clientes
- Cualquier persona con acceso a internet

**El sitio estará disponible 24/7** mientras tu cuenta de Netlify esté activa (gratis hasta 100GB de ancho de banda/mes).

---

## 🎯 Recomendaciones

1. **Prueba el sitio antes de presentar**: Navega por todas las páginas y funcionalidades
2. **Comparte la URL con anticipación**: Asegúrate de que funcione en diferentes dispositivos
3. **Ten un plan B**: Guarda screenshots por si hay problemas de internet durante la presentación
4. **Monitorea el uso**: Netlify te notificará si te acercas al límite gratuito

---

## 📊 Monitoreo del Sitio

En el dashboard de Netlify puedes ver:
- ✅ Estado del sitio (activo/inactivo)
- 📈 Estadísticas de visitas
- 🔄 Historial de despliegues
- 📝 Logs de construcción

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa la [documentación de Netlify](https://docs.netlify.com)
2. Consulta los logs de despliegue
3. Verifica que el proyecto funcione localmente primero

---

## ✅ Checklist Final

Antes de la presentación del 4 de diciembre:

- [ ] Sitio desplegado en Netlify
- [ ] URL accesible desde cualquier dispositivo
- [ ] Todas las páginas funcionan correctamente
- [ ] Autenticación funciona (usuario de prueba: axellangle40@gmail.com / 123456)
- [ ] Imágenes se cargan correctamente
- [ ] Responsive funciona en móvil
- [ ] URL compartida con las personas relevantes
- [ ] Screenshots de respaldo guardados

---

## 🎉 ¡Listo!

Tu proyecto ARTRADOS ahora está en línea y accesible desde cualquier parte del mundo.

**¡Éxito en tu presentación! 🚀**
