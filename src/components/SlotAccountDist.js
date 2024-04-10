import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios library
import { SLOTS } from "../const";

const GetSlotsDist = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [txDate, setTxDate] = useState(null);
  const maxRecords = 1500; // Maximum number of tx to fetch
  let totalRecords = 0;

  useEffect(() => {
    const fetchTopAddresses = async () => {
      try {
        const batchSize = 500;
        let offset = 0;
        let allAddresses = [];

        while (totalRecords < maxRecords) {
          const response = await axios.post(
            "https://api.spyglass.eule.wtf/banano/v2/account/confirmed-transactions",
            {
              address:
                "ban_1s1hot8adygxuj96f35dicnmd47cctazoaiia9uduk731nqt6fuenfax9ckt",
              includeChange: false,
              includeReceive: false,
              minAmount: "1",
              size: batchSize,
              offset: offset,
            }
          );

          if (!response.data) {
            console.error("No data in the response.");
            return;
          }

          const addresses = response.data;
          allAddresses = [...allAddresses, ...addresses];
          totalRecords += addresses.length;

          if (addresses.length < batchSize || totalRecords >= maxRecords) {
            // If fetched less than batchSize or reached maxRecords, break the loop
            break;
          }

          offset += batchSize;
        }

        const lastTransaction = allAddresses[allAddresses.length - 1];
        const lastTransactionTimestamp = lastTransaction.timestamp;
        const lastTransactionDate = new Date(
          lastTransactionTimestamp * 1000
        ).toLocaleDateString();

        const amountsByAddress = allAddresses.reduce((acc, curr) => {
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

        distSlotAccounts.sort((a, b) => b.amount - a.amount);

        const top19Addresses = distSlotAccounts.slice(0, 19);

        const promises = top19Addresses.map(async (account) => {
          try {
            const response = await axios.post(
              "https://api.spyglass.eule.wtf/banano/v2/account/confirmed-transactions",
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

        const results = await Promise.all(promises);

        results.sort((a, b) => b.amount - a.amount);

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
        <div id="slotDist">
          <h2>Top 19 Slot Accounts</h2>
          <h4 style={{ color: "yellow" }}>If withdrawn since {txDate}</h4>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {accounts.map((account, index) => (
              <li key={index}>
                <span style={{ color: "yellow" }}>{index + 1}</span>. {account.address}: {account.amount.toFixed(0)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetSlotsDist;
