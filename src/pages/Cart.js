import React, { useContext } from 'react';
import { Link } from 'react-router';
import { InventoryContext } from '../context/InventoryContext';

export default function Cart() {
  const { cart, updateCartQuantity } = useContext(InventoryContext);
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto mt-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Tu Carrito de Compras</h1>

      {cart.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-lg shadow-md">
          <p className="text-xl text-gray-500 mb-6">El carrito está vacío.</p>
          <Link 
            to="/" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            Ir al Inventario
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {cart.map(item => (
              <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center justify-between hover:bg-gray-50 transition-colors">
                
                <div className="flex-1 mb-4 sm:mb-0">
                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-lg font-semibold text-red-600 mt-1">${item.price}</p>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center border-2 border-gray-300 rounded-md overflow-hidden bg-white">
                    <button 
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-red-100 hover:text-red-600 font-bold transition-colors"
                      title="Disminuir cantidad"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-green-100 hover:text-green-600 font-bold transition-colors"
                      title="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-24 text-right">
                    <span className="font-bold text-red-600">${item.price * item.quantity}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-gray-700">Total a Pagar:</span>
              <span className="text-3xl font-black text-red-600">${totalAmount}</span>
            </div>
            <div className="flex justify-end space-x-4">
              <Link 
                to="/" 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Seguir Comprando
              </Link>
              <button 
                className="bg-yellow-400 hover:bg-yellow-500 text-red-700 font-extrabold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
                onClick={() => alert('¡Compra simulada con éxito!')}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}