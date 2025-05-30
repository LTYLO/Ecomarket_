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
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #4CAF50',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <h2>Cargando datos de compra...</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>
          {userLoading ? 'Verificando información del usuario...' : 'Preparando tu pedido'}
        </p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  // Si hay error cargando datos del usuario
  if (error) {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
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
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          backgroundColor: '#f8f9fa',
          border: '2px solid #4CAF50',
          borderRadius: '10px',
          padding: '40px',
          marginBottom: '30px'
        }}>
          <div style={{ fontSize: '60px', color: '#4CAF50', marginBottom: '20px' }}>✓</div>
          <h1 style={{ color: '#4CAF50', marginBottom: '20px' }}>¡Compra Exitosa!</h1>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>
            Gracias por tu compra, {userData?.nombre || userData?.name || userData?.first_name || userName}
          </p>
          <p>Tu pedido ha sido procesado correctamente.</p>
          <p><strong>Total pagado:</strong> ${totalCompra.toFixed(2)}</p>
          <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
          
          {/* Información de envío si está disponible */}
          {(userData?.direccion || userData?.address) && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: '#e8f5e8',
              borderRadius: '8px',
              textAlign: 'left'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#4CAF50' }}>Información de Envío:</h3>
              <p style={{ margin: '5px 0' }}>
                <strong>Dirección:</strong> {userData?.direccion || userData?.address}
              </p>
              {(userData?.telefono || userData?.phone) && (
                <p style={{ margin: '5px 0' }}>
                  <strong>Teléfono:</strong> {userData?.telefono || userData?.phone}
                </p>
              )}
              <p style={{ margin: '5px 0' }}>
                <strong>Email:</strong> {userData?.email}
              </p>
            </div>
          )}
        </div>
        
        <div>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '12px 30px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              marginRight: '10px'
            }}
          >
            Volver a la tienda
          </button>
          <button 
            onClick={() => window.print()}
            style={{
              padding: '12px 30px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Imprimir Recibo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Información del usuario */}
      {userData && (
        <div style={{
          marginBottom: '30px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}>
          <h2 style={{ marginBottom: '15px', color: '#333' }}>Información del Cliente</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <div>
              <p><strong>Nombre:</strong> {userData.nombre || userData.name || userData.first_name || 'No especificado'}</p>
              <p><strong>Email:</strong> {userData.email || 'No especificado'}</p>
            </div>
            <div>
              <p><strong>Teléfono:</strong> {userData.telefono || userData.phone || 'No especificado'}</p>
              <p><strong>Dirección:</strong> {userData.direccion || userData.address || 'No especificada'}</p>
            </div>
          </div>
          
          {/* Advertencia si faltan datos importantes */}
          {(!userData.direccion && !userData.address) && (
            <div style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '5px',
              color: '#856404'
            }}>
              <strong>⚠️ Nota:</strong> No tienes una dirección de envío registrada. 
              <button 
                onClick={() => navigate('/profile')}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#ffc107',
                  color: '#212529',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Actualizar Perfil
              </button>
            </div>
          )}
        </div>
      )}

      {/* Verificar si hay productos */}
      {purchasedItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🛒</div>
          <h2 style={{ marginBottom: '15px', color: '#666' }}>No hay productos en tu carrito</h2>
          <p style={{ marginBottom: '25px', color: '#888' }}>
            Parece que tu carrito está vacío. ¡Agrega algunos productos para continuar con tu compra!
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/')}
              style={{
                padding: '12px 24px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Ir a la tienda
            </button>
            <button 
              onClick={() => window.history.back()}
              style={{
                padding: '12px 24px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Volver
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Resumen de compra */}
          <div style={{ 
            marginBottom: '30px', 
            padding: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <h2>Resumen de tu Compra</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div>
                <p><strong>Total de productos:</strong> {totalItems}</p>
                <p><strong>Subtotal:</strong> ${totalCompra.toFixed(2)}</p>
              </div>
              <div>
                <p><strong>Envío:</strong> Gratis</p>
                <p style={{ fontSize: '18px', color: '#4CAF50' }}>
                  <strong>Total a pagar:</strong> ${totalCompra.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Lista de productos */}
          <div style={{ marginBottom: '30px' }}>
            <h2>Productos a Comprar</h2>
            
            {purchasedItems.map((item, index) => {
              const productName = getProductName(item);
              const productPrice = getProductPrice(item);
              const productImage = getProductImage(item);
              const itemTotal = getItemTotal(item);
              const quantity = Number(item.quantity || 1);

              return (
                <div 
                  key={`purchase-item-${item.id || index}`}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '15px',
                    display: 'flex',
                    gap: '15px',
                    backgroundColor: 'white'
                  }}
                >
                  {/* Imagen del producto */}
                  <div style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                    {productImage ? (
                      <img 
                        src={productImage} 
                        alt={productName}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '5px'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <div 
                      style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#f0f0f0',
                        display: productImage ? 'none' : 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '5px',
                        color: '#999',
                        fontSize: '12px'
                      }}
                    >
                      Sin imagen
                    </div>
                  </div>

                  {/* Información del producto */}
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
                      {productName}
                    </h3>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Precio unitario:</strong> ${productPrice.toFixed(2)}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Cantidad:</strong> {quantity}
                    </p>
                    <p style={{ margin: '5px 0', color: '#4CAF50', fontWeight: 'bold' }}>
                      <strong>Subtotal:</strong> ${itemTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total final y botón de pago */}
          <div style={{
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#4CAF50', fontSize: '24px', marginBottom: '20px' }}>
              Total a Pagar: ${totalCompra.toFixed(2)}
            </h3>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={handlePayment}
                disabled={loading}
                style={{
                  padding: '15px 30px',
                  backgroundColor: loading ? '#ccc' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                {loading ? 'Procesando...' : 'Procesar Pago'}
              </button>
              
              <button 
                onClick={() => window.history.back()}
                style={{
                  padding: '15px 30px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Volver al Carrito
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Conectar con Redux para obtener los items del carrito
const mapStateToProps = (state) => ({
  cartItems: state.cart?.items || [],
});

export default connect(mapStateToProps)(CheckoutPanel);