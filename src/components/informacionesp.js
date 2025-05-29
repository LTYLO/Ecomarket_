import { connect } from 'react-redux';

function EducacionSos() {

  return (
    <section className="relative min-h-screen bg-gradient-to-tr from-emerald-50 via-green-50 to-teal-50 overflow-hidden py-20">
      {/* Elementos decorativos flotantes */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-green-200/30 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-emerald-300/40 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
      <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-teal-200/30 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
      
      {/* Patrón de ondas decorativo */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,30 Q25,10 50,30 T100,30 V100 H0 Z" fill="url(#waveGradient)" />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl mb-8 shadow-xl transform hover:rotate-12 transition-transform duration-300">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 1 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6 tracking-tight">
            Educación & Sostenibilidad
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Transformamos comunidades a través del conocimiento ecológico y prácticas sustentables que perduran en el tiempo
          </p>
        </div>

        {/* Hexagonal Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
            
            {/* Hexagon Card 1 */}
            <div className="group relative">
              <div className="relative bg-white/80 backdrop-blur-sm border-2 border-green-200 hover:border-green-400 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Educación Ambiental</h3>
                  <p className="text-gray-600 text-center leading-relaxed mb-6">
                    Programas educativos innovadores que conectan a estudiantes con la naturaleza y fomentan la conciencia ecológica desde temprana edad.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Talleres interactivos en escuelas
                    </div>
                    <div className="flex items-center text-sm text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Huertos escolares comunitarios
                    </div>
                    <div className="flex items-center text-sm text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Capacitación de docentes
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hexagon Card 2 */}
            <div className="group relative lg:mt-8">
              <div className="relative bg-white/80 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Investigación Verde</h3>
                  <p className="text-gray-600 text-center leading-relaxed mb-6">
                    Proyectos de investigación aplicada que desarrollan soluciones sustentables para desafíos ambientales locales y globales.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-emerald-700">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      Energías renovables
                    </div>
                    <div className="flex items-center text-sm text-emerald-700">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      Agricultura regenerativa
                    </div>
                    <div className="flex items-center text-sm text-emerald-700">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      Gestión de residuos
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hexagon Card 3 */}
            <div className="group relative">
              <div className="relative bg-white/80 backdrop-blur-sm border-2 border-teal-200 hover:border-teal-400 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Comunidad Activa</h3>
                  <p className="text-gray-600 text-center leading-relaxed mb-6">
                    Creamos redes colaborativas que empoderan a las comunidades para implementar prácticas sustentables en su vida cotidiana.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-teal-700">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      Grupos de acción local
                    </div>
                    <div className="flex items-center text-sm text-teal-700">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      Mercados verdes
                    </div>
                    <div className="flex items-center text-sm text-teal-700">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      Eventos de concienciación
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Statistics Section */}
        <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-12 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">15K+</div>
              <div className="text-green-100 text-sm uppercase tracking-wide">Estudiantes Impactados</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">150+</div>
              <div className="text-green-100 text-sm uppercase tracking-wide">Escuelas Aliadas</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">25</div>
              <div className="text-green-100 text-sm uppercase tracking-wide">Proyectos Activos</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">8</div>
              <div className="text-green-100 text-sm uppercase tracking-wide">Años de Experiencia</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {})(EducacionSos);