import "./Sidebar.css";

import React, { useCallback, useEffect, useState } from "react";

import api from "../../api";
import { formatDecimals } from "../../utils/formatDecimals";

const Sidebar = () => {
  const WALLET_DEFAULT = "bcrt1qxa9uhfyw885z7ce7z3hxj9fn62cq45e73fkj7q";
  const [wallet, setWallet] = useState<string>(WALLET_DEFAULT);
  const [balance, setBalance] = useState<number|null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet) {
        try {
          const response = await api.get(`/balance/${wallet}`);
          setBalance(response.data.balance);
        } catch (error) {
          console.error("Erro ao buscar saldo:", error);
          setBalance(null);
        }
      } else {
        setBalance(null);
      }
    };

    fetchBalance();
  }, [wallet]);

  const handleWalletValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setWallet(e.target.value);
    },
    []
  );

  return (
    <div className="sidebar">
      <div className="tools">
        <ul>
          <li>
            <h2>Confira seu Saldo</h2>
            <div className="info-actions">
              <input
                type="text"
                value={wallet}
                onChange={handleWalletValue}
                placeholder="Insira o endereço da carteira"
              />
            </div>

            <div className="info-content">
              <span className="icon">💰</span> Saldo(
              <span className="sub">BTC</span>):
              <h3 className="balance">{formatDecimals(balance,4)}</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
