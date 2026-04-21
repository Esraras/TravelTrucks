import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CamperDetailPage from './pages/CamperDetailPage/CamperDetailPage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailPage />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="colored" />
    </>
  )
}

export default App;
