import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../lib/theme";
import { Router, Route } from "../lib/pagex";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Router component={Component}>
        <Route path="/" enterDuration={700} exitDuration={700} />
        <Route path="/work" enterDuration={700} exitDuration={700} />
      </Router>
      {/* <Component {...pageProps} />{" "} */}
    </ChakraProvider>
  );
}
