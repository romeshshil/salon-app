var express = require('express');
var router = express.Router();

var body = "";
// Require the module 
var Forecast = require('forecast');
 
// Initialize 
var forecast = new Forecast({
  service: 'darksky',
  key: '794f749ae22cfaa58ea0c6a4b4d75519',
  units: 'celcius',
  cache: true,      // Cache API requests 
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/ 
    minutes: 27,
    seconds: 45
  }
});
 
// // Retrieve weather information from coordinates (Sydney, Australia) 
// forecast.get([23.8859, 45.0792], function(err, weather) {
//   if(err) return console.dir(err);
//   // console.dir(weather);
// });
 
// Retrieve weather information, ignoring the cache 
// forecast.get([23.8859, 45.0792], true, function(err, weather) {
//   if(err) return console.dir(err);
//   console.dir(weather.currently.temperature);

// });


module.exports = forecast;