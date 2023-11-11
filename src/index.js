import React, { useState, useEffect } from 'react';
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
    const inputElement = document.getElementById('reactWalletInput');
    
    const handleInputChange = function (event) {
      const inputValue = event.target.value;
      console.log('React Input value changed:', inputValue);
      
      // only call if greater than 8 chars (for wax wallets xxxxx.wam) 
      if (inputValue.length > 8) {
        handleUpdatedAccountName(inputValue);
      }
    };

    inputElement.addEventListener('input', handleInputChange);

    return () => {
      document.getElementById('reactFetchButton').removeEventListener('click', handleFetchAccountData);
      inputElement.removeEventListener('input', handleInputChange);
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
        />
        <button id="reactFetchButton">
          Fetch Account Data
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
