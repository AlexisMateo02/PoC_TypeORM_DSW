# Prueba de Concepto (PoC) con TypeORM (OxM) - DSW - ISI 304 - 2025

Esta demostración tecnológica fue desarrollada para la exposición de la materia Desarrollo de Software. El propósito del proyecto es demostrar la implementación de una API REST utilizando TypeORM con MySQL como sistema de gestión de base de datos, enfocándose en un sistema de gestión de personajes y objetos similar a un juego de rol. El proyecto ilustra la configuración y uso de TypeORM para el mapeo objeto-relacional, la implementación de una arquitectura modular, y la aplicación de buenas prácticas de desarrollo.

## Integrantes del grupo
* 52077 – Boveri, Rafaela
* 52280 – Cardelli, Lázaro
* 50258 – Martina, Santiago
* 51191 – Mateo, Alexis

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v22.16.0, indicado en `.nvmrc`)
- **fnm** (Gestor de Versiones de Node.js)
- **pnpm** (Gestor de Paquetes)
- **MySQL** (v8.0 o superior)
- **Git** (Sistema de Gestión del Código Fuente)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd PoC
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y configura tus credenciales:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus datos:

```env
# Credenciales del administrador MySQL (usuario root)
MYSQL_ROOT_USER=root
MYSQL_ROOT_PASSWORD=tu_password_root_aquí

# Configuración de la base de datos del proyecto
DB_HOST=localhost
DB_PORT=3306
DB_USER=dsw
DB_PASSWORD=dsw
DB_NAME=poctypeorm2025
```

**⚠️ Importante:** Reemplaza `tu_password_root_aquí` con la contraseña real de tu usuario `root` de MySQL.

## 🛠️ Comandos disponibles

### Configuración inicial de la base de datos

```bash
pnpm db:setup
```

Este comando:
- Crea la base de datos `poctypeorm2025` si no existe
- Crea el usuario `dsw` con contraseña `dsw`
- Otorga los permisos necesarios

**⚠️ Importante:** Es posible realizar la configuración de la base de datos ejecutando la siguiente Query en el `localhost` del usario `root` de MySQL. Estos comandos se encuentran especificados [mysql-commands.sql](./docs/mysql-commands.sql).

### Desarrollo

```bash
# Opción 1: Flujo habitual (sin setup automático)
pnpm start:dev

# Opción 2: Setup automático + desarrollo
pnpm dev
```

### Construcción del proyecto

```bash
pnpm build
```

## ⚡ Inicio rápido

1. Clona el repositorio
2. Instala dependencias: `pnpm install`
3. Configura tu `.env`
4. Ejecuta: `pnpm dev`

## 📁 Estructura del proyecto

```
project/
├── src/                          # Código fuente TypeScript
│   ├── app.ts                    # Archivo principal
│   ├── [entity]/        # Cada entidad (character, item, etc.)
│   │   ├── *.controller.ts
│   │   ├── *.entity.ts
│   │   ├── *.routes.ts
│   │   └── *.http
│   └── shared/db/                # Módulo de base de datos compartida
│       ├── baseEntity.ts
│       ├── orm.ts
│       └── scripts/              # Scripts de base de datos
│           └── setup-database.js
├── dist/                         # Archivos compilados (generado)
├── docs/                         # Documentación del proyecto
├── node_modules/                 # Dependencias instaladas (generado)
├── .env                          # Variables de entorno utilizadas
├── .env.example                  # Plantilla de variables de entorno
├── .nvmrc                        # Versión de Node usada en el proyecto
├── package.json                  # Dependencias y scripts
├── pnpm-lock.yaml                # Archivo de bloqueo de dependencias
├── tsconfig.json                 # Configuración de TypeScript
├── .gitignore                    # Carpetas y archivos ignorados por Git
└── README.md                     # Documentación principal del proyecto
```

## ⚡ Inicio rápido

1. Clona el repositorio
2. Instala dependencias: `pnpm install`
3. Configura tu `.env`
4. Ejecuta: `pnpm dev`


## 📖 Documentación

Para más detalles técnicos e informativos, consultar la carpeta [**`/docs`**](./docs).