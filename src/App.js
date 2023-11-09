import React from 'react';
import WalletInfo from './components/WalletInfo';
import ReactDOM from 'react-dom';

const App = () => {
  const accountName = 'as5ga.wam';

  return (
    <div>
      <WalletInfo accountName={accountName} />
    </div>
  );
};

export default App;
