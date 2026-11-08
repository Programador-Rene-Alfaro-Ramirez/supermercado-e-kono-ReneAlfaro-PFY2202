import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import Navbar from './components/Navbar';
import AddArticle from './pages/AddArticle';
import InventoryList from './pages/InventoryList';
// 1. Importa las nuevas páginas (las crearemos en el siguiente paso)
import ArticleDetail from './pages/ArticleDetail';
import Cart from './pages/Cart';

function App() {
  return (
    <InventoryProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<InventoryList />} />
              <Route path="/agregar" element={<AddArticle />} />
              {/* 2. Agrega la ruta dinámica para el detalle del artículo */}
              <Route path="/articulo/:id" element={<ArticleDetail />} />
              {/* 3. Agrega la ruta para el carrito de compras */}
              <Route path="/carrito" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App;