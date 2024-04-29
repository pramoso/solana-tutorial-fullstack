import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
    const connection = new Connection(clusterApiUrl('devnet'));
    return connection.getBalance(address);
}

async function getBalanceUsingJSONRPC(address: string): Promise<number> {
    const url = clusterApiUrl('devnet');
    console.log(url);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getBalance',
            params: [address],
        }),
    })
    .then((response) => response.json())
    .then((json) => {
        if (json.error) {
            throw json.error;
        }
        return json['result']['value'] as number;
    })
    .catch( (error) => {
        throw error;
    })
}

const publicKey = new PublicKey('ALEKau1KQdrMva95BtuM4Whc2mc79qntYYaobA1y9f4e')

getBalanceUsingWeb3(publicKey).then((balance) => {
    console.log('Balance:', balance / LAMPORTS_PER_SOL);
});

getBalanceUsingJSONRPC(publicKey.toBase58()).then((balance) => {
    console.log('Balance:', balance / LAMPORTS_PER_SOL);
});