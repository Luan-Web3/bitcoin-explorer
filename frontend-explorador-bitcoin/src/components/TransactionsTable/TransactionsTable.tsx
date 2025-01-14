import "./TransactionsTable.css";

import React, { useEffect, useState } from "react";

import api from "../../api/api";
import { formatDecimals } from "../../utils/formatDecimals";
import { formatTimestamp } from "../../utils/formatTimestamp";
import paths from "../../api/paths";

interface Transaction {
  txid: string;
  blocktime: number;
  value: number;
  size: number;
  weight: number;
}

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLatestTransactions();
  }, []);

  const fetchLatestTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.get(paths["transactions"]);
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionByTxid = async (txid: string) => {
    try {
      setLoading(true);
      const response = await api.get(`${paths["transactions"]}/${txid}`);
      setTransactions([response.data]);
    } catch (error) {
      console.error("Erro ao buscar transação:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearch(searchText);

    if (searchText === "") {
      fetchLatestTransactions();
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search) {
      fetchTransactionByTxid(search);
    } else {
      fetchLatestTransactions();
    }
  };

  return (
    <div className="transactions-table">
      <header>
        <h2>Últimas Transações</h2>
        <form onSubmit={handleSearch}>
          <input
            disabled={loading}
            placeholder="Pesquise a transação pelo txid aqui e clique Enter"
            value={search}
            onChange={handleSearchChange}
          />
          <button type="submit" hidden>
            Pesquisar
          </button>
        </form>
      </header>
      {loading && <div className="loading">Carregando...</div>}
      <div className="table-container">
        {transactions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th className="optional">Data/Hora (Bloco)</th>
                <th>Valor (BTC)</th>
                <th className="optional">Tamanho</th>
                <th>Peso</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.txid}>
                  <td>{transaction.txid}</td>
                  <td className="optional">
                    {formatTimestamp(transaction?.blocktime)}
                  </td>
                  <td>{formatDecimals(transaction?.value)}</td>
                  <td className="optional">{transaction?.size}</td>
                  <td>{transaction?.weight}</td>
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
