import Head from "next/head";
import { Provider } from "react-redux";
import { useStore } from "../store";

const App = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Head>
        <title>Anon IIT-K</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel='shortcut icon' href='/favicon/favicon.ico' />
      </Head>
      <div className="container">
      <Component {...pageProps} />
      </div>
    </Provider>
  );
};

export default App;