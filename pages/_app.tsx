// import '../styles/globals.css'
// import type { AppProps } from 'next/app'

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Container>
                <Component {...pageProps} />
            </Container>
        </div>
    );
}

export default MyApp;
