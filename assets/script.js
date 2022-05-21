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
//Kelv to F
// var unitConversion;
// function unitConv(valNum) {
//   valNum = parseFloat(valNum);
//     unitConversion = ((valNum - 273.15) * 1.8 + 32).toFixed(2);

// }

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
  //   searchLi.on("click", "button", getWeather());
}

// clear History
clearHistoryBtn.on("click", function () {
  $("#append-history").empty();
  window.localStorage.clear();
});

var apiKey = "d61e6c3f32b672ef640a1eeab500b0dc";
// Weather !!
function getWeather() {
  $("#current-city").text("");
  var searchedCity = userCityInput.val();
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=${apiKey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //replace lat/long data.coords.lat
      var requestURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`;
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
          var currentDesciption = data.current.weather[0].description;
          var currentIcon = data.current.weather[0].icon;
          var currentUV = data.current.uvi;
          if (currentUV < 2) {
            $("#current-UV")
              .css("background-color", "green")
              .css("width", "17%")
              .css("border-radius", "3mm");
          } else if (currentUV > 2 && currentUV < 6) {
            $("#current-UV")
              .css("background-color", "yellow")
              .css("width", "17%")
              .css("border-radius", "3mm");
          } else if (currentUV > 6 && currentUV < 8) {
            $("#current-UV")
              .css("background-color", "orange")
              .css("width", "17%")
              .css("border-radius", "3mm");
          } else {
            $("#current-UV")
              .css("background-color", "red")
              .css("width", "17%")
              .css("border-radius", "3mm");
          }
          appendCurrentTemp.text("Temperature: " + currentTemp + " °F");
          appendCurrentHum.text("Humidity: " + currentHum + " %");
          appendCurrentWind.text("Wind Speed: " + currentWind + " MPH");
          appendCurrentUV.text("UV Index: " + currentUV);
          appendCurrentDescription.text(currentDesciption);
          appendCurrentIcon.attr(currentIcon);

          //   DAY1;
          //   var day1Icon = data.daily[0].weather[0].icon;
          var day1Des = data.daily[0].weather[0].description;
          var day1Temp = data.daily[0].temp.day;
          var day1Hum = data.daily[0].humidity;
          var day1Wind = data.daily[0].wind_speed;

          //   $("#day1Icon").attr("src", day1Icon);
          $("#day1Des").text(day1Des);
          $("#day1Temp").text("Temperature: " + day1Temp + " °F");
          $("#day1Hum").text("Humidity: " + day1Hum + " %");
          $("#day1Wind").text("Wind Speed: " + day1Wind + " MPH");

          // DAY2
          var day2Icon = data.daily[1].weather[0].icon;
          var day2Des = data.daily[1].weather[0].description;
          var day2Temp = data.daily[1].temp.day;
          var day2Hum = data.daily[1].humidity;
          var day2Wind = data.daily[1].wind_speed;

          $("#day2Des").text(day2Des);
          $("#day2Temp").text("Temperature: " + day2Temp + " °F");
          $("#day2Hum").text("Humidity: " + day2Hum + " %");
          $("#day2Wind").text("Wind Speed: " + day2Wind + " MPH");

          // DAY3
          var day3Icon = data.daily[2].weather[0].icon;
          var day3Des = data.daily[2].weather[0].description;
          var day3Temp = data.daily[2].temp.day;
          var day3Hum = data.daily[2].humidity;
          var day3Wind = data.daily[2].wind_speed;

          $("#day3Des").text(day3Des);
          $("#day3Temp").text("Temperature: " + day3Temp + " °F");
          $("#day3Hum").text("Humidity: " + day3Hum + " %");
          $("#day3Wind").text("Wind Speed: " + day3Wind + " MPH");
          // DAY 4
          var day4Icon = data.daily[3].weather[0].icon;
          var day4Des = data.daily[3].weather[0].description;
          var day4Temp = data.daily[3].temp.day;
          var day4Hum = data.daily[3].humidity;
          var day4Wind = data.daily[3].wind_speed;

          $("#day4Des").text(day4Des);
          $("#day4Temp").text("Temperature: " + day4Temp + " °F");
          $("#day4Hum").text("Humidity: " + day4Hum + " %");
          $("#day4Wind").text("Wind Speed: " + day4Wind + " MPH");
          // DAY5
          var day5Icon = data.daily[4].weather[0].icon;
          var day5Des = data.daily[4].weather[0].description;
          var day5Temp = data.daily[4].temp.day;
          var day5Hum = data.daily[4].humidity;
          var day5Wind = data.daily[4].wind_speed;

          $("#day5Des").text(day5Des);
          $("#day5Temp").text("Temperature: " + day5Temp + " °F");
          $("#day5Hum").text("Humidity: " + day5Hum + " %");
          $("#day5Wind").text("Wind Speed: " + day5Wind + " MPH");
        });
    });
}
