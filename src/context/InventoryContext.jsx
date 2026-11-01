import { createContext, useState } from 'react';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  // Lista de artículos
  const [articles, setArticles] = useState([]);

  // Función para agregar un nuevo artículo al inventario
  const addArticle = (article) => {
    setArticles([...articles, { ...article, id: Date.now() }]);
  };

  // función para eliminar un artículo usando su id
  const deleteArticle = (id) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  return (
    <InventoryContext.Provider value={{ articles, addArticle, deleteArticle }}>
      {children}
    </InventoryContext.Provider>
  );
};