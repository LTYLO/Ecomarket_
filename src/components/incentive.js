import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

function Incentiv() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white py-20 sm:py-32">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className={`mx-auto max-w-3xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-6 transition-all duration-300 hover:bg-green-100 hover:scale-105">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            <span className="text-sm font-medium text-green-700">Rápido y Seguro</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 mb-8">
            Todo lo que
            <span className="block bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent font-normal">
              necesitas está aquí
            </span>
          </h1>
          
          <p className="text-xl leading-relaxed text-gray-600 max-w-2xl mx-auto">
            Nuestra plataforma revoluciona la experiencia agrícola, creando un puente entre los agricultores y la tecnología para un futuro más sostenible.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-24 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                feature={feature} 
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
        {/* Animated background gradient */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`}></div>
        
        {/* Icon container */}
        <div className="relative flex items-center justify-center w-16 h-16 mb-6">
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg transition-all duration-500 ${isHovered ? 'scale-110 rotate-3' : ''}`}></div>
          <div className="relative z-10 transition-transform duration-500 hover:scale-110">
            {feature.icon}
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-green-700">
            {feature.title}
          </h3>
          <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
            {feature.description}
          </p>
        </div>

        {/* Decorative corner accent */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-transparent rounded-full -mr-10 -mt-10 transition-all duration-500 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`}></div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Conectividad",
    description: "Mejora la conexión con el campo de los agricultores y ofrece oportunidades de desarrollo en los negocios rurales.",
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
      </svg>
    ),
  },
  {
    title: "Certeza",
    description: "Confianza plena en la calidad de nuestros productos y en los creadores que los llevan a su mesa.",
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Simples pasos",
    description: "Permite a los usuarios completar tareas básicas sin asistencia externa, mejorando significativamente su experiencia.",
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 10.5 6.75L17.25 13.5" />
      </svg>
    ),
  },
  {
    title: "Seguridad",
    description: "Garantiza que su información sea única y exclusiva para que sus productos lleguen seguros a cualquier destino.",
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
];

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {})(Incentiv);