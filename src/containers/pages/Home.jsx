import Layout from "hocs/layout/layout";
import Headers from "components/Header";
import Incentiv from "components/incentive";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Contenido principal */}
      <div className="flex-grow">
        <Layout>
          <Headers />
          <Incentiv />
        </Layout>
      </div>

    </div>
  );
}

export default Home;
