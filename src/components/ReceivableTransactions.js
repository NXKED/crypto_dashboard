import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios library
import { BANWALLET } from '../const';

const ReceivableTransactions = () => {
  const [transactions, setTransactions] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.post(
          'https://api.spyglass.pw/banano/v1/account/receivable-transactions',
          {
            address: BANWALLET[0],
          }
        );

        if (!response.data) {
          console.error('No data in the response.');
          return;
        }

        const transactionData = response.data;
        const sortedTransactions = response.data.slice().sort((a, b) => b.timestamp - a.timestamp);
        const sumBanReceived = transactionData.reduce((acc, transaction) => acc + transaction.amount, 0);
        setTotalAmount(sumBanReceived);

        setTransactions(sortedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const getSender = (address) => {
    if (address === 'ban_1boompow14irck1yauquqypt7afqrh8b6bbu5r93pc6hgbqs7z6o99frcuym') {
      return 'Boom-Pow';
    } else if (address === 'ban_1s1hot8adygxuj96f35dicnmd47cctazoaiia9uduk731nqt6fuenfax9ckt') {
      return 'Slots';
    } else {
      return '';
    }
  };

  return (
    <div className="receivable-transactions">
      {transactions ? (
        <div>
          <h2>Receivable Transactions</h2>
          <p>Total Pending Amount: {totalAmount} BAN</p>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.hash} className="list-items">
                <div>{`${transaction.amount} BAN `}
                  <span style={{ color: 'orange' }}>{getSender(transaction.address)}</span>
                </div>
                <div>
                  <a href={`https://example.com/transactions/${transaction.hash}`} target="_blank" rel="noopener noreferrer" className='link'>
                  {new Date(transaction.timestamp * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
                  {', '}
                  {new Date(transaction.timestamp * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                  </a>
                </div>
            </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading receivable transactions...</p>
      )}
    </div>
  );
};

export default ReceivableTransactions;


//TODO add boompow balance, banano distribution fund percentage
