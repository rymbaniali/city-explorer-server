const express = require('express') // require the express package
const app = express() // initialize your express app instance
const weatherData=require('./assets/weather.json');

require('dotenv').config();

const port = process.env.port;
const cors = require('cors');


app.use(cors()) // after you initialize your express app instance

// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})

app.get('/weather', (req, res) => {
  responseData = weatherData.data.map( obj => new Wheather (obj));
    res.json(responseData);
});

class Wheather {
  constructor(weatherData){
   this.description= weatherData.weather.description;
   this.date= weatherData.valid_date;
  }

};
app.listen(port) // kick start the express server to work