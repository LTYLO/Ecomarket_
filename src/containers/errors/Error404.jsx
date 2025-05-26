import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Error404() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const leafVariants = {
    animate: {
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden">

      {/* Animated floating leaves */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-400 opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 20}px`
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        >
          🍃
        </motion.div>
      ))}

      {/* Subtle mouse follower */}
      <motion.div
        className="absolute w-3 h-3 bg-green-400 rounded-full pointer-events-none opacity-30 blur-sm"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            className="text-left space-y-4 lg:space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
            >
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Oops! 
                <motion.span 
                  className="text-green-500 block"
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0 5px 15px rgba(34, 197, 94, 0.3)"
                  }}
                >
                  404
                </motion.span>
              </motion.h1>
            </motion.div>
            
            <motion.h2 
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ color: "#22c55e" }}
            >
              Esta página se perdió en el 
              <motion.span 
                className="text-green-500"
                animate={{ 
                  color: ["#22c55e", "#16a34a", "#22c55e"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {" "}huerto digital
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 text-center lg:text-left px-4 lg:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              No te preocupes, aunque esta página no floreció aquí, 
              tenemos muchos productos frescos esperándote en nuestra plataforma principal.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <motion.a
                href="/"
                className="bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center space-x-2 w-full sm:w-auto"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#16a34a",
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🏠</span>
                <span>Volver al Mercado</span>
              </motion.a>
              
              <motion.button
                className="border-2 border-green-500 text-green-500 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-green-500 hover:text-white transition-all inline-flex items-center justify-center space-x-2 w-full sm:w-auto"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#22c55e",
                  color: "#ffffff"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
              >
                <span>↶</span>
                <span>Regresar</span>
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Right Illustration */}
          <motion.div
            className="relative order-1 lg:order-2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-green-200 to-green-300 rounded-3xl p-8 sm:p-12 shadow-2xl mx-4 lg:mx-0"
              variants={leafVariants}
              animate="animate"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 30px 60px rgba(0,0,0,0.1)"
              }}
            >
              {/* Large vegetables illustration */}
              <div className="text-center space-y-4 sm:space-y-6">
                <motion.div 
                  className="text-6xl sm:text-7xl lg:text-8xl"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🥕
                </motion.div>
                <motion.div 
                  className="text-4xl sm:text-5xl lg:text-6xl"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, -3, 3, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  🥬
                </motion.div>
                <motion.div 
                  className="text-5xl sm:text-6xl lg:text-7xl"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                >
                  🍅
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-4 -right-4 text-4xl"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                🌱
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-2 -left-4 text-3xl"
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, 10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🌿
              </motion.div>
            </motion.div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-100 to-transparent rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-green-400 to-green-500 opacity-10"
        animate={{
          clipPath: [
            "polygon(0 70%, 100% 40%, 100% 100%, 0% 100%)",
            "polygon(0 40%, 100% 70%, 100% 100%, 0% 100%)",
            "polygon(0 70%, 100% 40%, 100% 100%, 0% 100%)"
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default Error404;