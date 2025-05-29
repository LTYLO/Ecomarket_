import React from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useAuth } from './AuthContext';

const CartPanel = ({ showCart, setShowCart, cartItems = [] }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, userName, checkAuthStatus } = useAuth();

  // Funciones helper para manejar datos del producto
  const getProductName = (item) => {
    return item.title || item.name || item.nombre || 'Producto sin nombre';
  };

  const getProductPrice = (item) => {
    return Number(item.price || item.precio || 0);
  };

  const getProductImage = (item) => {
    return item.image || item.imagen || null;
  };

  const getItemTotal = (item) => {
    const price = getProductPrice(item);
    const quantity = Number(item.quantity || 1);
    return price * quantity;
  };

  const getTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + Number(item.quantity || 1), 0);
  };

  // Calcular subtotal con validación
  const subtotal = cartItems.reduce((acc, item) => {
    const price = getProductPrice(item);
    const quantity = Number(item.quantity || 1);
    return acc + (price * quantity);
  }, 0);

  const handleRemoveItem = (productId) => {
    console.log('🗑️ Eliminando producto con ID:', productId);
    
    try {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: productId
      });
      
      showSuccessMessage('Producto eliminado del carrito');
      
    } catch (error) {
      console.error('❌ Error eliminando producto:', error);
      showErrorMessage('Error al eliminar el producto');
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    console.log('🔢 Actualizando cantidad para producto ID:', productId, 'nueva cantidad:', newQuantity);
    
    const quantity = Number(newQuantity);
    
    if (quantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    try {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { 
          productId, 
          quantity 
        }
      });
      
    } catch (error) {
      console.error('❌ Error actualizando cantidad:', error);
      showErrorMessage('Error al actualizar la cantidad');
    }
  };

 
  const handleCheckout = async () => {
    console.log('🚀 handleCheckout ejecutado');
    
    try {
      // Verificar estado actual de autenticación
      await checkAuthStatus();
      
      // Obtener datos actualizados después de la verificación
      const token = localStorage.getItem('authToken');
      const storedUserName = localStorage.getItem('userName');
      
      console.log('🔍 Estado de autenticación:', {
        isLoggedIn,
        userName,
        hasToken: Boolean(token),
        storedUserName
      });
      
      
      if (token) {
        console.log('Usuario autenticado, redirigiendo a página de pago');
        showSuccessMessage(`Redirigiendo al pago!`);
        
        // Redirigir después del mensaje
        setTimeout(() => {
          window.location.href = '/pagar';
        }, 1000);
        
      } else {
        console.log(' Usuario no autenticado');
        showWarningMessage('Por favor inicia sesión para continuar con tu compra');
        
        // Opcional: redirigir al login
        setTimeout(() => {
          const loginPath = '/login';
          console.log(' Redirigiendo al login...');
          // Descomenta si quieres redirección automática
          // window.location.href = loginPath;
        }, 2500);
      }
    } catch (error) {
      console.error(' Error en handleCheckout:', error);
      showErrorMessage('Error al procesar la compra');
    }
  };

  // ✅ FUNCIONES DE NOTIFICACIÓN MEJORADAS
  const showNotification = (message, type = 'success') => {
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500'
    };
    
    const durations = {
      success: 2000,
      error: 3000,
      warning: 2500
    };

    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300`;
    notification.textContent = message;
    notification.style.transform = 'translateY(-100px)';
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    requestAnimationFrame(() => {
      notification.style.transform = 'translateY(0)';
    });
    
    // Remover después del tiempo especificado
    setTimeout(() => {
      notification.style.transform = 'translateY(-100px)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, durations[type]);
  };

  const showSuccessMessage = (message) => showNotification(message, 'success');
  const showErrorMessage = (message) => showNotification(message, 'error');
  const showWarningMessage = (message) => showNotification(message, 'warning');

  // Log para debugging
  console.log('🛒 CartPanel render:', {
    showCart,
    cartItemsCount: cartItems.length,
    isLoggedIn,
    userName,
    cartItems: cartItems.map(item => ({
      id: item.id,
      name: getProductName(item),
      quantity: item.quantity
    }))
  });

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

        {/* Indicador de estado de autenticación */}
        {cartItems.length > 0 && (
          <div className={`px-4 py-2 text-xs border-b ${isLoggedIn ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
            {isLoggedIn ? (
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Conectado como {userName}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Inicia sesión para finalizar tu compra</span>
              </div>
            )}
          </div>
        )}

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
                {cartItems.map((item) => {
                  const productName = getProductName(item);
                  const productPrice = getProductPrice(item);
                  const productImage = getProductImage(item);
                  const itemTotal = getItemTotal(item);
                  const quantity = Number(item.quantity || 1);

                  return (
                    <div key={`cart-item-${item.id}`} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
                      {/* Imagen del producto */}
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {productImage ? (
                          <img 
                            src={productImage} 
                            alt={productName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full flex items-center justify-center" style={productImage ? {display: 'none'} : {}}>
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Información del producto */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
                          {productName}
                        </h4>
                        
                        {/* Controles de cantidad */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log(' Click decrementar para producto ID:', item.id);
                                updateQuantity(item.id, quantity - 1);
                              }}
                              className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm transition-colors"
                              type="button"
                            >
                              −
                            </button>
                            <span className="text-sm font-medium min-w-[20px] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log(' Click incrementar para producto ID:', item.id);
                                updateQuantity(item.id, quantity + 1);
                              }}
                              className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm transition-colors"
                              type="button"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-semibold text-green-600">
                            ${itemTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Botón eliminar */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log(' Click eliminar para producto ID:', item.id);
                          handleRemoveItem(item.id);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
                        title="Eliminar producto"
                        type="button"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer con resumen */}
            <div className="border-t bg-white p-4 space-y-3">
              {/* Resumen de compra */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({getTotalItems()} productos)
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
              
              {/*  BOTÓN CORREGIDO */}
              <div className="space-y-2">
                <button 
                  onClick={handleCheckout}
                  className={`w-full font-medium py-3 rounded-md transition-colors ${
                    isLoggedIn 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  }`}
                  disabled={cartItems.length === 0}
                  type="button"
                >
                  {isLoggedIn ? 'Finalizar Compra' : 'Iniciar Sesión para Comprar'}
                </button>
                <button 
                  onClick={() => setShowCart(false)}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded-md transition-colors text-sm"
                  type="button"
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
  cartItems: state.cart?.items || [],
});

export default connect(mapStateToProps)(CartPanel);