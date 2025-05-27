import { useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';

function AgregarPro() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' o 'error'

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Crear FormData para enviar archivos
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      
      if (form.image) {
        formData.append('image', form.image);
      }

      // Enviar al backend
      const response = await axios.post('http://localhost:8000/api/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Producto agregado exitosamente:', response.data);
      
      // Mostrar mensaje de éxito
      setMessage("¡Producto agregado exitosamente!");
      setMessageType("success");
      
      // Limpiar formulario
      setForm({
        title: "",
        description: "",
        price: "",
        image: null,
      });
      
      // Limpiar el input de archivo
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (error) {
      console.error('Error al agregar producto:', error);
      
      let errorMessage = "Error al agregar el producto";
      
      if (error.response?.data) {
        // Mostrar errores específicos del backend
        const errors = error.response.data;
        if (typeof errors === 'object') {
          errorMessage = Object.entries(errors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('\n');
        } else if (typeof errors === 'string') {
          errorMessage = errors;
        }
      }
      
      setMessage(errorMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    }
  };

  return (
    <section className="max-w-4xl mx-auto bg-gray-100 p-6 mt-20 bg-white shadow-xl rounded-lg border">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Agregar producto</h2>
      
      {/* Mensaje de estado */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg text-center font-medium ${
            messageType === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Titulo */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="sm:w-32 font-medium text-gray-700">Titulo</label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className="flex-1 border rounded px-4 py-2 mt-1 sm:mt-0 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
            disabled={loading}
          />
        </div>

        {/* Descripcion */}
        <div className="flex flex-col sm:flex-row sm:items-start">
          <label className="sm:w-32 font-medium text-gray-700 pt-2">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="flex-1 border rounded px-4 py-2 mt-1 sm:mt-0 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
            disabled={loading}
          />
        </div>

        {/* Precio */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="sm:w-32 font-medium text-gray-700">Precio</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={handleChange}
            className="flex-1 border rounded px-4 py-2 mt-1 sm:mt-0 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
            disabled={loading}
          />
        </div>

        {/* Imagen */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="sm:w-32 font-medium text-gray-700">Imagen</label>
          <div className="flex-1 mt-1 sm:mt-0">
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
              disabled={loading}
            />
            {form.image && (
              <div className="mt-2 text-sm text-gray-600">
                Archivo seleccionado: {form.image.name}
              </div>
            )}
          </div>
        </div>

        {/* Vista previa de la imagen */}
        {form.image && (
          <div className="flex flex-col sm:flex-row sm:items-start">
            <label className="sm:w-32 font-medium text-gray-700 pt-2">Vista previa</label>
            <div className="flex-1 mt-1 sm:mt-0">
              <img
                src={URL.createObjectURL(form.image)}
                alt="Vista previa"
                className="w-32 h-32 object-cover rounded-lg border shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Subir */}
        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded font-semibold transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 active:bg-green-800 transform hover:scale-105"
            } text-white shadow-lg`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Enviando...
              </div>
            ) : (
              "POST"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {})(AgregarPro);