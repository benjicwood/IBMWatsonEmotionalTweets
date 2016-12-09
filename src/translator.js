
const LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');


const language_translator = new LanguageTranslatorV2({
 "url": "https://gateway.watsonplatform.net/language-translator/api",
 "password": "4BhmrKj0P41Y",
 "username": "90e16da3-f564-4aa0-a5e8-59d48d03a2d0"
});

function translate (data, callback) {
  language_translator.translate({
    text: data, source: 'en', target: 'es' },
 function (err, translation) {
   if (err)
     console.log('error:', err);
   else
     console.log(JSON.stringify(translation, null, 2));
     callback(null, translation);
});
}

function language (data, callback) {
language_translator.identify({
 text: 'The language translator service takes text input and identifies the language used.' },
 function (err, language) {
   if (err)
     console.log('error:', err);
   else
     console.log(JSON.stringify(language, null, 2));
});
}

module.exports = {
  translate,
  language
};
