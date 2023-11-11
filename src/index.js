import React, { useState, useEffect} from 'react';
import WalletInfo from './components/WalletInfo';
import ReactDOM from 'react-dom';
import './style.css';
import CryptoPrice from './components/Blockchain';

const App = () => {
  const [accountName, setAccountName] = useState('p2wti.wam');

  const handleFetchAccountData = () => {
    console.log('Fetching account data (reactbutton)...');
  };

  const handleUpdatedAccountName = (newAccountName) => {
    console.log('Handling react updated account name:', newAccountName);
    setAccountName(newAccountName);
  };

  useEffect(() => {
    document.getElementById('reactFetchButton').addEventListener('click', handleFetchAccountData);
    document.getElementById('reactWalletInput').addEventListener('input', function (event) {
      console.log('React Input value changed:', event.target.value);
      handleUpdatedAccountName(event.target.value);
    });

    return () => {
      document.getElementById('reactFetchButton').removeEventListener('click', handleFetchAccountData);
      document.getElementById('reactWalletInput').removeEventListener('input', handleUpdatedAccountName);
    };
  }, []);

  return (
    <div>
      <CryptoPrice />
      <WalletInfo accountName={accountName} />
      <div id="walletSearch">
        <input
          id="reactWalletInput"
          placeholder="Enter Wallet"
          onChange={(e) => handleUpdatedAccountName(e.target.value)}
        />
        <button id="reactFetchButton">
          Fetch Account Data
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));