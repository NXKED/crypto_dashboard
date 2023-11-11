import React, { useEffect, useContext, useState } from 'react';
import { getAccountInfo } from '../utils/api';
import { BLOCKCHAIN } from '../const';
import '../style.css';

const WalletInfo = ({ accountName }) => {
  const [accountData, setAccountData] = useState(null);
  

  useEffect(() => {
    
    
    const fetchAccountData = async () => {
      try {
        const data = await getAccountInfo(accountName, setAccountData);
      } catch (error) {
        console.error('Error fetching account info:', error);
      }
    };

    fetchAccountData();
  }, [accountName]);

  return (
    <div className="wallet-info">
      {accountData ? (
        <div>
          <p>Account Name: {accountData.account_name}</p>
          <br />
          <p>RAM Usage: {accountData.ram_usage}</p>
          <p>CPU Usage: {accountData.cpu_limit.used}/{accountData.cpu_limit.max}</p>
          <p>NET Usage: {accountData.net_limit.used}/{accountData.net_limit.max}</p>
          <p>Liquid: {parseFloat(accountData.core_liquid_balance).toFixed(2)}</p>
          <p>Staked CPU: {parseFloat(accountData.total_resources.cpu_weight).toFixed(2)}</p>
          <p>Owned RAM: {accountData.total_resources.ram_bytes}</p>
          <p>Staked NET: {parseFloat(accountData.total_resources.net_weight).toFixed(2)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WalletInfo;
