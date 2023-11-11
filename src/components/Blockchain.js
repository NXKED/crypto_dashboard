import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoPrice = () => {
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coins = ['bitcoin', 'solana', 'bitcoin-cash', 'wax'];
        const data = {};

        const requests = coins.map(async coin => {
          const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
            params: {
              vs_currency: 'usd',
              days: '1',
            },
          });

          const prices = response.data.prices;
          const currentPrice = prices[prices.length - 1][1];
          const previousPrice = prices[0][1];
          const percentageChange = ((currentPrice - previousPrice) / previousPrice) * 100;

          data[coin] = {
            usd: currentPrice.toFixed(2),
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
  }, []);

  return (
    <div>
      {cryptoData ? (
        <div className="crypto-price">
          {Object.entries(cryptoData).map(([coin, { usd, percentageChange }]) => (
            <div key={coin}>
              <p>
                {`${coin.toUpperCase()} $${usd} `}
                <span
                  style={{
                    color: percentageChange >= 0 ? 'green' : 'red',
                  }}
                >
                  {`(${percentageChange}%)`}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CryptoPrice;
