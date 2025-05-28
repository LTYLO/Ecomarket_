import { connect } from 'react-redux';
import logo1 from 'assets/img/logoEcoMarket.png';

function Footer() {
  return (
    <footer className="bg-[#0D1424] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo y descripción */}

        <div>
          <div className="flex justify-left mb-6">
            <img src={logo1} alt="Logo" className="h-8 w-8 shadow-lg" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">Tu Empresa</h2>
          <p className="text-sm">
            Soluciones digitales innovadoras que transforman tu negocio.
          </p>
        </div>

        {/* Enlaces útiles */}
        <div>
          <h3 className="text-md font-semibold text-white mb-2">Enlaces</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-white">Inicio</a></li>
            <li><a href="#" className="hover:text-white">Sobre Nosotros</a></li>
            <li><a href="#" className="hover:text-white">Servicios</a></li>
            <li><a href="#" className="hover:text-white">Contacto</a></li>
          </ul>
        </div>

        {/* Recursos */}
        <div>
          <h3 className="text-md font-semibold text-white mb-2">Recursos</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-white">Preguntas Frecuentes</a></li>
            <li><a href="#" className="hover:text-white">Soporte</a></li>
            <li><a href="#" className="hover:text-white">Política de Privacidad</a></li>
            <li><a href="#" className="hover:text-white">Términos de Servicio</a></li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div>
          <h3 className="text-md font-semibold text-white mb-2">Síguenos</h3>
          <div className="flex space-x-4 text-gray-400 text-lg">
            <a href="#" className="hover:text-white">@EcoMarket<i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-x-twitter"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-github"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © 2024 Tu Empresa. Todos los derechos reservados.
      </div>
    </footer>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Footer);

