"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { MoralisProvider } from "react-moralis";
import Header from "@/components/Header";
// import { NotificationProvider } from "@web3uikit/core";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/81421/nft-marketplace/version/latest",
})
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      {/* <NotificationProvider> */}

      <ApolloProvider client={client}>
        <html lang="en">
          <body className={inter.className}>
            <h1 style={{ padding: "10px" }}>NFT Marketplace</h1>
            <hr></hr>
            <Header />
            <hr></hr>
            <main style={{ height: '100vh', top: '0px' }}>
              {children}
            </main>
          </body>
        </html>
      </ApolloProvider>
      {/* </NotificationProvider> */}

    </MoralisProvider>

  );
}
