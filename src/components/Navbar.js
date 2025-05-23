import { connect } from 'react-redux';

function Navbar() {
  return (
  
    <header className="fixed top-0 left-0 w-full bg-green-400 text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-4 py-3">
        
        {/* Logo y nombre */}
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

        {/* Enlaces */}
        <nav className="flex flex-wrap items-center gap-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-black">Inicio</a>
          <a href="#" className="hover:text-black">Catálogo</a>
          <a href="#" className="hover:text-black">Vender</a>
          <a href="#" className="hover:text-black">Mis compras</a>
          <a href="/login" className="hover:text-black">Crear cuenta</a>
          <a
            href="/login_in"
            className="bg-white text-green-700 px-3 py-1 rounded hover:bg-black hover:text-white transition"
          >
            Ingresa
          </a>
        </nav>
      </div>
    </header>
  );

}

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {})(Navbar);
