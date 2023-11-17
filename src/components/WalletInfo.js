import React, { useEffect, useContext, useState } from 'react';
import { getAccountInfo } from '../utils/api';
import { BLOCKCHAIN } from '../const';
import '../style.css';

const WalletInfo = ({ accountName }) => {
  const [accountData, setAccountData] = useState(null);
  

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const data = await getAccountInfo(accountName);
        setAccountData(data);
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
          <p>Account: {accountData.account_name}</p>
          <br />
          <p>Liquid Wax: <span style={{ fontWeight: 'bold' }}>{parseFloat(accountData.core_liquid_balance).toFixed(2)}</span></p>
          <p>CPU Usage: <span style={{ fontWeight: 'bold' }}>{((accountData.cpu_limit.used / accountData.cpu_limit.max) * 100).toFixed(2)}%</span></p>
          <p>RAM Usage: <span style={{ fontWeight: 'bold' }}>{((accountData.ram_usage / accountData.total_resources.ram_bytes) * 100).toFixed(2)}%</span></p>
          <p>NET Usage: <span style={{ fontWeight: 'bold' }}>{((accountData.net_limit.used / accountData.net_limit.max) * 100).toFixed(2)}%</span></p>
          <br/>
          <p>Staked CPU: <span style={{ fontWeight: 'bold' }}>{parseFloat(accountData.total_resources.cpu_weight).toFixed(2)}</span></p>
          <p>Owned RAM: <span style={{ fontWeight: 'bold' }}>{accountData.total_resources.ram_bytes}</span></p>
          <p>Staked NET: <span style={{ fontWeight: 'bold' }}>{parseFloat(accountData.total_resources.net_weight).toFixed(2)}</span></p>
        </div>
      ) : (
        <p>Waiting for Input...</p>
      )}
    </div>
  );
};

export default WalletInfo;
