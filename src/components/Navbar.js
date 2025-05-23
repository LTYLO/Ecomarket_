import { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from 'assets/img/logoEcoMarket.png';
import lupa from 'assets/img/lupa.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-green-400 text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-4 py-3">

        {/* Logo y nombre */}
        <div className="flex items-center gap-2">
          <div className="bg-white rounded w-10 h-10 flex justify-center items-center">
            <img src={logo} alt="logo" className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold">Eco Market</span>
        </div>

        {/* Botón hamburguesa (solo en móviles) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>


        {/* Buscador visible en escritorio y dentro del menú móvil */}
        <div className={`w-full md:w-auto mt-3 md:mt-0 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Busca un producto"
              className="w-full md:w-[400px] px-4 py-2 rounded-lg text-black"
            />
            <button className="absolute right-2 top-2">
              <img src={lupa} alt="buscar" className="w-5 h-5" />
            </button>
          </div>
        </div>


        {/* Menú */}
        <nav
          className={`${isOpen ? 'block' : 'hidden'
            } w-full md:flex md:items-center md:w-auto gap-4 mt-4 md:mt-0`}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-[18px]">
            {[
              { to: "/home", label: "Inicio" },
              { to: "/catalogo", label: "Catálogo" },
              { to: "/vender", label: "Vender" },
              { to: "/mis_Compras", label: "Mis compras" },
              { to: "/registrarse", label: "Crear cuenta" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className="relative group text-white transition-all duration-300 hover:text-green-900 hover:text-[22px] whitespace-nowrap"
              >
                {label}
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-l from-white to-green-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded" />
              </NavLink>
            ))}

            <NavLink
              to="/login"
              className="registra bg-white text-green-700 px-3 py-1 rounded hover:bg-black hover:text-white transition text-[16px] font-bold"
            >
              Ingresa
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Navbar);
