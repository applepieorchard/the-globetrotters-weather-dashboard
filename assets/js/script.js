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
          console.log(data);

          var forecastEl = $("#today");
          forecastEl.empty();
          
            var cityEl = $("<section>");
            cityEl.attr("id", "city");
            
              const cityName = data.city.name;
              const date = (data.list[2].dt + data.city.timezone) * 1000;
              var dateFormat = (dayjs(date).format("DD/MM/YYYY"))
              var headerEl = $("<h3>");

              headerEl.text(`${cityName} (${dateFormat})`);
              headerEl.attr("id", "city-header");

              const iconKey = data.list[2].weather[0].icon;
              const weatherIcon = `http://openweathermap.org/img/w/${iconKey}.png`;
              var iconEl = $("<img>")

              iconEl.attr("src", weatherIcon);
              iconEl.attr("alt", "Weather Icon");
              iconEl.addClass("weather-icon");

            cityEl.append(headerEl);
            cityEl.append(iconEl);
                      
            var weatherEl = $("<section>");

              var tempEl = $("<p>");
              const temperature = data.list[2].main.temp - 273.15;

              tempEl.text(`Temp: ${Math.floor(temperature)}°C`);
              tempEl.addClass("temp");
              
              var humidityEl = $("<p>");
              const humidity = data.list[2].main.humidity;

              humidityEl.text(`Humidity: 💧${humidity}%`);
              humidityEl.addClass("humidity");
              
              var windEl = $("<p>");
              const windSpeed = data.list[2].wind.speed
              
              windEl.text(`Wind: ${windSpeed}km/h`)
              windEl.addClass("wind-speed")

            weatherEl.append(tempEl);
            weatherEl.append(humidityEl);
            weatherEl.append(windEl);

          forecastEl.append(cityEl);
          forecastEl.append(weatherEl);
        })
    })
})