const express = require('express');
const app = express();
const weatherData = require('./assets/data.json');
const axios=require ('axios');
require('dotenv').config();

const PORT = process.env.PORT;
const cors = require('cors');

app.use(cors())


app.get('/',
  function (req, res) {
    res.send('Hello World')
  })


///////////////////////////////////////////////////////////////////////////////////////

app.get('/weather', (req, res) => {
  const responseData = weatherData.data.map(obj => new Weather(obj));
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
///////////////////////////////////////////////////////////////////////////////////////////////
app.get('/movies', (req, res) => {
  const moviesData = moviesData.data.map(obj => new Movie (obj));
  res.json(responseData);
});

app.get('/movies', (req, res) => {
  const city = req.query.city;

  const movieUrl = `https://api.themoviedb.org/3/movie/550?api_key=b624a42cf5753ed05a8753213d481678&query=${city}`;

  axios.get(movieUrl).then(response => {
    const responseData = response.data.data.map(obj =>new Movie(obj));
    res.json(responseData)
  }).catch(error => {
    res.send(error.message)
  });
});

class Movie {
  constructor(moviesData) {
    this.title = moviesData.original_title;
    this.overViwe = moviesData.overview;
    this.avgVotes = moviesData.vote_average;
    this.totalVotes = moviesData.vote_count;
    this.imgUrl = `https://image.tmdb.org/t/p/w500/${moviesData.poster_path}`;
    this.popularity = moviesData.popularity;
    this.date = moviesData.release_date;

  }
}

app.listen(PORT, () => {
  console.log('listening in port', PORT);
});
