import { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (usuarioId) {
      fetch(`http://localhost:8000/api/users/${usuarioId}/`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            nombre: data.nombre || '',
            email: data.email || '',
            password: '',
            telefono: data.telefono || '',
            direccion: data.direccion || '',
            edad: data.edad || '',
          });
        });
    }
  }, [usuarioId]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('');
    setError(false);

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
    } catch (error) {
      setMensaje('Error de conexión con el servidor.');
      setError(true);
    }
  };

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
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="email electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder={usuarioId ? "Dejar vacío para no cambiar" : "Contraseña"}
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          {...(!usuarioId && { required: true })}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formData.edad}
          onChange={handleChange}
          min="0"
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded transition"
      >
        {usuarioId ? 'Actualizar Cuenta' : 'Crear Cuenta'}
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
