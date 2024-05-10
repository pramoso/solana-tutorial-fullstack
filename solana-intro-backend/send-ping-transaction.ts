import * as web3 from "@solana/web3.js";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  airdropIfRequired,
} from "@solana-developers/helpers";

const payer = getKeypairFromEnvironment("SECRET_KEY");
const connection = new web3.Connection(
  web3.clusterApiUrl("devnet"),
  "confirmed"
);

const newBalance = await airdropIfRequired(
  connection,
  payer.publicKey,
  1 * web3.LAMPORTS_PER_SOL,
  0.5 * web3.LAMPORTS_PER_SOL
);

console.log("✅ Payer account balance is", newBalance / web3.LAMPORTS_PER_SOL);

const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PING_PROGRAM_DATA_ADRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

const pingProgramId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataAccount = new web3.PublicKey(PING_PROGRAM_DATA_ADRESS);

const transaction = new web3.Transaction();

const instruction = new web3.TransactionInstruction({
  keys: [
    {
      pubkey: pingProgramDataAccount,
      isSigner: false,
      isWritable: true,
    },
  ],
  programId: pingProgramId,
});

transaction.add(instruction);

const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [payer]
);

console.log(
  `✅ Sent ping transaction with signature https://solscan.io/tx/${signature}?cluster=devnet`
);
