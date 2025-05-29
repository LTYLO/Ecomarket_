import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const UserProfile = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, isLoading: authLoading } = useAuth();
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('=== USERPROFILE USEEFFECT ===');
    console.log('AuthContext isLoading:', authLoading);
    console.log('AuthContext isLoggedIn:', isLoggedIn);
    console.log('Token en localStorage:', !!localStorage.getItem('authToken'));
    
    // ESPERAR a que AuthContext termine de verificar la autenticación
    
    
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
      
      // Diferentes formas de obtener el ID del usuario del token
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

      // Obtener el ID del usuario del token
      const userId = getUserIdFromToken(token);
      console.log('User ID from token:', userId);
      
      // Endpoints posibles para obtener el usuario específico
      const possibleEndpoints = [
        userId ? `http://localhost:8000/api/users/${userId}/` : null, // Con ID específico
      ].filter(Boolean); // Remover nulls

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
            // Otros errores (401, 403, etc.) son más serios
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
      if (Array.isArray(data)) {
        console.log('⚠️ Se recibió un array de usuarios, buscando el usuario correcto...');
        
        // Intentar encontrar el usuario correcto por ID
        if (userId) {
          const currentUser = data.find(user => 
            user.id === userId || 
            user.user_id === userId ||
            user.pk === userId
          );
          
   
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

 

  
    

  };

  // NUEVO: Mostrar loading mientras AuthContext verifica la autenticación
  

  // Mostrar loading mientras se cargan los datos del usuario
  

  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
      

        
        {/* Profile Card */}
        < className="bg-white rounded-lg shadow p-6 mb-6">
          {userData ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID de Usuario</label>
                <p className="text-gray-900">{userData.id || userData.user_id || userData.pk || 'No especificado'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <p className="text-gray-900">{userData.nombre || userData.name || userData.first_name || 'No especificado'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{userData.email || 'No especificado'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                <p className="text-gray-900">{userData.edad || userData.age ? `${userData.edad || userData.age} años` : 'No especificada'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <p className="text-gray-900">{userData.telefono || userData.phone || 'No especificado'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <p className="text-gray-900">{userData.direccion || userData.address || 'No especificada'}</p>
              </div>

            
        

        
        
    
  );
};

export default UserProfile;