///Global Variables

let weatherImage = document.querySelector("#city-image");
let cityTemp = document.querySelector("#display-temp");
let realFeel = document.querySelector("#city-real-feel");
let windSpeed = document.querySelector("#city-wind-speed");
let fahrenheitTemp = null;
let realFeelTemp = null;
let apiKey = "0t8c730526fo6e849d6726a6fd04bb53";

/// Updating weather data based on search

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecast, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
              <div class="day">${formatDay(forecast.time)}</div>
              <img src="${forecast.condition.icon_url}">
               <div class="max-temp">
                ${Math.round(forecast.temperature.maximum)}°
                </div>
                <div class="min-temp">
                ${Math.round(forecast.temperature.minimum)}°
              </div>
              </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  fahrenheitTemp = response.data.temperature.current;
  realFeelTemp = response.data.temperature.feels_like;
  document.querySelector("#city-display-name").innerHTML = response.data.city;
  document.querySelector("#condition-description").innerHTML =
    response.data.condition.description;
  weatherImage.setAttribute("src", response.data.condition.icon_url);
  weatherImage.setAttribute("alt", response.data.condition.icon);
  cityTemp.innerHTML = Math.round(response.data.temperature.current);
  realFeel.innerHTML = Math.round(response.data.temperature.feels_like);
  document.querySelector("#city-humidity").innerHTML =
    response.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.city);
}

function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  search(cityInput.value);
}

let cityDisplay = document.querySelector("#input-city");
cityDisplay.addEventListener("submit", handleSubmit);

search("Boston");

///Updating data based on Current Weather Button
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;
  axios.get(currentUrl).then(displayWeather);
}

function currentCityWeather() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-city-button");
currentButton.addEventListener("click", currentCityWeather);

///Converting Temperatures

function displayCelsiusTemp(event) {
  event.preventDefault();
  let celsiusConvert = ((fahrenheitTemp - 32) * 5) / 9;
  let realFeelCelConvert = ((realFeelTemp - 32) * 5) / 9;
  let tempDisplay = document.querySelector("#display-temp");
  tempDisplay.innerHTML = Math.round(celsiusConvert);
  realFeel.innerHTML = Math.round(realFeelCelConvert);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#display-temp");
  tempDisplay.innerHTML = Math.round(fahrenheitTemp);
  realFeel.innerHTML = Math.round(realFeelTemp);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

///Displaying Date

function formatDate(todaysDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[todaysDate.getDay()];
  let hours = todaysDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = todaysDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

let displayDate = document.querySelector("#display-date-time");
let correctDate = formatDate(new Date());
displayDate.innerHTML = correctDate;
