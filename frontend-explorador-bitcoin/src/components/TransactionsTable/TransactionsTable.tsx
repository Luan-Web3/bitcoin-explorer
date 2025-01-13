import "./TransactionsTable.css";

import React, { useCallback, useEffect, useState } from "react";

import api from "../../api";
import { formatDecimals } from "../../utils/formatDecimals";
import { formatTimestamp } from "../../utils/formatTimestamp";

interface Transaction {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin: {
    coinbase?: string;
    txinwitness?: string[];
    sequence: number;
  }[];
  vout: {
    value: number;
    n: number;
    scriptPubKey: {
      asm: string;
      desc: string;
      hex: string;
      address?: string;
      type: string;
    };
  }[];
  hex: string;
  blockhash: string;
  confirmations: number;
  time: number;
  blocktime: number;
}

const TransactionsTable = () => {
  const HASH =
    "4a159f6434ec173ed8d39a8166c7fd4f65c362c43f724fe9cac9467029b929a2";
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState<string>(HASH);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions(HASH);
  }, []);

  const fetchTransactions = async (txid: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/transaction/${txid}`);
      setTransactions([response.data]);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value;
      setSearch(searchText);

      const delayDebounceFn = setTimeout(() => {
        fetchTransactions(searchText);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    },
    []
  );

  return (
    <div className="transactions-table">
      <header>
        <h2>Últimas Transações</h2>
        <div>
          <input
            disabled={loading}
            placeholder="Pesquise a transação pelo txid aqui"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </header>
      <div className="table-container">
        {transactions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>txid</th>
                <th className="optional">Data/Hora (Bloco)</th>
                <th>Valor (BTC)</th>
                <th className="optional">Tipo</th>
                <th>Confirmações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.txid}>
                  <td>{transaction.txid}</td>
                  <td className="optional">
                    {formatTimestamp(transaction.blocktime)}
                  </td>
                  <td>
                    {formatDecimals(
                      transaction.vout.reduce(
                        (total, output) => total + output.value,
                        0
                      )
                    )}
                  </td>
                  <td className="optional">
                    {transaction.vout[0]?.scriptPubKey.type}
                  </td>
                  <td>{transaction.confirmations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && (
            <div className="no-results">Transação não encontrada.</div>
          )
        )}
      </div>
    </div>
  );
};

export default TransactionsTable;
