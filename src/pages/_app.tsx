import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

import Layout from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <>
          <NextNProgress color="#00FF00" />

          <Component {...pageProps} />
        </>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;