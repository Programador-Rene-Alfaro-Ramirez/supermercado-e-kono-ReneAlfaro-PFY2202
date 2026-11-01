import { useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';

export default function InventoryList() {
  const { articles, deleteArticle } = useContext(InventoryContext);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 border rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-extrabold mb-6 text-red-700 text-center">Inventario Actual</h2>
      
      {articles.length === 0 ? (
        <p className="text-gray-500 text-center p-4 font-medium">No hay artículos en el inventario. Agrega uno nuevo desde el menú.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-yellow-100 border-b-2 border-yellow-400">
                <th className="p-4 text-red-700 font-bold rounded-tl-lg">Nombre</th>
                <th className="p-4 text-red-700 font-bold">Marca</th>
                <th className="p-4 text-red-700 font-bold">Tipo</th>
                <th className="p-4 text-red-700 font-bold rounded-tr-lg text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((item) => (
                <tr key={item.id} className="border-b hover:bg-yellow-50 transition-colors">
                  <td className="p-4 text-gray-800 font-medium">{item.name}</td>
                  <td className="p-4 text-gray-600">{item.brand}</td>
                  <td className="p-4 text-gray-600">
                    <span className="bg-yellow-200 text-yellow-800 border border-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => deleteArticle(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded text-sm transition-colors shadow-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}