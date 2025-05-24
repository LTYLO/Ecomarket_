import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

function Navbar() {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-green-400 text-white z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-4 py-3">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-white rounded w-10 h-10 flex justify-center items-center">
              <img src="/static/img/logoEcoMarket.png" alt="logo" className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">Eco Market</span>
          </div>

          {/* Buscador */}
          <div className="w-full md:w-auto mt-3 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Busca un producto"
                className="w-full md:w-[400px] px-4 py-2 rounded-lg text-black"
              />
              <button className="absolute right-2 top-2">
                <img src="/static/img/lupa.png" alt="buscar" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Menú + carrito */}
          <nav className="flex items-center gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-black">Inicio</a>
            <a href="#" className="hover:text-black">Catálogo</a>
            <Link to="/detalle" className="hover:text-black">Vender</Link>
            <a href="#" className="hover:text-black">Mis compras</a>
            <a href="/login" className="hover:text-black">Crear cuenta</a>
            <a href="/login_in" className="bg-white text-green-700 px-3 py-1 rounded hover:bg-black hover:text-white transition">
              Ingresa
            </a>

            {/* BOTÓN CARRITO */}
            <button
              onClick={() => setShowCart(true)}
              className="w-10 h-10 bg-white rounded flex justify-center items-center hover:bg-black hover:text-white transition"
              title="Carrito"
            >
              <img src="/static/img/cart.png" alt="Carrito" className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>

      {/* PANEL LATERAL */}
      {showCart && (
        <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-lg z-50 p-6 animate-slide-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Carrito de compras</h2>
            <button onClick={() => setShowCart(false)} className="text-gray-500 text-lg">✖</button>
          </div>
          <div className="text-center text-gray-600">
            <img src="/static/img/box-empty.png" alt="Carrito vacío" className="w-32 mx-auto mb-4" />
            <p>No has agregado productos a tu carrito.</p>
            <a href="#" className="text-blue-500">Volviendo a la vitrina →</a>
          </div>
          <div className="absolute bottom-0 left-0 w-full px-6 py-4 border-t">
            <div className="flex justify-between items-center text-lg">
              <span>Subtotal:</span>
              <span>$ 0</span>
            </div>
            <button disabled className="mt-2 w-full bg-gray-300 text-white py-2 rounded cursor-not-allowed">
              Ir a Pagar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Navbar);
