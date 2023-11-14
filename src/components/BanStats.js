import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios library
import { BANWALLET } from '../const';

const BanStats = () => {
  const [funds, setFunds] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get(
          'https://api.spyglass.pw/banano/v1/distribution/supply');

        if (!response.data) {
          console.error('No data in the response.');
          return;
        }
        
        const fundsData = response.data;
        setFunds(fundsData);
        
      } catch (error) {
        console.error('Error fetching funds:', error);
      }
    };

    fetchFunds();
  }, []);

  return (
    <div>
      {funds ? (
        <div className="banano-funds">
          <h2>Banano Fun(ds)-Stats</h2>
          <p>Estimated 25million distributed BAN a month</p>
          <ul>
              <li className="list-items">
                <div id="stats">{`Distribution Fund:`}</div>
                <div><a href={`https://creeper.banano.cc/network`} target="_blank" rel="noopener noreferrer" className='link-yellow'>{funds.devFundAmount} BAN</a></div>
                <div id="stats">{`Percentage:`}</div>
                <div><a href={`https://creeper.banano.cc/network`} target="_blank" rel="noopener noreferrer" className='link-yellow'>{`${(parseFloat(funds.devFundPercent) * 100).toFixed(2)}%`}</a></div>
                <div id="stats">{`Estimated Time Left:`}</div>
                <div><a href={`https://creeper.banano.cc/network`} target="_blank" rel="noopener noreferrer" className='link-yellow'>{`${(funds.devFundAmount / 25000000).toFixed(2)} months`}</a></div>
                
            </li>
          </ul>
        </div>
      ) : (
        <p>Loading Ban Stats...</p>
      )}
    </div>
  );
};

export default BanStats;
