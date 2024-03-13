import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios library
import { BOOMPOW, SLOTS } from '../const';
import { Line } from 'react-chartjs-2';
//import { banWallet } from "../index"


const GetBoomPowTx = ({ banWallet }) => {
  const [transactions, setTransactions] = useState(null);
  const [slotTransactions, setSlotTransactions] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalSlot, setTotalSlot] = useState(null);
  const [totalBoom, setTotalBoom] = useState(null);


  useEffect(() => {

    if(!banWallet) {
      return;
    }
    const fetchTransactions = async () => {
      try {
        const response = await axios.post(
          'https://api.spyglass.pw/banano/v2/account/confirmed-transactions',
          {
            address: 'ban_1boompow14irck1yauquqypt7afqrh8b6bbu5r93pc6hgbqs7z6o99frcuym',
            filterAddresses: banWallet,
            includeChange: false,
            includeReceive: false,
            size: "50",
          }
        );
        const response2 = await axios.post(
          'https://api.spyglass.pw/banano/v2/account/confirmed-transactions',
          {
            address: 'ban_1s1hot8adygxuj96f35dicnmd47cctazoaiia9uduk731nqt6fuenfax9ckt',
            filterAddresses: banWallet,
            includeChange: false,
            includeReceive: false,
            size: "50",
          }
        );

        const response3 = await axios.post(
          'https://api.spyglass.pw/banano/v2/account/confirmed-transactions',
          {
            address: banWallet,
            filterAddresses: [SLOTS[0]],
            includeChange: false,
            size: "2000",
          }
        );

        const response4 = await axios.post(
          'https://api.spyglass.pw/banano/v2/account/confirmed-transactions',
          {
            address: banWallet,
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
  }, [banWallet]);

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
      {loading && !banWallet ? (
        <p>Loading BoomPow transactions...</p>
      ) : (
        <>
          <h2>BoomPow & Slot Transactions</h2>
          {transactions === null || slotTransactions === null ? (
            <p>Error fetching transactions. Please try again later.</p>
          ) : (
            <>
              <p>Total Slots: {totalSlot !== null ? totalSlot.toFixed(0) : ''}</p>
              <p>Total BP: {totalBoom !== null ? totalBoom.toFixed(0) : ''}</p>
              {receivedBPBan.length > 0 ? (
                <Line data={chartData} />
              ) : (
                <p>No transactions to display.</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GetBoomPowTx;

