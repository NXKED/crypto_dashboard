import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios library
import { BANWALLET } from "../const";

const ReceivableTransactions = () => {
  const [transactions, setTransactions] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [BPbalance, setBPbalance] = useState(null);
  const [PWbalance, setPWbalance] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.post(
          "https://api.spyglass.pw/banano/v1/account/receivable-transactions",
          {
            address: BANWALLET[0],
          }
        );

        const BPOverview = await axios.get(
          "https://api.spyglass.pw/banano/v1/account/overview/ban_1boompow14irck1yauquqypt7afqrh8b6bbu5r93pc6hgbqs7z6o99frcuym",
        );

        const PWOverview = await axios.get(
          "https://api.spyglass.pw/banano/v1/account/overview/ban_1igof5isd3xxn7yen8owx1m9cje68mt3n3cpyp8kqkzkcr5x6hwcxwy1pzmq",
        );

        if (!response.data) {
          console.error("No data in the response.");
          return;
        }

        const BPbalance = BPOverview.data;
        const PWbalance = PWOverview.data;
        const transactionData = response.data;
        const sortedTransactions = response.data
          .slice()
          .sort((a, b) => b.timestamp - a.timestamp);
        const sumBanReceived = transactionData.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );
        
        setTotalAmount(sumBanReceived);
        setBPbalance(BPbalance);
        setPWbalance(PWbalance);
        setTransactions(sortedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();

    const interval = setInterval(() => {
      fetchTransactions();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const getSender = (address) => {
    if (
      address ===
      "ban_1boompow14irck1yauquqypt7afqrh8b6bbu5r93pc6hgbqs7z6o99frcuym"
    ) {
      return "Boom-Pow";
    } else if (
      address ===
      "ban_1s1hot8adygxuj96f35dicnmd47cctazoaiia9uduk731nqt6fuenfax9ckt"
    ) {
      return "Slots";
    } else {
      return "";
    }
  };

  return (
    <div className="receivable-transactions">
      {transactions ? (
        <div>
          <h2>Receivable Transactions </h2>
          <p>Total Pending Amount: {totalAmount.toFixed(0)} BAN</p>
          <p>Boom-Balance: {BPbalance.balance}</p>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.hash} className="list-items">
                <div>
                  {`${transaction.amount.toFixed(0)} BAN `}
                  <span style={{ color: "orange" }}>
                    {getSender(transaction.address)}
                  </span>
                </div>
                <div>
                  <a
                    href={`https://creeper.banano.cc/hash/${transaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    {new Date(transaction.timestamp * 1000).toLocaleDateString(
                      "de-DE",
                      { day: "2-digit", month: "2-digit" }
                    )}
                    {" "}
                    {new Date(transaction.timestamp * 1000).toLocaleTimeString(
                      "de-DE",
                      { hour: "numeric", minute: "numeric", hour12: true }
                    )}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p>Balance: {PWbalance.balance.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
        </div>
      ) : (
        <p>Loading receivable transactions...</p>
      )}
    </div>
  );
};

export default ReceivableTransactions;

//TODO add boompow balance, banano distribution fund percentage
