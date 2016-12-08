const Twit = require('twit');

const T = new Twit({
  consumer_key:         'qvCDlWSOENwvFloBfgHDgtkp3',
  consumer_secret:      'D6gNBoafKbQosCTLjlB2UVqkDDvXYYlY9rg0c881qs4rWVSpv9',
  access_token:         '21041704-uoH602hISawIc51v494Rah1oqHrLtUOPjEFe81fS9',
  access_token_secret:  'OH2S45WX1EBsxAurPbw8r2LWsDgb2LdvgtdUrRXRlESkq'
});

const timelineTweets = function (handle, callback) {
  T.get('statuses/user_timeline', {screen_name: handle}, function (error, data, response) {
    console.log(data);
    return callback(null, data.map((tweet) => tweet.text));
  });
};
const tweetsByTopic = function (topic, callback) {
  T.get('search/tweets', {q: topic, count: 10}, function (err, data, response) {
    if (err) return callback(err);
    callback(null, data);
  });
};
const tweetsByUser = function (screen_name, callback) {
  T.get('followers/ids', { screen_name: 'tomcosman', count: 5 }, function (err, data, response) {
    if (err) return callback(err);
    callback(null, data);
  });
};

module.exports = {
  timelineTweets,
  tweetsByTopic,
  tweetsByUser
};
