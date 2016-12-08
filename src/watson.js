const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

const personality_insights = new PersonalityInsightsV3({
 username: '140c48c0-4e5b-4b90-a440-a4cf711465e7',
 password: 'dZaHbgi83vUc',
 version_date: '2016-10-19'
});

const watson = personality_insights.profile({
 text: '@escapehere',
 consumption_preferences: true
 },
 function (err, response) {
   if (err)
     console.log('error:', err);
   else
     console.log(JSON.stringify(response, null, 2));
});

module.exports = watson;
