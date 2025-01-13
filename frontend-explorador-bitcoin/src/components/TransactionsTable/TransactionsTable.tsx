import "./TransactionsTable.css";

import { mockTransactionsData } from "../../mocks/index";

const TransactionsTable = () => {
  return (
    <div className="transactions-table">
      <header>
        <h2>Últimas Transações</h2>
        <div>
          <input placeholder="Pesquise a transação pelo hash aqui" />
        </div>
      </header>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Hash</th>
              <th className="optional">Hora</th>
              <th>Quantidade</th>
              <th className="optional">Tipo</th>
              <th>Confirmações</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactionsData.map((transaction) => (
              <tr key={transaction.hash}>
                <td>{transaction.hash}</td>
                <td className="optional">{transaction.time}</td>
                <td>${transaction.amount}</td>
                <td className="optional">{transaction.type}</td>
                <td>{transaction.confirmations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
