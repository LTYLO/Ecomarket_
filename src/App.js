import Error404 from 'containers/errors/Error404';
import Home from 'containers/pages/Home';
import store from './store';

import Footer from "components/footer";
import Navbar from "components/Navbar";
import Detalle from 'components/detalle';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Provider } from 'react-redux';

import Catalogo from 'containers/pages/Catalogo';
import Vender from 'containers/pages/Vender';
import Mis_Compras from 'containers/pages/Mis_Compras';
import Sing_Up from 'containers/pages/Sing_Up';
import Login from 'containers/pages/Login';


function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* Siempre visibles */}
        <Navbar />

        {/* Contenido dinámico */}
        <div className="pt-2 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detalle" element={<Detalle />} />
            <Route path="*" element={<Error404 />} />
      <Route path='/catalogo' element={<Catalogo />}/>
      <Route path='/vender' element={<Vender/>}/>
      <Route path='/mis_Compras' element={<Mis_Compras/>}/>
      <Route path='/registrarse' element={<Sing_Up/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/Home" element={<Home />} />
          </Routes>
        </div>

        {/* Siempre visible */}
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
