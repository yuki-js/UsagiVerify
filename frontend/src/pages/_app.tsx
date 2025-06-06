"use client";

import "@/styles/globals.css";
import { Provider } from "jotai";
import type { AppProps } from "next/app";

/**
 * App Component
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
