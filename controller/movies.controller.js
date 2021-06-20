const Movie = require('../modules/movies.module');
const axios = require('axios');
require('dotenv').config();

const MOVIES_BIT_KEY = process.env.MOVIES_BIT_KEY;

const Cache = require('../helper/cache');
const cacheOBj = new Cache();

const moviesController = (req, res) => {

  const city = req.query.city;
  if (city) {
    if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey].timestamp < 86400000)) {
      res.json(cacheObj[requestKey].data);
    } else {
      const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIES_BIT_KEY}&query=${city}`;

      axios.get(movieUrl).then(results => {

        const responseData = results.data.results.map(obj => new Movie(obj))


        res.json(responseData);

      }).catch(error => {
        res.send(error.message)
      });
    };

  }




}
module.exports = moviesController;