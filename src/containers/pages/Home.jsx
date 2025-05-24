import Layout from "hocs/layout/layout";
import Headers from "components/Header";
import Footer from "components/footer";
import Navbar from "components/Navbar";


function Home() {
  return (
    <Layout>
      <Navbar />

        <Headers/>

      <Footer />
    </Layout>
  );
}

export default Home;
