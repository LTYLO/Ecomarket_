import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const UsuarioForm = ({ usuarioId, onSuccess }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    edad: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    if (usuarioId) {
      setLoading(true);
      fetch(`http://localhost:8000/api/users/${usuarioId}/`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          setFormData({
            nombre: data.nombre || '',
            email: data.email || '',
            password: '',
            telefono: data.telefono || '',
            direccion: data.direccion || '',
            edad: data.edad || '',
          });
          setLoading(false);
        })
        .catch(err => {
          console.error('Error al obtener usuario:', err);
          setLoading(false);
          
          // Verificar si es un error de conexión con el servidor
          if (err.code === 'ECONNREFUSED' ||
              err.code === 'ERR_NETWORK' ||
              err.message.includes('Network Error') ||
              err.message.includes('fetch') ||
              !err.response) {
            console.log('Error de conexión detectado, redirigiendo...');
            setServerError(true);
            
            // Redireccionar después de 3 segundos para mostrar el mensaje de error
            setTimeout(() => {
               navigate('/Sing_Up');
              navigate('/error/500_sing');
            }, 3000);
          }
        });
    }
  }, [usuarioId, navigate]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('');
    setError(false);
    setLoading(true);

    const csrfToken = getCookie('csrftoken');

    const url = usuarioId
      ? `http://localhost:8000/api/users/${usuarioId}/`
      : 'http://localhost:8000/api/users/';
    const method = usuarioId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(usuarioId ? 'Usuario actualizado con éxito.' : 'Usuario creado correctamente.');
        setError(false);
        if (!usuarioId) {
          setFormData({
            nombre: '',
            email: '',
            password: '',
            telefono: '',
            direccion: '',
            edad: '',
          });
        }
        if (onSuccess) onSuccess();
      } else {
        setMensaje(data.detail || 'Error al enviar el formulario.');
        setError(true);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error al enviar formulario:', err);
      setLoading(false);
      
      // Verificar si es un error de conexión con el servidor
      if (err.code === 'ECONNREFUSED' ||
          err.code === 'ERR_NETWORK' ||
          err.message.includes('Network Error') ||
          err.message.includes('fetch') ||
          !err.response) {
        console.log('Error de conexión detectado, redirigiendo...');
        setServerError(true);
        
        // Redireccionar después de 3 segundos para mostrar el mensaje de error
        setTimeout(() => {
          navigate('/error/500_sing');
        }, 3000);
      } else {
        setMensaje('Error de conexión con el servidor.');
        setError(true);
      }
    }
  };

  // Mostrar mensaje de error de servidor antes de redireccionar
    if (serverError) {
    return (
     setTimeout(() => {
            navigate('/error/500_sing'); // Cambia esta ruta por la que necesites
          }, 1)
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-8 pt-24 animate-fadeIn">
      <div className="max-w-md mx-auto">
        
        {/* Logo en la parte superior */}
        <div className="text-center mb-8 animate-slideDown">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4 shadow-lg animate-bounce hover:animate-pulse transition-all duration-300 hover:scale-110 hover:shadow-2xl">
            <svg className="w-8 h-8 text-white animate-fadeIn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-green-800 animate-fadeInUp">EcoMarket</h1>
        </div>

        {/* Contenedor principal del formulario */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-green-500 overflow-hidden animate-slideUp hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
          
          {/* Header del formulario */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-6 animate-slideRight">
            <h2 className="text-2xl font-bold text-center text-white animate-typewriter">
              {usuarioId ? 'Editar Cuenta' : 'Crear Cuenta'}
            </h2>
          </div>

          {/* Formulario */}
          <div className="p-6 sm:p-8 animate-fadeInUp">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-1 animate-slideInLeft" style={{animationDelay: '0.1s'}}>
                <label className="block text-sm font-medium text-green-700 mb-1 animate-fadeIn">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Ingresa tu nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full p-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-300 hover:border-green-300 hover:shadow-md focus:scale-[1.02] transform"
                />
              </div>

              <div className="space-y-1 animate-slideInRight" style={{animationDelay: '0.2s'}}>
                <label className="block text-sm font-medium text-green-700 mb-1 animate-fadeIn">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full p-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-300 hover:border-green-300 hover:shadow-md focus:scale-[1.02] transform"
                />
              </div>

              <div className="space-y-1 animate-slideInLeft" style={{animationDelay: '0.3s'}}>
                <label className="block text-sm font-medium text-green-700 mb-1 animate-fadeIn">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder={usuarioId ? 'Dejar en blanco para no cambiar' : 'Crea una contraseña segura'}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  {...(!usuarioId && { required: true })}
                  className="w-full p-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-300 hover:border-green-300 hover:shadow-md focus:scale-[1.02] transform"
                />
              </div>

              <div className="space-y-1 animate-slideInRight" style={{animationDelay: '0.4s'}}>
                <label className="block text-sm font-medium text-green-700 mb-1 animate-fadeIn">
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  placeholder="Tu dirección completa"
                  value={formData.direccion}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full p-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-300 hover:border-green-300 hover:shadow-md focus:scale-[1.02] transform"
                />
              </div>

              {/* Teléfono y edad en la misma fila */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slideInUp" style={{animationDelay: '0.5s'}}>
                <div className="space-y-1 animate-slideInLeft" style={{animationDelay: '0.6s'}}>
                  <label className="block text-sm font-medium text-green-700 mb-1 animate-fadeIn">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    name="telefono"
                    placeholder="Número de teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-300 hover:border-green-300 hover:shadow-md focus:scale-[1.02] transform"
                  />
                </div>
                
                <div className="space-y-1 animate-slideInRight" style={{animationDelay: '0.7s'}}>
                  <label className="block text-sm font-medium text-green-700 mb-1 animate-fadeIn">
                    Edad
                  </label>
                  <input
                    type="number"
                    name="edad"
                    placeholder="Tu edad"
                    value={formData.edad}
                    onChange={handleChange}
                    min="0"
                    disabled={loading}
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-300 hover:border-green-300 hover:shadow-md focus:scale-[1.02] transform"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg flex justify-center items-center transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-pulse hover:animate-none animate-slideInUp"
                style={{animationDelay: '0.8s'}}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    <span className="animate-pulse">{usuarioId ? 'Actualizando...' : 'Creando...'}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="animate-fadeIn">{usuarioId ? 'Actualizar Cuenta' : 'Crear Cuenta'}</span>
                  </>
                )}
              </button>

              {mensaje && (
                <div className={`mt-4 p-4 rounded-lg border-l-4 transition-all duration-500 animate-slideInUp transform ${
                  error 
                    ? 'bg-red-50 border-red-400 text-red-700 animate-shake' 
                    : 'bg-green-50 border-green-400 text-green-700 animate-bounce'
                }`}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 animate-pulse">
                      {error ? (
                        <svg className="h-5 w-5 text-red-400 animate-spin" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-green-400 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium animate-typewriter">{mensaje}</p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 animate-fadeInUp" style={{animationDelay: '1s'}}>
          <p className="text-sm text-gray-600 animate-pulse">
            ¿Necesitas ayuda? 
            <a href="#" className="text-green-600 hover:text-green-700 font-medium ml-1 transition-all duration-300 hover:scale-105 inline-block">
              Contáctanos
            </a>
          </p>
        </div>

        {/* Definición de animaciones CSS personalizadas */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes fadeInUp {
            from { 
              opacity: 0; 
              transform: translateY(20px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes slideDown {
            from { 
              opacity: 0; 
              transform: translateY(-50px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes slideUp {
            from { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes slideInLeft {
            from { 
              opacity: 0; 
              transform: translateX(-30px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          
          @keyframes slideInRight {
            from { 
              opacity: 0; 
              transform: translateX(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          
          @keyframes slideInUp {
            from { 
              opacity: 0; 
              transform: translateY(20px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes slideRight {
            from { 
              opacity: 0; 
              transform: translateX(-100%); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          
          @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out;
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out;
          }
          
          .animate-slideDown {
            animation: slideDown 0.8s ease-out;
          }
          
          .animate-slideUp {
            animation: slideUp 0.8s ease-out;
          }
          
          .animate-slideInLeft {
            animation: slideInLeft 0.6s ease-out;
          }
          
          .animate-slideInRight {
            animation: slideInRight 0.6s ease-out;
          }
          
          .animate-slideInUp {
            animation: slideInUp 0.6s ease-out;
          }
          
          .animate-slideRight {
            animation: slideRight 0.8s ease-out;
          }
          
          .animate-typewriter {
            animation: typewriter 2s steps(40, end);
          }
          
          .animate-shake {
            animation: shake 0.8s ease-in-out;
          }
          
          /* Animaciones de hover para los inputs */
          input:focus {
            animation: fadeInUp 0.3s ease-out;
          }
          
          /* Floating animation para el logo */
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .logo-container:hover {
            animation: float 2s ease-in-out infinite;
          }
        `}</style>

      </div>
    </div>
  );
};

export default UsuarioForm;