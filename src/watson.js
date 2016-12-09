const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

const personality_insights = new PersonalityInsightsV3({
  username: '140c48c0-4e5b-4b90-a440-a4cf711465e7',
  password: 'dZaHbgi83vUc',
  version_date: '2016-10-19'
});

function watson (data, callback) {
  personality_insights.profile({
    text: data,
    consumption_preferences: true
  },
  function (error, response) {
  if (error)
    console.log('error:', error);
    else
    console.log(JSON.stringify(response, null, 2));
    callback(null, response);
   });
}

module.exports = watson;
