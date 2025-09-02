# 📦 API de Gestión de Inventario y Trazabilidad de Materiales

Proyecto desarrollado con [NestJS](https://nestjs.com/), un framework progresivo de Node.js para construir aplicaciones escalables y mantenibles.  
Esta API gestiona el control de inventarios, trazabilidad de materiales, usuarios y procesos administrativos relacionados.  
Su objetivo principal es reemplazar el registro manual de información por un sistema automatizado y seguro.

---

## 🚀 Tecnologías utilizadas

- [NestJS](https://nestjs.com/) – Framework backend en TypeScript.  
- [TypeORM](https://typeorm.io/) – ORM para la gestión de la base de datos.  
- [PostgreSQL](https://www.postgresql.org/) – Base de datos relacional.  
- [JWT](https://jwt.io/) – Autenticación basada en tokens.  
- [Bcrypt](https://www.npmjs.com/package/bcrypt) – Encriptación de contraseñas.  
- [Class-validator](https://github.com/typestack/class-validator) y [class-transformer](https://github.com/typestack/class-transformer) – Validación de datos.  
- [`@nestjs/config`](https://docs.nestjs.com/techniques/configuration) – Manejo de variables de entorno.  
- [Swagger](https://swagger.io/) – Documentación de la API.  

---

## Version N
```bash
$ git clone <https://github.com/ProyectoFormativo1/gestion_inventario_api>
```

## ⚙️ Instalación y configuración

Clona el repositorio e instala dependencias:

```bash
$ git clone <https://github.com/ProyectoFormativo1/gestion_inventario_api>
```
```bash
$ cd gestion_inventario_api
```
```bash
$ npm install
```
## Comandos de Ayuda

Instalar nest.js CLI

```bash
npm i -g @nestjs/cli
```

Crear proyecto
```bash
nest new project-name
```

Librerias Externas Utiles
```bash
npm add class-validator class-transformer
```

Crear Nuevo Modulo
```bash
nest g resource locacion
```
Configurar Base de datos
```bash
npm install @nestjs/typeorm typeorm pg

```
Configurar variables de entorno y manejo de configuración
Instala el paquete oficial para gestionar variables de entorno y configuración en NestJS:

```bash
npm install @nestjs/config
```



Configurar JWT y BCryp

npm install @nestjs/jwt bcrypt --save