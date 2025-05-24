import Layout from "hocs/layout/layout";
import Headers from "components/Header";
import Footer from "components/footer";
import Navbar from "components/Navbar";
import Incentiv from "components/incentive";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Contenido principal */}
      <div className="flex-grow">
        <Layout>
          <Navbar />
          <Headers />
          <Incentiv />
        </Layout>
      </div>

      {/* Footer al fondo */}
      <Footer />
    </div>
  );
}

export default Home;
