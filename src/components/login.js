import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [logueado, setLogueado] = useState(!!localStorage.getItem('token'));
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
        localStorage.setItem('token', data.access);
        setLogueado(true);
        setMensaje('Sesión iniciada correctamente');
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
    localStorage.removeItem('token');
    setLogueado(false);
    setMensaje('Sesión cerrada');
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">{logueado ? 'Bienvenido' : 'Iniciar Sesión'}</h2>

        {!logueado ? (
          <>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full mb-3 p-2 border border-gray-300 rounded disabled:bg-gray-100"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full mb-4 p-2 border border-gray-300 rounded disabled:bg-gray-100"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded flex items-center justify-center"
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
              <NavLink to="/signup" className="text-green-600 hover:underline">
                Regístrate
              </NavLink>
            </p>
          </>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded"
          >
            Cerrar sesión
          </button>
        )}

        {mensaje && (
          <p className={`mt-4 text-center text-sm ${
            mensaje.includes('Error') || mensaje.includes('error') 
              ? 'text-red-500' 
              : 'text-green-600'
          }`}>
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;