// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

// Aquí puedes agregar otros reducers que tengas
const rootReducer = combineReducers({
  cart: cartReducer,
  // Otros reducers aquí si los tienes...
  // user: userReducer,
  // products: productsReducer, etc.
});

export default rootReducer;