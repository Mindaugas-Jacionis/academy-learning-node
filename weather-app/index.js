const { argv } = require("yargs");
const chalk = require("chalk");
const { getLocation } = require("./geoLocation");
const { getWeather, getTemperatureColor } = require("./weather");

const DEFAULT_ADDRESS = "Antarctida";

const printWeather = data => {
  const { temperature, summary, feelsLike } = data;
  const temperatureColor = chalk[getTemperatureColor(temperature)];
  const feelsTemperature = chalk[getTemperatureColor(feelsLike)];

  console.log(`Current weather: ${chalk.hex("#aa00aa")(summary)}`);
  console.log(`Current Temperature: ${temperatureColor(temperature)}`);
  console.log(`Feels Like: ${feelsTemperature(feelsLike)}`);
};

const { address = DEFAULT_ADDRESS } = argv;

getLocation(address, (err, { longitude, latitude } = {}) => {
  if (!err) {
    getWeather({ longitude, latitude }, (err, res) => {
      if (!err) {
        printWeather(res);
      }
    });
  }
});
