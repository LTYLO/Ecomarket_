import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Github, 
  Youtube, 
  ArrowUp,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo y descripción */}
          <div className="lg:col-span-1 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-6 group">
              <div className="relative p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">EM</span>
                </div>
              </div>
              <div className="ml-3">
                <h2 className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EcoMarket
                </h2>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 hover:text-gray-300 transition-colors duration-300">
              Soluciones digitales sostenibles que transforman tu negocio hacia un futuro más verde y próspero.
            </p>
            
            {/* Información de contacto */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
                <Mail className="w-4 h-4 mr-2 group-hover:text-blue-400 transition-colors duration-300" />
                <span>info@ecomarket.com</span>
              </div>
              <div className="flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
                <Phone className="w-4 h-4 mr-2 group-hover:text-green-400 transition-colors duration-300" />
                <span>+57 300 123 4567</span>
              </div>
              <div className="flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
                <MapPin className="w-4 h-4 mr-2 group-hover:text-red-400 transition-colors duration-300" />
                <span>Bucaramanga, Colombia</span>
              </div>
            </div>
          </div>

          {/* Enlaces útiles */}
          <div className="transform hover:translate-y-1 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Enlaces
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Productos', href: '/catalogo' },
                { label: 'Iniciar Sesion', href: '/login' },
                { label: 'Registro', href: '/registrarse' }
              ].map((item, index) => (
                <li key={item.label} className={`transform transition-all duration-300 delay-${index * 100}`}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                  >
                    <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociales y Newsletter */}
          <div className="transform hover:translate-y-1 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Conéctate
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-transparent"></div>
            </h3>
            

            {/* Redes sociales */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Facebook, color: 'hover:text-blue-500', label: 'Facebook', href: 'https://facebook.com/tuPerfil'},
                { icon: Instagram, color: 'hover:text-pink-500', label: 'Instagram', href: 'https://instagram.com/tuPerfil' },
                { icon: Twitter, color: 'hover:text-sky-400', label: 'Twitter', href: 'https://twitter.com/tuPerfil' },
                { icon: Github, color: 'hover:text-gray-300', label: 'GitHub', href: 'https://github.com/LTYLO/Ecomarket_' },
                { icon: Youtube, color: 'hover:text-red-500', label: 'YouTube', href: 'https://youtube.com/tuCanal'}
              ].map(({ icon: Icon, color, label, href}, index) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 text-gray-400 ${color} transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm group`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  title={label}
                >
                  <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Separador con gradiente */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

        {/* Footer inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500 flex items-center">
            <span className="mr-2">© 2024 EcoMarket.</span>
            <span className="hidden sm:inline">Todos los derechos reservados.</span>
            <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
              Carbono Neutral
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Todos los sistemas operativos
            </span>
            <span>Hecho con ❤️ en Colombia</span>
          </div>
        </div>
      </div>

      {/* Botón scroll to top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 z-50 ${
          showScrollTop 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-16 opacity-0 scale-0'
        } hover:scale-110`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Footer);