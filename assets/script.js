var today = moment();
$("#todays-date").text(today.format("MM / D / YYYY"));

var day1 = new moment().add(1, "day");
$("#day1-d8").text(day1.format("MM/D/YYYY"));
var day2 = new moment().add(2, "day");
$("#day2-d8").text(day2.format("MM/D/YYYY"));
var day3 = new moment().add(3, "day");
$("#day3-d8").text(day3.format("MM/D/YYYY"));
var day4 = new moment().add(4, "day");
$("#day4-d8").text(day4.format("MM/D/YYYY"));
var day5 = new moment().add(5, "day");
$("#day5-d8").text(day5.format("MM/D/YYYY"));

var userCityInput = $("#user-city-input");
// add eventlistner for usercitysubmit
// var searchBtn = $("#user-city-submit");
var clearHistoryBtn = $("#clear-history");
var previousCitiesUl = $("#append-history");
var appendCurrentLoca = $("#current-city");
var appendCurrentIcon = $("#current-icon");
var appendCurrentDescription = $("#current-description");
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
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=imperial`;
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
          //
          //   var requestIconURL = `http://openweathermap.org/img/wn/10d@2x.png`;
          //   fetch(requestIconURL)
          //     .then(function (response) {
          //       return response.json();
          //     })
          //     .then(function (data) {
          //       console.log(data);
          //     });
          $("#current-city").append(searchedCity);
          var currentTemp = data.current.temp;
          var currentWind = data.current.wind_speed;
          var currentHum = data.current.humidity;
          var currentUV = data.current.uvi;
          var currentDesciption = data.current.weather[0].description;
          var currentIcon = data.current.weather[0].icon;
          appendCurrentTemp.text("Temperature: " + currentTemp);
          appendCurrentWind.text("Wind Speed: " + currentWind);
          appendCurrentHum.text("Humidity: " + currentHum);
          appendCurrentUV.text("UV Index: " + currentUV);
          appendCurrentDescription.text(currentDesciption);
          appendCurrentIcon.attr(currentIcon);

          //   DAY1;
          //   var day1Icon = data.daily[0].weather[0].icon;
          var day1Temp = data.daily[0].temp.day;
          var day1Wind = data.daily[0].wind_speed;
          var day1Hum = data.daily[0].humidity;
          var day1Des = data.daily[0].weather[0].description;

          //   $("#day1Icon").attr("src", day1Icon);
          $("#day1Des").text(day1Des);
          $("#day1Temp").text("Temperature: " + day1Temp);
          $("#day1Wind").text("Wind Speed: " + day1Wind);
          $("#day1Hum").text("Humidity: " + day1Hum);

          // DAY2
          var day2Icon = data.daily[1].weather[0].icon;
          var day2Temp = data.daily[1].temp.day;
          var day2Wind = data.daily[1].wind_speed;
          var day2Hum = data.daily[1].humidity;
          var day2Des = data.daily[1].weather[0].description;

          $("#day2Des").text(day2Des);
          $("#day2Temp").text("Temperature: " + day2Temp);
          $("#day2Wind").text("Wind Speed: " + day2Wind);
          $("#day2Hum").text("Humidity: " + day2Hum);
          // DAY3
          var day3Icon = data.daily[2].weather[0].icon;
          var day3Temp = data.daily[2].temp.day;
          var day3Wind = data.daily[2].wind_speed;
          var day3Hum = data.daily[2].humiconity;
          var day3Des = data.daily[2].weather[0].description;

          $("#day3Des").text(day3Des);
          $("#day3Temp").text("Temperature: " + day3Temp);
          $("#day3Wind").text("Wind Speed: " + day3Wind);
          $("#day3Hum").text("Humidity: " + day3Hum);
          // DAY 4
          var day4Icon = data.daily[3].weather[0].icon;
          var day4Temp = data.daily[3].temp.day;
          var day4Wind = data.daily[3].wind_speed;
          var day4Hum = data.daily[3].humidity;
          var day4Des = data.daily[3].weather[0].description;

          $("#day4Des").text(day4Des);
          $("#day4Temp").text("Temperature: " + day4Temp);
          $("#day4Wind").text("Wind Speed: " + day4Wind);
          $("#day4Hum").text("Humidity: " + day4Hum);
          // DAY5
          var day5Icon = data.daily[4].weather[0].icon;
          var day5Temp = data.daily[4].temp.day;
          var day5Wind = data.daily[4].wind_speed;
          var day5Hum = data.daily[4].humidity;
          var day5Des = data.daily[4].weather[0].description;

          $("#day5Des").text(day5Des);
          $("#day5Temp").text("Temperature: " + day5Temp);
          $("#day5Wind").text("Wind Speed: " + day5Wind);
          $("#day5Hum").text("Humidity: " + day5Hum);
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
