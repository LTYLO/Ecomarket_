import Error404 from 'containers/errors/Error404';
import Error500 from 'containers/errors/Error500'; // Import the new Error500 component
import Error500_1 from 'containers/errors/Error500_login'; 
import Error500_2 from 'containers/errors/Error500_sing'; 
import Home from 'containers/pages/Home';
import store from './store';
import { AuthProvider } from 'components/AuthContext';
import Footer from "components/footer";
import Navbar from "components/Navbar";
import Detalle from 'components/detalle';
import Pagar from 'containers/pages/Pagar';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Provider } from 'react-redux';

import Catalogo from 'containers/pages/Catalogo';
import Vender from 'containers/pages/Vender';
import Mis_Compras from 'containers/pages/Mis_Compras';
import Sing_Up from 'containers/pages/Sing_Up';
import Login from 'containers/pages/Login';
import React, { useState } from 'react';


function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  return (
    <AuthProvider>
    <Provider store={store}>
      <Router>
        {/* Siempre visibles */}
        <Navbar />

        {/* Contenido dinámico */}
        <div className="pt-2 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detalle" element={<Detalle />} />
            <Route path="/Home" element={<Home />} />
            <Route path='/catalogo' element={<Catalogo />}/>
            <Route path='/vender' element={<Vender/>}/>
            <Route path='/mis_Compras' element={<Mis_Compras/>}/>
            <Route path='/registrarse' element={<Sing_Up/>}/>
            <Route path='/login' element={<Login/>}/>
             <Route path='/Pagar' element={<Pagar/>}/>
            
            {/* Error pages */}
            <Route path="/error/500" element={<Error500 />} />
            <Route path="/error/500_login" element={<Error500_1 />} />
            <Route path="/error/500_sing" element={<Error500_2 />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>

        {/* Siempre visible */}
        <Footer />
      </Router>
    </Provider>
    </AuthProvider>
  );
}

export default App;