import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { BANWALLET } from '../const';
import { BanStats } from './BanStats';

const Pie = () => {
  const [funds, setFunds] = useState(null);
  const [data, setData] = useState({
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get(
          'https://api.spyglass.pw/banano/v1/distribution/supply'
        );

        if (!response.data) {
          console.error('No data in the response.');
          return;
        }

        const fundsData = response.data;
        setFunds(fundsData);

        const updatedData = {
          labels: ['Distribution Fund', 'Circulating Supply'],
          datasets: [
            {
              data: [
                fundsData.devFundAmount,
                fundsData.circulatingAmount,
              ],
              backgroundColor: ['#FF6384', '#ffcc00'],
              hoverBackgroundColor: ['#FF6384', '#ffcc00'],
            },
          ],
        };

        setData(updatedData);
      } catch (error) {
        console.error('Error fetching funds:', error);
      }
    };

    fetchFunds();
  }, []);

  return (
    <div className="banano-funds">
      {funds ? (
        <div>
          <h2>Banano Pie</h2>
          <p>{`${(parseFloat(funds.devFundPercent) * 100).toFixed(3)} % distribution left`}</p>
          <ul>
            <li className="list-items">
              <div id="stats">{`Distribution Fund:`}</div>
              <Doughnut data={data} />
            </li>
          </ul>
        </div>
      ) : (
        <p>Eating cake...</p>
      )}
    </div>
  );
};

export default Pie;
