Explorer Bitcoin Api
===========================

![GitHub repo size](https://img.shields.io/github/repo-size/dev-araujo/explorer-btc?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/dev-araujo/explorer-btc?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/dev-araujo/explorer-btc?style=for-the-badge)

API designed to function as a block explorer, connecting to a Bitcoin node in regtest mode. The node runs in a Docker environment hosted on Oracle Cloud. The solution provides endpoints for querying and interacting with the blockchain, enabling simulations and tests in a controlled and secure environment.

## Prerequisites

Before you begin, make sure you meet the following requirements:

- [Node 18.20^](https://nodejs.org/pt/download)

## Instalation

```
git clone https://github.com/dev-araujo/explorer-btc.git
```

```
cd explorer-btc/server/
```

```
npm install
```

## Running

- Duplicate the `.env.template` file and rename it to `.env`

```
npm run dev
```

## Examples

### `GET /api/health`
Returns the health status of the server and the connection to the Bitcoin node.
### `GET /api/blocks`
Returns the most recently mined blocks from the Bitcoin node.
### `GET /api/blocks/:height`
Returns details of a specific block identified by its block height.
### `GET /api/transactions`
Returns a list of recent transactions made on the Bitcoin node.
### `GET /api/transactions/:txid`
Returns the details of a specific transaction identified by its transaction ID (txid).
### `GET /api/balance/:address`
Returns the balance of a specific wallet identified by its Bitcoin address.

## License

<sup>
Licensed under either of <a href="LICENSE-APACHE">Apache License, Version
2.0</a> or <a href="LICENSE-MIT">MIT license</a> at your option.
</sup>

<br>

<sub>
Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in this crate by you, as defined in the Apache-2.0 license, shall
be dual licensed as above, without any additional terms or conditions.
</sub>