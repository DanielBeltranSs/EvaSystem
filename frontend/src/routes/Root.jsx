import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import RootUsuario from '../components/RootUsuario.jsx';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const { user } = useAuth();
  const isAdmin = user.roles.some(role => role.name === 'admin');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-customPurple min-h-screen flex flex-col"> {/* Fondo personalizado morado oscuro */}
      {/* Barra superior */}
      <div className="bg-customDarkPurple rounded shadow-md text-customGreen flex justify-between items-center p-4 relative z-50 w-full">
        <div className="w-3/4">
          <Link to="/" className="text-xl md:text-3xl mb-2 text-customGreen">
            FutuMaster Electronics
          </Link>
        </div>
        <div className="flex justify-end w-1/4 items-center">
          <RootUsuario />
        </div>
      </div>

      {/* Contenido de la página */}
      <div className="flex-grow flex relative">
        {/* Botón Abrir/Cerrar Menú para pantallas pequeñas */}
        <div className="fixed bottom-6 right-6 z-50 md:hidden">  
          <button 
            onClick={handleMenuToggle}
            className="bg-customGreen text-black p-4 rounded-full focus:outline-none shadow-lg hover:bg-customOrange"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Menú lateral */}
        <div 
          id="sidebar"
          className={`w-64 bg-customDarkGray bg-opacity-70 text-customGreen flex flex-col h-full fixed top-0 z-40 transform transition-transform duration-200 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:bg-opacity-100`} 
          style={{ height: '100vh', backdropFilter: 'blur(5px)' }}
        >
          <nav className="flex-grow mt-40">
            <ul>
              <li>
                <Link to="/" className="block py-2.5 px-4 rounded hover:bg-customOrange" onClick={handleMenuClose}>Inicio</Link>
              </li>
              <li>
                <Link to="/foro" className="block py-2.5 px-4 rounded hover:bg-customOrange" onClick={handleMenuClose}>Foro</Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/proyectos" className="block py-2.5 px-4 rounded hover:bg-customOrange" onClick={handleMenuClose}>Proyectos</Link>
                </li>
              )}
              <li>
                <Link to="/asistencia" className="block py-2.5 px-4 rounded hover:bg-customOrange" onClick={handleMenuClose}>Asistencia</Link>
              </li>
              {isAdmin && (
                <>
                  <li>
                    <Link to="/inventario" className="block py-2.5 px-4 rounded hover:bg-customOrange" onClick={handleMenuClose}>Inventario</Link>
                  </li>
                  <li>
                    <Link to="/usuarios" className="block py-2.5 px-4 rounded hover:bg-customOrange" onClick={handleMenuClose}>Usuarios</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

        {/* Contenido principal */}
        <div className={`flex-grow p-6 min-h-screen w-full overflow-auto md:ml-64 bg-customPurple text-customGreen ${isMenuOpen ? '' : 'ml-0'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Root;
