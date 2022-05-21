var today = moment();
$("#todays-date").text(today.format("MM / D / YYYY"));
var userCityInput = $("#user-city-input");
// add eventlistner for usercitysubmit
// var searchBtn = $("#user-city-submit");
var clearHistoryBtn = $("#clear-history");
var previousCitiesUl = $("#append-history");
var appendCurrentLoca = $("#current-city");
var appendCurrentIcon = $("#current-icon");
var appendCurrentTemp = $("#current-temp");
var appendCurrentHum = $("#current-humidity");
var appendCurrentWind = $("#current-wind");
var appendCurrentUV = $("#current-UV");
var appendDay1 = $("#day1");
var appendDay2 = $("#day2");
var appendDay3 = $("#day3");
var appendDay4 = $("#day4");
var appendDay5 = $("#day5");

$("#append-history").on("click", "button", getWeather);
renderSearchedCities();
//local storage for searched cities, search History
$("#user-city-search").on("submit", function (e) {
  e.preventDefault();
  renderSearchedCities();
  getWeather();
  userCityInput.val("");
});
function renderSearchedCities() {
  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

  var searchedCity = userCityInput.val();
  if (searchedCity.length > 0) {
    searchHistory.push(searchedCity);
    localStorage.setItem("search", JSON.stringify(searchHistory));
  }
  $("#append-history").empty();
  for (let i = 0; i < searchHistory.length; i++) {
    const searchObj = searchHistory[i];
    var searchLi = $("<button>", {
      class: "btn btn-light rounded-3",
    });
    searchLi.text(searchObj);
    $("#append-history").append(searchLi);
  }
  // ON CLICK OF NEW BTN, render that weather
  //   searchLi.on("click", getWeather());
}

// clear History
clearHistoryBtn.on("click", function () {
  $("#append-history").empty();
  window.localStorage.clear();
});

