import { useState } from "react";
import { connect } from 'react-redux';

function AgregarPro() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría el envío al backend
    console.log(form);
  };

  return (
    <section className="max-w-4xl mx-auto bg-gray-100 p-6 mt-20 bg-white shadow-xl rounded-lg border">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Agregar producto</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Titulo */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="sm:w-32 font-medium text-gray-700">Titulo</label>
          <input
            name="title"
            type="text"
            onChange={handleChange}
            className="flex-1 border rounded px-4 py-2 mt-1 sm:mt-0"
            required
          />
        </div>

        {/* Descripcion */}
        <div className="flex flex-col sm:flex-row sm:items-start">
          <label className="sm:w-32 font-medium text-gray-700 pt-2">Descripción</label>
          <textarea
            name="description"
            onChange={handleChange}
            rows="3"
            className="flex-1 border rounded px-4 py-2 mt-1 sm:mt-0"
            required
          />
        </div>

        {/* Precio */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="sm:w-32 font-medium text-gray-700">Precio</label>
          <input
            name="price"
            type="number"
            step="0.01"
            onChange={handleChange}
            className="flex-1 border rounded px-4 py-2 mt-1 sm:mt-0"
            required
          />
        </div>

        {/* Imagen */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="sm:w-32 font-medium text-gray-700">Imagen</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="flex-1 mt-1 sm:mt-0"
          />
        </div>

        {/* Subir */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
          >
            POST
          </button>
        </div>
      </form>
    </section>
  );
}

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {})(AgregarPro);