import React from 'react';
import { connect } from 'react-redux';

const CartPanel = ({ showCart, setShowCart, cartItems = [], userName, removeFromCart, setCartItems }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const handleRemoveItem = (index) => {
    // Si tenemos setCartItems (estado local), lo usamos
    if (setCartItems) {
      const newItems = cartItems.filter((_, i) => i !== index);
      setCartItems(newItems);
    }
    // Si tenemos la acción de Redux, también la usamos
    if (removeFromCart) {
      removeFromCart(index);
    }
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(index);
      return;
    }
    
    if (setCartItems) {
      const newItems = [...cartItems];
      newItems[index] = { ...newItems[index], quantity: newQuantity };
      setCartItems(newItems);
    }
  };

  if (!showCart) return null;

  return (
    <>
      {/* Overlay de fondo */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
        onClick={() => setShowCart(false)}
      />
      
      {/* Panel del carrito */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 flex flex-col shadow-xl">
        
        {/* Header limpio */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800">Carrito de Compras</h2>
            {cartItems.length > 0 && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                {cartItems.length}
              </span>
            )}
          </div>
          <button 
            onClick={() => setShowCart(false)} 
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido del carrito */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg text-gray-800 font-medium mb-2">Tu carrito está vacío</h3>
            <p className="text-gray-500 text-sm mb-4">¡Agrega algunos productos para comenzar!</p>
            <button 
              onClick={() => setShowCart(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
            >
              Explorar productos
            </button>
          </div>
        ) : (
          <>
            {/* Lista de productos */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
                    {/* Imagen del producto */}
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.image || item.imagen ? (
                        <img 
                          src={item.image || item.imagen} 
                          alt={item.title || item.nombre}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-full h-full flex items-center justify-center" style={item.image || item.imagen ? {display: 'none'} : {}}>
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Información del producto */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
                        {item.title || item.nombre || 'Producto sin nombre'}
                      </h4>
                      
                      {/* Controles de cantidad */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium min-w-[20px] text-center">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-semibold text-green-600">
                          ${(Number(item.price || item.precio || 0) * (item.quantity || 1)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Botón eliminar */}
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
                      title="Eliminar producto"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer con resumen */}
            <div className="border-t bg-white p-4 space-y-3">
              {/* Resumen de compra */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} productos)
                  </span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío</span>
                  <span className="text-green-600 font-medium">Gratis</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-green-600">${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Botones de acción */}
              <div className="space-y-2">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition-colors">
                  Finalizar Compra
                </button>
                <button 
                  onClick={() => setShowCart(false)}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded-md transition-colors text-sm"
                >
                  Seguir comprando
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
});

export default connect(mapStateToProps)(CartPanel);