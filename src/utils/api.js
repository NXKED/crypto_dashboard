import { BLOCKCHAIN } from '../const';


export const getAccountInfo = async (accountName, setAccountData) => {
  const response = await fetch(`${BLOCKCHAIN.API_BASE_URL}/get_account`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      account_name: accountName
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  setAccountData(data);
};


/*export const getAccountInfo = async (accountName) => {
  const response = await fetch(`${BLOCKCHAIN.API_BASE_URL}/get_account?account_name=${accountName}`);
  const data = await response.json();
  return data;
};

*/