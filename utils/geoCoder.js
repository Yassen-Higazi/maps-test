const NodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.GEO_PROVIDER,

  // Optional depending on the providers
  apiKey: process.env.GEO_API_KEY,
  formatter: null, // 'gpx', 'string', ...
};

module.exports = NodeGeocoder(options);