var apiKey = "d61e6c3f32b672ef640a1eeab500b0dc";
// Weather !!
function getWeather() {
  var searchedCity = userCityInput.val();
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //replace lat/long data.coords.lat
      var requestURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=imperial`;
      fetch(requestURL2)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          $("#current-city").append(searchedCity);
          var currentTemp = data.current.temp;
          var currentWind = data.current.wind_speed;
          var currentHum = data.current.humidity;
          var currentUV = data.current.uvi;
          appendCurrentTemp.text("Temperature: " + currentTemp);
          appendCurrentWind.text("Wind Speed: " + currentWind);
          appendCurrentHum.text("Humidity: " + currentHum);
          appendCurrentUV.text("UV Index: " + currentUV);

          // DAY1
          var day1Icon = data.daily[0].weather[0].id;
          var day1Temp = data.daily[0].temp.day;
          var day1Wind = data.daily[0].wind_speed;
          var day1Hum = data.daily[0].humidity;

          $("#day1Icon").text(`${data.daily[0].weather[0].id}`);
          $("#day1Temp").text(`${data.daily[0].temp.day}`);
          $("#day1Wind").text(`${data.daily[0].wind_speed}`);
          $("#day1UV").text(`${data.daily[0].humidity}`);
          $("#day1Icon").append(day1Icon);
          $("#day1Temp").append(day1Temp);
          $("#day1Wind").append(day1Wind);
          $("#day1Hum").append(day1Hum);

          // DAY2
          var day2Icon = data.daily[1].weather[0].id;
          var day2Temp = data.daily[1].temp.day;
          var day2Wind = data.daily[1].wind_speed;
          var day2Hum = data.daily[1].humidity;

          appendDay2.text(`${day2Icon}
            Temp: ${day2Temp}
            Wind: ${day2Wind}
            Humidity:${day2Hum}`);
          // DAY3
          var day3Icon = data.daily[2].weather[0].id;
          var day3Temp = data.daily[2].temp.day;
          var day3Wind = data.daily[2].wind_speed;
          var day3Hum = data.daily[2].humidity;

          appendDay3.text(`${day3Icon}
            Temp: ${day3Temp}
            Wind: ${day3Wind}
            Humidity:${day3Hum}`);
          // DAY 4
          var day4Icon = data.daily[3].weather[0].id;
          var day4Temp = data.daily[3].temp.day;
          var day4Wind = data.daily[3].wind_speed;
          var day4Hum = data.daily[3].humidity;

          appendDay4.text(`${day4Icon}
            Temp: ${day4Temp}
            Wind: ${day4Wind}
            Humidity:${day4Hum}`);
          // DAY5
          var day5Icon = data.daily[4].weather[0].id;
          var day5Temp = data.daily[4].temp.day;
          var day5Wind = data.daily[4].wind_speed;
          var day5Hum = data.daily[4].humidity;

          appendDay5.text(`${day5Icon}
            Temp: ${day5Temp}
            Wind: ${day5Wind}
            Humidity:${day5Hum}`);
        });
    });
}

// var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&appid=${apiKey}`;
// function getWeather(userCityInput) {
//   fetch(`${api.url}weather?q=${userCityInput}&units=imperial&appid=${api.key}`)
//     .then((weather) => {
//       return weather.json();
//     })
//     .then(displayWeather);
// }

// function displayWeather(weather) {
//   $("current-city").text(${weather.name}, ${weather.sys.country});
// }
// function getWeather(query) {
//   fetch(`${api.url}weather?q=${query}&units=imperial&appid=${api.key}`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       var currentDate = new Date(data.dt * 1000);
//       var currentDay = currentDate.getDate();
//       var currentMonth = currentDate.getMonth() + 1;
//       var currentYear = currentDate.getFullYear();
//       currentLoca.innerHTML =
//         data.name +
//         "(" +
//         currentMonth +
//         "/" +
//         currentDay +
//         "/" +
//         currentYear +
//         ")";
//       let weatherIcon = data.weather.icon;
//       currentIcon.attr(
//         "src",
//         "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
//       );
//       currentIcon.attr("alt", data.weather.description);
//       currentTemp.innerHTML =
//         "Temperature: " + kelv2F(data.main.temp) + "&#176F";
//       currentHum.innerHTML = "Humidity: " + data.main.humidity + "%";
//       currentWind.innerHTML = "Wind Speed: " + data.main.speed + " MPH";
//       var lat = response.data.coord.lat;
//       var lon = response.data.coord.lon;
//       var uvURL =
//         "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
//         lat +
//         "&lon=" +
//         lon +
//         "&appid=" +
//         APIKey +
//         "&cnt=1";
//       fetch(uvURL).then(function (response) {
//         let uvIndex = $("<span>", {
//           class: "badge badge-danger",
//         }).text("UV Index: " + response.data[0].value);
//         currentUV.append(uvIndex);
//       });
//       // 5-day forcast
//       var cityId = response.daya.id;
//       var futureForcastURL =
//         "https://api.openweathermap.org/data/2.5/forecast?id=" +
//         cityId +
//         "&appid=" +
//         apiKey;

//       fetch(forcastURL).then(function (response) {
//         var futureForcasts = $(".forcast");
//         for (let i = 0; i < futureForcasts.length; i++) {
//           futureForcasts[i].empty();
//           var futureIndex = i * 8 + 4;
//           var futureDate = new Date(response.data.list[futureIndex].dt * 1000);
//           var futureDay = futureDate.getDate();
//           var futureMonth = futureDate.getMonth() + 1;
//           var futureYear = futureDate.getFullYear();
//           var futureDateEl = $("<p>", {
//             class: "mt-3 mb-0 forcast-date",
//           }).text(futureMonth + "/" + futureDay + "/" + futureYear);
//           futureForcasts.append(futureDateEl);
//           var futureWeatherEl = $("<img>", {
//             src:
//               `https://openweathermap.org/img/wn/` +
//               response.data.list[futureIndex].weather[0].icon +
//               `@2x.png`,
//           }).text(response.data.list[futureIndex].weather[0].description);
//           futureForcasts[i].append(futureWeatherEl);
//           //future Temp
//           var futureTempEl = $("<p>", {}).text(
//             "Temp: " +
//               kelv2F(response.data.list[futureIndex].main.temp) +
//               " &#176F"
//           );
//           futureForcasts[i].append(futureTempEl);

//           // future Wind
//           const futureWindEl = $("<p>", {}).text(
//             "Wind: " + response.data.list[futureIndex].wind.speed + " MPH"
//           );
//           futureForcasts[i].append(futureWindEl);

//           // future Humidity
//           const futureHumidityEl = $("<p>", {}).text(
//             "Humidity: " + response.data.list[futureIndex].main.humidity + "%"
//           );
//           futureForcasts[i].append(futureHumidityEl);
//         }
//       });
//     });
// }
// getWeather();
