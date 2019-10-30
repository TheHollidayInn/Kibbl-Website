const NodeGeocoder = require('node-geocoder');

const geocodeOptions = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: process.env.GOOGLE_MAP, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(geocodeOptions);

const api = {};

api.geocode = (location) => new Promise((resolve, reject) => {
  if (!location) return resolve(location);
  return geocoder.geocode(location)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
});

module.exports = api;
