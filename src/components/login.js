import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importar el hook de autenticación

const LoginForm = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userName, login, logout } = useAuth(); // Usar el contexto
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

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
        let finalUserName = 'Usuario'; // Valor por defecto
        
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

        // Usar la función login del contexto en lugar de localStorage directamente
        login(data.access, finalUserName);
        
        setMensaje('Sesión iniciada correctamente');
        
        // Redirigir al home después del login exitoso
        setTimeout(() => {
          navigate('/Home');
        }, 1500);
        
      } else {
        setMensaje(data.detail || 'Error al iniciar sesión');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
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
          navigate('/error/500_login');
        }, 3000);
      } else {
        setMensaje('Error de conexión con el servidor');
      }
    }
  };

  const handleLogout = () => {
    // Usar la función logout del contexto
    logout();
    setMensaje('Sesión cerrada');
    
    // Redirigir al home después del logout
    setTimeout(() => {
      navigate('/Home');
    }, 1000);
  };

  // Mostrar mensaje de error de servidor antes de redireccionar
  if (serverError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Error de Conexión</h2>
          <p className="text-gray-600">Redirigiendo al manejo de errores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {isLoggedIn ? '¡Bienvenido!' : 'Iniciar Sesión'}
        </h2>

        {!isLoggedIn ? (
          <>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg disabled:bg-gray-100 focus:border-green-500 focus:outline-none transition-colors"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg disabled:bg-gray-100 focus:border-green-500 focus:outline-none transition-colors"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg flex items-center justify-center transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <NavLink to="/registrarse" className="text-green-600 hover:underline font-medium">
                Regístrate aquí
              </NavLink>
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">
                Sesión activa
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {userName}
              </p>
            </div>
            
            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors mb-3"
            >
              Cerrar sesión
            </button>
            
            <NavLink 
              to="/Home" 
              className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors text-center"
            >
              Ir al inicio
            </NavLink>
          </div>
        )}

        {mensaje && (
          <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
            mensaje.includes('Error') || mensaje.includes('error') 
              ? 'bg-red-50 border border-red-200 text-red-700' 
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}>
            {mensaje}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;