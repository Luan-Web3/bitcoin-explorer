import "./Sidebar.css";

import { useCallback, useEffect, useState } from "react";

const Sidebar = () => {
  const [wallet, setWallet] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null); 

  useEffect(() => {
    const checkBalance = () => {
      if (wallet === "0x1") {
        setBalance(3200);
      } else if (wallet !== "") {
        setBalance(2500);
      } else {
        setBalance(null);
      }
    };

    checkBalance();
  }, [wallet]);

  const handleWalletValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setWallet(e.target.value);
    },
    []
  );

  const formatCurrency = (value: number | null) => {
    if (value === null) {
      return "...";
    }

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="sidebar">
      <div className="tools">
        <ul>
          <li>
            <h2>Confira seu Saldo</h2>
            <div className="info-actions">
              <input type="text" value={wallet} onChange={handleWalletValue} />
            </div>

            <div className="info-content">
              <span className="icon">💰</span> Saldo:{" "}
              <h2 className="balance">{formatCurrency(balance)}</h2>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
