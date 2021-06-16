const express = require('express');
const app = express();
const axios=require ('axios');
require('dotenv').config();

const PORT = process.env.PORT;
const cors = require('cors');

app.use(cors())


app.get('/',
  function (req, res) {
    res.send('Hello World')
  })
app.listen(PORT, () => {
  console.log('listening in port', PORT);
});
