// @ts-ignore
import Client from 'bitcoin-core';

const bitcoinClient = new Client({
    network: 'regtest',
    username: process.env.RPC_USER || '',
    password: process.env.RPC_PASSWORD || '',
    host: process.env.RPC_HOST || '129.148.59.60',
    port: parseInt(process.env.RPC_PORT || '18443', 10),
});

export default bitcoinClient;
