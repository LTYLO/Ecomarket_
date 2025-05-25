import { connect } from 'react-redux';
import anim from 'assets/img/animtom.gif';
import {  Typewriter  }  from 'react-simple-typewriter'


function Headers() {

    return(

      <main className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 mt-14">
        <div className="lg:w-1/2 w-full text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">

            Bienvenido al <span className="text-green-600 inline-block min-w-[120px]"> 
              <Typewriter
              words={[' Pasado',' Presente', ' Futuro']}
              loop={0}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              //onLoopDone={handleDone}
              //onType={handleType}
            />
            </span> de la <span className="text-green-600">Agricultura</span>

          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Aquí puedes ver tu producto, servicio o propósito principal. Hazlo claro y atractivo.
          </p>
          <a href="#contacto" className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition">
            ¡A comprar!
          </a>
        </div>

        <div className="lg:w-1/2 w-full mb-10 lg:mb-0 flex justify-center">
          <img
            src={anim}
            alt="Animación representativa"
            className="rounded-lg shadow-lg w-full max-w-[570px] h-auto"
          />
        </div>
      </main>
      
    )

}

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {})(Headers);

