import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');
  const dispatch = useDispatch();

  // Estado para el efecto typewriter
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const words = [' Eco Market', ' Productos Frescos', ' Agricultura'];

  // Efecto typewriter personalizado
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 70;
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentWord) {
        // Pausa antes de empezar a borrar
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && currentText === '') {
        // Cambiar a la siguiente palabra
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        // Escribir o borrar caracteres
        setCurrentText(prev =>
          isDeleting
            ? prev.slice(0, -1)
            : currentWord.slice(0, prev.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  useEffect(() => {
    const url = search
      ? `http://localhost:8000/api/products/?search=${search}`
      : 'http://localhost:8000/api/products/';

    setLoading(true);
    axios.get(url)
      .then(res => {
        console.log('Datos del servidor:', res.data);
        console.log('Estructura del primer producto:', res.data[0]);
        console.log('Campo image del primer producto:', res.data[0]?.image);
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener productos:', err);
        setLoading(false);
      });
  }, [search]);

  const handleAddToCart = (product, event) => {
    event.stopPropagation(); // Evitar que se abra el modal
    // Animación de éxito
    const button = document.getElementById(`btn-${product.id}`);
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => {
        button.classList.remove('animate-pulse');
      }, 600);
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        title: product.title,
        price: Number(product.price),
      },
    });
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Bloquear scroll del body
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'unset'; // Restaurar scroll del body
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-green-700 text-lg font-medium">Cargando productos frescos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Catálogo de{' '}
            <span className="text-green-600 inline-block min-w-[200px] text-left">
              {currentText}
              <span className="animate-pulse">_</span>
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        {/* Grid de productos */}
        {products.length > 0 ? (
          <>
            <div className="mb-8 text-center">
              <p className="text-gray-600 text-lg">
                Encontrados <span className="font-bold text-green-600">{products.length}</span> productos frescos
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openModal(product)}
                >
                  {/* Imagen del producto */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        console.log('Error cargando imagen:', product.image);
                        console.log('Product data:', product);
                        e.target.src = 'http://localhost:8000/media/product_images/banano.jpg';
                      }}
                      onLoad={() => {
                        console.log('Imagen cargada exitosamente:', product.image);
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Contenido del producto */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-green-600">
                        ${Number(product.price).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        /unidad
                      </div>
                    </div>

                    <button
                      id={`btn-${product.id}`}
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      🛒 Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600 mb-6">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>

      {/* Modal de producto */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
            {/* Header del modal */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-2xl font-bold text-gray-800">Detalles del Producto</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-3xl font-light transition-colors duration-200"
              >
                ×
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Imagen del producto */}
                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'http://localhost:8000/media/product_images/banano.jpg';
                      }}
                    />
                  </div>

                  {/* Imágenes adicionales (usando la misma imagen principal como placeholder) */}
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-transparent hover:border-green-500 cursor-pointer transition-all duration-200">
                        <img
                          src={selectedProduct.image}
                          alt={`${selectedProduct.title} ${i}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'http://localhost:8000/media/product_images/banano.jpg';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Información del producto */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedProduct.title}</h1>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        🌱 Orgánico
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        ⭐ 4.8
                      </span>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-2xl p-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-green-600">
                        ${Number(selectedProduct.price).toLocaleString()}
                      </span>
                      <span className="text-gray-500 text-lg">/kg</span>
                    </div>
                    <p className="text-green-700 text-sm">Precio especial para compras online</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Descripción</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Información adicional */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Calorías:</span>
                        <span className="text-gray-600 ml-2">{selectedProduct.calories || 'N/A'} kcal/100g</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Vitamina C:</span>
                        <span className="text-gray-600 ml-2">{selectedProduct.vitamin_c || 'N/A'} mg</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Fibra:</span>
                        <span className="text-gray-600 ml-2">{selectedProduct.fiber || 'N/A'} g</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Potasio:</span>
                        <span className="text-gray-600 ml-2">{selectedProduct.potassium || 'N/A'} mg</span>
                      </div>
                    </div>
                  </div>

                  {/* Detalles del Producto */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Origen:</span>
                      <span className="font-medium">{selectedProduct.origin || 'Nacional'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Disponibilidad:</span>
                      <span className="font-medium text-green-600">En stock</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tiempo de entrega:</span>
                      <span className="font-medium">24-48 horas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conservación:</span>
                      <span className="font-medium">Refrigerar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={(e) => {
                    handleAddToCart(selectedProduct, e);
                    closeModal();
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-lg"
                >
                  🛒 Agregar al carrito
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Catalogo;