import { connect } from 'react-redux';
import anim from 'assets/img/animtom.gif';
import { Typewriter } from 'react-simple-typewriter'
import { Link } from 'react-router-dom';


function Headers() {

  return (

    <main className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 mt-14">
      <div className="lg:w-1/2 w-full text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">

          Vive la <span className="text-green-600 inline-block min-w-[120px]">
            <Typewriter
              words={[' Evolución', ' Innovación', ' Transformación']}
              loop={0}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            //onLoopDone={handleDone}
            //onType={handleType}
            />
          </span> que está cambiando <span className="text-green-600">Agricultura</span>

        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Aquí puedes ver tu producto, servicio o propósito principal. Hazlo claro y atractivo.
        </p>
        <Link
          to="/Catalogo"
          className="
    group relative inline-block overflow-hidden
    bg-gradient-to-r from-emerald-600 to-green-600
    text-white font-bold text-lg
    py-4 px-8 rounded-xl
    hover:from-emerald-700 hover:to-green-700
    hover:shadow-xl hover:shadow-emerald-500/25
    hover:-translate-y-1 hover:scale-[1.02]
    focus:outline-none focus:ring-4 focus:ring-emerald-300/50 focus:ring-offset-2
    active:translate-y-0 active:scale-[0.98]
    transition-all duration-300 ease-out
    before:absolute before:inset-0 
    before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
    before:translate-x-[-100%] before:transition-transform before:duration-700
    hover:before:translate-x-[100%]
    after:absolute after:inset-0 after:rounded-xl
    after:bg-gradient-to-t after:from-black/10 after:to-transparent
    after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
  "
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg
              className="w-6 h-6 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            ¡A comprar!
            <svg
              className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </Link>

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

