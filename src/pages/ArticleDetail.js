import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InventoryContext } from '../context/InventoryContext';

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { inventory, addToCart } = useContext(InventoryContext);
  const [quantity, setQuantity] = useState(1);

  const article = inventory.find(item => item.id === parseInt(id));

  if (!article) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-600">Artículo no encontrado</h2>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver al Inventario
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= article.stock) {
      addToCart(article, quantity);
      alert(`Agregaste ${quantity} de ${article.name} al carrito.`);
      setQuantity(1);
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-2xl">
      {/* Botón volver en rojo Ekono */}
      <button 
        onClick={() => navigate('/')} 
        className="text-red-600 hover:text-red-800 hover:underline mb-6 font-semibold flex items-center"
      >
        &larr; Volver al Inventario
      </button>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{article.name}</h1>
          {/* Categoría en rojo Ekono */}
          <p className="text-sm font-bold text-red-500 mb-6 uppercase tracking-wider">{article.category}</p>
          
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">{article.description}</p>
          
          <div className="flex justify-between items-end mb-8 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-500 mb-1">Precio Unitario</p>
              <span className="text-3xl font-black text-gray-900">${article.price}</span>
            </div>
            <div className="text-right">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${article.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                Stock disponible: {article.stock}
              </span>
            </div>
          </div>

          {article.stock > 0 ? (
            <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-3 font-bold text-lg bg-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(article.stock, quantity + 1))}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold transition-colors"
                >
                  +
                </button>
              </div>
              {/* Botón Agregar en amarillo Ekono con texto rojo */}
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-red-700 font-extrabold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
              >
                Agregar al Carrito
              </button>
            </div>
          ) : (
            <div className="mt-8 pt-6 border-t border-gray-200 text-center bg-red-50 rounded-lg p-4">
              <p className="text-red-600 font-black text-xl">Producto Agotado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}