import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="App d-flex flex-column min-vh-100">
              <Navbar />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  {/* Placeholder routes - will be implemented */}
                  <Route path="/productos" element={<div className="container py-5"><h1>Productos - En desarrollo</h1></div>} />
                  <Route path="/servicios" element={<div className="container py-5"><h1>Servicios - En desarrollo</h1></div>} />
                  <Route path="/servicios/:category" element={<div className="container py-5"><h1>Servicios por categoría - En desarrollo</h1></div>} />
                  <Route path="/reservas" element={<div className="container py-5"><h1>Reservas - En desarrollo</h1></div>} />
                  <Route path="/nosotros" element={<div className="container py-5"><h1>Nosotros - En desarrollo</h1></div>} />
                  <Route path="/contacto" element={<div className="container py-5"><h1>Contacto - En desarrollo</h1></div>} />
                  <Route path="/carrito" element={<div className="container py-5"><h1>Carrito - En desarrollo</h1></div>} />
                  <Route path="/login" element={<div className="container py-5"><h1>Login - En desarrollo</h1></div>} />
                  <Route path="/perfil" element={<div className="container py-5"><h1>Perfil - En desarrollo</h1></div>} />
                  <Route path="/mis-reservas" element={<div className="container py-5"><h1>Mis reservas - En desarrollo</h1></div>} />
                  <Route path="/admin" element={<div className="container py-5"><h1>Panel Admin - En desarrollo</h1></div>} />
                  <Route path="*" element={<div className="container py-5"><h1>404 - Página no encontrada</h1></div>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
