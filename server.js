'use strict';

require('dotenv').config();

const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');

app.use( express.urlencoded({extended:true }));

app.use( express.static('./www') );


app.get('/form.html');

app.get('/', (request, response) => {
  response.status(200).send('Test Link');
});

app.get('/name', (request, response) => {
  let data = {
    name:request.query.name,
    hairStyle:request.query.hair,
  };
  response.status(200).json(data);
});

app.post('/location', (request, response) => {
  response.status(200).send(request.body.article);
});

// This will force an error
app.get('/worsething', (request,response) => {
  throw new Error('OMG???');
});

// 404 Handler
app.use('*', (request, response) => {
  console.log(request);
  response.status(404).send(`Can't Find ${request.pathname}`);
});

// Error Handler
app.use( (err,request,response,next) => {
  console.error(err);
  response.status(500).send(err.message);
});

// Startup

function startServer() {
  app.listen( PORT, () => console.log(`Server running on ${PORT}`));
}

startServer();