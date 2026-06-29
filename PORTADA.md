# CRUD Beneficiarios

Aplicación web desarrollada en **Next.js (App Router) + MySQL**, siguiendo el patrón **MVC**, para la gestión de información del programa de beneficiarios educativos de Bogotá.

**Autor:** Jhon Parales
**Programa:** Análisis y Desarrollo de Software
**Tecnologías:** Next.js, React, MySQL, Railway

---

## Descripción del proyecto

El proyecto consiste en una aplicación web tipo CRUD (Crear, Leer, Actualizar, Eliminar) construida sobre una base de datos normalizada en **Tercera Forma Normal (3FN)**, correspondiente al programa de beneficiarios educativos de Bogotá.

La base de datos original (en formato Excel) fue analizada, normalizada y migrada a un motor **MySQL** alojado en **Railway**, resultando en un modelo de **13 tablas**: 1 tabla central de hechos (`beneficiarios`, con 49.095 registros) y 12 tablas catálogo relacionadas mediante llaves foráneas (localidades, instituciones, programas, modalidades, sectores, zonas, sexos, rangos de edad, grupos étnicos, sisben, saber11 y convocatorias).

Sobre esa base de datos se construyó una aplicación web en **Next.js**, organizada bajo el patrón **Modelo - Vista - Controlador (MVC)**:

- **Modelo:** funciones en JavaScript que ejecutan las consultas SQL contra la base de datos (`models/`).
- **Controlador:** rutas API de Next.js que exponen el modelo como endpoints REST (`app/api/`).
- **Vista:** páginas en React que consumen las rutas API y muestran la información al usuario en tablas y formularios (`app/`).

## Funcionalidades implementadas

La aplicación cumple con el requisito de complementar el proyecto con vistas de consulta, inserción, actualización y eliminación de datos, distribuidas en diferentes tablas de la base de datos:

| Tabla | Consulta (READ) | Insertar (CREATE) | Actualizar (UPDATE) | Eliminar (DELETE) |
|---|---|---|---|---|
| Localidades | ✅ | ✅ | ✅ | ✅ |
| Programas | ✅ | ✅ | | |
| Sectores | ✅ | | ✅ | ✅ |
| Modalidades | ✅ | ✅ | | ✅ |

**Total:** 4 vistas de consulta, 3 de inserción, 2 de actualización y 3 de eliminación, distribuidas en 4 tablas distintas de la base de datos de beneficiarios.

## Arquitectura técnica

```
crud-beneficiarios/
├── app/
│   ├── api/                  → Controladores (rutas REST)
│   │   ├── localidades/
│   │   ├── programas/
│   │   ├── sectores/
│   │   └── modalidades/
│   ├── localidades/          → Vista de Localidades
│   ├── programas/            → Vista de Programas
│   ├── sectores/             → Vista de Sectores
│   ├── modalidades/          → Vista de Modalidades
│   ├── layout.js             → Layout general + menú de navegación
│   └── globals.css           → Estilos globales del proyecto
├── models/                   → Modelos (lógica de acceso a datos)
├── db/
│   └── connection.js         → Conexión a la base de datos MySQL (Railway)
└── package.json
```

**Flujo de datos:** Navegador → Vista (React) → Controlador (API Route) → Modelo (consulta SQL) → Base de datos MySQL en Railway.

## Capturas de pantalla

### Vista de Localidades
Consulta, inserción, edición y eliminación de las 22 localidades de Bogotá.

![Vista de Localidades](screenshots/01_localidades.png)

### Vista de Programas
Consulta e inserción de los núcleos básicos del conocimiento.

![Vista de Programas](screenshots/02_programas.png)

### Vista de Sectores
Consulta, edición y eliminación de los sectores de colegio de graduación.

![Vista de Sectores](screenshots/03_sectores.png)

### Vista de Modalidades
Consulta, inserción y eliminación de las modalidades de corte del programa.

![Vista de Modalidades](screenshots/04_modalidades.png)

## Cómo ejecutar el proyecto localmente

1. Clonar el repositorio
   ```bash
   git clone https://github.com/jhonparales90-hub/crud-beneficiarios.git
   cd crud-beneficiarios
   ```
2. Instalar las dependencias
   ```bash
   npm install
   ```
3. Crear un archivo `.env.local` en la raíz del proyecto con la cadena de conexión a la base de datos:
   ```
   DATABASE_URL="mysql://usuario:contraseña@host:puerto/nombre_basedatos"
   ```
4. Ejecutar el servidor de desarrollo
   ```bash
   npm run dev
   ```
5. Abrir [http://localhost:3000](http://localhost:3000) en el navegador

## Base de datos

- **Motor:** MySQL 8 (alojado en Railway)
- **Registros:** 49.095 beneficiarios + 12 tablas catálogo
- **Normalización:** Tercera Forma Normal (3FN)
