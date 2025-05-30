import React from 'react';

const Comentarios = () => {
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

        {/* Grid de comentarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Comentario 1 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-green-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                👤
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Anonimus</h4>
              </div>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p className="italic text-green-600 mb-2">"Cargue aquí los comentarios mi chino"</p>
            </div>
          </div>

          {/* Comentario 2 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-green-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                👤
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Anonimus</h4>
              </div>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p className="italic text-green-600 mb-2">"Cargue aquí los comentarios mi chino"</p>
            </div>
          </div>

          {/* Comentario 3 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-green-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                👤
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Anonimus</h4>
              </div>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p className="italic text-green-600 mb-2">"Cargue aquí los comentarios mi chino"</p>
            </div>
          </div>

          {/* Comentario 4 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-green-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                👤
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Anonimus</h4>
              </div>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p className="italic text-green-600 mb-2">"Cargue aquí los comentarios mi chino"</p>
            </div>
          </div>

          {/* Comentario 5 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-green-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                👤
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Anonimus</h4>
              </div>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p className="italic text-green-600 mb-2">"Cargue aquí los comentarios mi chino"</p>
            </div>
          </div>

          {/* Comentario 6 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-green-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                👤
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Anonimus</h4>
              </div>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p className="italic text-green-600 mb-2">"Cargue aquí los comentarios mi chino"</p>
            </div>
          </div>
        </div>

        {/* Comentario 7 */}
      </div>
    </div>
  );
};

export default Comentarios;