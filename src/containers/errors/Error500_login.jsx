import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Error500() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [repairStage, setRepairStage] = useState(0);
  const [sparkles, setSparkles] = useState([]);
  const [isRetrying, setIsRetrying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Repair animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setRepairStage(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Generate sparkles effect
  useEffect(() => {
    if (repairStage === 3) {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5
      }));
      setSparkles(newSparkles);
    }
  }, [repairStage]);

  const getRepairMessage = () => {
    switch (repairStage) {
      case 0: return "Detectando el problema...";
      case 1: return "Reparando los cables...";
      case 2: return "Reiniciando sistemas...";
      case 3: return "¡Casi listo! Finalizando...";
      default: return "Trabajando en ello...";
    }
  };

  const getServerIcon = () => {
    switch (repairStage) {
      case 0: return "🔍"; // Detecting
      case 1: return "🔧"; // Repairing
      case 2: return "⚡"; // Restarting
      case 3: return "✨"; // Almost done
      default: return "🔧";
    }
  };

  const handleRetry = () => {
    setIsRetrying(true);
    
    // Simular un pequeño retraso para mostrar el estado de "reintentando"
    setTimeout(() => {
      // Intentar volver al catálogo
      navigate('/login');
      // Si eso no funciona, recargar la página completa
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }, 1000);
  };

  const handleGoBack = () => {
    // Intentar ir atrás en el historial, si no, ir al inicio
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">

      {/* Floating repair tools */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl opacity-20 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          {["🔧", "⚙️", "🔨", "⚡", "🛠️"][Math.floor(Math.random() * 5)]}
        </div>
      ))}

      {/* Sparkles effect during final stage */}
      {repairStage === 3 && sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute text-2xl animate-ping"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: "1s"
          }}
        >
          ✨
        </div>
      ))}

      {/* Mouse follower with repair tool */}
      <div
        className="absolute w-4 h-4 pointer-events-none opacity-50 text-lg transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `rotate(${Math.sin(Date.now() * 0.005) * 10}deg)`
        }}
      >
        🔧
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-left space-y-4 lg:space-y-6 order-2 lg:order-1">
            <div className="animate-bounce">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight text-center lg:text-left">
                ¡Ups! 
                <span 
                  className="text-red-500 block transition-all duration-500"
                  style={{
                    textShadow: repairStage === 3 ? "0 5px 15px rgba(239, 68, 68, 0.3)" : "none"
                  }}
                >
                  500
                </span>
              </h1>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 text-center lg:text-left">
              El servidor está en 
              <span className="text-orange-500 animate-pulse">
                {" "}mantenimiento
              </span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 text-center lg:text-left px-4 lg:px-0">
              Nuestro equipo técnico está trabajando para solucionar este problema. 
              Los mejores ingenieros están en ello ahora mismo.
            </p>

            {/* Animated repair status */}
            <div className="bg-white rounded-lg p-4 shadow-lg border-l-4 border-orange-500 mx-4 lg:mx-0">
              <div className="flex items-center space-x-3">
                <span className="text-2xl animate-spin" style={{ animationDuration: "2s" }}>
                  {getServerIcon()}
                </span>
                <div>
                  <p className="font-semibold text-gray-800">Estado del servidor:</p>
                  <p className="text-orange-600 animate-pulse">{getRepairMessage()}</p>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(repairStage + 1) * 25}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className={`${
                  isRetrying 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600 transform hover:scale-105'
                } text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center space-x-2 w-full sm:w-auto`}
              >
                <span className={isRetrying ? "animate-spin" : "animate-spin"}>
                  {isRetrying ? "⏳" : "🔄"}
                </span>
                <span>{isRetrying ? "Reintentando..." : "Reintentar"}</span>
              </button>
              
              <button
                className="border-2 border-orange-500 text-orange-500 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-orange-500 hover:text-white transition-all inline-flex items-center justify-center space-x-2 w-full sm:w-auto transform hover:scale-105"
                onClick={handleGoBack}
              >
                <span>↶</span>
                <span>Regresar</span>
              </button>
            </div>
          </div>
          
          {/* Right Illustration - Animated Server */}
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
            <div
              className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 sm:p-12 shadow-2xl mx-4 lg:mx-0 transform transition-all duration-500"
              style={{
                boxShadow: repairStage === 3 ? "0 30px 60px rgba(0,0,0,0.15), 0 0 30px rgba(34, 197, 94, 0.3)" : "0 30px 60px rgba(0,0,0,0.1)"
              }}
            >
              {/* Server rack illustration */}
              <div className="text-center space-y-4 sm:space-y-6">
                {/* Main server */}
                <div 
                  className="text-6xl sm:text-7xl lg:text-8xl transition-all duration-500"
                  style={{
                    filter: repairStage === 3 ? "hue-rotate(120deg)" : "none",
                    transform: `scale(${repairStage === 2 ? 1.1 : 1}) rotate(${repairStage === 1 ? 2 : 0}deg)`
                  }}
                >
                  🖥️
                </div>

                {/* Status indicators */}
                <div className="flex justify-center space-x-2">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        i <= repairStage 
                          ? 'bg-green-400 animate-pulse' 
                          : 'bg-red-400 animate-ping'
                      }`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>

                {/* Cables */}
                <div className="flex justify-center space-x-4">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className={`text-2xl transition-all duration-500 ${
                        repairStage >= 1 ? 'animate-pulse' : 'opacity-50'
                      }`}
                      style={{
                        transform: repairStage === 1 ? `translateY(${Math.sin(Date.now() * 0.01 + i) * 5}px)` : 'none'
                      }}
                    >
                      🔌
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating repair tools around server */}
              <div className="absolute -top-4 -right-4 text-3xl animate-bounce" style={{ animationDelay: "0s" }}>
                🔧
              </div>
              
              <div className="absolute -bottom-2 -left-4 text-3xl animate-bounce" style={{ animationDelay: "0.5s" }}>
                ⚙️
              </div>

              <div className="absolute top-1/2 -right-6 text-2xl animate-bounce" style={{ animationDelay: "1s" }}>
                🛠️
              </div>

              {/* Electric sparks during repair */}
              {repairStage === 2 && (
                <>
                  <div className="absolute top-1/4 left-1/4 text-xl animate-ping text-yellow-400">⚡</div>
                  <div className="absolute top-3/4 right-1/4 text-xl animate-ping text-yellow-400" style={{ animationDelay: "0.3s" }}>⚡</div>
                  <div className="absolute top-1/2 left-1/3 text-xl animate-ping text-yellow-400" style={{ animationDelay: "0.6s" }}>⚡</div>
                </>
              )}
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-100 to-transparent rounded-3xl transform rotate-2 scale-105 opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave with repair pattern */}
      <div
        className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-orange-400 to-red-500 opacity-10 transition-all duration-1000"
        style={{
          clipPath: repairStage === 3 
            ? "polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)"
            : `polygon(0 ${70 + repairStage * 5}%, 100% ${40 - repairStage * 5}%, 100% 100%, 0% 100%)`
        }}
      />

      {/* Floating success message when repair is almost complete */}
      {repairStage === 3 && (
        <div className="fixed top-20 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <span>✅</span>
            <span className="font-semibold">¡Reparación casi completa!</span>
          </div>
        </div>
      )}

      {/* Loading overlay when retrying */}
      {isRetrying && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl text-center">
            <div className="animate-spin text-4xl mb-4">🔄</div>
            <p className="text-lg font-semibold text-gray-800">Reintentando conexión...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Error500;