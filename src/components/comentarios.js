import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Comentarios = () => {
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();

  // Función para obtener reseñas del servidor
  const obtenerReseñas = async () => {
    try {
      setLoading(true);
      setServerError(false);
      
      const response = await axios.get('http://localhost:8000/api/reseña/');
      console.log('Reseñas del servidor:', response.data);
      setReseñas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener reseñas:', error);
      setLoading(false);
      
      // Manejo de errores de conexión similar al componente Catalogo
      if (error.code === 'ECONNREFUSED' || 
          error.code === 'ERR_NETWORK' || 
          error.message.includes('Network Error') ||
          !error.response) {
        console.log('Error de conexión detectado, redirigiendo...');
        setServerError(true);
        
        setTimeout(() => {
          navigate('/error/500');
        }, 3000);
      }
    }
  };

  // Cargar reseñas al montar el componente
  useEffect(() => {
    obtenerReseñas();
  }, []);

  // Función para formatear fecha
  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Manejar error de servidor similar al componente Catalogo
  if (serverError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-lg text-red-600">Error de conexión con el servidor...</p>
          <p className="text-sm text-gray-500">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-teal-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Lo que dicen nuestros participantes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce las experiencias de quienes forman parte de nuestra comunidad sostenible
          </p>
        </div>



        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Cargando reseñas...</p>
          </div>
        )}

        {/* Grid de comentarios dinámicos */}
        {!loading && reseñas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reseñas.map((reseña, index) => (
              <div 
                key={reseña.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-green-100 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${
                    index % 6 === 0 ? 'from-green-400 to-teal-400' :
                    index % 6 === 1 ? 'from-teal-400 to-green-400' :
                    index % 6 === 2 ? 'from-green-500 to-teal-500' :
                    index % 6 === 3 ? 'from-teal-500 to-green-600' :
                    index % 6 === 4 ? 'from-green-600 to-teal-600' :
                    'from-teal-600 to-green-700'
                  } rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    👤
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">Cliente</h4>
                    <p className="text-sm text-gray-500">
                      {formatearFecha(reseña.fecha_creacion)}
                    </p>
                  </div>
                </div>
                <div className="text-gray-700 leading-relaxed">
                  <p className="italic text-green-600">
                    "{reseña.descripcion}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estado cuando no hay reseñas */}
        {!loading && reseñas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              ¡Sé el primero en compartir tu experiencia!
            </h3>
            <p className="text-gray-500 mb-6">
              Aún no hay reseñas. Las reseñas aparecerán aquí una vez que los usuarios las compartan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comentarios;