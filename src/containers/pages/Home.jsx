import Layout from "hocs/layout/layout";

function Home() {
  return (
    <Layout>

      <main className="flex-grow pt-[64px] px-4">
        <h1 className="text-2xl font-bold mb-4">Inicio</h1>
        <p>Aquí va el contenido principal de tu página.</p>
      </main>
      
    </Layout>
  );
}

export default Home;
