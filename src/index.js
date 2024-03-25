import React, { useState, useEffect } from "react";
import WalletInfo from "./components/WalletInfo";
import ReactDOM from "react-dom";
import "./style.css";
import CryptoPrice from "./components/Blockchain";
import WalletContainer from "./components/WalletContainer";
import ReceivableTransactions from "./components/ReceivableTransactions";
import BanStats from "./components/BanStats";
import Pie from "./components/Pie";
import "chart.js/auto";
import GetBoomPowTx from "./components/BoomPow";
import dashImage from "./images/dash5.png";
import GetSlotsDist from "./components/slotAccountDist";

const App = () => {
  const [accountName, setAccountName] = useState("");

  const handleUpdatedAccountName = (newAccountName) => {
    console.log("Handling react updated account name:", newAccountName);
    setAccountName(newAccountName);
  };

  useEffect(() => {
    const inputElement = document.getElementById("walletInput");

    const handleInputChange = function (event) {
      const inputValue = event.target.value;
      console.log("React Input value changed:", inputValue);

      // only call if greater than 8 chars (for wax wallets xxxxx.wam)
      if (inputValue.length > 8) {
        handleUpdatedAccountName(inputValue);
      }
    };

    inputElement.addEventListener("input", handleInputChange);

    return () => {
      inputElement.removeEventListener("input", handleInputChange);
    };
  }, []);

  return (
    <div>
      <div className="dashImg">
        <img src={dashImage} alt={dashImage} />
      </div>
      <CryptoPrice />
      <WalletContainer />
      <div id="walletSearchContainer">
        <WalletInfo accountName={accountName} />
        <div id="walletSearch">
          <input id="walletInput" placeholder="Enter Wallet" />
        </div>
      </div>
      <div id="bananoContainer">
        <ReceivableTransactions />
        <BanStats />
        <Pie />
      </div>
      <div id="boomPowChart">
        <GetBoomPowTx />
      </div>
      <div id="slotAccounts">
        <GetSlotsDist />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
