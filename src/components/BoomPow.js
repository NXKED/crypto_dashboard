import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios library
import { BANWALLET, BOOMPOW, SLOTS } from '../const';
import { Line } from 'react-chartjs-2';

const GetBoomPowTx = () => {
  const [transactions, setTransactions] = useState(null);
  const [slotTransactions, setSlotTransactions] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalSlot, setTotalSlot] = useState(null);
  const [totalBoom, setTotalBoom] = useState(null);

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
        const response2 = await axios.post(
          'https://api.spyglass.pw/banano/v2/account/confirmed-transactions',
          {
            address: 'ban_1s1hot8adygxuj96f35dicnmd47cctazoaiia9uduk731nqt6fuenfax9ckt',
            filterAddresses: [BANWALLET[0]],
            includeChange: false,
            includeReceive: false,
            size: "50",
          }
        );

        const response3 = await axios.post(
          'https://api.spyglass.pw/banano/v2/account/confirmed-transactions',
          {
            address: 'ban_1igof5isd3xxn7yen8owx1m9cje68mt3n3cpyp8kqkzkcr5x6hwcxwy1pzmq',
            filterAddresses: [SLOTS[0]],
            includeChange: false,
            size: "2000",
          }
        );

        const response4 = await axios.post(
          'https://api.spyglass.pw/banano/v2/account/confirmed-transactions',
          {
            address: 'ban_1igof5isd3xxn7yen8owx1m9cje68mt3n3cpyp8kqkzkcr5x6hwcxwy1pzmq',
            filterAddresses: [BOOMPOW[0]],
            includeChange: false,
            size: "2000",
          }
        );

        if (!response.data || !response2.data || !response3.data || !response4.data) {
          console.error('No data in the response.');
          return;
        }

        const powData = response.data;
        const slotData = response2.data;
        const sortedTransactions = powData.slice().sort((a, b) => a.timestamp - b.timestamp);
        const sortedTransactionsSlots = slotData.slice().sort((a, b) => a.timestamp - b.timestamp);
        
        const sR = response3.data;
        const totalReceivedSlot = sR.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );

        const sP = response4.data;
        const totalReceivedBoomPow = sP.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );

        console.log("Slots Received:", totalReceivedSlot);
        setTotalSlot(totalReceivedSlot);
        setTotalBoom(totalReceivedBoomPow);
        setSlotTransactions(sortedTransactionsSlots);
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
  const receivedSlotBan = slotTransactions ? slotTransactions.map(slotTransaction => slotTransaction.amount?.toFixed(0)) : [];

  const chartData = {
    labels: receivedBPBan.map((_, index) => index + 1),
    datasets: [
      {
        label: 'BoomPow',
        data: receivedBPBan,
        fill: true,
        borderColor: 'yellow',
      },
      {
        label: 'SLOTS',
        data: receivedSlotBan,
        fill: true,
        borderColor: 'green',
      }
    ],
  };

  return (
    <div className="boompow-transactions">
      {loading ? (
        <p>Loading BoomPow transactions...</p>
      ) : (
        <div>
          <h2>BoomPow & Slot Transactions</h2>
          <p>Total Slots: {totalSlot.toFixed(0)}</p>
          <p>Total BP: {totalBoom.toFixed(0)}</p>
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

