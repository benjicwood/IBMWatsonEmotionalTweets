const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const play = require('play');
const fs = require('fs');

const text_to_speech = new TextToSpeechV1({
   "url": "https://stream.watsonplatform.net/text-to-speech/api",
   "password": "3sjHTH4KG6i3",
   "username": "3a6636ee-7135-4df1-a637-4705d7b85718"
});

var params = {
  text: 'Hello from IBM Watson',
  voice: 'en-US_AllisonVoice', // Optional voice
  accept: 'audio/wav'
};

text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'));

module.exports = {
  text_to_speech
};
