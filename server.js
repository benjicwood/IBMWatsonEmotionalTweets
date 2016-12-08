const express = require('express');
const app = express();
// const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
// const toneAnalyzer = new ToneAnalyzerV3({/*...*/});

const tweets = require('./src/fetchtweets');
const watson = require('./src/watson');

app.get('/', function (request, response) {
  response.status(200).json('hi');
});

app.get('/api/tweets/:handle', function (request, response) {
  tweets.timelineTweets(request.params.handle, function (error, data) {
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
