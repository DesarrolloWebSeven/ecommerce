![](https://github.com/DesarrolloWebSeven/ecommerce/blob/master/public/logo/logo-color.png)
### Proyecto final del bootcamp de Desarrollo Web Fullstack - Tomillo F5


 [![GitHub release](https://img.shields.io/github/release/ovflowd/ecommerce.svg)](https://github.com/DesarrolloWebSeven/ecommerce) 


## Características

<b>Funciones del administrador</b>

| Función  |  ¿Implementado? |
|----------|:---------------:|
| Añadir un producto | &#10004;|
| Listar productos | &#10004; |
| Editar productos | &#10004; |
| Borrar productos | &#10004; |
| Buscador de productos | &#10004; |
| Editar contenido estático | &#10004;|
| Listar clientes | &#10004; |
| Editar clientes | &#10004; |
| Desactivar clientes | &#10004; |
| Buscador clientes | &#10004; |
| Ver pedidos de cliente | &#10004; |
| Editar estado de los pedidos | &#10004; |
| Ver histórico de pedidos | &#10004; |
| Buscador de pedidos | &#10004; |
| Listar pedidos | &#10004; |
| Borrar pedidos | &#10004; |



<b>Funciones del usuario</b>

| Función  |  ¿Implementado? |
|----------|:---------------:|
| Aceptar políticas de privacidad y cookies | &#10004; |
| Registrarse en la tienda | &#10004; |
| Hacer login en la tienda | &#10004; |
| Navegar por las secciones de la tienda | &#10004;|
| Seleccionar idioma (en/es) | &#10004; |
| Editar datos del perfil | &#10004; |
| Agregar productos al carrito| &#10004; |
| Ver detalles del producto | &#10004; |
| Eliminar productos del carrito | &#10004; |
| Vaciar el carrito | &#10004; |
| Guardar dirección de envío | &#10004; |
| Ver resumen de compra | &#10004; |
| Enviar formulario de consultas | &#10004; |
| Comunicarse con la tienda via Whatsapp | &#10004; |
| Pasarela de pago | &#10008; |





# eCommerce

**Geeky** es el proyecto final de cuatro coders de la segunda promoción del **Bootcamp de Desarrollo Web FullStack de Fundación Tomillo y Factoría F5**, interesados en ofrecer a los pequeños comercios locales y emprendedores una herramienta de **e-commerce** que les permita vender sus productos a través de Internet y les ayude a gestionar el stock de los productos de su tienda y el contenido de las páginas de contenido estático desde la misma plataforma.


## Instalación

* Instalación de nodeJS (Recomendada la versión 14.x)
* Instalación de Vue3 (CompositionAPI) versión recomendada 4.x
* Instalación de MongoDB
* Instalar nodemon

## Conexión a Base de datos
Dentro del proyecto crear un archivo .env con los siguientes campos:
PORT_SERVER = ****
DB_HOST = Podra ser localhost o un servidor externo
DB_USER = ****
DB_PASS = ****
DB_NAME = ****
## Datos privados para session y login
En el mismo archivo añadir estos dos campos:
SECRET = *****
TOKEN = ****

**Los valores de los campos que aparecen con asteriscos deberán ser completados con la información de la base de la base de datos creada y la información que el desarrollador considere oportuna**



### Desarrollo


##### Instalar paquetes del proyecto
```
npm install
```

##### Compilar y lanzar el servidor del front
```
npm run serve
```
##### Compilar y lanzar el servidor del back (en otra consola)
```
cd backend
nodemon server
```


##### Puertos

Por defecto el puerto del front será el **8080**
Por defecto el puerto para el back será el **8081**


## Autores ✒️

_Este proyecto ha sido desarrollado por:_

* **Amparo González** - *Developer* - [Amparcabezas](https://github.com/Amparcabezas)
* **Beatriz López** - *Developer* - [belopmardev](https://github.com/belopmardev)
* **Nuria Martínez** - *Developer* - [nurimartinez](https://github.com/nurimartinez)
* **Víctor Bonilla** - *Developer* - [DesarrolloWebSeven](https://github.com/DesarrolloWebSeven)
