import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import Navbar from './components/Navbar';
import AddArticle from './pages/AddArticle';
import InventoryList from './pages/InventoryList';

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
            </Routes>
          </div>
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App;