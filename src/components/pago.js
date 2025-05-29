import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Asumiendo que tienes este hook

const Pago = ({ items = [], onOrderComplete, showSuccessMessage, showErrorMessage }) => {
  const { authToken, isLoggedIn } = useAuth(); // Hook de autenticación
  
  // Estados para datos del usuario
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });
  
  // Estados para el checkout
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  // Función para obtener datos del usuario desde el API
  const fetchUserData = async () => {
    if (!authToken) {
      console.log('No hay token de autenticación');
      return;
    }

    try {
      setLoading(true);
      setServerError(false); // Reset error state
      console.log('Obteniendo datos del usuario...');
      
      const response = await fetch('http://localhost:8000/api/users/me/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Datos del usuario obtenidos:', data);
        
        // Actualizar estado con los datos del usuario basado en tu modelo Django
        setUserData({
          nombre: data.nombre || '',
          email: data.email || '',
          telefono: data.telefono || '',
          direccion: data.direccion || ''
        });
      } else {
        console.error('Error al obtener datos del usuario:', response.status);
        if (response.status === 401) {
          console.log('Token expirado o inválido');
          setServerError(true);
        } else if (response.status === 404) {
          console.log('Usuario no encontrado');
          setServerError(true);
        }
      }
    } catch (error) {
      console.error('Error de conexión al obtener datos del usuario:', error);
      setServerError(true);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos del usuario cuando el componente se monta o el token cambia
  useEffect(() => {
    if (isLoggedIn && authToken) {
      fetchUserData();
    }
  }, [authToken, isLoggedIn]);

  // Debug: Log items recibidos
  useEffect(() => {
    console.log('Items recibidos en CheckoutPage:', items);
    console.log('Tipo de items:', typeof items, Array.isArray(items));
  }, [items]);

  // Calcular totales - con verificación de que items existe y es un array
  const safeItems = Array.isArray(items) ? items : [];
  
  const getProductName = (item) => item.nombre || item.name || item.title || 'Producto';
  const getProductPrice = (item) => Number(item.precio || item.price || 0);
  const getProductImage = (item) => item.imagen || item.image || null;
  const getItemTotal = (item) => getProductPrice(item) * Number(item.quantity || 1);
  const getTotalItems = () => safeItems.reduce((total, item) => total + Number(item.quantity || 1), 0);
  
  const subtotal = safeItems.reduce((total, item) => total + getItemTotal(item), 0);
  const shippingCost = shippingMethod === 'express' ? 5.99 : 0;
  const total = subtotal + shippingCost;

  // Función para procesar el pedido
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    // Verificar que hay items en el carrito
    if (safeItems.length === 0) {
      showErrorMessage && showErrorMessage('No hay productos en el carrito');
      return;
    }

    // Verificar que hay datos del usuario
    if (!userData.nombre || !userData.email) {
      showErrorMessage && showErrorMessage('Faltan datos del usuario. Intenta actualizar los datos.');
      return;
    }

    setProcessingPayment(true);
    
    try {
      // Simular procesamiento del pedido
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const orderData = {
        user_data: userData,
        cart_items: safeItems,
        shipping_method: shippingMethod,
        payment_method: paymentMethod,
        subtotal: subtotal,
        shipping_cost: shippingCost,
        total: total,
        order_id: `ORD-${Date.now()}`
      };

      console.log('Pedido procesado:', orderData);
      showSuccessMessage && showSuccessMessage('¡Pedido procesado exitosamente!');
      onOrderComplete && onOrderComplete(orderData);
      
    } catch (error) {
      console.error('Error procesando pedido:', error);
      showErrorMessage && showErrorMessage('Error al procesar el pedido. Inténtalo de nuevo.');
    } finally {
      setProcessingPayment(false);
    }
  };

  // Si hay error de servidor, mostrar mensaje
  if (serverError && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white border-2 border-red-300 shadow-2xl p-8 rounded-xl w-full max-w-md text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-700 mb-4">Error de Conexión</h2>
          <p className="text-gray-600 text-lg mb-6">No se puede conectar con el servidor o cargar los datos del usuario</p>
          <div className="space-y-3">
            <button
              onClick={fetchUserData}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Reintentar
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Si no hay items, mostrar mensaje
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
        <p className="text-gray-600 mt-2">Revisa tu información y confirma el pedido</p>
        
        {/* Debug Info */}
        <div className="mt-2 text-xs text-gray-500">
          Items en carrito: {safeItems.length} | Usuario logueado: {isLoggedIn ? 'Sí' : 'No'}
        </div>
        
        {isLoggedIn && userData.nombre && (
          <p className="text-sm text-green-600 mt-1 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Sesión iniciada como {userData.nombre} ({userData.email})
          </p>
        )}
        
        {loading && (
          <p className="text-sm text-blue-600 mt-1 flex items-center">
            <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-600 border-t-transparent mr-2"></div>
            Cargando datos del usuario...
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - User Info and Options */}
        <div className="space-y-6">
          {/* Personal Information Display (Read-only) */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Información del Cliente
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Solo lectura
              </span>
            </h2>
            
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ) : userData.nombre || userData.email ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo
                      </label>
                      <div className="bg-white border border-gray-200 px-3 py-2 rounded-md text-gray-900">
                        {userData.nombre || 'No especificado'}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="bg-white border border-gray-200 px-3 py-2 rounded-md text-gray-900">
                        {userData.email || 'No especificado'}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <div className="bg-white border border-gray-200 px-3 py-2 rounded-md text-gray-900">
                        {userData.telefono || 'No especificado'}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <div className={`px-3 py-2 rounded-md text-sm ${
                        userData.nombre && userData.email 
                          ? 'bg-green-50 border border-green-200 text-green-700'
                          : 'bg-yellow-50 border border-yellow-200 text-yellow-700'
                      }`}>
                        {userData.nombre && userData.email ? '✓ Datos verificados' : '⚠ Datos incompletos'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección de Entrega
                    </label>
                    <div className="bg-white border border-gray-200 px-3 py-2 rounded-md text-gray-900 min-h-[60px] flex items-center">
                      {userData.direccion || 'No especificada'}
                    </div>
                  </div>
                </div>

                {/* Botón para actualizar datos */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={fetchUserData}
                    disabled={loading}
                    className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-md border border-blue-200 transition-colors disabled:opacity-50 flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-600 border-t-transparent mr-2"></div>
                        Actualizando...
                      </>
                    ) : (
                      <>
                        🔄 Actualizar datos
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="mb-2">No se pudieron cargar los datos del usuario</p>
                <button
                  onClick={fetchUserData}
                  disabled={loading}
                  className="text-blue-600 hover:text-blue-800 text-sm disabled:opacity-50"
                >
                  {loading ? 'Cargando...' : 'Intentar de nuevo'}
                </button>
              </div>
            )}
          </div>

          {/* Shipping Method */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Método de Envío
            </h2>
            
            <div className="space-y-3">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="shipping"
                  value="standard"
                  checked={shippingMethod === 'standard'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="text-green-600 focus:ring-green-500"
                />
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Envío Estándar</span>
                    <span className="text-green-600 font-medium">Gratis</span>
                  </div>
                  <p className="text-sm text-gray-500">3-5 días hábiles</p>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="shipping"
                  value="express"
                  checked={shippingMethod === 'express'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="text-green-600 focus:ring-green-500"
                />
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Envío Express</span>
                    <span className="font-medium">$5.99</span>
                  </div>
                  <p className="text-sm text-gray-500">1-2 días hábiles</p>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Método de Pago
            </h2>
            
            <div className="space-y-3">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-green-600 focus:ring-green-500"
                />
                <div className="ml-3">
                  <span className="font-medium">PayPal</span>
                  <p className="text-sm text-gray-500">Paga con tu cuenta PayPal</p>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-green-600 focus:ring-green-500"
                />
                <div className="ml-3">
                  <span className="font-medium">Tarjeta de Crédito</span>
                  <p className="text-sm text-gray-500">Visa, MasterCard, American Express</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:sticky lg:top-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
              Resumen del Pedido ({safeItems.length} productos)
            </h2>
            
            {/* Products */}
            <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
              {safeItems.map((item, index) => {
                const productName = getProductName(item);
                const productPrice = getProductPrice(item);
                const productImage = getProductImage(item);
                const itemTotal = getItemTotal(item);
                const quantity = Number(item.quantity || 1);

                return (
                  <div key={item.id || `checkout-item-${index}`} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
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
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {productName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        ${productPrice.toFixed(2)} × {quantity}
                      </p>
                    </div>
                    
                    <span className="font-semibold text-green-600">
                      ${itemTotal.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Totals */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Subtotal ({getTotalItems()} productos)
                </span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span className="font-medium">
                  {shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Payment Button */}
            <button
              onClick={handleSubmitOrder}
              disabled={processingPayment || loading || (!userData.nombre && !userData.email)}
              className={`w-full mt-6 py-3 px-4 rounded-md font-medium transition-colors ${
                processingPayment || loading || (!userData.nombre && !userData.email)
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {processingPayment ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Procesando...
                </div>
              ) : loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Cargando...
                </div>
              ) : (!userData.nombre && !userData.email) ? (
                'Cargando datos del usuario...'
              ) : (
                `Confirmar Pedido - $${total.toFixed(2)}`
              )}
            </button>
            
            <p className="text-xs text-gray-500 mt-3 text-center">
              Al confirmar el pedido, aceptas nuestros términos y condiciones
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pago;