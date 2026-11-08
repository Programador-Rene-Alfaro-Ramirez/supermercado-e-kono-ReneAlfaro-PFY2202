import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { InventoryContext } from '../context/InventoryContext';

export default function Navbar() {
  // 1. Traemos el carrito desde el contexto global
  const { cart } = useContext(InventoryContext);

  // 2. Calculamos el total de unidades que hay en el carrito
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-yellow-400 p-4 shadow-md mb-8">
      <div className="container mx-auto flex justify-between items-center text-red-600">
        <h1 className="text-2xl font-extrabold tracking-tight">Supermercado E-Kono</h1>
        <ul className="flex space-x-6 font-bold items-center">
          <li>
            <Link to="/" className="hover:text-red-800 transition-colors">Inventario</Link>
          </li>
          <li>
            <Link to="/agregar" className="hover:text-red-800 transition-colors">Ingresar Artículo</Link>
          </li>
          {/* 3. Nuevo enlace al carrito con un indicador visual de cantidad */}
          <li>
            <Link 
              to="/carrito" 
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
            >
              Carrito
              {totalItems > 0 && (
                <span className="ml-2 bg-yellow-400 text-red-700 font-black rounded-full px-2 py-0.5 text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}