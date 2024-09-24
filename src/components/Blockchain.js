import React, { useState, useEffect } from "react";
import axios from "axios";
import { coins } from "../const";

const coinNameMap = {
  "btc-bitcoin": "BTC",
  "eth-ethereum": "ETH",
  "bch-bitcoin-cash": "BCH",
  "wax-wax": "WAX",
  "pol-polygon-ecosystem-token": "MATIC",
  "sol-solana": "SOL",
  "ban-banano": "BAN",
  "ponke-ponke": "PONKE",
};

const CryptoPrice = () => {
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {};

        const requests = coins.map(async (coin) => {
          const response = await axios.get(
            `https://api.coinpaprika.com/v1/tickers/${coin}`
          );

          const coinData = response.data;
          const currentPrice = coinData.quotes.USD.price;
          const percentageChange = coinData.quotes.USD.percent_change_24h;

          let decimals;
          if (coin.toLowerCase() === "banano") {
            decimals = 4;
          } else if (coin.toLowerCase() === "wax") {
            decimals = 3;
          } else {
            decimals = 2;
          }

          data[coin] = {
            usd: currentPrice.toFixed(decimals),
            percentageChange: percentageChange.toFixed(2),
          };
        });

        await Promise.all(requests);

        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto prices from Coinpaprika:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 6 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {cryptoData ? (
        <div className="crypto-price">
          {Object.entries(cryptoData).map(
            ([coin, { usd, percentageChange }]) => (
              <div key={coin}>
                <p>
                  {`${coinNameMap[coin] || coin.toUpperCase()} $${usd} `}
                  <span
                    style={{
                      color: percentageChange >= 0 ? "green" : "red",
                    }}
                  >
                    {`(${percentageChange}%)`}
                  </span>
                </p>
              </div>
            )
          )}
        </div>
      ) : (
        <p>Waiting for API... (5min)</p>
      )}
    </div>
  );
};

export default CryptoPrice;

//TODO add banano
