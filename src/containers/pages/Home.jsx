import Layout from "hocs/layout/layout";
import Headers from "components/Header";
import Incentiv from "components/incentive";
import Insentivo from "components/twincentive";
import Carru from "components/carrusel";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Contenido principal */}
      <div className="flex-grow">
        <Layout>
          <Headers/>
          <Carru/>
          <Incentiv/>
          <Insentivo/>
        </Layout>
      </div>

    </div>
  );
}

export default Home;
