import React, { useState } from 'react';
import { User, Edit3, Save, X, Mail, Phone, MapPin, Calendar, Shield, Camera } from 'lucide-react';
import anim from 'assets/img/animplanta.gif';

const UserProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+57 300 123 4567',
    address: 'Carrera 15 #45-32, Bucaramanga'
  });

  const [editData, setEditData] = useState({ ...userData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4 md:p-6 px-4 py-8 pt-24 mt-20" >
      <div className="max-w-4xl mx-auto">
        {/* Header con efecto glassmorphism */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 rounded-3xl opacity-10 blur-xl"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
                    <Camera className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Mi Perfil</h1>
                  <p className="text-green-600 font-medium">Gestiona tu información personal</p>
                </div>
              </div>
              
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Editar Perfil</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancelar</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información del usuario */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="space-y-6">
            {/* Información básica */}
            <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                Información Personal
              </h2>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-green-600 mb-2">Nombre Completo</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 border border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-green-50/50 rounded-2xl group-hover:bg-green-50 transition-colors">
                      <User className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-800 font-medium">{userData.name}</span>
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
                      className="w-full px-4 py-3 bg-white/50 border border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-green-50/50 rounded-2xl group-hover:bg-green-50 transition-colors">
                      <Mail className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-800">{userData.email}</span>
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
                      className="w-full px-4 py-3 bg-white/50 border border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-green-50/50 rounded-2xl group-hover:bg-green-50 transition-colors">
                      <Phone className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-800">{userData.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ubicación y fecha */}
            <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                Ubicación y Datos
              </h2>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-green-600 mb-2">Dirección</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 border border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-green-50/50 rounded-2xl group-hover:bg-green-50 transition-colors">
                      <MapPin className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-800">{userData.address}</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            {/* Información profesional */}
            <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                Crece con nosotros
              </h2>
              
              <div className="space-y-4">

                <img
                  src={anim}
                  alt="Animación representativa"
                  className="rounded-lg shadow-lg w-full max-w-[570px] h-auto"
                />

              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                Actividad de la Cuenta
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl text-white">
                  <div className="text-2xl font-bold">2.5k</div>
                  <div className="text-green-100 text-sm">Interacciones</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl text-white">
                  <div className="text-2xl font-bold">48</div>
                  <div className="text-green-100 text-sm">Días Activo</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con información adicional */}
        {!isEditing && (
          <div className="mt-8 bg-white/70 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-600">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
                <p className="text-sm text-green-600">Tu información está protegida y segura</p>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Verificado</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileSection;