import React, { useState, useEffect } from 'react';
import WalletInfo from './components/WalletInfo';
import ReactDOM from 'react-dom';
import './style.css';
import CryptoPrice from './components/Blockchain';
import WalletContainer from './components/WalletContainer';

const App = () => {
  const [accountName, setAccountName] = useState('');

  const handleUpdatedAccountName = (newAccountName) => {
    console.log('Handling react updated account name:', newAccountName);
    setAccountName(newAccountName);
  };

  useEffect(() => {
    const inputElement = document.getElementById('walletInput');
    
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
      inputElement.removeEventListener('input', handleInputChange);
    };
  }, []);

  return (
    <div>
      <CryptoPrice />
      <WalletContainer />
      <WalletInfo accountName={accountName} />
      <div id="walletSearch">
        <input
          id="walletInput"
          placeholder="Enter Wallet"
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
