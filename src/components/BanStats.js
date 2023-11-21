import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios library
import { BANWALLET } from "../const";

const BanStats = () => {
  const [funds, setFunds] = useState(null);
  const [amountTop, setAmountTop] = useState(null);
  const [topX, setTopX] = useState(100);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get(
          "https://api.spyglass.pw/banano/v1/distribution/supply"
        );

        const responseTwo = await axios.post(
          "https://api.spyglass.pw/banano/v1/distribution/rich-list",
          {
            offset: topX.toString(),
            size: "1",
          }
        );

        if (!response.data && !responseTwo.data) {
          console.error("No data in the response.");
          return;
        }

        const topData = responseTwo.data;
        const fundsData = response.data;
        setAmountTop(topData[0]);
        setFunds(fundsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching funds:", error);
        setLoading(false);
      }
    };

    fetchFunds();
  }, [topX]);

  const handleOffsetChange = (newOffset) => {
    console.log("handleOffsetChange");
    setTopX(newOffset);
    setLoading(true);
  };

  return (
    <div className="banano-funds">
      {loading ? (
        <p>Loading Ban Stats...</p>
      ) : funds ? (
        <div>
          <h2>Banano Fun(d)-Stats</h2>
          <p>Estimated 25million distributed BAN a month</p>
          <ul>
            <li className="list-items">
              <div id="stats">{`Distribution Fund:`}</div>
              <div>
                <a
                  href={`https://creeper.banano.cc/network`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-yellow"
                >
                  {funds.devFundAmount} BAN
                </a>
              </div>
              <div id="stats">{`Percentage:`}</div>
              <div>
                <a
                  href={`https://creeper.banano.cc/network`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-yellow"
                >{`${(parseFloat(funds.devFundPercent) * 100).toFixed(2)}%`}</a>
              </div>
              <div id="stats">{`Estimated Time Left:`}</div>
              <div>
                <a
                  href={`https://creeper.banano.cc/network`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-yellow"
                >{`${(funds.devFundAmount / 25000000).toFixed(2)} months`}</a>
              </div>
              <div id="stats">{`Estimated Date:`}</div>
              <div>
                <a
                  href={`https://creeper.banano.cc/network`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-yellow"
                >
                  {" "}
                  {new Date(
                    new Date().setMonth(
                      new Date().getMonth() + funds.devFundAmount / 25000000
                    )
                  ).toLocaleDateString(undefined, {
                    month: "long",
                    year: "numeric",
                  })}
                </a>
              </div>
              <div id="stats">{`To be a Top ${topX} holder:`}</div>
              <button className="topXButton" onClick={() => handleOffsetChange(100)}>
                100
              </button>
              <button className="topXButton" onClick={() => handleOffsetChange(250)}>
                250
              </button>
              <button className="topXButton" onClick={() => handleOffsetChange(1000)}>
                1k
              </button>
              <button className="topXButton" onClick={() => handleOffsetChange(10000)}>
                10k
              </button>
              <div>
                <a
                  href={`https://creeper.banano.cc/wallets`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-yellow"
                >{`${amountTop.amount
                  .toFixed(0)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Banano`}</a>
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <p>Error fetching ban stats.</p>
      )}
    </div>
  );
};

export default BanStats;

//TODO pie chart for funds? Save Session - settings input (ban,wax wallets, cryptos) + code for predef. values. Nightmode || color picker
