import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios library
import { BANWALLET } from '../const';
import { Line } from 'react-chartjs-2';

const GetBoomPowTx = () => {
  const [transactions, setTransactions] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.post(
          'https://api.spyglass.pw/banano/v2/account/confirmed-transactions',
          {
            address: 'ban_1boompow14irck1yauquqypt7afqrh8b6bbu5r93pc6hgbqs7z6o99frcuym',
            filterAddresses: [BANWALLET[0]],
            includeChange: false,
            includeReceive: false,
            size: "50",
          }
        );

        if (!response.data) {
          console.error('No data in the response.');
          return;
        }

        const powData = response.data;

        const sortedTransactions = powData.slice().sort((a, b) => a.timestamp - b.timestamp);

        setTransactions(sortedTransactions);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const receivedBPBan = transactions ? transactions.map(transaction => transaction.amount?.toFixed(0)) : [];

  const chartData = {
    labels: receivedBPBan.map((_, index) => index + 1),
    datasets: [
      {
        label: 'BAN',
        data: receivedBPBan,
        fill: true,
        borderColor: 'yellow',
      },
    ],
  };

  return (
    <div className="boompow-transactions">
      {loading ? (
        <p>Loading BoomPow transactions...</p>
      ) : (
        <div>
          <h2>BoomPow Transactions</h2>
          <p>Total Received Amount: BAN</p>
          {receivedBPBan.length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p>No transactions to display.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GetBoomPowTx;

