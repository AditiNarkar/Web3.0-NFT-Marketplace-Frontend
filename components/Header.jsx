'use client';

import { ConnectButton } from "@web3uikit/web3";
import Link from "next/link";

export default function Header() {
    return (
        <nav style={{ display: "flex", width: "100vw", justifyContent: "space-evenly", alignItems: "center", height:"50px"}}>
            <Link href="/">NFT Marketplace</Link>
            <Link href="/sell-nft">Sell NFT</Link>
            <div style={{ paddingLeft: '20%' }}>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}