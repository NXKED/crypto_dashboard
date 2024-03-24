import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios library
import { BANWALLET, BOOMPOW, SLOTS } from "../const";

const GetSlotsDist = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [txDate, setTxDate] = useState(null);

  useEffect(() => {
    const fetchTopAddresses = async () => {
      try {
        const response = await axios.post(
          "https://api.spyglass.pw/banano/v2/account/confirmed-transactions",
          {
            address:
              "ban_1s1hot8adygxuj96f35dicnmd47cctazoaiia9uduk731nqt6fuenfax9ckt",
            includeChange: false,
            includeReceive: false,
            minAmount: "1",
            size: "500",
          }
        );

        console.log("Response data:", response.data);

        if (!response.data) {
          console.error("No data in the response.");
          return;
        }

        const addresses = response.data;
        const lastTransaction = addresses[addresses.length - 1];
        const lastTransactionTimestamp = lastTransaction.timestamp;
        const lastTransactionDate = new Date(
          lastTransactionTimestamp * 1000
        ).toLocaleDateString();

        // sum of amounts for each address
        const amountsByAddress = addresses.reduce((acc, curr) => {
          const { address, amount } = curr;
          acc[address] = (acc[address] || 0) + amount;
          return acc;
        }, {});

        const distSlotAccounts = Object.entries(amountsByAddress).map(
          ([address, amount]) => ({
            address,
            amount,
          })
        );

        // Sort addresses by amount descending
        distSlotAccounts.sort((a, b) => b.amount - a.amount);

        // top 19 addresses
        const top19Addresses = distSlotAccounts.slice(0, 19);

        // each top address and calculate sum
        const promises = top19Addresses.map(async (account) => {
          try {
            const response = await axios.post(
              "https://api.spyglass.pw/banano/v2/account/confirmed-transactions",
              {
                address: account.address,
                filterAddresses: [SLOTS[0]],
                includeChange: false,
                includeReceive: true,
                size: "500",
              }
            );

            if (!response.data) {
              console.error(`No data for address: ${account.address}`);
              return { address: account.address, amount: 0 };
            }

            // Calculate sum of amounts for this address
            const sumAmount = response.data.reduce((acc, curr) => {
              return acc + curr.amount;
            }, 0);

            return { address: account.address, amount: sumAmount };
          } catch (error) {
            console.error(
              `Error fetching transactions for address ${account.address}:`,
              error
            );
            return { address: account.address, amount: 0 };
          }
        });

        // Wait for promises
        const results = await Promise.all(promises);

        results.sort((a, b) => b.amount - a.amount);

        console.log("Top 19 Addresses with sums:", results);

        setAccounts(results);
        setLoading(false);
        setTxDate(lastTransactionDate);
      } catch (error) {
        console.error("Error fetching top addresses:", error);
        setLoading(false);
      }
    };

    fetchTopAddresses();
  }, []);

  return (
    <div className="slotDist">
      {loading ? (
        <p>Loading Slots distribution...</p>
      ) : (
        <div>
          <h2>Top 19 Slot Accounts</h2>
          <h4>If withdrawn since {txDate}</h4>
          <ul>
            {accounts.map((account, index) => (
              <li key={index}>
                {account.address}: {account.amount.toFixed(0)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetSlotsDist;
