$("#search-button").on("click", function(event) {
  event.preventDefault()

  const geoLimit = 1;
  var search = $("#search-input").val();
  if (search === "") {search += $("#search-input").attr("placeholder")};
  const apiKey = "7acd9fd35411ccb740fad8f5750d8c5d";
  const geoQuery = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=${geoLimit}&appid=${apiKey}`;
  
  fetch(geoQuery)
    .then(function(geoRes) {
      return geoRes.json()
    }).then(function(geo) {
      const lat = geo[0].lat;
      const lon = geo[0].lon;
      const weatherQuery = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      
      fetch(weatherQuery)
        .then(function(res) {
          return res.json()
        }).then(function(data) {
          console.log(data)
        })
    })
})