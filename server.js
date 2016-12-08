const express = require('express');
const app = express();

const tweets = require('./src/fetchtweets');

app.get('/', function (request, response) {
  response.status(200).json('hi');
});

app.get('/api/tweets/escapehere', function (request, response) {
  tweets(request.params.handle, function (error, data) {
    response.status(200).json({data});
  });
});

app.listen(4000, function () {
  console.log('listening on port 4000');
});
