import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// public ket to send funds to. Use argument to specify the public key
const suppliedToPubKey = process.argv[2] || null;
if (!suppliedToPubKey) {
  throw new Error("Please supply a public key to send funds to");
}

const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  "Sending funds from",
  senderKeyPair.publicKey.toBase58(),
  "to",
  suppliedToPubKey
);

const toPubKey = new PublicKey(suppliedToPubKey);

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("✅ Loaded our own keypair");
console.log("✅ Loaded the recipient public key");
console.log("✅ Connected to the devnet cluster");

const transaction = new Transaction();

const SOLANA_TO_SEND = 2;

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeyPair.publicKey,
  toPubkey: toPubKey,
  lamports: SOLANA_TO_SEND * LAMPORTS_PER_SOL,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeyPair,
]);
console.log(`✅ Sent ${SOLANA_TO_SEND} SOL to ${toPubKey.toBase58()}`);
console.log("✅ Transaction URL is", `https://solscan.io/tx/${signature}?cluster=devnet`);