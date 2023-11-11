import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoPrice = () => {
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,bitcoin-cash,wax,solana&vs_currencies=usd"
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error("Error fetching waxp price");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {cryptoData ? (
        <div className="crypto-price">
          <p>BTC Price: ${cryptoData.bitcoin.usd}</p>
          <p>SOL Price: ${cryptoData.solana.usd}</p>
          <p>BCH Price: ${cryptoData["bitcoin-cash"].usd}</p>
          <p>WAXP Price: ${cryptoData.wax.usd}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CryptoPrice;
