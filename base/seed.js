const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function loadData() {
  const customers = JSON.parse(fs.readFileSync(path.join(__dirname, './customers.json')));
  const states = JSON.parse(fs.readFileSync(path.join(__dirname, './states.json')));
  const stores = JSON.parse(fs.readFileSync(path.join(__dirname, './stores.json')));
  const wallets = JSON.parse(fs.readFileSync(path.join(__dirname, './wallets.json')));

  await uploadData('customers', customers);
  await uploadData('states', states);
  await uploadData('stores', stores);
  await uploadData('wallets', wallets);
}

async function uploadData(endpoint, data) {
  for (const item of data) {
    try {
      await axios.post(`https://backend-hackathon-center-norte.vercel.app/${endpoint}`, item);
      console.log(`Successfully added to ${endpoint}:`, item);
    } catch (error) {
      console.error(`Failed to add to ${endpoint}:`, item, error.message);
    }
  }
}

loadData();
