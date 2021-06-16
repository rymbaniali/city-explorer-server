const weatherData = require('./assets/data.json');


 app.get('/weather', (req, res) => {
    const responseData = weatherData.data.data.map(obj => new Weather(obj));
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
      const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
  
      console.log(weatherBitUrl);
  
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
  export default weather;