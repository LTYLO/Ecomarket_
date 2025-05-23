import Error404 from 'containers/errors/Error404';
import Home from 'containers/pages/Home';
import store from './store';
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
    <Routes>
      {/* Error Display */}
      <Route path='*' element={<Error404/>}/>
      {/* Error Display */}
      <Route path='/home' element={<Home/>}/>
      <Route path='/catalogo' element={<Catalogo />}/>
      <Route path='/vender' element={<Vender/>}/>
      <Route path='/mis_Compras' element={<Mis_Compras/>}/>
      <Route path='/registrarse' element={<Sing_Up/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  </Router>
    </Provider>
 
  );
}

export default App;
