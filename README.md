# Supermercado E-Kono - Gestión de Inventario

Esta es una Single Page Application (SPA) desarrollada para la asignatura de Desarrollo Frontend II. Permite gestionar el inventario de un supermercado, ver detalles de productos y simular un carrito de compras.

## Tecnologías Utilizadas
* **React:** Librería principal para la construcción de interfaces.
* **React Router DOM:** Para la navegación dinámica entre la lista, los detalles y el carrito.
* **Context API (`useContext`, `useState`):** Para la gestión del estado global del inventario y el carrito.
* **Tailwind CSS:** Para el diseño responsivo y la aplicación de la identidad visual (colores de la marca).

## Funcionalidades
1. **Listado y Filtro:** Muestra todos los artículos y permite filtrarlos por categoría sin perder los datos originales.
2. **Detalle de Artículo:** Vista específica de un producto leyendo parámetros dinámicos de la URL.
3. **Carrito Dinámico:** Permite agregar/quitar productos, calculando el total y actualizando el stock disponible en el inventario general en tiempo real.

## Cómo ejecutar localmente
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Ejecutar `npm start` para levantar el servidor local.