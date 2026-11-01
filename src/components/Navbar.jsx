import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-yellow-400 p-4 shadow-md mb-8">
      <div className="container mx-auto flex justify-between items-center text-red-600">
        <h1 className="text-2xl font-extrabold tracking-tight">Supermercado E-Kono</h1>
        <ul className="flex space-x-6 font-bold">
          <li>
            <Link to="/" className="hover:text-red-800 transition-colors">Inventario</Link>
          </li>
          <li>
            <Link to="/agregar" className="hover:text-red-800 transition-colors">Ingresar Artículo</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}