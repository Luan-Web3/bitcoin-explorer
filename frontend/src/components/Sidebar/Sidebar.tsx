import "./Sidebar.css";

import React, { useCallback, useEffect, useState } from "react";

import api from "../../api/api";
import { formatDecimals } from "../../utils/formatDecimals";

const Sidebar = () => {
  const WALLET_DEFAULT = "bcrt1qxa9uhfyw885z7ce7z3hxj9fn62cq45e73fkj7q";
  const [wallet, setWallet] = useState<string>(WALLET_DEFAULT);
  const [balance, setBalance] = useState<number | null>(null);
  const [seeBalance, setSeeBalance] = useState<boolean>(false);
  const [warningBalance, setWarningBalance] = useState<string>("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet) {
        try {
          const response = await api.get(`/balance/${wallet}`);
          setBalance(response.data.balance);
          setSeeBalance(true);
        } catch (error) {
          setWarningBalance("Erro ao buscar saldo");
          setBalance(null);
        }
      } else {
        setBalance(null);
        setWarningBalance("Erro ao buscar saldo");
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

  const handleBalance = () => {
    setSeeBalance(!seeBalance);
  };

  return (
    <div className="sidebar">
      <div className="tools">
        <ul>
          <li>
            <h1 className="title">BitScan</h1>

            <h2>Confira seu Saldo</h2>
            <div className="info-actions">
              <input
                type="text"
                value={wallet}
                onChange={handleWalletValue}
                placeholder="Insira o endereço da carteira"
              />
            </div>

            <div className="info-content" onClick={handleBalance}>
              <span className="icon">💰</span> Saldo(
              <span className="sub">BTC</span>)
              <i
                className={
                  seeBalance ? "bx bx-chevron-up" : "bx bx-chevron-down"
                }
              ></i>
            </div>
            {seeBalance ? (
              balance ? (
                <h3 className="balance">{formatDecimals(balance)}</h3>
              ) : (
                warningBalance
              )
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
