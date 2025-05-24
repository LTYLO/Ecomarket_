import Error404 from 'containers/errors/Error404';
import Home from 'containers/pages/Home';
import store from './store';

import Footer from "components/footer";
import Navbar from "components/Navbar";
import Detalle from 'components/detalle';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Provider } from 'react-redux';


function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* Siempre visibles */}
        <Navbar />

        {/* Contenido dinámico */}
        <div className="pt-20 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detalle" element={<Detalle />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>

        {/* Siempre visible */}
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
