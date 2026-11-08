import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { InventoryContext } from '../context/InventoryContext';

export default function InventoryList() {
  // 1. Extraemos el inventario del contexto global
  const { inventory } = useContext(InventoryContext);
  
  // 2. Estado local para manejar la categoría seleccionada en el filtro
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // 3. Extraer categorías únicas para poblar el select dinámicamente
  const categories = ['Todas', ...new Set(inventory.map(item => item.category))];

  // 4. Filtrar el inventario para renderizar, manteniendo el original intacto
  const filteredInventory = selectedCategory === 'Todas'
    ? inventory
    : inventory.filter(item => item.category === selectedCategory);

  return (
    <div className="container mx-auto mt-8">
      {/* Título en rojo Ekono */}
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Inventario de Artículos</h1>

      {/* Controles: Filtro */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <label htmlFor="categoryFilter" className="mr-2 font-semibold text-gray-700">Filtrar por categoría:</label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            // Anillo de foco en rojo Ekono
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cuadrícula de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.length > 0 ? (
          filteredInventory.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="p-4 flex-grow">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                <div className="flex justify-between items-center mb-4">
                  {/* Precio en rojo Ekono */}
                  <span className="font-bold text-lg text-red-600">${item.price}</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    Stock: {item.stock}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 mt-auto">
                 {/* 5. Enlace al detalle: Fondo rojo, hover más oscuro, texto amarillo */}
                <Link 
                  to={`/articulo/${item.id}`} 
                  className="block w-full text-center bg-red-600 text-yellow-50 font-semibold py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
                >
                  Ver Detalle
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No hay artículos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}