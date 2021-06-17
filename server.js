const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const axios = require('axios');

require('dotenv').config();

const PORT = process.env.PORT;


const indexController= require('./controller/index.controller');
const weatherController= require('./controller/weather.controller');
const moviesController= require('./controller/movies.controller');



app.get('/',indexController);

app.get('/weather',weatherController);

app.get('/movies',moviesController);

app.listen(PORT, () => {
  console.log('listening in port', PORT);
});
