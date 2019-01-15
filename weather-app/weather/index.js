const request = require("request");

const getWeather = ({ longitude, latitude }, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/159e8b3b543d437d6370825fc4ebad4d/${latitude},${longitude}?units=si`,
      json: true
    },
    (err, res, body) => {
      if (err) {
        callback(err);
      }

      if (res.statusCode === 200) {
        const { summary, temperature, apparentTemperature } = body.currently;
        callback(undefined, {
          summary,
          temperature,
          feelsLike: apparentTemperature
        });
      }
    }
  );
};

const getTemperatureColor = temperature => {
  if (temperature < -15) {
    return "blue";
  } else if (temperature < -5) {
    return "cyan";
  } else if (temperature < 5) {
    return "green";
  } else if (temperature < 15) {
    return "yellow";
  } else if (temperature > 15) {
    return "red";
  }

  return "gray";
};

module.exports = { getWeather, getTemperatureColor };
