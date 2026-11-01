import { useState, useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import { useNavigate } from 'react-router-dom';

export default function AddArticle() {
  const { addArticle } = useContext(InventoryContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    type: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addArticle(formData);
    // Redirige al inventario (la tabla) después de guardar
    navigate('/'); 
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Agregar Nuevo Artículo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Nombre del Producto</label>
          <input 
            type="text" 
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Marca</label>
          <input 
            type="text" 
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setFormData({...formData, brand: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Tipo de Producto</label>
          <select 
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            <option value="">Selecciona un tipo...</option>
            <option value="Abarrotes">Abarrotes</option>
            <option value="Lácteos">Lácteos</option>
            <option value="Limpieza">Limpieza</option>
            <option value="Mascotas">Mascotas</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Guardar Artículo
        </button>
      </form>
    </div>
  );
}