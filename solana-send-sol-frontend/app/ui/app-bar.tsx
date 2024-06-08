'use client';

import styles from "@/app/ui/home.module.css";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function AppBar() {
    return (
        <div className="flex items-center justify-between p-0 bg-white shadow-md">
            <div className="flex items-center space-x-4">
                <div className={styles.AppHeader}>
                    <Image src="/solana-logo.png" width={200} height={30} alt="Solana Logo" />
                    <span className="text-lg font-bold">Wallet-Adapter Example</span>
                    <WalletMultiButton />
                </div>
            </div>
        </div>
    );
}
