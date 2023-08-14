import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

import Layout from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <>
        <NextNProgress color="#00FF00" />

        <Component {...pageProps} />
      </>
    </Layout>
  );
}

export default MyApp;