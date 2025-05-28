import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from 'assets/img/logoEcoMarket.png';
import lupa from 'assets/img/lupa.png';
import car from 'assets/img/car.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typewriter } from 'react-simple-typewriter';
import CartPanel from './car'; // Importar el componente del carrito
import { useAuth } from './AuthContext'; // Importar el hook de autenticación

function Navbar({ cartItems, setCartItems, removeFromCart }) {
  const [showCart, setShowCart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Usar el contexto de autenticación
  const { isLoggedIn, userName, logout } = useAuth();

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/catalogo?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsOpen(false);
      setShowMobileSearch(false);
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    logout();
    navigate('/Home');
  };

  // Efecto de scroll para cambiar la apariencia del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.mobile-menu-container')) {
        setIsOpen(false);
      }
      if (showMobileSearch && !e.target.closest('.mobile-search-container')) {
        setShowMobileSearch(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, showMobileSearch]);

  // Prevenir scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Items del menú principal (filtrados según el estado de login)
  const getMenuItems = () => {
    const baseItems = [
      { to: "/Home", label: "Inicio" },
      { to: "/catalogo", label: "Catálogo" },
    ];

    // Solo mostrar "Vender" si está logueado
    if (isLoggedIn) {
      baseItems.push({ to: "/vender", label: "Vender" });
      baseItems.push({ to: "/mis_Compras", label: "Mis compras" });
    }

    // Solo mostrar "Crear cuenta" si NO está logueado
    if (!isLoggedIn) {
      baseItems.push({ to: "/registrarse", label: "Crear cuenta" });
    }

    return baseItems;
  };

  
  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full text-white z-50 
          transition-all duration-500 ease-in-out
          ${isScrolled
            ? 'bg-green-500/95 backdrop-blur-md shadow-2xl py-2'
            : 'bg-green-400 shadow-md py-2 sm:py-3'
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 lg:px-6">

          {/* Logo - Mejorado para móviles */}
          <div className="flex items-center gap-2 sm:gap-3 group flex-shrink-0" onClick={() => navigate('/Home')}>
            <div  className="bg-white rounded w-7 h-7 sm:w-8 sm:h-8 flex justify-center items-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
               
              <img
                src={logo}
                alt="logo"
                className="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300"
                
              />
            </div>
            <span className="text-xs sm:text-sm md:text-base lg:text-xl font-bold text-white">
              <span className="text-white-600 inline-block min-w-[80px] sm:min-w-[120px]">
                <Typewriter
                  words={['ECOMARKET']}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={350}
                  delaySpeed={1000}
                />
              </span>
            </span>
          </div>

          {/* Barra de búsqueda móvil independiente */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 rounded-lg hover:bg-green-500/30 transition-all duration-300"
            >
              <img src={lupa} alt="buscar" className="w-5 h-5" />
            </button>

            {/* Carrito móvil */}
            <div className="relative">
              <button
                onClick={() => setShowCart(true)}
                className="
                  w-10 h-10 bg-white/90 rounded-lg 
                  flex justify-center items-center 
                  hover:bg-white hover:scale-105
                  transition-all duration-300 
                  shadow-md
                "
              >
                <svg
                  className="w-6 h-6 text-green-600 transition-all duration-300"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >

                  <path
                    d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />


                  <path
                    d="M3 6h18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />


                  <path
                    d="M8 10v2a4 4 0 0 0 8 0v-2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </button>
              {cartItems && cartItems.length > 0 && (
                <div className="
                  absolute -top-1 -right-1 
                  bg-red-500 text-white text-xs font-bold
                  rounded-full min-w-[18px] h-[18px] 
                  flex items-center justify-center px-1
                  border-2 border-white shadow-lg 
                  animate-pulse
                ">
                  {cartItems.length > 99 ? '99+' : cartItems.length}
                </div>
              )}
            </div>

            {/* Botón hamburguesa */}
            <button
              className="text-white focus:outline-none p-2 rounded-lg hover:bg-green-500/30 transition-all duration-300 mobile-menu-container"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'
                    }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-white rounded-full top-3 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-5'
                    }`}
                />
              </div>
            </button>
          </div>

          {/* Botón hamburguesa para tablets */}
          <button
            className="hidden sm:block lg:hidden text-white focus:outline-none p-2 rounded-lg hover:bg-green-500/30 transition-all duration-300 mobile-menu-container"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'
                  }`}
              />
              <span
                className={`absolute h-0.5 w-6 bg-white rounded-full top-3 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
              />
              <span
                className={`absolute h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-5'
                  }`}
              />
            </div>
          </button>

          {/* Buscador desktop - centrado */}
          <div className="hidden lg:flex flex-1 justify-center px-8">
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Busca un producto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="
                    w-full px-4 py-2 rounded-lg text-gray-800 
                    border-2 border-transparent
                    focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-200
                    transition-all duration-300 
                    shadow-lg hover:shadow-xl
                    group-hover:scale-[1.02]
                    placeholder:text-gray-500
                  "
                />
                <button
                  type="submit"
                  className="
                    absolute right-2 top-1/2 transform -translate-y-1/2
                    p-1 rounded-full hover:bg-green-100 
                    transition-all duration-300 hover:scale-110
                  "
                >
                  <img src={lupa} alt="buscar" className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Menú horizontal desktop */}
          <nav className="hidden lg:flex items-center gap-4">
            {getMenuItems().map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className="
                  relative group text-white text-[18px]
                  transition-all duration-300 
                  hover:text-green-900 hover:text-[22px]
                  whitespace-nowrap
                "
              >
                {label}
                <span className="
                  absolute left-0 -bottom-1 w-full h-0.5 
                  bg-gradient-to-l from-white to-green-400 
                  scale-x-0 group-hover:scale-x-100 
                  transition-transform duration-500 origin-left rounded
                " />
              </NavLink>
            ))}

            {/* Botón de login/logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="
                  bg-red-500 text-white px-3 py-1 rounded 
                  hover:bg-red-600 hover:scale-105 transition-all duration-300 
                  text-[16px] font-bold ml-2 shadow-md hover:shadow-lg
                "
              >
                Cerrar sesión
              </button>
            ) : (
             <NavLink
  to="/login"
  className="
    group relative overflow-hidden
    bg-white/90 backdrop-blur-sm
    text-emerald-700 font-semibold text-[16px]
    px-4 py-2 ml-2 rounded-lg
    border border-emerald-200/50
    hover:bg-emerald-600 hover:text-white
    hover:border-emerald-600
    hover:shadow-lg hover:shadow-emerald-200/40
    hover:-translate-y-0.5
    focus:outline-none focus:ring-2 focus:ring-emerald-300/50 focus:ring-offset-1
    active:translate-y-0 active:scale-[0.98]
    transition-all duration-300 ease-out
    before:absolute before:inset-0 
    before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
    before:translate-x-[-100%] before:transition-transform before:duration-500
    hover:before:translate-x-[100%]
  "
>
  <span className="relative z-10 flex items-center gap-1.5">
    <svg 
      className="w-4 h-4 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
      />
    </svg>
    Ingresa
  </span>
</NavLink>  
            )}

            {/* Carrito desktop */}
            <div className="relative group ml-2">
              <button
                onClick={() => setShowCart(true)}
                className="
                  px-2 py-2 bg-white rounded-lg 
                  flex justify-center items-center 
                  hover:bg-gray-100 hover:scale-105
                  transition-all duration-300 
                  shadow-md hover:shadow-lg
                "
                title="Carrito de compras"
              >
                <svg
                  className="w-6 h-6 text-green-600 transition-all duration-300"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >

                  <path
                    d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />


                  <path
                    d="M3 6h18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />


                  <path
                    d="M8 10v2a4 4 0 0 0 8 0v-2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </button>

              {cartItems && cartItems.length > 0 && (
                <div className="
                  absolute -top-2 -right-2 
                  bg-red-500 text-white text-xs font-bold
                  rounded-full min-w-[20px] h-5 
                  flex items-center justify-center px-1
                  border-2 border-white shadow-lg 
                  animate-pulse
                ">
                  {cartItems.length > 99 ? '99+' : cartItems.length}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Barra de búsqueda móvil expandible */}
        {showMobileSearch && (
          <div className="sm:hidden bg-green-500/95 backdrop-blur-md border-t border-green-300/20 mobile-search-container">
            <div className="px-3 py-3">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Busca un producto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="
                      w-full px-4 py-3 rounded-lg text-gray-800 
                      border-2 border-transparent
                      focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-200
                      transition-all duration-300 shadow-lg
                      placeholder:text-gray-500 text-base
                    "
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                  >
                    <img src={lupa} alt="buscar" className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Menú móvil mejorado */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-green-500/98 backdrop-blur-md z-50 animate-fade-in-down shadow-2xl border-t border-green-300/20 mobile-menu-container">
            <div className="max-h-[calc(100vh-80px)] overflow-y-auto">

              {/* Buscador para tablets */}
              <div className="hidden sm:block px-4 py-4 border-b border-green-300/20">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Busca un producto"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="
                        w-full px-4 py-3 rounded-lg text-gray-800 
                        border-2 border-transparent
                        focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-200
                        transition-all duration-300 shadow-md
                        placeholder:text-gray-500
                      "
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                    >
                      <img src={lupa} alt="buscar" className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Enlaces de navegación */}
              <div className="flex flex-col px-4 py-2">
                {getMenuItems().map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `
                        text-white text-base sm:text-lg font-medium
                        px-4 py-4 rounded-lg mb-1
                        transition-all duration-300
                        hover:bg-green-600/50 hover:translate-x-2
                        active:scale-95
                        border-l-4 border-transparent hover:border-white
                        ${isActive ? 'bg-green-600/70 border-white text-green-100' : ''}
                      `
                    }
                  >
                    {label}
                  </NavLink>
                ))}

                {/* Botón de login/logout destacado */}
                <div className="mt-4 pt-4 border-t border-green-300/20">
                  {isLoggedIn ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="
                        block w-full text-center
                        bg-red-500 text-white font-bold
                        px-6 py-4 rounded-lg text-base sm:text-lg
                        hover:bg-red-600 hover:shadow-lg
                        transition-all duration-300
                        active:scale-95
                      "
                    >
                      Cerrar sesión
                    </button>
                  ) : (
                    <NavLink
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="
    group relative block w-full text-center overflow-hidden
    bg-gradient-to-r from-emerald-50 to-green-50
    border border-emerald-200/60
    text-emerald-700 font-semibold
    px-6 py-4 rounded-xl text-base sm:text-lg
    backdrop-blur-sm
    hover:from-emerald-100 hover:to-green-100
    hover:border-emerald-300/80
    hover:shadow-lg hover:shadow-emerald-100/50
    hover:text-emerald-800
    hover:-translate-y-0.5
    focus:outline-none focus:ring-2 focus:ring-emerald-300/50 focus:ring-offset-2
    active:translate-y-0 active:scale-[0.98]
    transition-all duration-300 ease-in-out
    before:absolute before:inset-0 
    before:bg-gradient-to-r before:from-emerald-200/0 before:via-emerald-200/20 before:to-emerald-200/0
    before:translate-x-[-100%] before:transition-transform before:duration-700
    hover:before:translate-x-[100%]
  "
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                        Ingresar
                      </span>
                    </NavLink>
                  )}
                </div>

                {/* Carrito para tablets */}
                <div className="hidden sm:block mt-4">
                  <button
                    onClick={() => {
                      setShowCart(true);
                      setIsOpen(false);
                    }}
                    className="
                      flex items-center justify-between w-full
                      text-white font-medium px-4 py-4 rounded-lg
                      hover:bg-green-600/50 transition-all duration-300
                      border-l-4 border-transparent hover:border-white
                    "
                  >
                    <span className="text-base sm:text-lg">🛒 Carrito</span>
                    {cartItems && cartItems.length > 0 && (
                      <div className="bg-red-500 text-white text-sm font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-2">
                        {cartItems.length > 99 ? '99+' : cartItems.length}
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Información adicional */}
              <div className="px-4 py-4 border-t border-green-300/20 bg-green-600/30">
                <p className="text-green-100 text-sm text-center">
                  {isLoggedIn ? `¡Bienvenido ${userName}! 🌱` : '¡Bienvenido a EcoMarket! 🌱'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Barra de progreso de scroll */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-300 to-green-100 transition-all duration-300"
          style={{
            width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
          }}
        />
      </header>

      {/* Overlay mejorado */}
      {(isOpen || showMobileSearch) && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => {
            setIsOpen(false);
            setShowMobileSearch(false);
          }}
        />
      )}

      {/* Componente del carrito */}
      <CartPanel
        showCart={showCart}
        setShowCart={setShowCart}
        cartItems={cartItems || []}
        userName={userName}
        removeFromCart={removeFromCart}
      />

      {/* Estilos CSS mejorados */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        /* Scroll suave en el menú móvil */
        .max-h-[calc(100vh-80px)] {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }
        
        .max-h-[calc(100vh-80px)]::-webkit-scrollbar {
          width: 4px;
        }
        
        .max-h-[calc(100vh-80px)]::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .max-h-[calc(100vh-80px)]::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        
        /* Mejoras para dispositivos táctiles */
        @media (max-width: 640px) {
          .mobile-menu-container a,
          .mobile-menu-container button {
            min-height: 48px;
            display: flex;
            align-items: center;
          }
        }
        
        /* Animación de hover mejorada */
        @media (hover: hover) {
          .hover\\:translate-x-2:hover {
            transform: translateX(8px);
          }
        }
        
        /* Prevenir zoom en inputs en iOS */
        @media screen and (max-width: 640px) {
          input[type="text"] {
            font-size: 16px;
          } 
        }

        /* Efecto parallax sutil */
        @media (min-width: 1024px) {
          header {
            transform: translateZ(0);
          }
        }
      `}</style>
    </>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (index) => dispatch({ type: 'REMOVE_FROM_CART', payload: index }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);