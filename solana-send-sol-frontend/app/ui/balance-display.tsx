"use client";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function BalanceDisplay() {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        if (!connection || !publicKey) {
            return;
        }

        connection.onAccountChange(
            publicKey,
            (updatedAccountInfo) => {
                setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
            },
            "confirmed"
        );

        connection.getAccountInfo(publicKey).then((accountInfo) => {
            if (accountInfo) {
                setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
            }
        });
    }, [connection, publicKey]);

    return (
        <div>
            <p> {publicKey ? `Balance: ${balance} SOL` : ""}</p>
        </div>
    );
}
