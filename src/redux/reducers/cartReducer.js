// src/redux/cartReducer.js
const initialState = {
  items: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = action.payload;
      
      // Verificar si el producto ya existe en el carrito
      const existingItemIndex = state.items.findIndex(item => 
        item.id === newItem.id || item.productId === newItem.id
      );
      
      if (existingItemIndex >= 0) {
        // Si ya existe, incrementar la cantidad
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        
        console.log('🔄 Producto existente, cantidad incrementada:', updatedItems[existingItemIndex]);
        
        return {
          ...state,
          items: updatedItems
        };
      } else {
        // Si no existe, agregarlo al carrito
        const itemToAdd = { ...newItem, quantity: 1 };
        console.log('➕ Nuevo producto agregado al carrito:', itemToAdd);
        
        return {
          ...state,
          items: [...state.items, itemToAdd]
        };
      }
    
    case 'REMOVE_FROM_CART':
      const productIdToRemove = action.payload;
      console.log('🗑️ Eliminando producto con ID:', productIdToRemove);
      
      const filteredItems = state.items.filter(item => 
        item.id !== productIdToRemove && item.productId !== productIdToRemove
      );
      
      console.log('✅ Items después de eliminar:', filteredItems);
      
      return {
        ...state,
        items: filteredItems
      };
    
    case 'UPDATE_CART_QUANTITY':
      const { productId, quantity } = action.payload;
      console.log('🔢 Actualizando cantidad - ID:', productId, 'Cantidad:', quantity);
      
      if (quantity <= 0) {
        // Si la cantidad es 0 o menor, eliminar el producto
        return {
          ...state,
          items: state.items.filter(item => 
            item.id !== productId && item.productId !== productId
          )
        };
      }
      
      const updatedItems = state.items.map(item => {
        if (item.id === productId || item.productId === productId) {
          return { ...item, quantity };
        }
        return item;
      });
      
      console.log('✅ Items después de actualizar cantidad:', updatedItems);
      
      return {
        ...state,
        items: updatedItems
      };
    
    case 'CLEAR_CART':
      console.log('🧹 Limpiando carrito completo');
      return {
        ...state,
        items: []
      };
    
    case 'UPDATE_CART_ITEM':
      // Acción de respaldo para compatibilidad con código anterior
      const { index, updates } = action.payload;
      
      if (index < 0 || index >= state.items.length) {
        console.error('❌ Índice inválido para actualizar:', index);
        return state;
      }
      
      const updatedItemsArray = [...state.items];
      updatedItemsArray[index] = { ...updatedItemsArray[index], ...updates };
      
      console.log('🔄 Item actualizado por índice:', updatedItemsArray[index]);
      
      return {
        ...state,
        items: updatedItemsArray
      };
    
    default:
      return state;
  }
};

export default cartReducer;