const fs = require('fs');

const users = require('./customers.json');
const stores = require('./stores.json');

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max, decimals = 6) {
  const factor = Math.pow(10, decimals);
  return Math.floor(Math.random() * (max - min + 1) * factor) / factor + min;
}

const deviceTypes = ['Smartphone', 'Tablet', 'Laptop'];
const osVersions = [
  'Android 6', 'Android 7', 'Android 8', 'Android 9', 'Android 10', 'Android 11', 'Android 12', 'Android 13', 'Android 14',
  'iOS 6', 'iOS 7', 'iOS 8', 'iOS 9', 'iOS 10', 'iOS 11', 'iOS 12', 'iOS 13', 'iOS 14', 'iOS 15'
];
const appVersions = ['1.0.0', '1.1.0', '1.2.0'];

const trackingData = [];

for (let i = 0; i < 100; i++) {
  const user = getRandomElement(users);
  const store = getRandomElement(stores);

  const trackingEntry = {
    userId: parseInt(user.id),
    latitude: getRandomNumber(-90, 90),
    longitude: getRandomNumber(-180, 180),
    storeId: parseInt(store.id),
    deviceInfo: {
      device_type: getRandomElement(deviceTypes),
      os_version: getRandomElement(osVersions),
      app_version: getRandomElement(appVersions),
    }
  };

  trackingData.push(trackingEntry);
}

fs.writeFileSync('tracking.json', JSON.stringify(trackingData, null, 2));

console.log('Tracking data generated and saved to tracking.json');
