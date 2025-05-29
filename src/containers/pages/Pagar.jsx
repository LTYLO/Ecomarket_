import Layout from "hocs/layout/layout";
import Pago from "components/pago";

function Pagar() {
  return (
    <Layout>

      <main className="flex-grow pt-[64px] px-4">
        <Pago/>
      </main>

    </Layout>
  );
}

export default Pagar;    