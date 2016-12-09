const express = require('express');
const app = express();

const tweets = require('./src/fetchtweets');
const watson = require('./src/watson');
const translator = require('./src/translator');

app.get('/', function (request, response) {
  response.status(200).json('hi');
});

app.get('/api/tweets/translate/:handle', function (request, response) {
  tweets.timelineTweets(request.params.handle, function (error, data) {
    if (error) { return response.status(500); }
    translator.translate(data, function (error, data) {
      if (error) { return response.status(500); }
      response.status(200).json({data});
    });
  });
});

app.get('/api/tweets/:handle', function (request, response) {
  tweets.timelineTweets(request.params.handle, function (error, data) {
    if (error) { return response.status(500); }
    watson(data, function (error, data) {
      if (error) { return response.status(500); }
      response.status(200).json({data});
    });
  });
});

app.get('/api/tweets/:handle/big5/', function (request, response) {
  tweets.timelineTweets(request.params.handle, function (error, data) {
    if (error) { return response.status(500); }
    watson(data, function (error, data) {
      if (error) { return response.status(500); }
      let personality = {};
      data.personality.map(function (trait_id, bigfive) {
        personality[bigfive] = {
          name: trait_id.name,
          percentile: trait_id.percentile
        };
      });
      response.status(200).json({personality});
    });
  });
});

// app.get('/api/tweets/:handle/movies/', function (request, response) {
//   tweets.timelineTweets(request.params.handle, function (error, data) {
//     if (error) { return response.status(500); }
//     watson(data, function (error, data) {
//       if (error) { return response.status(500); }
//       let consumption_preferences = {};
//       data.consumption_preferences.map(function (trait_id, moviegenres) {
//         consumption_preferences[moviegenres] = {
//           name: trait_id.name,
//           consumption_preferences: trait_id.percentile
//         };
//       });
//       response.status(200).json({consumption_preferences});
//     });
//   });
// });

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
