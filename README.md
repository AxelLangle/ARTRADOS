# 🎨 ARTRADOS - Plataforma de Comercio Electrónico Artesanal

Bienvenido al repositorio del proyecto **ARTRADOS**, una plataforma de comercio electrónico diseñada para la venta y promoción de artesanías. Este proyecto está construido con React y Vite, utilizando un sistema de API simulada (Mock API) para la gestión de datos de productos, usuarios y listas de deseos.

---

## 🚀 Guía de Instalación y Puesta en Marcha (Para Usuarios No Preparados)

Esta guía te llevará paso a paso a través de la instalación de todas las herramientas necesarias y la configuración del proyecto en una computadora sin preparación previa, utilizando **Visual Studio Code (VS Code)** como editor.

### 1. Instalación de Herramientas Esenciales

Necesitarás instalar tres herramientas principales: Git, Node.js (que incluye npm) y Visual Studio Code.

| Herramienta | Propósito | Enlace de Descarga |
| :--- | :--- | :--- |
| **Visual Studio Code (VS Code)** | Editor de código. | [Descargar VS Code](https://code.visualstudio.com/) |
| **Git** | Sistema de control de versiones (necesario para descargar el código de GitHub). | [Descargar Git](https://git-scm.com/downloads) |
| **Node.js** | Entorno de ejecución de JavaScript (incluye `npm` y `pnpm`). | [Descargar Node.js (LTS)](https://nodejs.org/en/download/current) |

**Pasos de Instalación:**

1.  **Instalar VS Code:** Descarga e instala la versión adecuada para tu sistema operativo.
2.  **Instalar Git:** Descarga e instala Git. Durante la instalación, puedes dejar las opciones predeterminadas.
3.  **Instalar Node.js (LTS):** Descarga e instala la versión LTS (Long-Term Support). Esto instalará `npm` automáticamente.

### 2. Instalación del Gestor de Paquetes `pnpm`

El proyecto utiliza `pnpm` para gestionar las dependencias de forma más eficiente.

1.  Abre tu **Terminal** (o Git Bash si estás en Windows).
2.  Ejecuta el siguiente comando para instalar `pnpm` globalmente:

    ```bash
    npm install -g pnpm
    ```

### 3. Descarga del Código Fuente (Clonar el Repositorio)

1.  Abre tu **Terminal** o **Git Bash**.
2.  Navega hasta la carpeta donde deseas guardar el proyecto (ej. `cd ~/Documentos/Proyectos`).
3.  Ejecuta el siguiente comando para descargar el proyecto:

    ```bash
    git clone https://github.com/AxelLangle/ARTRADOS.git
    ```

4.  Navega al directorio del proyecto:

    ```bash
    cd ARTRADOS
    ```

### 4. Instalación de Dependencias e Inicio del Proyecto

1.  Abre **Visual Studio Code**.
2.  Ve a **File** > **Open Folder** (Archivo > Abrir Carpeta) y selecciona la carpeta `ARTRADOS`.
3.  En VS Code, abre la terminal integrada (**Terminal** > **New Terminal** o `Ctrl + Ñ`).
4.  Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

    ```bash
    pnpm install
    ```

5.  Una vez finalizada la instalación, inicia el servidor de desarrollo:

    ```bash
    pnpm dev
    ```

6.  El proyecto estará disponible en tu navegador en la dirección: `http://localhost:8080/`

---

## ⚙️ Configuración y Variables de Entorno

El proyecto utiliza variables de entorno para la configuración, aunque la mayoría de los datos son gestionados por la API simulada.

### Variables de Entorno

Crea un archivo llamado `.env` en la raíz del proyecto y añade las siguientes variables. Estas son las configuraciones por defecto del proyecto:

| Variable | Valor por Defecto | Descripción |
| :--- | :--- | :--- |
| `VITE_APP_TITLE` | `ARTRADOS` | Título de la aplicación. |
| `VITE_API_BASE_URL` | `/api` | URL base para las llamadas a la API (simulada). |
| `VITE_MOCK_API_ENABLED` | `true` | **CRÍTICO:** Mantiene la API simulada activa. |

### Cuentas de Prueba (Mock API)

El sistema de autenticación simulado utiliza las siguientes credenciales:

| Rol | Correo Electrónico | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | `admin@artrados.com` | `admin123` |
| **Cliente** | `user@artrados.com` | `user123` |

---

## 💻 Comandos Comunes del Proyecto

Estos comandos se ejecutan desde la terminal dentro de la carpeta `ARTRADOS`.

| Comando | Descripción |
| :--- | :--- |
| `pnpm install` | Instala todas las dependencias del proyecto. |
| `pnpm dev` | **Comando principal:** Inicia el servidor de desarrollo en `http://localhost:8080/`. |
| `pnpm build` | Compila el proyecto para producción (genera la carpeta `dist`). |
| `pnpm preview` | Sirve la versión de producción compilada localmente. |
| `git pull` | Actualiza el código local con los últimos cambios del repositorio. |
| `git push` | Sube tus cambios locales al repositorio de GitHub. |
