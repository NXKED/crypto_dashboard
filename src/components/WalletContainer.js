import React, { useState, useEffect } from "react";
import WalletInfo from "./WalletInfo";
import { getAccountInfo } from "../utils/api";

const WalletContainer = () => {
  const initialWallets = ["p2wti.wam", "t.keg.wam", "nicotinamide", "bananamonkey", "plsdontrugme"];
  const [wallets, setWallets] = useState(initialWallets);
  const [totalLiquid, setTotalLiquid] = useState(0);

  useEffect(() => {
    const fetchTotalLiquid = async () => {
      let totalLiq = 0;

      for(const wallet of wallets) {
        try {
          const data = await getAccountInfo(wallet);
          totalLiq += parseFloat(data.core_liquid_balance);
        } catch (error) {
          console.error(`Error fetching acc info for ${wallet}: `, error);
        }
      }

      setTotalLiquid(totalLiq);
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
        <p>Total Liquid: {totalLiquid.toFixed(1)} $Wax</p>
      </div>
    </div>
  );
};


export default WalletContainer;