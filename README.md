# Prueba de Concepto (PoC) con TypeORM (OxM) - DSW - ISI 304 - 2025

Esta demostración tecnológica fue desarrollada para la exposición de la materia Desarrollo de Software. El propósito del proyecto es demostrar la implementación de una API REST utilizando TypeORM con MySQL como sistema de gestión de base de datos, enfocándose en un sistema de gestión de personajes y objetos similar a un juego de rol. El proyecto ilustra la configuración y uso de TypeORM para el mapeo objeto-relacional, la implementación de una arquitectura modular, y la aplicación de buenas prácticas de desarrollo.

## Integrantes del grupo

- 52077 – Boveri, Rafaela
- 52280 – Cardelli, Lázaro
- 50258 – Martina, Santiago
- 51191 – Mateo, Alexis

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v22.16.0, indicado en `.nvmrc`)
- **fnm** (Gestor de Versiones de Node.js)
- **pnpm** (Gestor de Paquetes)
- **MySQL** (v8.0 o superior)
- **Git** (Sistema de Gestión del Código Fuente)

## 1. Instalación

### Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd PoC_TypeORM_DSW
```

## 2. Configuración del Backend

### Navega hacia el Backend

```bash
cd backend
```

### Instalar dependencias

```bash
pnpm install
```

### Configurar variables de entorno

Copia el archivo de ejemplo y configura tus credenciales:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus datos:

```env
#! Credenciales del administrador MySQL
MYSQL_ROOT_USER=root
MYSQL_ROOT_PASSWORD=tu_password_aquí

#! Configuración de la base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=dsw
DB_PASSWORD=dsw
DB_NAME=poctypeorm2025

#! Configuración del servidor
PORT=3000

#! URL para CORS
FRONTEND_URL=http://localhost:3001

#! Configuración de la aplicación [development | production]
NODE_ENV=development
```

**⚠️ Importante:** Reemplaza `tu_password_root_aquí` con la contraseña real de tu usuario `root` de MySQL.

## 3. Configuración del Frontend

### Navega hacia el Fackend

```bash
cd ../frontend
```

### Instalar dependencias

```bash
pnpm install
```

## Ejecución en Desarrollo

### Iniciar el Backend

Desde el directorio `backend` se ejecuta lo enunciado a continuación.

#### Desarrollo

```bash
# Opción 1: Flujo habitual (sin configuración automática de la base de datos)
pnpm start:dev

# Opción 2: Configuración automática + desarrollo
pnpm dev
```

### Iniciar el Frontend

Desde el directorio `frontend` se ejecuta lo enunciado a continuación.

```bash
pnpm dev
```

## Comandos adicionales

### Backend

#### Compilación

```bash
pnpm build
```

#### Correr el programa sin compilar

```bash
pnpm start:run
```

#### Configuración de Base de Datos

```bash
pnpm db:setup
```

Este comando:

- Crea la base de datos `poctypeorm2025` si no existe
- Crea el usuario `dsw` con contraseña `dsw`
- Otorga los permisos necesarios

**⚠️ Importante:** Es posible realizar la configuración de la base de datos ejecutando la siguiente Query en el `localhost` del usario `root` de MySQL. Estos comandos se encuentran especificados [mysql-commands.sql](./docs/mysql-commands.sql).

#### Sincronización de Schemas

```bash
# Sincronizar el schema directamente en la Base de Datos
pnpm schema:sync

# Mostrar el SQL que se espera que se aplique
pnpm schema:log

# Eliminar el schema actual
pnpm schema:drop
```

#### Gestión de Migraciones

```bash
# Generar nueva migración
pnpm m:gen ./src/migrations/nombreMigracion

# Ejecutar migraciones pendientes
pnpm m:run

# Revertir última migración
pnpm m:revert

# Ver estado de migraciones
pnpm m:show
```

#### Ejecución de Seeders

```bash
# Ejecutar todos los seeders
pnpm seed:all

# Ejecutar un seeder específico
pnpm seed:one nombreSemilla
```

### Frontend

#### Compilación para producción

```bash
pnpm build
```

#### Linter

```bash
pnpm lint
```

#### Preview de producción

```bash
pnpm review
```

## 📖 Documentación

Para más detalles técnicos e informativos, consultar la carpeta [**`/docs`**](./docs).
