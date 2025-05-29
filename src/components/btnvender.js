import { useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';

function AgregarPro() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    calories: "",
    vitamin_c: "",
    fiber: "",
    potassium: "",
    origin: ""
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
      formData.append('calories', form.calories);
      formData.append('vitamin_c', form.vitamin_c);
      formData.append('fiber', form.fiber);
      formData.append('potassium', form.potassium);
      formData.append('origin', form.origin);
      
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
        calories: "",
        vitamin_c: "",
        fiber: "",
        potassium: "",
        origin: ""
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

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8 px-4 pt-24">
      {/* Logo Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-full shadow-lg mb-4">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-green-800 mb-2">Mi Tienda</h1>
        <p className="text-green-600">Gestión de Productos</p>
      </div>

      {/* Main Form Container */}
      <section className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl border-2 border-green-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
          <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Agregar Nuevo Producto
          </h2>
          <p className="text-green-100 text-center mt-2">Complete los campos para añadir un producto al catálogo</p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {/* Mensaje de estado */}
          {message && (
            <div className="mb-8 animate-pulse">
              <div
                className={`p-4 rounded-xl text-center font-medium shadow-lg border-l-4 ${
                  messageType === "success"
                    ? "bg-green-50 text-green-800 border-green-500 shadow-green-100"
                    : "bg-red-50 text-red-800 border-red-500 shadow-red-100"
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  {messageType === "success" ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                {message.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Titulo */}
            <div className="group">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <label className="lg:w-40 font-semibold text-green-800 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Título
                </label>
                <div className="flex-1">
                  <input
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Ingrese el título del producto"
                    className="w-full border-2 border-green-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 bg-green-50/30"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Descripcion */}
            <div className="group">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <label className="lg:w-40 font-semibold text-green-800 flex items-center gap-2 pt-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Descripción
                </label>
                <div className="flex-1">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describa las características del producto"
                    className="w-full border-2 border-green-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 bg-green-50/30 resize-none"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Precio */}
            <div className="group">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <label className="lg:w-40 font-semibold text-green-800 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Precio
                </label>
                <div className="flex-1">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 font-bold">$</span>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full border-2 border-green-200 rounded-xl pl-8 pr-4 py-3 transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 bg-green-50/30"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Información Nutricional */}
            <div className="bg-green-50/50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-800 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Información Nutricional
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calorías */}
                <div className="group">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-green-800 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      </svg>
                      Calorías (kcal)
                    </label>
                    <input
                      name="calories"
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.calories}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full border-2 border-green-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 bg-white"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Vitamina C */}
                <div className="group">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-green-800 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Vitamina C (mg)
                    </label>
                    <input
                      name="vitamin_c"
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.vitamin_c}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full border-2 border-green-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 bg-white"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Fibra */}
                <div className="group">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-green-800 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      Fibra (g)
                    </label>
                    <input
                      name="fiber"
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.fiber}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full border-2 border-green-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 bg-white"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Potasio */}
                <div className="group">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-green-800 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Potasio (mg)
                    </label>
                    <input
                      name="potassium"
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.potassium}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full border-2 border-green-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 bg-white"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Origen */}
            <div className="group">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <label className="lg:w-40 font-semibold text-green-800 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Origen
                </label>
                <div className="flex-1">
                  <input
                    name="origin"
                    type="text"
                    value={form.origin}
                    onChange={handleChange}
                    placeholder="Lugar de origen del producto"
                    className="w-full border-2 border-green-200 rounded-xl px-4 py-3 transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 bg-green-50/30"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="group">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <label className="lg:w-40 font-semibold text-green-800 flex items-center gap-2 pt-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Imagen
                </label>
                <div className="flex-1">
                  <div className="border-2 border-dashed border-green-300 rounded-xl p-6 transition-all duration-300 hover:border-green-400 bg-green-50/50">
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full text-green-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 file:transition-colors"
                      disabled={loading}
                    />
                    {form.image && (
                      <div className="mt-3 text-sm text-green-600 bg-green-100 px-3 py-2 rounded-lg">
                        <span className="font-medium">Archivo seleccionado:</span> {form.image.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Vista previa de la imagen */}
            {form.image && (
              <div className="group animate-fadeIn">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <label className="lg:w-40 font-semibold text-green-800 flex items-center gap-2 pt-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Vista previa
                  </label>
                  <div className="flex-1">
                    <div className="relative group">
                      <img
                        src={URL.createObjectURL(form.image)}
                        alt="Vista previa"
                        className="w-40 h-40 object-cover rounded-xl border-2 border-green-200 shadow-lg transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-green-600 bg-opacity-0 hover:bg-opacity-10 rounded-xl transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Botón de envío */}
            <div className="pt-6 border-t border-green-100">
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed scale-95"
                      : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 active:scale-95 hover:scale-105 shadow-lg hover:shadow-xl"
                  } text-white min-w-[200px] flex items-center justify-center gap-3`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Agregar Producto
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>

  );
}

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {})(AgregarPro);