import Layout from "hocs/layout/layout";
import ProductList from "components/catalogo";

function Catalogo() {
  return (
    <Layout>

      <main className="flex-grow pt-[64px] px-4">
        <ProductList/>
      </main>

    </Layout>
  );
}

export default Catalogo;