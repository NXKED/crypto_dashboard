import React, { useState, useEffect } from "react";
import axios from "axios";
import { myWallet } from '../const';


const VoteDate = () => {
  const [latestVoteDate, setLatestVoteDate] = useState(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.waxsweden.org/v2/history/get_actions?account=${myWallet}&filter=eosio%3Avoteproducer&simple=true&hot_only=false&noBinary=true&checkLib=false`
        );

        const simpleActions = response.data.simple_actions;
        
        //find latest vote
        const latestAction = simpleActions.reduce((latest, action) => {
          return action.timestamp > latest.timestamp ? action : latest;
        }, simpleActions[0]);

        const formattedDate = formatDate(latestAction.timestamp);

        setLatestVoteDate(formattedDate);

      } catch (error) {
        console.error("Error fetching VoteDate", error);
      }
    };

      fetchData();
    }, []);

    const moreThanFiveDays = latestVoteDate && latestVoteDate < formatDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000));

    return (
      <div className={`vote-date ${moreThanFiveDays ? 'important' : ''}`}>
        {latestVoteDate !== null ? (
          <p>Latest Vote on: {latestVoteDate}</p>
        ) : (
          <p>Probably api timeout...</p>
        )}
      </div>

    );
};

export default VoteDate;