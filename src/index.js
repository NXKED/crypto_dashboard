import React from 'react';
import WalletInfo from './components/WalletInfo';
import ReactDOM from 'react-dom';
import './style.css';
import CryptoPrice from './components/Blockchain';

const App = () => {
  const accountName = 'p2wti.wam';

  return (
    <div>
      <CryptoPrice />
      <WalletInfo accountName={accountName} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));