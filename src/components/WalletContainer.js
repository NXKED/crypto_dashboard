import React, { useState, useEffect } from "react";
import WalletInfo from "./WalletInfo";
import { getAccountInfo } from "../utils/api";
import { initialWallets } from "../const";

const WalletContainer = () => {
  const [wallets, setWallets] = useState(initialWallets);
  const [totalLiquid, setTotalLiquid] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalLiquid = async () => {
      let totalLiq = 0;

      for (const wallet of wallets) {
        try {
          const { core_liquid_balance } = await getAccountInfo(wallet);
          totalLiq += parseFloat(core_liquid_balance);
        } catch (error) {
          console.error(`Error fetching acc info for ${wallet}: `, error);
        }
      }

      setTotalLiquid(totalLiq);
      setLoading(false);
    };

    fetchTotalLiquid();
  }, [wallets]);

  return (
    <div>
      <div id="wallet-showcase">
        {wallets.map((wallet) => (
          <WalletInfo key={wallet} accountName={wallet} />
        ))}
      </div>
      <div id="wallet-total">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>Total Liquid: {totalLiquid.toFixed(0)} $Wax</p>
        )}
      </div>
    </div>
  );
};

export default WalletContainer;
