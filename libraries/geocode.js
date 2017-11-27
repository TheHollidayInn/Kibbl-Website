let NodeGeocoder = require('node-geocoder');

// Maybe wrap in library
let geocodeOptions = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: process.env.GOOGLE_MAP, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
let geocoder = NodeGeocoder(geocodeOptions);

let api = {};

api.geocode = function (location) {
  return new Promise(function (resolve, reject) {
    if (!location) return resolve(location);
    geocoder.geocode(location)
      .then(function(res) {
        return resolve(res);
      })
      .catch(function(err) {
        return reject(err);
      });
  });
}

module.exports = api;
