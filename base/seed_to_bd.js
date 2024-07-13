const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function loadData() {
  const customers = JSON.parse(fs.readFileSync(path.join(__dirname, './customers.json')));
  const wallets = JSON.parse(fs.readFileSync(path.join(__dirname, './wallets.json')));
  const tracking = JSON.parse(fs.readFileSync(path.join(__dirname, './tracking.json')));
  const stores = JSON.parse(fs.readFileSync(path.join(__dirname, './stores.json')));

  await uploadData('customers', customers); 
  await uploadData('wallets', wallets);
  await uploadData('tracking', tracking);
  await uploadData('stores', stores);
}

async function uploadData(endpoint, data) {
  for (const item of data) {
    try {
      // await axios.post(`https://backend-hackathon-center-norte.vercel.app/${endpoint}`, item);
      await axios.post(`http://localhost:3000/${endpoint}`, item);
      console.log(`Successfully added to ${endpoint}:`, item);
    } catch (error) {
      console.error(`Failed to add to ${endpoint}:`, item, error.message);
    }
    await delay(100);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

loadData();
