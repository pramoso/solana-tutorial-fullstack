"use client";

import styles from "@/app/ui/home.module.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export default function SendSolForm() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [txSig, setTxSig] = useState<string>("");

    const link = () => {
        return txSig ? `https://solscan.io/tx/${txSig}?cluster=devnet` : "";
    };

    const sendSol = (event) => {
        event.preventDefault();
        if (!connection || !publicKey) return;

        const recipientAddress = event.target["recipient-address"].value;
        const amount = event.target["amount"].value;

        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new web3.PublicKey(recipientAddress),
                lamports: amount * LAMPORTS_PER_SOL,
            })
        );

        sendTransaction(transaction, connection).then((signature) => {
            setTxSig(signature);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
            {publicKey ? (
                <form onSubmit={sendSol} className={styles.form}>
                    <label className="text-lg font-bold">Send SOL to</label>
                    <input
                        className={styles.formField}
                        type="text"
                        id="recipient-address"
                        placeholder="Recipient Address"
                    />
                    <label className="text-lg font-bold">Amount (in SOL) to send</label>
                    <input className={styles.formField} type="text" id="amount" placeholder="Amount (SOL)" />
                    <button type="submit" className={styles.formButton}>
                        Send
                    </button>
                </form>
            ) : (
                <p>Please connect your wallet to send SOL</p>
            )}
            {txSig ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                    <p>Transaction Signature: {txSig}</p>
                    <a href={link()} className="text-blue-500">
                        View on SolScan
                    </a>
                </div>
            ) : null}
        </div>
    );
}
