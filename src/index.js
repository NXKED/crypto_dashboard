import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import ReceivableTransactions from "./components/ReceivableTransactions";
import BanStats from "./components/BanStats";
import Pie from "./components/Pie";
import "chart.js/auto";
import GetBoomPowTx from "./components/BoomPow";
import dashImage from "./images/dash5.png";

const App = () => {
  const [banWallet, setBanWallet] = useState(null);

  const handleUpdatedWallet = (newWallet) => {
    console.log("Handling updated name to:", newWallet);
    setBanWallet(newWallet);
  };

  useEffect(() => {
    const inputElement = document.getElementById("walletInput");

    const handleInputChange = function (event) {
      const inputValue = event.target.value;
      console.log("Input value changed: ", inputValue);

      if(inputValue.length > 15) {
        handleUpdatedWallet(inputValue);
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
      <div id="walletSearch">
        <input id="walletInput" placeholder="Enter Wallet" />
      </div>
      {banWallet && (
        <>
          <div id="boomPowChart">
            <GetBoomPowTx banWallet={banWallet} />
          </div>
          <div id="bananoContainer">
            <ReceivableTransactions banWallet={banWallet}/>
            <BanStats banWallet={banWallet} />
            <Pie banWallet={banWallet} />
          </div>
        </>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));