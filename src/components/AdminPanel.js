import { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Obtener el token del localStorage (ajusta según tu implementación)
  const getToken = () => {
    return localStorage.getItem('authToken') || '';
  };

  // Función para cargar usuarios
  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/users/');
      
      if (response.ok) {
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      } else {
        setMensaje('Error al cargar usuarios');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error de conexión al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  // Función para cargar productos
  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/products/', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } else {
        setMensaje('Error al cargar productos');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error de conexión al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar usuario
  const deleteUser = async (userId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMensaje('Usuario eliminado exitosamente');
        loadUsers();
      } else {
        setMensaje('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error de conexión al eliminar usuario');
    }
  };

  // Función para eliminar producto
  const deleteProduct = async (productId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/products/${productId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMensaje('Producto eliminado exitosamente');
        loadProducts();
      } else {
        setMensaje('Error al eliminar producto');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error de conexión al eliminar producto');
    }
  };

  // Cargar datos al cambiar de tab
  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    } else {
      loadProducts();
    }
  }, [activeTab]);

  // Filtrar datos según el término de búsqueda
  const filteredUsers = users.filter(user => 
    (user.nombre && user.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredProducts = products.filter(product => 
    (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.nombre && product.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 pt-20 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white border-4 border-green-500 shadow-2xl rounded-2xl p-6 mb-6 animate-slide-down">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-green-800 mb-4 sm:mb-0 animate-fade-in-up">
              Panel de Administración - EcoMarket
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-4 border-green-500 shadow-2xl rounded-2xl p-6 animate-slide-up">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-3 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'users'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Gestión de Usuarios
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-3 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'products'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Gestión de Productos
            </button>
          </div>

          {/* Barra de búsqueda */}
          <div className="mb-6">
            <input
              type="text"
              placeholder={`Buscar ${activeTab === 'users' ? 'usuarios' : 'productos'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 border-2 border-green-300 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300 text-gray-700 placeholder-gray-500 transform focus:scale-105 hover:shadow-lg"
            />
          </div>

          {/* Mensaje de estado */}
          {mensaje && (
            <div
              className={`mb-6 p-4 rounded-xl text-center font-medium border-2 transform transition-all duration-500 animate-slide-in-up ${
                mensaje.toLowerCase().includes('error')
                  ? 'bg-red-50 border-red-300 text-red-700'
                  : 'bg-green-50 border-green-300 text-green-700'
              }`}
            >
              {mensaje}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600"></div>
            </div>
          )}

          {/* Contenido de Usuarios */}
          {activeTab === 'users' && !loading && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Usuarios ({filteredUsers.length})
              </h2>
              
              {filteredUsers.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No se encontraron usuarios</p>
              ) : (
                <div className="grid gap-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="mb-2 sm:mb-0">
                          <h3 className="font-bold text-blue-800">
                            {user.nombre || user.name || 'Sin nombre'}
                          </h3>
                          <p className="text-blue-600">{user.email}</p>
                          <p className="text-sm text-gray-600">ID: {user.id}</p>
                        </div>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Contenido de Productos */}
          {activeTab === 'products' && !loading && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                Productos ({filteredProducts.length})
              </h2>
              
              {filteredProducts.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No se encontraron productos</p>
              ) : (
                <div className="grid gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-300 p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="mb-2 sm:mb-0">
                          <h3 className="font-bold text-purple-800">
                            {product.title || product.nombre || product.name || 'Sin nombre'}
                          </h3>
                          <p className="text-purple-600">
                            {product.description && product.description.length > 100
                              ? product.description.substring(0, 100) + '...'
                              : product.description || product.descripcion || 'Sin descripción'}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {product.price && (
                              <span className="bg-green-200 text-green-800 px-2 py-1 rounded-lg text-sm font-semibold">
                                ${product.price}
                              </span>
                            )}
                            {product.precio && (
                              <span className="bg-green-200 text-green-800 px-2 py-1 rounded-lg text-sm font-semibold">
                                ${product.precio}
                              </span>
                            )}
                            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg text-sm">
                              ID: {product.id}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        @keyframes slide-down {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.7s ease-out;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;