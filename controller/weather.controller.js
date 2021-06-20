
const Weather = require('../modules/weather.module');
const axios = require('axios');
require('dotenv').config();

const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

const Cache = require('../helper/cache');
const cacheOBj = new Cache();
console.log(cacheOBj);

const weatherController = (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (lat && lon) {

    if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey].timestamp < 86400000)) {
      console.log('=====================');
      console.log('From the cache Object');
      console.log('=====================');
      res.json(cacheObj[requestKey].data);
    } else {

      const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;

      console.log(weatherBitUrl);

      axios.get(weatherBitUrl).then(response => {
        const responseData = response.data.data.map(obj => new Weather(obj));

        cacheObj[requestKey] = { data: responseData };
        cacheObj[requestKey].timestamp = Date.now();

        res.json(responseData)

      }).catch(error => {
        res.send(error.message)
      });
    }

  } else {
    res.send('please provide the proper lat and lon')
  }
};
module.exports = weatherController;