import React, { useEffect, useContext, useState } from 'react';
import { getAccountInfo } from '../utils/api';
import { BLOCKCHAIN } from '../const';

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
    <div>
      <h1>Wallet Information</h1>
      {accountData ? (
        <div>
          <p>Account Name: {accountData.account_name}</p>
          <p>RAM Usage: {accountData.ram_usage}</p>
          <p>CPU Usage: {accountData.cpu_limit.used}/{accountData.cpu_limit.max}</p>
          <p>NET Usage: {accountData.net_limit.used}/{accountData.net_limit.max}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WalletInfo;
