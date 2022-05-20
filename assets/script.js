var today = moment();
$("#todays-date").text(today.format("MM / D / YYYY"));
var userCityInput = $("#user-city-input");
// add eventlistner for usercitysubmit
var searchBtn = $("#user-city-submit");
var clearHistoryBtn = $("clear-history");
var previousCitiesUl = $("previous-cities");
var currentLoca = $("#current-city");
var currentIcon = $("current-icon");
var currentTemp = $("current-temp");
var currentHum = $("current-humidity");
var currentWind = $("current-wind");
var currentUV = $("current-UV");

//local storage for searched cities, search History
userCityInput.on("keypress", function (e) {
  if (e.which == 13) {
    renderSearchedCities();
  }

  function renderSearchedCities() {
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    previousCitiesUl.empty();

    for (let i = 0; i < searchHistory.length; i++) {
      var serachObj = searchHistory[i];
      var searchLi = $("<button>", {
        class: "btn btn-light rounded-3",
      });
      searchLi.text(serachObj);
      $("#append-history").append(searchLi);
    }
    var searchedCity = userCityInput.val();
    searchHistory.push(searchedCity);
    localStorage.setItem("search", JSON.stringify(searchHistory));
  }
});

// clear History
clearHistoryBtn.on("click", function () {
  $("#append-history").clear();
  window.localStorage.clear();
  //   renderSearchHistory();
});

// convert Kelvin to Ferenheit
// function kelv2F(K) {
//   return Math.floor((K - 273.15) * 1.8 + 32);
// }

// render search history
function renderSearchHistory() {
  previousCitiesUl.empty();
  for (let i = 0; i < searchHistory.length; i++) {
    var previousSearch = $("<input>", {
      class: "form-control d-block bg-grey",
    })
      .attr("type", "text")
      .attr("style", "margin-bottom: 10px;")
      .attr("readonly", true)
      .attr("value", searchHistory[i]);
    previousSearch.on("click", function () {
      getWeather(previousSearch.val());
    });
    previousCitiesUl.append(previousSearch);
  }
}
renderSearchHistory();
if (searchHistory.length > 0) {
  getWeather(searchHistory[searchHistory.length - 1]);
}

// Weather !!

userCityInput.addEventListener("keypress", setQuery);
function setQuery(evt) {
  if (evt.keyCode === 13) {
    getResults(userCityInput.val());
  }
}
var api = {
  key: "d61e6c3f32b672ef640a1eeab500b0dc",
  url: `https://api.openweathermap.org/data/2.5/`,
};

function getResults(query) {
  fetch(`${api.url}weather?q=${query}&units=imperial&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  currentLoca.innerText = `${weather.name}, ${weather.sys.country}`;
}
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
