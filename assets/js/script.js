$("#search-button").on("click", function(event) {
  event.preventDefault()

  const geoLimit = 1;
  var search = $("#search-input").val();
  if (search === "") {search += $("#search-input").attr("placeholder")};
  const apiKey = "7acd9fd35411ccb740fad8f5750d8c5d";
  const geoQuery = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=${geoLimit}&appid=${apiKey}`;

  var history = $("<button>")
  history.addClass("search-history")
  history.addClass("btn")
  history.addClass("btn-info")
  history.text(search)
  $("#history").prepend(history)
  
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
          // Today's Forecast 
            var todayEl = $("#today");
            todayEl.empty();
            // City and Date
              var cityEl = $("<section>");
              cityEl.attr("id", "city");
              const cityName = data.city.name;
              const date = (data.list[0].dt + data.city.timezone) * 1000;
              var headerEl = $("<h3>");

              headerEl.text(`${cityName} (${dayjs(date).format("DD/MM/YYYY")})`);
              headerEl.attr("id", "city-header");
            // Weather Icon
              var iconKey = data.list[0].weather[0].icon;
              var weatherIcon = `https://openweathermap.org/img/w/${iconKey}.png`;
              var iconEl = $("<img>")

              iconEl.attr("src", weatherIcon);
              iconEl.attr("alt", "Weather Icon");
              iconEl.addClass("weather-icon");
            //
            cityEl.append(headerEl);
            cityEl.append(iconEl);
            // Temperature
              var weatherEl = $("<section>");
              var tempEl = $("<p>");
              const temperature = data.list[0].main.temp - 273.15;

              tempEl.text(`Temp: ${Math.floor(temperature)}°C`);
              tempEl.addClass("temp");
            // Humidity
              var humidityEl = $("<p>");
              const humidity = data.list[0].main.humidity;

              humidityEl.text(`Humidity: 💧${humidity}%`);
              humidityEl.addClass("humidity");
            // Wind Speed
              var windEl = $("<p>");
              const windSpeed = data.list[0].wind.speed
              
              windEl.text(`Wind: ${windSpeed}km/h`)
              windEl.addClass("wind-speed")
            //
            weatherEl.append(tempEl);
            weatherEl.append(humidityEl);
            weatherEl.append(windEl);
            //
          todayEl.append(cityEl);
          todayEl.append(weatherEl);
          // Five Day Forecast 
            var forecastEl = $("#forecast")
            forecastEl.empty()

            var fiveDayEl = $("<section>")
            fiveDayEl.attr("id", "five-day")

            // Forecast Arrays
              const forecastDate = [
                (data.list[8].dt + data.city.timezone) * 1000,
                (data.list[16].dt + data.city.timezone) * 1000,
                (data.list[24].dt + data.city.timezone) * 1000,
                (data.list[32].dt + data.city.timezone) * 1000,
                (data.list[39].dt + data.city.timezone) * 1000
              ]
              const forecastTemp = [
                data.list[8].main.temp - 273.15,
                data.list[16].main.temp - 273.15,
                data.list[24].main.temp - 273.15,
                data.list[32].main.temp - 273.15,
                data.list[39].main.temp - 273.15
              ]
              const forecastIconKeys = [
                data.list[8].weather[0].icon,
                data.list[16].weather[0].icon,
                data.list[24].weather[0].icon,
                data.list[32].weather[0].icon,
                data.list[39].weather[0].icon,
              ]
              const forecastHumidity = [
                data.list[8].main.humidity,
                data.list[16].main.humidity,
                data.list[24].main.humidity,
                data.list[32].main.humidity,
                data.list[39].main.humidity
              ]
              const forecastWindSpeed = [
                data.list[8].wind.speed,
                data.list[16].wind.speed,
                data.list[24].wind.speed,
                data.list[32].wind.speed,
                data.list[39].wind.speed
              ]
              const dayIDs = [
                "tomorrow",
                "twoDays",
                "threeDays",
                "fourDays",
                "fiveDays"
              ]
            // Tomorrow's Forecast
            function fiveDayForecast(dayEl, dayID, dateEl, date, iconEl, icon, keys, tempEl,
              temp, humidEl, humidity, windEl, windSpeed, dayAppend, castAppend, i) {
                dayEl.attr("id", dayID[i]);
                dayEl.addClass("day-forecast");

                dateEl.text(dayjs(date[i]).format("DD/MM/YYYY"));
                dateEl.addClass("forecast-date");

                icon = `https://openweathermap.org/img/w/${keys[i]}.png`;
                iconEl.attr("src", icon)
                iconEl.attr("alt", "Forecast Weather Icon");
                iconEl.addClass("forecast-icon");

                tempEl.text(`Temp: ${Math.floor(temp[i])}°C`);
                tempEl.addClass("forecast-temp");

                humidEl.text(`Humidity: 💧${humidity[i]}%`);
                humidEl.addClass("forecast-humidity");

                windEl.text(`Wind: ${windSpeed[i]}km/h`);
                windEl.addClass("forecast-wind-speed");
                
                dayEl.append(dateEl);
                dayEl.append(iconEl);
                dayEl.append(tempEl);
                dayEl.append(humidEl);
                dayEl.append(windEl);
                
                dayAppend.append(dayEl);
                castAppend.append(dayAppend)
            };
            fiveDayForecast(firstDayEl, dayIDs, firstDateEl, forecastDate, firstIconEl, firstIcon, forecastIconKeys,
              firstTempEl, forecastTemp, firstHumidEl, forecastHumidity, firstWindEl, forecastWindSpeed, fiveDayEl, forecastEl, 0)
            fiveDayForecast(secondDayEl, dayIDs, secondDateEl, forecastDate, secondIconEl, secondIcon, forecastIconKeys, 
              secondTempEl, forecastTemp, secondHumidEl, forecastHumidity, secondWindEl, forecastWindSpeed, fiveDayEl, forecastEl, 1)
            fiveDayForecast(thirdDayEl, dayIDs, thirdDateEl, forecastDate, thirdIconEl, thirdIcon, forecastIconKeys,
              thirdTempEl, forecastTemp, thirdHumidEl, forecastHumidity, thirdWindEl, forecastWindSpeed, fiveDayEl, forecastEl, 2)
            fiveDayForecast(fourthDayEl, dayIDs, fourthDateEl, forecastDate, fourthIconEl, fourthIcon, forecastIconKeys,
              fourthTempEl, forecastTemp, fourthHumidEl, forecastHumidity, fourthWindEl, forecastWindSpeed, fiveDayEl, forecastEl, 3)
            fiveDayForecast(fifthDayEl, dayIDs, fifthDateEl, forecastDate, fifthIconEl, fifthIcon, forecastIconKeys,
              fifthTempEl, forecastTemp, fifthHumidEl, forecastHumidity, fifthWindEl, forecastWindSpeed, fiveDayEl, forecastEl, 4)
          })
    })
})