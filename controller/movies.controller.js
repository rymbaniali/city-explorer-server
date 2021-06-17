const Movie = require('../modules/movies.module');
const axios = require('axios');
require('dotenv').config();

const MOVIES_BIT_KEY= process.env.MOVIES_BIT_KEY;

const moviesController= (req, res) => {

    const city = req.query.city;
  
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIES_BIT_KEY}&query=${city}`;
  
  
    axios.get(movieUrl).then(results => {
  
      const responseData = results.data.results.map(obj => new Movie(obj))
  
  
      res.json(responseData);
  
    }).catch(error => {
      res.send(error.message)
    });
  };
  
module.exports= moviesController;