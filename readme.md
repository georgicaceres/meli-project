# TEST - MERCADO LIBRE

Este ejercicio fue desarrollado para Mercado Libre. El proyecto está disponible en [https://meli-project.herokuapp.com/](https://meli-project.herokuapp.com/) hosteado en Heroku y en [https://georgicaceres.github.io/meli-project](https://georgicaceres.github.io/meli-project) se puede ver la documentación.

## Tabla de Contenidos
- [Especificaciones](#especificaciones)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Observaciones](#observaciones)
- [Posibles mejoras](#posibles-mejoras)
- [Setup](#setup)

## Especificaciones

Se requiere se construya una aplicación cliente/servidor con ExpressJs con los siguientes requerimientos:
#### SERVER-SIDE
- Atienda a la ruta “/ping” y devuelva la palabra “pong”
- Al ingresar a la ruta “/user/form” (raíz) renderice un formulario con los siguientes datos:
	- Nombre (Máximo 30 caracteres)
	- Apellido (Máximo 30 caracteres)
	- Teléfono (Solo números)
	- Email (Formato válido usando regular expressions)
- Que al hacer submit envíe esos datos por método POST a la ruta “/user” (raíz), los guarde/agregue en un archivo y haga una redirección a la ruta “/user/list”.
- Al recibir el post, escribir la información validada en un archivo.
- Al ingresar a la ruta “/user/list” renderice un listado con los datos que pedimos en el paso anterior, levantando la información del archivo generado, usando algún template engine.
- Agregar validación en base a la información asociada a cada campo.
#### CLIENT-SIDE
- Agregar validación en base a la información asociada a cada campo.
- La información deberá ser mostrada en una tabla filtrable y con campo de búsqueda como la de bootstrap.

#### GENERALES
- Documentar la solución utilizando http://usejsdoc.org/
-  Subir el código a un repositorio de github

#### ADICIONALES NO MANDATORIOS
- Se valorará contar con test de la aplicación, preferentemente unitarios.
- Se valorará contar con acciones en la tabla, como por ejemplo poder eliminar al usuario o editarlo.

## Tecnologías utilizadas

El proyecto corre sobre un servidor montado en [nodejs](https://nodejs.org/) utilizando [expressjs](http://expressjs.com/) como framework  y [pugjs](https://pugjs.org) como template-engine. Para la validación server-side se utilizó la librería [express-validator](https://express-validator.github.io).
Dentro del stack del cliente se utilizan las librerías [jquery](https://jquery.com/) y [jqueyvalidation](https://jqueryvalidation.org/) para las validaciones correspondientes.
La documentación fue generada utilizando [jsdoc](http://usejsdoc.org/) y los test corren en [mocha](https://mochajs.org/).

## Observaciones

- Si bien no fue especificado, en el formulario se consideraron los campos nombre, apellido y mail como requeridos, dejando el campo teléfono como opcional pero validando que, de colocarse, se admitan sólo números tal y como se indica.
- Se incluyó en el servidor la librería [helmet](https://helmetjs.github.io/) que ayuda a proteger la app de algunas vulnerabilidades web mediante el establecimiento de headers HTTP. En este mismo sentido, el uso de jquery del lado del cliente y pug del lado del servidor para la renderización de contenido del usuario evita también otro tipo de ataques de inyección de scripting.
- Tanto [jqueryvalidation](https://jqueryvalidation.org/) como [express-validator](https://express-validator.github.io) cuentan con métodos para validar emails que utilizan regex por detrás pero aún así se customizó esta validación en cumplimiento de la consigna y teniendo en cuenta que los mismos admiten como válidos mails incompletos, como por ejemplo "user@domain". El problema disparó la necesidad de interiorizarse sobre el uso de regex en validaciones de mails, llegando a la conclusión que no existe una regex más o menos correcta que otra y que se recomienda usar alguna básica, no tan estricta y complementar la validación con el envío de un link de confirmación/activación al mail del usario.
- Para poder testear el middleware de express-validator de forma unitaria se requería crear requests y responses sin realizar llamadas http reales. Para tal propósito se utilizó el módulo [httpMock](http://github.com/howardabrams/node-mocks-http).
- La implementación de los métodos editUser() y deleteUser() resulta un tanto ineficiente producto de la utilización de un archivo para el almacenamiento de datos dado que no es posible indexación alguna y por tanto acceder a un usuario determinado requiere, en el peor de los casos, recorrer todo el archivo.


## Posibles mejoras

- Utilizar una base de datos para la persistencia de los usuarios.
- Integrar servicios de analytics tanto client como server side.
- Agregar paginación para el rendering de la lista de usuarios, con un correspondiente servicio para ser llamado con AJAX.
- Validación server y client side para la edición de usuarios en la vista de lista.
- No volver a cargar el archivo con cada request sino mantener una copia en memoria.
- Mejorar los estilos. Utilizar less/sass.

## Setup

Como dependencia del proyecto se encuentra [Nodejs](https://nodejs.org/es/) > v6.0..

El resto de las dependencias se encuentran listadas en el archivo `app/package.json` y son instalables via `npm`.

```bash
$ npm install
$ npm start
```
Para correr los tests
```bash
$ npm test
```
Y para generar la documentación
```bash
$ npm run doc
```
