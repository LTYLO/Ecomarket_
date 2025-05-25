import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [logueado, setLogueado] = useState(!!localStorage.getItem('token'));

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje('');

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
    } catch (error) {
      setMensaje('Error de conexión con el servidor');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogueado(false);
    setMensaje('Sesión cerrada');
  };

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
              className="w-full mb-3 p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
            >
              Iniciar sesión
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
          <p className="mt-4 text-center text-sm text-gray-600">{mensaje}</p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
