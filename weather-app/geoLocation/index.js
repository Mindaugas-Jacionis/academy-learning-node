const request = require("request");

const getLocation = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);

  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBjcchh-CzgQHV-i_ihIR6j0uKmvKc8nEk&address=${encodedAddress}`,
      json: true
    },
    (err, res, body) => {
      if (err) {
        callback(err);
      }

      if (body.status === "ZERO_RESULTS") {
        callback("There is no results");
      }

      if (body.status === "OK") {
        const { lat, lng } = body.results[0].geometry.location;
        callback(undefined, {
          latitude: lat,
          longitude: lng
        });
      }
    }
  );
};

module.exports = { getLocation };
