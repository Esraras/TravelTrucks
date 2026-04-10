import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CamperDetailPage from './pages/CamperDetailPage/CamperDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/:id" element={<CamperDetailPage />} />
    </Routes>
  )
}

export default App;
