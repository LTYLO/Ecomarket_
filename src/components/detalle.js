function Producto() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Imagen del producto */}
        <div className="flex justify-center">
          <img
            src="/ruta/a/tu/imagen.png" // Cambia esto por la ruta correcta
            alt="Papa Capira"
            className="max-w-sm w-full h-auto"
          />
        </div>

        {/* Información del producto */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">PAPA CAPIRA X 2500 G</h2>
          <p className="text-sm text-gray-500">Unidades disponibles: 12</p>
          <p className="text-3xl font-semibold text-red-600">$10.200</p>
          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
            Agregar <i className="fas fa-shopping-cart ml-2"></i>
          </button>

          {/* Descripción */}
          <div className="pt-6">
            <h3 className="text-lg font-semibold">Nombre del producto: Papa Capira</h3>
            <p className="text-gray-700">
              Disfruta de la papa capira, es una variedad de piel amarilla y textura firme, muy apreciada por su sabor y versatilidad en la cocina. Es ideal para freír, hervir, hornear o preparar guisos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Producto;
