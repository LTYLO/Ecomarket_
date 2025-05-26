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
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-lg mx-auto mt-20 bg-white shadow-xl rounded-lg border"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        {usuarioId ? 'Editar Cuenta' : 'Crear Cuenta'}
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full p-2 border rounded disabled:bg-gray-100"
        />
        <input
          type="email"
          name="email"
          placeholder="email electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full p-2 border rounded disabled:bg-gray-100"
        />
        <input
          type="password"
          name="password"
          placeholder={usuarioId ? "Dejar vacío para no cambiar" : "Contraseña"}
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          className="w-full p-2 border rounded disabled:bg-gray-100"
          {...(!usuarioId && { required: true })}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          disabled={loading}
          className="w-full p-2 border rounded disabled:bg-gray-100"
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          disabled={loading}
          className="w-full p-2 border rounded disabled:bg-gray-100"
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formData.edad}
          onChange={handleChange}
          min="0"
          disabled={loading}
          className="w-full p-2 border rounded disabled:bg-gray-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold p-2 rounded transition flex items-center justify-center"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {usuarioId ? 'Actualizando...' : 'Creando...'}
          </>
        ) : (
          usuarioId ? 'Actualizar Cuenta' : 'Crear Cuenta'
        )}
      </button>

      {mensaje && (
        <p className={`mt-4 text-center ${error ? 'text-red-500' : 'text-green-600'}`}>
          {mensaje}
        </p>
      )}
    </form>
  );
};

export default UsuarioForm;