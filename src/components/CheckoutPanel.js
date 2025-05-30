import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const CheckoutPanel = ({ cartItems = [] }) => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderComplete, setOrderComplete] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { isLoggedIn, userName, isLoading: authLoading, logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Funciones helper para manejar datos del producto (las mismas del CartPanel)
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

  // Función para decodificar el JWT y obtener el ID del usuario
  const getUserIdFromToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const payload = JSON.parse(jsonPayload);
      console.log('Token payload:', payload);
      
      return payload.user_id || payload.id || payload.sub || payload.userId;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  };

  // Función para obtener datos del usuario
  const fetchUserData = async () => {
    try {
      setUserLoading(true);
      setError('');
      
      const token = localStorage.getItem('authToken');
      
      console.log('=== FETCH USER DATA CHECKOUT ===');
      console.log('Token exists:', !!token);
      
      if (!token) {
        console.log('Token no encontrado en checkout');
        logout();
        navigate('/login');
        return;
      }

      const userId = getUserIdFromToken(token);
      console.log('User ID from token:', userId);
      
      const response = await fetch(`http://localhost:8000/api/users/${userId}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(`User endpoint - Status:`, response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Datos del usuario cargados en checkout:', data);
        setUserData(data);
      } else if (response.status === 401) {
        console.log('Token inválido o expirado en checkout');
        logout();
        navigate('/login');
        return;
      } else {
        throw new Error('Error al cargar datos del usuario');
      }
      
    } catch (err) {
      console.error('Error fetching user data in checkout:', err);
      setError('Error al cargar información del usuario');
      
      if (err.message.includes('401') || err.message.includes('Token inválido')) {
        logout();
        navigate('/login');
      }
    } finally {
      setUserLoading(false);
    }
  };

  // useEffect para verificar autenticación y cargar datos de usuario
  useEffect(() => {
    console.log('=== CHECKOUT USEEFFECT AUTH ===');
    console.log('AuthContext isLoading:', authLoading);
    console.log('AuthContext isLoggedIn:', isLoggedIn);
    
    // Esperar a que AuthContext termine de verificar la autenticación
    if (authLoading) {
      return;
    }
    
    const token = localStorage.getItem('authToken');
    
    if (!token || !isLoggedIn) {
      console.log('No autenticado en checkout, redirigiendo al login...');
      navigate('/login');
      return;
    }
    
    console.log('Usuario autenticado en checkout, cargando datos...');
    fetchUserData();
  }, [authLoading, isLoggedIn, navigate]);

  // useEffect mejorado para cargar los datos de compra
  useEffect(() => {
    const loadPurchaseData = async () => {
      try {
        console.log('🔍 Cargando datos de compra...');
        console.log('📦 cartItems desde Redux:', cartItems);
        
        let itemsToProcess = [];
        
        // Prioridad 1: Usar cartItems de Redux si están disponibles
        if (cartItems && cartItems.length > 0) {
          console.log('✅ Usando items de Redux:', cartItems.length);
          itemsToProcess = cartItems;
        } else {
          // Prioridad 2: Intentar obtener de localStorage
          console.log('🔄 Redux vacío, buscando en localStorage...');
          const cartData = localStorage.getItem('cartItems');
          console.log('📱 Datos en localStorage:', cartData);
          
          if (cartData) {
            try {
              const items = JSON.parse(cartData);
              if (Array.isArray(items) && items.length > 0) {
                console.log('✅ Usando items de localStorage:', items.length);
                itemsToProcess = items;
                
                // Sincronizar con Redux
                dispatch({
                  type: 'SET_CART_ITEMS',
                  payload: items
                });
              }
            } catch (parseError) {
              console.error('❌ Error parseando localStorage:', parseError);
            }
          }
        }
        
        // Prioridad 3: Buscar en sessionStorage como último recurso
        if (itemsToProcess.length === 0) {
          console.log('🔄 Buscando en sessionStorage...');
          const sessionData = sessionStorage.getItem('checkoutItems');
          if (sessionData) {
            try {
              const items = JSON.parse(sessionData);
              if (Array.isArray(items) && items.length > 0) {
                console.log('✅ Usando items de sessionStorage:', items.length);
                itemsToProcess = items;
              }
            } catch (parseError) {
              console.error('❌ Error parseando sessionStorage:', parseError);
            }
          }
        }
        
        console.log('🛒 Items finales a procesar:', itemsToProcess);
        setPurchasedItems(itemsToProcess);
        
      } catch (error) {
        console.error('❌ Error cargando items:', error);
        setPurchasedItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadPurchaseData();
  }, [cartItems, dispatch]);

  // Función para guardar datos de checkout en sessionStorage
  const saveCheckoutData = (items) => {
    try {
      sessionStorage.setItem('checkoutItems', JSON.stringify(items));
      console.log('💾 Datos de checkout guardados en sessionStorage');
    } catch (error) {
      console.error('❌ Error guardando en sessionStorage:', error);
    }
  };

  // Efecto para guardar datos cuando se cargan los items
  useEffect(() => {
    if (purchasedItems.length > 0) {
      saveCheckoutData(purchasedItems);
    }
  }, [purchasedItems]);

  // Calcular total de la compra
  const totalCompra = purchasedItems.reduce((acc, item) => {
    return acc + getItemTotal(item);
  }, 0);

  const totalItems = purchasedItems.reduce((acc, item) => {
    return acc + Number(item.quantity || 1);
  }, 0);

  // Función para procesar el pago con datos de usuario
  const handlePayment = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('authToken');
      const userId = getUserIdFromToken(token);
      
      // Preparar datos de la orden
      const orderData = {
        user_id: userId,
        items: purchasedItems.map(item => ({
          product_id: item.id,
          name: getProductName(item),
          price: getProductPrice(item),
          quantity: Number(item.quantity || 1),
          subtotal: getItemTotal(item)
        })),
        total_amount: totalCompra,
        total_items: totalItems,
        user_info: {
          name: userData?.nombre || userData?.name || userData?.first_name || userName,
          email: userData?.email || '',
          phone: userData?.telefono || userData?.phone || '',
          address: userData?.direccion || userData?.address || ''
        },
        order_date: new Date().toISOString(),
        payment_method: 'online', // Por defecto
        status: 'pending'
      };
      
      console.log('💳 Procesando pago con datos:', orderData);
      
    
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Limpiar el carrito después del pago exitoso
      dispatch({ type: 'CLEAR_CART' });
      
      // Limpiar todos los storage
      localStorage.removeItem('cartItems');
      sessionStorage.removeItem('checkoutItems');
      
      setOrderComplete(true);
      showSuccessMessage('¡Pago procesado exitosamente!');
      
    } catch (error) {
      console.error('❌ Error procesando pago:', error);
      showErrorMessage('Error al procesar el pago. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Funciones de notificación
  const showNotification = (message, type = 'success') => {
    const colors = {
      success: '#4CAF50',
      error: '#f44336',
      warning: '#ff9800'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${colors[type]};
      color: white;
      padding: 12px 20px;
      border-radius: 5px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 1000;
      font-family: Arial, sans-serif;
      transform: translateY(-100px);
      transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    requestAnimationFrame(() => {
      notification.style.transform = 'translateY(0)';
    });
    
    setTimeout(() => {
      notification.style.transform = 'translateY(-100px)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  const showSuccessMessage = (message) => showNotification(message, 'success');
  const showErrorMessage = (message) => showNotification(message, 'error');

  if (loading || userLoading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center" style={{paddingTop: '50px'}}>
      <div className="relative">
        {/* Círculos de fondo animados */}
        <div className="absolute inset-0 -m-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Contenedor principal */}
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 text-center shadow-2xl">
          <div className="flex flex-col items-center space-y-8">
            {/* Spinner moderno */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animation-delay-300"></div>
              <div className="absolute inset-4 border-4 border-transparent border-t-pink-400 rounded-full animate-spin animation-delay-700"></div>
            </div>
            
            {/* Texto con animación */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white animate-pulse">
                Cargando datos de compra
              </h2>
              <p className="text-white/80 text-lg animate-bounce">
                {userLoading ? '🔐 Verificando información del usuario...' : '📦 Preparando tu pedido'}
              </p>
              
              {/* Barra de progreso animada */}
              <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-700 { animation-delay: 0.7s; }
      `}</style>
    </div>
  );
}

  // Si hay error cargando datos del usuario
  if (error) {
    return (
   <div style={{ padding: '20px', paddingTop: '70px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: '#fee',
          border: '2px solid #f44336',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#d32f2f' }}>Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Si la orden está completa, mostrar confirmación
  if (orderComplete) {
  return (
    <div style={{ 
      padding: '20px', 
      paddingTop: '70px',
      maxWidth: '900px', 
      margin: '0 auto', 
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        border: '3px solid #4CAF50',
        borderRadius: '20px',
        padding: '50px',
        marginBottom: '40px',
        boxShadow: '0 20px 60px rgba(76, 175, 80, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Efecto de brillo animado */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          animation: 'shine 3s infinite',
          pointerEvents: 'none'
        }}></div>
        
        {/* Icono de éxito mejorado */}
        <div style={{
          position: 'relative',
          display: 'inline-block',
          marginBottom: '30px'
        }}>
          <div style={{
            fontSize: '80px',
            color: '#4CAF50',
            marginBottom: '20px',
            textShadow: '0 4px 8px rgba(76, 175, 80, 0.3)',
            animation: 'bounce 2s infinite'
          }}>✓</div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120px',
            height: '120px',
            border: '3px solid #4CAF50',
            borderRadius: '50%',
            opacity: '0.3',
            animation: 'pulse 2s infinite'
          }}></div>
        </div>
        
        <h1 style={{
          color: '#4CAF50',
          marginBottom: '25px',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          ¡Compra Exitosa!
        </h1>
        
        <div style={{
          backgroundColor: '#f8fffe',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '20px',
          border: '1px solid #e8f5e8'
        }}>
          <p style={{
            fontSize: '20px',
            marginBottom: '15px',
            color: '#2e7d32',
            fontWeight: '600'
          }}>
            🎉 Gracias por tu compra, {userData?.nombre || userData?.name || userData?.first_name || userName}
          </p>
          <p style={{
            fontSize: '16px',
            color: '#555',
            marginBottom: '10px'
          }}>
            Tu pedido ha sido procesado correctamente.
          </p>
          <p style={{
            fontSize: '16px',
            color: '#555'
          }}>
            <strong> Fecha:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Información de envío mejorada */}
        {(userData?.direccion || userData?.address) && (
          <div style={{
            marginTop: '30px',
            padding: '25px',
            backgroundColor: '#f1f8e9',
            borderRadius: '15px',
            textAlign: 'left',
            border: '2px solid #c8e6c9',
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.1)'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              color: '#2e7d32',
              fontSize: '1.3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              🚚 Información de Envío:
            </h3>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <p style={{
                margin: '0',
                padding: '10px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <span style={{ fontSize: '18px' }}>📍</span>
                <strong>Dirección:</strong> {userData?.direccion || userData?.address}
              </p>
              
              {(userData?.telefono || userData?.phone) && (
                <p style={{
                  margin: '0',
                  padding: '10px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <span style={{ fontSize: '18px' }}>📱</span>
                  <strong>Teléfono:</strong> {userData?.telefono || userData?.phone}
                </p>
              )}
              
              <p style={{
                margin: '0',
                padding: '10px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <span style={{ fontSize: '18px' }}>📧</span>
                <strong>Email:</strong> {userData?.email}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botones mejorados */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <button 
          onClick={() => navigate('/catalogo')}
          style={{
            padding: '15px 35px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)',
            transition: 'all 0.3s ease',
            transform: 'translateY(0)',
            minWidth: '160px'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(76, 175, 80, 0.4)';
            e.target.style.backgroundColor = '#45a049';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.3)';
            e.target.style.backgroundColor = '#4CAF50';
          }}
        >
          🛍️ Volver a la tienda
        </button>
        
        <button 
          onClick={() => window.print()}
          style={{
            padding: '15px 35px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 6px 20px rgba(33, 150, 243, 0.3)',
            transition: 'all 0.3s ease',
            transform: 'translateY(0)',
            minWidth: '160px'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(33, 150, 243, 0.4)';
            e.target.style.backgroundColor = '#1976D2';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 6px 20px rgba(33, 150, 243, 0.3)';
            e.target.style.backgroundColor = '#2196F3';
          }}
        >
          🖨️ Imprimir Recibo
        </button>
        
        <button 
          onClick={() => navigate('/Resena')}
          style={{
            padding: '15px 35px',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 6px 20px rgba(255, 152, 0, 0.3)',
            transition: 'all 0.3s ease',
            transform: 'translateY(0)',
            minWidth: '160px'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.4)';
            e.target.style.backgroundColor = '#F57C00';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 6px 20px rgba(255, 152, 0, 0.3)';
            e.target.style.backgroundColor = '#FF9800';
          }}
        >
          ⭐ Dejar Reseña
        </button>
      </div>

      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes shine {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
            Finalizar Compra
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Información del usuario */}
      {userData && (
  <div className="mb-8 transform transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2">
    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden group">
      {/* Efecto de brillo animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
      
      {/* Header con gradiente dinámico */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Información del Cliente</h2>
              <p className="text-white/80 text-sm">Datos verificados y seguros</p>
            </div>
          </div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
        </div>
      </div>
      
      {/* Contenido con efectos glassmorphism */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { label: 'NOMBRE', value: userData.nombre || userData.name || userData.first_name || 'No especificado', icon: '👤', color: 'from-emerald-500 to-teal-500' },
            { label: 'EMAIL', value: userData.email || 'No especificado', icon: '📧', color: 'from-blue-500 to-cyan-500' },
            { label: 'TELÉFONO', value: userData.telefono || userData.phone || 'No especificado', icon: '📱', color: 'from-purple-500 to-pink-500' },
            { label: 'DIRECCIÓN', value: userData.direccion || userData.address || 'No especificada', icon: '📍', color: 'from-orange-500 to-red-500' }
          ].map((field, index) => (
            <div key={field.label} className="group/item relative">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${field.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover/item:rotate-12 transition-transform duration-300`}>
                    {field.icon}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-gray-500 tracking-wider">{field.label}</span>
                      <div className="w-8 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 group-hover/item:text-gray-900 transition-colors">
                      {field.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Advertencia mejorada */}
        {(!userData.direccion && !userData.address) && (
          <div className="mt-8 relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-10"></div>
            <div className="relative bg-amber-50/80 backdrop-blur-sm border-l-4 border-amber-400 p-6 rounded-r-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center animate-bounce">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-amber-800 font-bold text-lg">¡Atención!</p>
                    <p className="text-amber-700">No tienes una dirección de envío registrada</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/profile')}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
                >
                  Actualizar Perfil
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}
        {/* Verificar si hay productos */}
        {purchasedItems.length === 0 ? (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="relative max-w-lg mx-auto">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white/50">
        {/* Icono 3D animado */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl transform rotate-6 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform -rotate-6 animate-pulse animation-delay-500"></div>
            <div className="relative w-32 h-32 bg-white rounded-3xl flex items-center justify-center text-6xl shadow-2xl transform hover:scale-110 transition-transform duration-500 cursor-pointer">
              🛒
            </div>
          </div>
          
          {/* Partículas flotantes */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Tu carrito está vacío
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-md mx-auto">
            ¡Hora de llenar tu carrito con productos increíbles! 
            <span className="text-2xl ml-2">✨</span>
          </p>
          
          {/* Botones con efectos especiales */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button 
              onClick={() => navigate('/')}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <span>🚀</span>
                <span>Explorar Tienda</span>
              </div>
            </button>
            
            <button 
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gray-500/25"
            >
              ← Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de productos - 2 columnas */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Productos ({totalItems})
                  </h2>
                </div>
                
                <div className="p-6 space-y-4">
                  {purchasedItems.map((item, index) => {
                    const productName = getProductName(item);
                    const productPrice = getProductPrice(item);
                    const productImage = getProductImage(item);
                    const itemTotal = getItemTotal(item);
                    const quantity = Number(item.quantity || 1);

                    return (
                      <div 
                        key={`purchase-item-${item.id || index}`}
                        className="group bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
                      >
                        <div className="flex gap-4">
                          {/* Imagen del producto */}
                          <div className="w-20 h-20 flex-shrink-0 relative overflow-hidden rounded-lg">
                            {productImage ? (
                              <img 
                                src={productImage} 
                                alt={productName}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div 
                              className={`w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 ${productImage ? 'hidden' : 'flex'} items-center justify-center text-gray-500 text-xs font-medium`}
                            >
                              Sin imagen
                            </div>
                          </div>

                          {/* Información del producto */}
                          <div className="flex-1 space-y-2">
                            <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-green-600 transition-colors duration-200">
                              {productName}
                            </h3>
                            
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-gray-600">Precio: </span>
                                <span className="font-semibold text-gray-800">${productPrice.toFixed(2)}</span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                <span className="text-gray-600">Cantidad: </span>
                                <span className="font-semibold text-gray-800">{quantity}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span className="text-gray-600 text-sm">Subtotal: </span>
                              <span className="font-bold text-green-600 text-lg">${itemTotal.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Resumen de compra - 1 columna */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Resumen
                    </h2>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Productos</span>
                        <span className="font-semibold text-gray-800">{totalItems}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold text-gray-800">${totalCompra.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Envío</span>
                        <span className="font-semibold text-green-600">Gratis</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 bg-green-50 -mx-6 px-6 rounded-lg">
                        <span className="text-lg font-bold text-gray-800">Total</span>
                        <span className="text-2xl font-bold text-green-600">${totalCompra.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <button 
                        onClick={handlePayment}
                        disabled={loading}
                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                          loading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          {loading ? (
                            <>
                              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>Procesando...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                              <span>Procesar Pago</span>
                            </>
                          )}
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => window.history.back()}
                        className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                      >
                        Volver al Carrito
                      </button>
                    </div>
                    
                    {/* Métodos de pago aceptados */}
                    <div className="pt-4 border-t border-gray-100">
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Conectar con Redux para obtener los items del carrito
const mapStateToProps = (state) => ({
  cartItems: state.cart?.items || [],
});

export default connect(mapStateToProps)(CheckoutPanel);