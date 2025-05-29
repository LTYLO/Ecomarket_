import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Hook de autenticación
import logo2 from 'assets/img/logoEcoMarket.png' 

const LoginForm = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userName, login, logout } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // Para guardar el email del usuario

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        let finalUserName = 'Usuario';

        try {
          const userResponse = await fetch('http://localhost:8000/api/users/', {
            headers: {
              Authorization: `Bearer ${data.access}`,
            },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            finalUserName = userData.nombre || userData.name || 'Usuario';
          } else {
            console.warn('No se pudo obtener el nombre de usuario');
          }
        } catch (userError) {
          console.warn('Error al obtener datos del usuario:', userError);
        }

        
        setUserEmail(email);
        login(data.access, finalUserName, email); // Guardar el email para verificar si es admin
        setMensaje('Sesión iniciada correctamente');

        setTimeout(() => {
          navigate('/Home');
        }, 1500);
      } else {
        setMensaje(data.detail || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);

      if (
        err.code === 'ECONNREFUSED' ||
        err.code === 'ERR_NETWORK' ||
        err.message.includes('Network Error') ||
        err.message.includes('fetch') ||
        !err.response
      ) {
        console.log('Error de conexión detectado, redirigiendo...');
        setServerError(true);
        setTimeout(() => {
          navigate('/error/500_login');
        }, 3000);
      } else {
        setMensaje('Error de conexión con el servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUserEmail(''); // Limpiar el email al cerrar sesión
    setMensaje('Sesión cerrada');
    setTimeout(() => {
      navigate('/Home');
    }, 1000);
  };

  const handleAdminAccess = () => {
    navigate('/admin-panel');
  };

  // Verificar si el usuario es administrador
  const isAdmin = isLoggedIn && userEmail === 'x@gmail.com';

  if (serverError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-green-300 shadow-2xl p-8 rounded-xl w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">Error de Conexión</h2>
          <p className="text-gray-600 text-lg">Redirigiendo al manejo de errores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 animate-fade-in pt-24 pb-20">
      {/* Logo en la parte superior */}
      <div className="mb-8 text-center animate-slide-down">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-green-600 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 animate-bounce-slow hover:animate-pulse overflow-hidden">
          <img
            src={logo2}
            alt="Logo EcoMarket"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain p-1 sm:p-1.5 animate-spin-slow filter brightness-0 invert"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800 tracking-wide animate-fade-in-up">
          EcoMarket
        </h1>
      </div>

      {/* Formulario principal */}
      <form onSubmit={handleLogin} className="bg-white border-4 border-green-500 shadow-2xl p-6 sm:p-8 rounded-2xl w-full max-w-sm sm:max-w-md animate-slide-up hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-800 animate-fade-in-up">
          {isLoggedIn ? '¡Bienvenido!' : 'Iniciar Sesión'}
        </h2>

        {!isLoggedIn ? (
          <>
            <div className="space-y-4 mb-6">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full p-4 border-2 border-green-300 rounded-xl disabled:bg-gray-100 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300 text-gray-700 placeholder-gray-500 transform focus:scale-105 animate-slide-in-left hover:shadow-lg"
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full p-4 border-2 border-green-300 rounded-xl disabled:bg-gray-100 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300 text-gray-700 placeholder-gray-500 transform focus:scale-105 animate-slide-in-right hover:shadow-lg"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg disabled:shadow-none disabled:transform-none animate-slide-in-up hover:shadow-2xl hover:animate-pulse"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Cargando...</span>
                </div>
              ) : (
                'Iniciar sesión'
              )}
            </button>

            <div className="mt-6 pt-4 border-t border-green-200 animate-fade-in-up">
              <p className="text-center text-sm sm:text-base text-gray-600">
                ¿No tienes una cuenta?{' '}
                <NavLink to="/registrarse" className="text-green-600 hover:text-green-700 underline decoration-2 underline-offset-2 font-semibold transition-all duration-300 hover:scale-110 inline-block transform hover:animate-bounce">
                  Regístrate aquí
                </NavLink>
              </p>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 animate-fade-in">
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl animate-pulse-green">
              <p className="text-green-800 font-bold text-lg animate-bounce-slow">Sesión activa</p>
              <p className="text-green-600 mt-1 font-medium animate-fade-in-up">{userName}</p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg animate-slide-in-left hover:shadow-2xl hover:animate-pulse"
              >
                Cerrar sesión
              </button>

              <NavLink
                to="/Home"
                className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-center shadow-lg animate-slide-in-right hover:shadow-2xl hover:animate-pulse"
              >
                Ir al inicio
              </NavLink>
            </div>
          </div>
        )}

        {mensaje && (
          <div
            className={`mt-6 p-4 rounded-xl text-center font-medium border-2 transform transition-all duration-500 animate-slide-in-up hover:scale-105 ${
              mensaje.toLowerCase().includes('error')
                ? 'bg-red-50 border-red-300 text-red-700 animate-shake'
                : 'bg-green-50 border-green-300 text-green-700 animate-bounce-gentle'
            }`}
          >
            {mensaje}
          </div>
        )}
      </form>

      {/* Estilos CSS personalizados para animaciones */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-down {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-in-left {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes bounce-gentle {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
          60% { transform: translateY(-2px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-green {
          0%, 100% { background-color: rgb(240 253 244); }
          50% { background-color: rgb(220 252 231); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.7s ease-out;
        }
        
        .animate-slide-in-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 1s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-pulse-green {
          animation: pulse-green 2s infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default LoginForm;