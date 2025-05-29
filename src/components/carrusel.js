import { connect } from 'react-redux';
import carr1 from 'assets/img/videoframe_7878.png';
import carr2 from 'assets/img/videoframe_13399.png';
import carr3 from 'assets/img/videoframe_23609.png';
import pap from 'assets/img/imagen_2.jpg'
import pop from 'assets/img/animplanta.gif'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y, Keyboard } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Carru() {
  return (
    <div className="overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/30 to-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header con animación */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-2 bg-emerald-100/50 rounded-full mb-4">
            <svg 
              className="w-8 h-8 text-emerald-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent sm:text-5xl">
            Galería de Imágenes
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
            Descubre nuestra colección visual que captura la esencia de nuestros productos y servicios
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Carrusel moderno */}
        <div className="relative">
          <div className="w-full max-w-7xl mx-auto px-4">
            <Swiper 
              modules={[Navigation, Pagination, Autoplay, A11y, Keyboard]}
              spaceBetween={20}
              autoplay={{ 
                delay: 3000, // Tiempo entre slides (3 segundos)
                disableOnInteraction: false, // Continúa después de interacción manual
                pauseOnMouseEnter: true, // Pausa cuando el mouse está encima
                reverseDirection: false, // Dirección normal
                stopOnLastSlide: false, // No se detiene en la última slide
                waitForTransition: true // Espera a que termine la transición
              }}
              speed={800} // Velocidad de transición más suave
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 15 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 25 }
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{ 
                clickable: true,
                bulletClass: 'swiper-pagination-bullet-custom',
                bulletActiveClass: 'swiper-pagination-bullet-active-custom',
                dynamicBullets: true, // Paginación dinámica
                dynamicMainBullets: 3 // Número de bullets principales
              }}
              loop={true} // Loop infinito
              loopFillGroupWithBlank={false} // No llenar con slides vacíos
              centeredSlides={false} // No centrar slides
              a11y={{
                prevSlideMessage: 'Imagen anterior',
                nextSlideMessage: 'Siguiente imagen',
                firstSlideMessage: 'Esta es la primera imagen',
                lastSlideMessage: 'Esta es la última imagen'
              }}
              keyboard={{ 
                enabled: true,
                onlyInViewport: true // Solo funciona cuando el swiper está visible
              }}
              grabCursor={true} // Cursor de arrastre
              className="pb-12"
            >
              {/* Slides con diseño moderno */}
              <SwiperSlide>
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                    <img 
                      src={carr1} 
                      alt="Imagen 1" 
                      className="w-full h-116 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <h3 className="font-semibold text-gray-900 text-lg">Imagen Destacada</h3>
                      <p className="text-gray-600 text-sm mt-1">Descripción de la imagen</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                    <img 
                      src={carr2} 
                      alt="Imagen 2" 
                      className="w-full h-116 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <h3 className="font-semibold text-gray-900 text-lg">Colección Especial</h3>
                      <p className="text-gray-600 text-sm mt-1">Productos únicos y exclusivos</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                    <img 
                      src={carr3} 
                      alt="Imagen 3" 
                      className="w-full h-116 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <h3 className="font-semibold text-gray-900 text-lg">Innovación</h3>
                      <p className="text-gray-600 text-sm mt-1">Tecnología de vanguardia</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                    <img 
                      src={pap} 
                      alt="Imagen 4" 
                      className="w-full h-116 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <h3 className="font-semibold text-gray-900 text-lg">Calidad Premium</h3>
                      <p className="text-gray-600 text-sm mt-1">Productos de alta calidad</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                    <img 
                      src={pop} 
                      alt="Imagen 5" 
                      className="w-full h-116 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <h3 className="font-semibold text-gray-900 text-lg">Naturaleza Viva</h3>
                      <p className="text-gray-600 text-sm mt-1">Conecta con la naturaleza</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                    <img 
                      src={pop} 
                      alt="Imagen 6" 
                      className="w-full h-116 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <h3 className="font-semibold text-gray-900 text-lg">Experiencia Única</h3>
                      <p className="text-gray-600 text-sm mt-1">Momentos inolvidables</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            {/* Botones de navegación personalizados */}
            <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 flex items-center justify-center cursor-pointer group">
              <svg className="w-6 h-6 text-emerald-600 group-hover:text-emerald-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 flex items-center justify-center cursor-pointer group">
              <svg className="w-6 h-6 text-emerald-600 group-hover:text-emerald-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos personalizados para paginación */}
      <style jsx>{`
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: rgb(156 163 175);
          border-radius: 50%;
          opacity: 0.5;
          transition: all 0.3s ease;
          margin: 0 4px;
        }
        .swiper-pagination-bullet-active-custom {
          background: rgb(5 150 105);
          opacity: 1;
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(5, 150, 105, 0.4);
        }
        
        /* Animación suave para el autoplay */
        .swiper-slide {
          transition: transform 0.8s ease-in-out;
        }
        
        /* Indicador visual de autoplay */
        .swiper-pagination {
          position: relative;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {})(Carru);