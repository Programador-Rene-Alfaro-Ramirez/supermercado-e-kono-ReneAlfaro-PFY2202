import React, { createContext, useState } from 'react';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  // 1. Estado del inventario (agrega aquí datos de prueba si lo deseas para probar más rápido)
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Manzanas', category: 'Frutas', price: 1000, stock: 50, description: 'Manzanas rojas frescas.' },
    { id: 2, name: 'Leche', category: 'Lácteos', price: 1200, stock: 20, description: 'Leche entera 1L.' },
    { id: 3, name: 'Pan', category: 'Panadería', price: 1500, stock: 30, description: 'Pan marraqueta fresco.' }
  ]);

  // 2. Nuevo estado para el carrito de compras
  const [cart, setCart] = useState([]);

  // Función de la semana 2 para agregar un artículo nuevo al inventario
  const addArticleToInventory = (article) => {
    setInventory([...inventory, { ...article, id: Date.now() }]);
  };

  // 3. Función para agregar al carrito y descontar del inventario general
  const addToCart = (articleToAdd, quantity) => {
    // Revisar si ya está en el carrito para sumar la cantidad, o agregarlo como nuevo
    const existingItem = cart.find(item => item.id === articleToAdd.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === articleToAdd.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...articleToAdd, quantity }]);
    }

    // Restar la cantidad del stock en el inventario general
    setInventory(inventory.map(item =>
      item.id === articleToAdd.id
        ? { ...item, stock: item.stock - quantity }
        : item
    ));
  };

  // 4. Función para modificar cantidades desde la pantalla del carrito (+ o -)
  const updateCartQuantity = (articleId, change) => {
    const itemInCart = cart.find(item => item.id === articleId);
    const itemInInventory = inventory.find(item => item.id === articleId);

    if (!itemInCart || !itemInInventory) return;

    // Evitar aumentar la cantidad si no hay suficiente stock en el inventario original
    if (change > 0 && itemInInventory.stock < change) return;

    // Si al restar la cantidad llega a 0, se elimina el artículo del carrito
    if (itemInCart.quantity + change <= 0) {
      setCart(cart.filter(item => item.id !== articleId));
    } else {
      setCart(cart.map(item =>
        item.id === articleId
          ? { ...item, quantity: item.quantity + change }
          : item
      ));
    }

    // Actualizar el inventario general (si 'change' es +1, resta 1 al stock. Si es -1, suma 1 al stock)
    setInventory(inventory.map(item =>
      item.id === articleId
        ? { ...item, stock: item.stock - change }
        : item
    ));
  };

  return (
    <InventoryContext.Provider value={{
      inventory,
      cart,
      addArticleToInventory,
      addToCart,
      updateCartQuantity
    }}>
      {children}
    </InventoryContext.Provider>
  );
};