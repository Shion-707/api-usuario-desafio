
# Api Usuario

Backend que permite registrar un usuario, ingresar con un usuario existente, y recuperar contraseña.

<p align="center">
<img src="https://img.shields.io/badge/Npm-v10.1.0-blue" alt="Npm Version"/>
<img src="https://img.shields.io/badge/NestJS-v10.4.7-red" alt="Nest version">
<img src="https://img.shields.io/badge/Database-MySQL-orange" alt="Mysql">
<img src="https://img.shields.io/badge/Prisma_ORM-v5.22.0-skyblue" alt="Prisma version">
</p>

## Correr localmente

Clonar proyecto

```bash
  git clone https://github.com/Shion-707/api-usuario-desafio.git
```

Instalar dependencias

```bash
  npm install
```
Correr servidor modo desarrollo

```bash
  npm run start:dev
```

Correr servidor

```bash
  npm run start
```


## Características

- Módulos
  - Registrar nuevo usuario
  - Ingresar con credenciales de usuario
  - Recuperar contraseña
  - Swagger: /api

-  Para desarrollo
  - Ver todos los usuarios registrados
  - Ver usuario por email

## Variables de entorno

Para correr este proyecto, se necesitan añadir las siguientes variables de entorno al archivo .env

`DATABASE_URL`

`JWT_CONSTANTS`

`EMAIL_USER`

`EMAIL_PASS`


## Autora

- [@Shion-707](https://www.github.com/Shion-707)

