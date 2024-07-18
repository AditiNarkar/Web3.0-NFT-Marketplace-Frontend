'use client'

import styles from "./page.module.css";
import { useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox.jsx"
import networkMapping from "../constants/networkMapping.json"
import { useQuery } from "@apollo/client";
import GET_ACTIVE_ITEMS from "@/constants/subgraphQueries";
// import { useEffect } from "react";
// import { useWeb3React } from '@web3-react/core'

export default function Home() {
  //we will index off-chain and read from database as mapping has too much data
  // setup server to listen events fired and add to database
  // moralis -> centralized
  // graph -> decentralized

  const { isWeb3Enabled, chainId, enableWeb3 } = useMoralis()

  console.log("isWeb3Enabled:", isWeb3Enabled)


  // Add the simple check
  if (!isWeb3Enabled) {
    enableWeb3();
  }

  console.log("isWeb3EnabledAFTER:", isWeb3Enabled)

  console.log("chainId:", chainId)
  const chainString = chainId ? parseInt(chainId).toString() : "31337"
  console.log("Chain String: ", chainString)
  const NftMarketplace = networkMapping[chainString].NftMarketplace[0]

  const { loading, error, data: listedNFTs } = useQuery(GET_ACTIVE_ITEMS)
  console.log("listedNFTs", listedNFTs)
  console.log("loading: ", loading)
  return (
    <>
      <div className={styles.description}>
        Recently Listed
      </div>
      {isWeb3Enabled && chainId ? (
         !listedNFTs ? (
          <div>Loading...</div>
        ) : (
          listedNFTs.activeItems.map((nft) => {
            const { price, NFTaddress, tokenId, owner } = nft
            console.log("nft:", NFTaddress)
            return NFTaddress ? (
              <NFTBox
                price={price}
                nftAddress={NFTaddress}
                tokenId={tokenId}
                marketplaceAddress={NftMarketplace}
                seller={owner}
                key={`${NFTaddress}${tokenId}`}
              />
            ) : (
              <div>Network error, please switch to a supported network. </div>
            )
          })
        )
      ) : (
        <div>Web3 Currently Not Enabled</div>
      )}</>
  );

}
