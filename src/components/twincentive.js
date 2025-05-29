import { connect } from 'react-redux';
import pap from 'assets/img/imagen_1.jpg';

function Insentivo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border-4 border-green-500 bg-white shadow-2xl shadow-green-500/20">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full -translate-x-16 -translate-y-16 opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-100 rounded-full translate-x-20 translate-y-20 opacity-40"></div>
          
          <div className="relative mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-20 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2 p-8 sm:p-12 lg:p-16">
            
            {/* Content Section */}
            <div className="lg:pt-8 lg:pr-8 relative z-10">
              <div className="lg:max-w-lg">
                
                {/* Header */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <h2 className="text-sm font-semibold text-green-700 tracking-wide uppercase">
                    Desarrollo Rápido
                  </h2>
                </div>
                
                <p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-tight">
                  Mejora el 
                  <span className="text-green-600 block sm:inline"> Flujo de Trabajo</span>
                </p>
                
                <p className="mt-8 text-xl leading-8 text-gray-600 font-light">
                  Conectamos a productores ecológicos con consumidores, facilitando la compra de productos de calidad mediante una interfaz amigable y un sistema de gestión de pedidos eficiente.
                </p>

                {/* Features List */}
                <dl className="mt-12 space-y-8 text-base leading-7 text-gray-600">
                  
                  <div className="group relative pl-12 p-4 rounded-xl hover:bg-green-50 transition-all duration-300 border border-transparent hover:border-green-200">
                    <dt className="inline font-semibold text-gray-900">
                      <div className="absolute top-4 left-2 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                            strokeWidth="2" stroke="currentColor" 
                            className="w-5 h-5 text-green-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                        </svg>
                      </div>
                      Ganancias.
                    </dt>
                    <dd className="inline text-gray-600 ml-2">Aumenta las ganancias del agricultor al confiar en nosotros.</dd>
                  </div>

                  <div className="group relative pl-12 p-4 rounded-xl hover:bg-green-50 transition-all duration-300 border border-transparent hover:border-green-200">
                    <dt className="inline font-semibold text-gray-900">
                      <div className="absolute top-4 left-2 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                        <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 7 2 12c0 5.5 6 10 10 10s10-4.5 10-10c0-5-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-1.44.41-2.79 1.12-3.94l10.82 10.82C14.79 19.59 13.44 20 12 20z"/>
                        </svg>
                      </div>
                      Experiencia.
                    </dt>
                    <dd className="inline text-gray-600 ml-2">Se adaptan a la nueva generación digital.</dd>
                  </div>

                  <div className="group relative pl-12 p-4 rounded-xl hover:bg-green-50 transition-all duration-300 border border-transparent hover:border-green-200">
                    <dt className="inline font-semibold text-gray-900">
                      <div className="absolute top-4 left-2 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                        <svg className="w-5 h-5 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                          <path fillRule="evenodd" d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Tecnología.
                    </dt>
                    <dd className="inline text-gray-600 ml-2">El alcance de sus productos va más allá de un local físico en su pueblo.</dd>
                  </div>
                  
                </dl>

                {/* Contact Section */}
                <div className="mt-16 p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
                  <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
                    ¡Contáctanos!
                  </p>
                  
                  <p className="text-lg text-gray-600 mb-8 font-light">
                    Si tienes alguna pregunta o deseas más información, no dudes en comunicarte con nosotros:
                  </p>

                  <div className="space-y-6">
                    
                    {/* Teléfono 1 */}
                    <div className="group flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 hover:border-green-300">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75C2.25 6.06 2.81 5.5 3.5 5.5h2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75H3.5A1.25 1.25 0 0 1 2.25 8.25V6.75zM4.5 14.25l1.5-1.5a2.25 2.25 0 0 1 3.18 0l2.31 2.31a2.25 2.25 0 0 0 3.18 0l1.5-1.5m-1.5 4.5v1.5a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V18.75" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-700">311 480 1233</h3>
                        <p className="text-sm text-gray-500">Línea principal</p>
                      </div>
                    </div>

                    {/* Teléfono 2 */}
                    <div className="group flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 hover:border-green-300">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75C2.25 6.06 2.81 5.5 3.5 5.5h2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75H3.5A1.25 1.25 0 0 1 2.25 8.25V6.75zM4.5 14.25l1.5-1.5a2.25 2.25 0 0 1 3.18 0l2.31 2.31a2.25 2.25 0 0 0 3.18 0l1.5-1.5m-1.5 4.5v1.5a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V18.75" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-700">373 123 3123</h3>
                        <p className="text-sm text-gray-500">Línea alternativa</p>
                      </div>
                    </div>

                    {/* Correo */}
                    <div className="group flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 hover:border-green-300">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m0 0l10.5 6.75L21.75 6.75m-19.5 0l10.5 6.75L21.75 6.75" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-700">correo@ejemplo.com</h3>
                        <p className="text-sm text-gray-500">Correo electrónico</p>
                      </div>
                    </div>
                    
                  </div>
                </div>

              </div>
            </div>

            {/* Image Section */}
            <div className="relative lg:pt-8 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-lg opacity-20"></div>
                <img
                  src={pap}
                  alt="Product screenshot"
                  className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-2xl ring-4 ring-green-200 hover:ring-green-300 transition-all duration-300 transform hover:scale-105"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {})(Insentivo);