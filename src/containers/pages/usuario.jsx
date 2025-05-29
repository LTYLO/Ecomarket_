import Footer from "components/footer";
import Navbar from "components/Navbar";
import Layout from "hocs/layout/layout";
import UserProfile from "components/usuariomod"

function Usuario() {
  return (
    <Layout>
      <UserProfile  />
    </Layout>
  );
}

export default Usuario;
