import React from 'react';
import WalletInfo from './components/WalletInfo';
import ReactDOM from 'react-dom';

const App = () => {
  const accountName = 'abcde.wam';

  return (
    <div>
      <WalletInfo accountName={accountName} />
    </div>
  );
};

export default App;
