import Head from "next/head";
import Navbar from "../../../anoniitkfrontend/src/components/Navbar";
import Footer from "../../../anoniitkfrontend/src/components/Footer";

const Layout = ({ title, content, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <Navbar />
      <div className="container mt-5">{children}</div>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Anon IIT-K",
  content: "",
};

export default Layout;