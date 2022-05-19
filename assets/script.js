var today = moment();
$("#todays-date").text(today.format("MM / D / YYYY"));
var userCityInput = $("#user-city-input");
// add eventlistner for usercitysubmit
var userCitySearchBtn = $("user-city-submit");
var clearHistoryBtn = $("clear-history");
var previousCitiesUl = $("previous-cities");
var currentLoca = $("#current-city");
var currentIcon = $("current-icon");
var currentTemp = $("current-temp");
var currentHum = $("current-humidity");
var currentWind = $("current-wind");
var currentUV = $("current-UV");
// add eventlinster for submit btn
//make an accnt for my key

function getWeather() {
  var apiKey = "d61e6c3f32b672ef640a1eeab500b0dc";
  var weatherApi =
    `https://api.openweathermap.org/data/2.5/weather?q=denver&appid=` + apiKey;
  fetch(weatherApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currentDate = new Date(data.dt * 1000);
      var currentDay = currentDate.getDate();
      var currentMonth = currentDate.getMonth() + 1;
      var currentYear = currentDate.getFullYear();
      currentLoca.innerHTML =
        data.name +
        "(" +
        currentMonth +
        "/" +
        currentDay +
        "/" +
        currentYear +
        ")";
      let weatherIcon = data.weather.icon;
      currentIcon.attr(
        "src",
        "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      );
      currentIcon.attr("alt", data.weather.description);
      currentTemp.innerHTML = "Temperature: " + k2f(data.main.temp) + "&#176F";
      currentHum.innerHTML = "Humidity: " + data.main.humidity + "%";
      currentWind.innerHTML = "Wind Speed: " + data.main.speed + " MPH";
      var lat = response.data.coord.lat;
      var lon = response.data.coord.lon;
      var uvURL =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        APIKey +
        "&cnt=1";
      fetch(uvURL).then(function (response) {
        let uvIndex = $("<span>", {
          class: "badge badge-danger",
        }).text("UV Index: " + response.data[0].value);
        currentUV.append(uvIndex);
      });
    });
}

getWeather();
