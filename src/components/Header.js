import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Headers() {

    return(

      <main className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16">
        <div className="lg:w-1/2 w-full text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Bienvenido al <span className="text-green-600">futuro</span> de tu sitio web
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Aquí puedes describir tu producto, servicio o propósito principal. Hazlo claro y atractivo.
          </p>
          <a href="#contacto" className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition">
            ¡Contáctanos!
          </a>
        </div>

        <div className="lg:w-1/2 w-full mb-10 lg:mb-0 flex justify-center">
          <img
            src="https://via.placeholder.com/500x350"
            alt="Imagen representativa"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </main>
      
    )

}

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {})(Headers);

