import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { User, Edit3, Save, X, Mail, Phone, MapPin, Calendar, Shield, Camera, Loader2 } from 'lucide-react';
import anim from 'assets/img/animplanta.gif';

const UserProfile = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, isLoading: authLoading } = useAuth();
  
  // Estados del componente original
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estados del componente de diseño
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    console.log('=== USERPROFILE USEEFFECT ===');
    console.log('AuthContext isLoading:', authLoading);
    console.log('AuthContext isLoggedIn:', isLoggedIn);
    console.log('Token en localStorage:', !!localStorage.getItem('authToken'));
    
    // Esperar a que AuthContext termine de verificar la autenticación
    if (authLoading) {
      return;
    }
    
    const token = localStorage.getItem('authToken');
    
    if (!token || !isLoggedIn) {
      console.log('No autenticado, redirigiendo al login...');
      navigate('/login');
      return;
    }
    
    console.log('Usuario autenticado, cargando datos...');
    fetchUserData();
  }, [authLoading, isLoggedIn, navigate]);

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

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('authToken');
      
      console.log('=== FETCH USER DATA ===');
      console.log('Token exists:', !!token);
      
      if (!token) {
        console.log('Token no encontrado en fetchUserData');
        logout();
        navigate('/login');
        return;
      }

      const userId = getUserIdFromToken(token);
      console.log('User ID from token:', userId);
      
      const possibleEndpoints = [
        userId ? `http://localhost:8000/api/users/${userId}/` : null,
      ].filter(Boolean);

      let response = null;
      let lastError = null;

      for (const endpoint of possibleEndpoints) {
        try {
          console.log(`Intentando endpoint: ${endpoint}`);
          response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          console.log(`${endpoint} - Status:`, response.status);

          if (response.ok) {
            console.log(`✅ Endpoint funcionando: ${endpoint}`);
            break;
          } else if (response.status === 404) {
            console.log(`❌ 404 en ${endpoint}, probando siguiente...`);
            continue;
          } else {
            lastError = { status: response.status, endpoint };
            break;
          }
        } catch (err) {
          console.log(`❌ Error de red en ${endpoint}:`, err.message);
          lastError = { error: err.message, endpoint };
          continue;
        }
      }

      if (!response || !response.ok) {
        if (lastError && lastError.status === 401) {
          console.log('Token inválido o expirado');
          logout();
          navigate('/login');
          return;
        }
        
        throw new Error(
          lastError 
            ? `Error ${lastError.status || 'de conexión'} en ${lastError.endpoint}`
            : 'Ningún endpoint de usuario específico disponible. El backend debe implementar un endpoint como /api/user/profile/ o /api/users/me/'
        );
      }

      const data = await response.json();
      console.log('✅ Datos del usuario cargados:', data);
      
      // Si recibimos un array, intentar encontrar el usuario correcto
      if (Array.isArray(data) && userId) {
        const currentUser = data.find(user => 
          user.id === userId || 
          user.user_id === userId ||
          user.pk === userId
        );
        
        if (currentUser) {
          setUserData(currentUser);
          setEditData({
            name: currentUser.nombre || currentUser.name || currentUser.first_name || '',
            email: currentUser.email || '',
            phone: currentUser.telefono || currentUser.phone || '',
            address: currentUser.direccion || currentUser.address || ''
          });
        } else {
          throw new Error('Usuario no encontrado en la respuesta del servidor');
        }
      } else {
        setUserData(data);
        setEditData({
          name: data.nombre || data.name || data.first_name || '',
          email: data.email || '',
          phone: data.telefono || data.phone || '',
          address: data.direccion || data.address || ''
        });
      }
      
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message);
      
      if (err.message.includes('401') || err.message.includes('Token inválido')) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userId = getUserIdFromToken(token);
      
      const response = await fetch(`http://localhost:8000/api/users/${userId}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: editData.name,
          email: editData.email,
          telefono: editData.phone,
          direccion: editData.address
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        setIsEditing(false);
        console.log('✅ Datos actualizados correctamente');
      } else {
        throw new Error('Error al actualizar los datos');
      }
    } catch (err) {
      console.error('Error updating user data:', err);
      setError('Error al actualizar los datos');
    }
  };

  const handleCancel = () => {
    if (userData) {
      setEditData({
        name: userData.nombre || userData.name || userData.first_name || '',
        email: userData.email || '',
        phone: userData.telefono || userData.phone || '',
        address: userData.direccion || userData.address || ''
      });
    }
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Mostrar loading mientras AuthContext verifica la autenticación
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          <p className="text-green-600 text-center">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Mostrar loading mientras se cargan los datos del usuario
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          <p className="text-green-600 text-center">Cargando tu perfil...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si existe
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">
        <div className="bg-white/70 backdrop-blur-md border border-red-200 rounded-3xl p-6 shadow-xl max-w-md w-full mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error al cargar el perfil</h2>
            <p className="text-red-600 mb-4 text-sm">{error}</p>
            <div className="space-y-2">
              <button 
                onClick={fetchUserData}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-2xl font-medium hover:shadow-lg transition-all duration-300"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-2 sm:p-4 md:p-6 pt-20 sm:pt-24 md:pt-28">
      <div className="max-w-6xl mx-auto">
        {/* Header con efecto glassmorphism - Responsivo */}
        <div className="relative mb-6 md:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 rounded-2xl md:rounded-3xl opacity-10 blur-xl"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
                    <Camera className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Mi Perfil</h1>
                  <p className="text-green-600 font-medium text-sm md:text-base">Gestiona tu información personal</p>
                </div>
              </div>
              
              <div className="flex flex-row gap-2 w-full sm:w-auto">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl md:rounded-2xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm md:text-base flex-1 sm:flex-none"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Editar Perfil</span>
                    <span className="sm:hidden">Editar</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="flex items-center justify-center space-x-2 bg-gray-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl md:rounded-2xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm md:text-base flex-1 sm:flex-none"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl md:rounded-2xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm md:text-base flex-1 sm:flex-none"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Información del usuario - Layout Responsivo */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          {/* Columna izquierda */}
          <div className="space-y-4 md:space-y-6">
            {/* Información básica */}
            <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                Información Personal
              </h2>
              
              <div className="space-y-3 md:space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-green-600 mb-2">ID de Usuario</label>
                  <div className="flex items-center p-3 bg-green-50/50 rounded-xl md:rounded-2xl">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-800 font-medium text-sm md:text-base truncate">
                      {userData?.id || userData?.user_id || userData?.pk || 'No especificado'}
                    </span>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-green-600 mb-2">Nombre Completo</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 border border-green-200 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                      placeholder="Ingresa tu nombre completo"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-green-50/50 rounded-xl md:rounded-2xl group-hover:bg-green-50 transition-colors">
                      <User className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-800 font-medium text-sm md:text-base truncate">
                        {userData?.nombre || userData?.name || userData?.first_name || 'No especificado'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-green-600 mb-2">Correo Electrónico</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 border border-green-200 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                      placeholder="correo@ejemplo.com"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-green-50/50 rounded-xl md:rounded-2xl group-hover:bg-green-50 transition-colors">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-800 text-sm md:text-base truncate">{userData?.email || 'No especificado'}</span>
                    </div>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-green-600 mb-2">Teléfono</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 border border-green-200 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                      placeholder="+57 300 123 4567"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-green-50/50 rounded-xl md:rounded-2xl group-hover:bg-green-50 transition-colors">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-800 text-sm md:text-base">{userData?.telefono || userData?.phone || 'No especificado'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ubicación y datos adicionales */}
            <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                Ubicación y Datos
              </h2>
              
              <div className="space-y-3 md:space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-green-600 mb-2">Dirección</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 border border-green-200 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                      placeholder="Calle 123 #45-67, Ciudad"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-green-50/50 rounded-xl md:rounded-2xl group-hover:bg-green-50 transition-colors">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-800 text-sm md:text-base">{userData?.direccion || userData?.address || 'No especificada'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-4 md:space-y-6">
            {/* Información motivacional */}
            <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                Crece con nosotros
              </h2>
              
              <div className="space-y-4">
                <img
                  src={anim}
                  alt="Animación representativa"
                  className="rounded-lg md:rounded-xl shadow-lg w-full h-auto max-h-64 md:max-h-80 object-cover"
                />
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                Actividad de la Cuenta
              </h2>
              
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="text-center p-3 md:p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl md:rounded-2xl text-white">
                  <div className="text-xl md:text-2xl font-bold">2.5k</div>
                  <div className="text-green-100 text-xs md:text-sm">Interacciones</div>
                </div>
                <div className="text-center p-3 md:p-4 bg-gradient-to-br from-green-400 to-green-500 rounded-xl md:rounded-2xl text-white">
                  <div className="text-xl md:text-2xl font-bold">48</div>
                  <div className="text-green-100 text-xs md:text-sm">Días Activo</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer informativo */}
        {!isEditing && (
          <div className="mt-6 md:mt-8 bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-600 text-sm md:text-base">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
                <p className="text-xs md:text-sm text-green-600">Tu información está protegida y segura</p>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <Shield className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base">Verificado</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;