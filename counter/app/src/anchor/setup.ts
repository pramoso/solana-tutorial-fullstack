import { IdlAccounts, Program, AnchorProvider } from "@coral-xyz/anchor";
import { Counter } from "./counter";
import IDL from "./idl.json";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
const programId = new PublicKey(IDL.address);
const programInterface = JSON.parse(JSON.stringify(IDL));
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const programProvider = new AnchorProvider(connection, programId, { commitment: "confirmed" });

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<Counter>(programInterface, programProvider);

// To derive a PDA, we need:
// - the seeds - think of this like an ID or key (in a key-value store)
// - the program address of the program the PDA belongs to

// This gives us the mintPDA that we'll reference when minting stuff
export const [mintPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("mint")],
  program.programId
);

// Similarly, derive a PDA for when we increment the counter, using "counter" as the seed
export const [counterPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("counter")],
  program.programId
);

// This is just a TypeScript type for the Counter data structure based on the IDL
// We need this so TypeScript doesn't yell at us
export type CounterData = IdlAccounts<Counter>["counter"];
