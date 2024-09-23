import React, { useState, useEffect } from "react";
import axios from "axios";
import { coins } from "../const";

const API_KEY = "b5fe576b-526d-4d72-8a95-98ec1d1e5e82";

const CryptoPrice = () => {
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {};

        const requests = coins.map(async (coin) => {
          const response = await axios.get(
            `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
            {
              params: {
                symbol: coin.toUpperCase(),
                convert: "USD",
              },
              headers: {
                "X-CMC_PRO_API_KEY": API_KEY,
              },
            }
          );

          const coinData = response.data.data[coin.toUpperCase()];
          const currentPrice = coinData.quote.USD.price;
          const percentageChange = coinData.quote.USD.percent_change_24h;

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
        console.error("Error fetching crypto prices:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3 * 60 * 1000);

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
                  {`${coin.toUpperCase()} $${usd} `}
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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CryptoPrice;

//TODO add banano
