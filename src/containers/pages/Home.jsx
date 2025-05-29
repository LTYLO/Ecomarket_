import Layout from "hocs/layout/layout";
import Headers from "components/Header";
import Incentiv from "components/incentive";
import Insentivo from "components/twincentive";
import Carru from "components/carrusel";
import EducacionSos from "components/informacionesp";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Contenido principal */}
      <div className="flex-grow">
        <Layout>
          <Headers/>
          <Carru/>
          <Insentivo/>
          <Incentiv/>
          <EducacionSos/>
        </Layout>
      </div>

    </div>
  );
}

export default Home;
