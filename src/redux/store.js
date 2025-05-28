// src/redux/store.js
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer'; // Usar tu rootReducer existente

// Función para cargar el estado del localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error cargando estado del localStorage:', err);
    return undefined;
  }
};

// Función para guardar el estado en localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      cart: state.cart // Solo guardamos el carrito
    });
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    console.error('Error guardando estado en localStorage:', err);
  }
};

// Cargar estado inicial del localStorage
const persistedState = loadState();

// Crear store
const store = createStore(
  rootReducer,
  persistedState,
  // Redux DevTools Extension si está disponible
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Suscribirse a cambios del store para guardar en localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;