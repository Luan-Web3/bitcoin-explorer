declare module 'bitcoin-core' {
    export interface ClientOptions {
        network: string;
        username: string;
        password: string;
        host: string;
        port: number;
        wallet: string;
    }

    export default class Client {
        constructor(options: ClientOptions);
        command<T = any>(method: string, ...params: any[]): Promise<T>;
        getBlockCount(): Promise<number>;
        getBlockHash(index: number): Promise<string>;
        getBlock(hash: string): Promise<any>;
        listTransactions(account: string, count: number, skip: number): Promise<any[]>;
    }
}
