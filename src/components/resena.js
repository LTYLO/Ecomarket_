import React, { useState } from 'react';
import axios from 'axios';
import { User, Calendar, Send, MessageCircle } from 'lucide-react';

const Resena = () => {
  const [newReview, setNewReview] = useState({
    comment: ''
  });
  const [enviandoReseña, setEnviandoReseña] = useState(false);
  const [reseñasEnviadas, setReseñasEnviadas] = useState([]);

  // Función para mostrar mensajes de éxito
  const showSuccessMessage = (message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300';
    notification.textContent = message;
    notification.style.transform = 'translateY(-100px)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
      notification.style.transform = 'translateY(-100px)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  // Función para mostrar mensajes de error
  const showErrorMessage = (message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300';
    notification.textContent = message;
    notification.style.transform = 'translateY(-100px)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
      notification.style.transform = 'translateY(-100px)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  // Función para enviar reseña a Django
  const handleSubmit = async () => {
    if (!newReview.comment.trim()) {
      showErrorMessage('Por favor, escribe un mensaje antes de enviar');
      return;
    }

    if (newReview.comment.length > 500) {
      showErrorMessage('El mensaje no puede exceder 500 caracteres');
      return;
    }

    try {
      setEnviandoReseña(true);
      
      const response = await axios.post('http://localhost:8000/api/reseña/', {
        descripcion: newReview.comment.trim()
      });

      console.log('Reseña enviada:', response.data);
      
      // Agregar la reseña enviada al estado local para mostrarla
      const nuevaReseña = {
        id: Date.now(), // ID temporal para mostrar localmente
        comment: newReview.comment,
        date: new Date().toISOString(),
        enviada: true
      };
      
      setReseñasEnviadas([nuevaReseña, ...reseñasEnviadas]);
      setNewReview({ comment: '' });
      
      showSuccessMessage('¡Mensaje enviado exitosamente!');
      
    } catch (error) {
      console.error('Error al enviar reseña:', error);
      
      if (error.code === 'ECONNREFUSED' || 
          error.code === 'ERR_NETWORK' || 
          error.message.includes('Network Error') ||
          !error.response) {
        showErrorMessage('Error de conexión con el servidor. Verifica que el servidor esté funcionando.');
      } else {
        showErrorMessage('Error al enviar el mensaje. Inténtalo de nuevo.');
      }
    } finally {
      setEnviandoReseña(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
     <div className="container mx-auto px-4 pt-2 pb-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Comparte tu Experiencia
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tu opinión es importante para nosotros. Cuéntanos sobre tu experiencia con nuestros productos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Review Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Escribir Mensaje</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tu mensaje
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({comment: e.target.value})}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none bg-white/50"
                    placeholder="Cuéntanos sobre tu experiencia con nuestros productos..."
                    required
                    maxLength="500"
                    disabled={enviandoReseña}
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {newReview.comment.length}/500 caracteres
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={enviandoReseña || !newReview.comment.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {enviandoReseña ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Publicar Mensaje
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Messages sent locally (preview) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Mensajes Enviados</h3>
            </div>

            {/* Messages List */}
            <div className="space-y-6">
              {reseñasEnviadas.length > 0 ? (
                reseñasEnviadas.map((review) => (
                  <div key={review.id} className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-green-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(review.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        ✓ Enviado
                      </span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {review.comment}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Aún no has enviado mensajes
                  </h3>
                  <p className="text-gray-500">
                    Los mensajes que envíes aparecerán aquí para que puedas verlos.
                  </p>
                </div>
              )}
            </div>

            {/* Info about where messages appear */}
            {reseñasEnviadas.length > 0 && (
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-blue-800">Información</h4>
                </div>
                <p className="text-blue-700 text-sm">
                  Tus mensajes han sido enviados exitosamente y aparecerán en la sección de comentarios del sitio web para que otros usuarios puedan verlos.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resena;