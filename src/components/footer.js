import { connect } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
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
  const [isInView, setIsInView] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    // Intersection Observer para detectar cuando el footer está visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setIsVisible(true);
        } else {
          setIsInView(false);
          setIsVisible(false);
        }
      },
      {
        threshold: 0.05, // Se activa cuando el 5% del footer es visible
        rootMargin: '0px 0px -20px 0px' // Margen para que se active más suavemente
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300 overflow-hidden transform transition-all duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isInView 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-full opacity-0'
      }`}
    >
      {/* Elementos decorativos de fondo */}
      <div className={`absolute inset-0 opacity-5 transition-all duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isInView 
          ? 'scale-100 opacity-5 delay-500' 
          : 'scale-110 opacity-0'
      }`}>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 transform transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isInView 
          ? 'translate-y-0 opacity-100 delay-700' 
          : 'translate-y-6 opacity-0'
      }`}>
        
        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo y descripción */}
          <div className={`lg:col-span-1 transform hover:scale-105 transition-all duration-700 ${
            isInView 
              ? 'translate-x-0 opacity-100 delay-1000' 
              : '-translate-x-8 opacity-0'
          }`}>
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
          <div className={`transform hover:translate-y-1 transition-all duration-700 ${
            isInView 
              ? 'translate-y-0 opacity-100 delay-1200' 
              : 'translate-y-8 opacity-0'
          }`}>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Enlaces
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </h3>
            <ul className="space-y-3">
              {['Inicio', 'Sobre Nosotros', 'Servicios', 'Productos', 'Blog', 'Contacto'].map((item, index) => (
                <li key={item} className={`transform transition-all duration-300 delay-${index * 100}`}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                  >
                    <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div className={`transform hover:translate-y-1 transition-all duration-700 ${
            isInView 
              ? 'translate-y-0 opacity-100 delay-1400' 
              : 'translate-y-8 opacity-0'
          }`}>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Recursos
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
            </h3>
            <ul className="space-y-3">
              {['Centro de Ayuda', 'Documentación', 'API', 'Guías', 'Política de Privacidad', 'Términos de Servicio'].map((item, index) => (
                <li key={item} className={`transform transition-all duration-300 delay-${index * 100}`}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                  >
                    <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociales y Newsletter */}
          <div className={`transform hover:translate-y-1 transition-all duration-700 ${
            isInView 
              ? 'translate-x-0 opacity-100 delay-1600' 
              : 'translate-x-8 opacity-0'
          }`}>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Conéctate
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-transparent"></div>
            </h3>
            
            {/* Newsletter */}
            <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <p className="text-sm text-gray-400 mb-3">Suscríbete a nuestro newsletter</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="tu@email.com"
                  className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-l-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors duration-300"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium">
                  Enviar
                </button>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Facebook, color: 'hover:text-blue-500', label: 'Facebook' },
                { icon: Instagram, color: 'hover:text-pink-500', label: 'Instagram' },
                { icon: Twitter, color: 'hover:text-sky-400', label: 'Twitter' },
                { icon: Github, color: 'hover:text-gray-300', label: 'GitHub' },
                { icon: Youtube, color: 'hover:text-red-500', label: 'YouTube' }
              ].map(({ icon: Icon, color, label }, index) => (
                <a
                  key={label}
                  href="#"
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
        <div className={`my-12 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isInView 
            ? 'scale-x-100 opacity-100 delay-1800' 
            : 'scale-x-0 opacity-0'
        }`}></div>

        {/* Footer inferior */}
        <div className={`flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isInView 
            ? 'translate-y-0 opacity-100 delay-2000' 
            : 'translate-y-4 opacity-0'
        }`}>
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