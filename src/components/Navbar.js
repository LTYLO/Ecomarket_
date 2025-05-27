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

function Navbar({ cartItems, setCartItems, removeFromCart }) {
  const [showCart, setShowCart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState("Invitado");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/catalogo?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsOpen(false); // cerrar menú móvil
    }
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
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full text-white z-50 
          transition-all duration-500 ease-in-out
          ${isScrolled
            ? 'bg-green-500/95 backdrop-blur-md shadow-2xl py-2'
            : 'bg-green-400 shadow-md py-2'
          }
        `}
      >
        <div className="max-w-7x1 mx-auto flex items-center justify-between px-4 lg:px-6">

          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <div className="bg-white rounded w-8 h-8 flex justify-center items-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
              <img
                src={logo}
                alt="logo"
                className="h-5 w-5 transition-all duration-300"
              />
            </div>
            <span className="text-sm md:text-base lg:text-xl font-bold text-white">
              {' '}
              <span className="text-white-600 inline-block min-w-[120px]">
                <Typewriter
                  words={[ ' ECOMARKET']}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>{' '}
             
            </span>

          </div>

          {/* Botón hamburguesa */}
          <button
            className="lg:hidden text-white focus:outline-none p-2 rounded-lg hover:bg-green-500/30 transition-all duration-300"
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

          {/* Buscador - centrado */}
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

          {/* Menú móvil */}
          {isOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-green-400 z-50 animate-fade-in-down shadow-lg">
              <div className="flex flex-col items-start px-4 py-3 gap-3">
                {[
                  { to: "/Home", label: "Inicio" },
                  { to: "/catalogo", label: "Catálogo" },
                  { to: "/vender", label: "Vender" },
                  { to: "/mis_Compras", label: "Mis compras" },
                  { to: "/registrarse", label: "Crear cuenta" },
                  { to: "/login", label: "Ingresa" },
                ].map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)} // cerrar menú al hacer click
                    className="
            text-white text-[18px] w-full
            px-2 py-1 rounded hover:bg-green-600
            transition-all duration-300
          "
                  >
                    {label}
                  </NavLink>
                ))}

                {/* Buscador en versión móvil */}
                <form onSubmit={handleSearch} className="w-full mt-2">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Busca un producto"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="
              w-full px-4 py-2 rounded-lg text-gray-800 
              border-2 border-transparent
              focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-200
              transition-all duration-300 shadow-md
              placeholder:text-gray-500
            "
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <img src={lupa} alt="buscar" className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}


          {/* Menú horizontal */}
          <nav className="hidden lg:flex items-center gap-6">
            {[
              { to: "/Home", label: "Inicio" },
              { to: "/catalogo", label: "Catálogo" },
              { to: "/vender", label: "Vender" },
              { to: "/mis_Compras", label: "Mis compras" },
              { to: "/registrarse", label: "Crear cuenta" },
            ].map(({ to, label }) => (
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

            <NavLink
              to="/login"
              className="
                registra bg-white text-green-700 px-3 py-1 rounded 
                hover:bg-black hover:text-white transition text-[16px] font-bold
                ml-2
              "
            >
              Ingresa
            </NavLink>

            {/* BOTÓN CARRITO */}
            <div className="relative group ml-2">
              <button
                onClick={() => setShowCart(true)}
                className="
                  w-12 h-12 bg-white rounded-lg 
                  flex justify-center items-center 
                  hover:bg-gray-100 hover:scale-105
                  transition-all duration-300 
                  shadow-md hover:shadow-lg
                "
                title="Carrito de compras"
              >
                <svg
                  className="w-6 h-6 text-green-600 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21M9.5 18.5L17 21m0 0h2"
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
                  <span>
                    {cartItems.length > 99 ? '99+' : cartItems.length}
                  </span>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Barra de progreso de scroll */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-300 to-green-100 transition-all duration-300"
          style={{
            width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
          }}
        />
      </header>

      {/* Overlay para cerrar menú en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* COMPONENTE DEL CARRITO */}
      <CartPanel
        showCart={showCart}
        setShowCart={setShowCart}
        cartItems={cartItems || []}
        userName={userName}
        removeFromCart={removeFromCart}
      />

      {/* Estilos CSS adicionales para animaciones */}
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
          animation: fade-in-down 0.3s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
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