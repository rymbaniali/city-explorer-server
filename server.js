const express = require('express');
const app = express();
const weatherData = require('./assets/data.json');
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');

app.use(cors())


app.get('/',
  function (req, res) {
    res.send('Hello World')
  })


app.get('/weather', (req, res) => {
  responseData = weatherData.data.map(obj => new Weather(obj));
  res.json(responseData);
});


class Weather {
  constructor(weatherData) {
    this.description = weatherData.weather.description;
    this.date = weatherData.valid_date;
  }
}

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  if (lat && lon) {
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;

    axios.get(weatherBitUrl).then(response => {
      const responseData = response.data.data.map(obj => new Weather(obj));
      res.json(responseData)
    }).catch(error => {
      res.send(error.message)
    });
  } else {
    res.send('please provide the proper lat and lon')
  }

});

app.listen(PORT,()=>{
  console.log('listening in port',PORT)
});
