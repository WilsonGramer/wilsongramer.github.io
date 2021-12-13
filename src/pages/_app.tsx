import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Footer from "../components/footer";
import Header from "../components/header";
import "../helpers/wipple";
import "../styles/globals.css";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <link
                href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
                rel="stylesheet"
            />
        </Head>

        <ThemeProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </ThemeProvider>
    </>
);

export default MyApp;
