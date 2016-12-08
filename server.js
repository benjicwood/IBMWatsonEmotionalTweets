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

app.get('/api/tweets/topics/:topic', function (req, res, next) {
  tweets.tweetsByTopic(req.params.topic, function (err, data) {
    if (err) return next(err);
    res.json({tweets: data});
  });
});

app.get('/api/followers/:screen_name', function (req, res, next) {
  tweets.tweetsByUser(req.params.screen_name, function (err, data) {
    if (err) return next(err);
    res.json({tweets: data});
  });
});

app.listen(4000, function () {
  console.log('listening on port 4000');
});
