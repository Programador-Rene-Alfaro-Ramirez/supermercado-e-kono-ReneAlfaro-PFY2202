import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { InventoryContext } from '../context/InventoryContext';

// 1. Componente Reutilizable FormField (Punto 5 del feedback del profe)
const FormField = ({ label, name, type = "text", error, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
        error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500'
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default function AddArticle() {
  const { addArticleToInventory } = useContext(InventoryContext);
  const navigate = useNavigate();
  // Estado exclusivo para los mensajes de error
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 2. Extracción de datos usando FormData (Punto 5 del feedback)
    const formData = new FormData(e.target);
    const newArticle = {
      name: formData.get('name').trim(),
      category: formData.get('category').trim(),
      price: formData.get('price').trim(),
      stock: formData.get('stock').trim(),
      description: formData.get('description').trim(),
    };

    // 3. Validaciones con Expresiones Regulares - Regex (Punto 1 del feedback)
    const newErrors = {};
    const nameRegex = /^[a-zA-Z0-9\sñÑáéíóúÁÉÍÓÚ]+$/; // Letras y números
    const categoryRegex = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/; // Solo letras (sin números)
    const numberRegex = /^[0-9]+$/; // Solo números enteros positivos

    if (!nameRegex.test(newArticle.name)) {
      newErrors.name = 'El nombre solo debe contener letras y números.';
    }
    if (!categoryRegex.test(newArticle.category)) {
      newErrors.category = 'La categoría solo debe contener letras.';
    }
    if (!numberRegex.test(newArticle.price) || parseInt(newArticle.price) <= 0) {
      newErrors.price = 'El precio debe ser un número mayor a 0.';
    }
    if (!numberRegex.test(newArticle.stock) || parseInt(newArticle.stock) < 0) {
      newErrors.stock = 'El stock debe ser 0 o un número mayor.';
    }

    // Si hay errores, detenemos el guardado y los mostramos
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    // 4. Si pasa las validaciones, guardamos en el contexto
    addArticleToInventory({
      ...newArticle,
      price: parseInt(newArticle.price),
      stock: parseInt(newArticle.stock),
    });

    // 5. Limpieza del estado y formulario (Punto 5 del feedback)
    e.target.reset(); 
    setErrors({});
    alert('¡Artículo agregado con éxito al inventario!');
    navigate('/'); 
  };

  return (
    <div className="container mx-auto mt-8 max-w-lg">
      {/* Contenedor con borde superior rojo Ekono */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-t-8 border-red-600">
        <h2 className="text-3xl font-extrabold text-red-600 mb-6 text-center">Ingresar Nuevo Artículo</h2>
        
        {/* Atributo noValidate para que HTML5 no interfiera con nuestras Regex */}
        <form onSubmit={handleSubmit} noValidate>
          <FormField 
            label="Nombre del Artículo" 
            name="name" 
            placeholder="Ej. Arroz Grado 1"
            error={errors.name} 
          />
          
          <FormField 
            label="Categoría" 
            name="category" 
            placeholder="Ej. Abarrotes"
            error={errors.category} 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField 
              label="Precio Unitario" 
              name="price" 
              type="number"
              placeholder="Ej. 1500"
              error={errors.price} 
            />
            
            <FormField 
              label="Stock Inicial" 
              name="stock" 
              type="number"
              placeholder="Ej. 50"
              error={errors.stock} 
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Descripción (Opcional)
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Detalles del producto..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            {/* Botón amarillo Ekono con texto rojo */}
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-red-700 font-extrabold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Guardar Artículo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}