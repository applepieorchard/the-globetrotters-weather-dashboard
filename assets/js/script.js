const geoLimit = 5;
var lat = 0;
var lon = 0;
var search = "London";
const apiKey = "7acd9fd35411ccb740fad8f5750d8c5d";
const geoQuery = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=${geoLimit}&appid=${apiKey}`;

fetch(geoQuery)
  .then(function(geoRes) {
    return geoRes.json()
  }).then(function(geo) {
    var lat = geo[0].lat;
    var lon = geo[0].lon;
    const weatherQuery = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    fetch(weatherQuery)
      .then(function(res) {
        return res.json()
      }).then(function(data) {
        console.log(data)
      })
  })