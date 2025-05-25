import { connect } from 'react-redux';
import pap from 'assets/img/imagen_1.jpg';

function Insentivo() {
  return (

    <div className="overflow-hidden bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-green-600">Desarrolo rapido</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Mejora el Flujo de Trabajo</p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Conectectar a productores ecológicos con consumidores, facilitando la compra de productos de calidad mediante una interfaz amigable y un sistema de gestión de pedidos eficiente. 
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                        strokeWidth="1.5" stroke="currentColor" 
                        className="absolute top-1 left-1 size-6 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                    Ganancias.
                  </dt>
                  <dd className="inline">  Aumenta las ganancias del agricultor al confiar en nosotros.</dd>
                </div>
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg className="absolute top-1 left-1 size-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 7 2 12c0 5.5 6 10 10 10s10-4.5 10-10c0-5-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-1.44.41-2.79 1.12-3.94l10.82 10.82C14.79 19.59 13.44 20 12 20z"/>
                    </svg>
                    Experiencia.
                  </dt>
                  <dd className="inline">  Se adaptan a las nueva generación digital.</dd>
                </div>
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg className="absolute top-1 left-1 size-5 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                      <path fillRule="evenodd" d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z" clipRule="evenodd" />
                    </svg>
                    Tecnologia.
                  </dt>
                  <dd className="inline">  El alcance de sus productos va mas alla de un local fisico en su pueblo.</dd>
                </div>
              </dl>

              <p className="mt-12 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                    ¡Contáctanos!
              </p>
              
              <p className="mt-6 text-lg/8 text-gray-600">
                    Si tienes alguna pregunta o deseas más información, no dudes en comunicarte con nosotros:
              </p>

                <div className="mt-6 space-y-4 text-left flex flex-col items-center sm:items-start">
                    {/* Teléfono 1 */}
                    <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75C2.25 6.06 2.81 5.5 3.5 5.5h2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75H3.5A1.25 1.25 0 0 1 2.25 8.25V6.75zM4.5 14.25l1.5-1.5a2.25 2.25 0 0 1 3.18 0l2.31 2.31a2.25 2.25 0 0 0 3.18 0l1.5-1.5m-1.5 4.5v1.5a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V18.75" />
                        </svg>
                        <h2 className="text-lg font-semibold text-green-600">311 480 1233</h2>
                    </div>

                    {/* Teléfono 2 */}
                    <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75C2.25 6.06 2.81 5.5 3.5 5.5h2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75H3.5A1.25 1.25 0 0 1 2.25 8.25V6.75zM4.5 14.25l1.5-1.5a2.25 2.25 0 0 1 3.18 0l2.31 2.31a2.25 2.25 0 0 0 3.18 0l1.5-1.5m-1.5 4.5v1.5a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V18.75" />
                        </svg>
                        <h2 className="text-lg font-semibold text-green-600">373 123 3123</h2>
                    </div>

                    {/* Correo */}
                    <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m0 0l10.5 6.75L21.75 6.75m-19.5 0l10.5 6.75L21.75 6.75" />
                        </svg>
                        <h2 className="text-lg font-semibold text-green-600">correo@ejemplo.com</h2>
                    </div>
                </div>

            </div>
          </div>
          <img
            src= {pap}
            alt="Product screenshot"
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
            width="736"
            height="1104"
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {})(Insentivo);
