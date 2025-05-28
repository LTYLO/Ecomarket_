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
   
    <div className="overflow-hidden bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Galería de Imágenes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
                Explora nuestra colección
            </p>
            </div>
            
            <div className="relative">
                <div className="w-full max-w-7xl mx-auto my-10 px-4">

                    <Swiper 
                        modules={[Navigation, Pagination, Autoplay, A11y, Keyboard]}
                        spaceBetween={15}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                        navigation={true}
                        pagination={{ clickable: true }}
                        //rewind={true} 
                        loop={true} //para mas de 5 
                        a11y={{
                            prevSlideMessage: 'Imagen anterior',
                            nextSlideMessage: 'Siguiente imagen',
                            firstSlideMessage: 'Esta es la primera imagen',
                            lastSlideMessage: 'Esta es la última imagen'
                        }}
                        keyboard={{ enabled: true }}
                    >
                        <SwiperSlide>
                            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                                <img 
                                src={carr1} 
                                alt="Imagen 1" 
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                            </div>

                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                                <img 
                                src={carr2} 
                                alt="Imagen 2" 
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                            </div>

                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                                <img 
                                src={carr3} 
                                alt="Imagen 3" 
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                            </div>

                        </SwiperSlide>

                        <SwiperSlide>

                            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                                <img 
                                src={pap} 
                                alt="Imagen 4" 
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                            </div>

                        </SwiperSlide>
                        <SwiperSlide>

                            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                                <img 
                                src={pop} 
                                alt="Imagen 5" 
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                            </div>

                        </SwiperSlide>
                        <SwiperSlide>

                            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                                <img 
                                src={pop} 
                                alt="Imagen 5" 
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                            </div>

                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    </div>

  );
}

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {})(Carru);