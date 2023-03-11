///Changing city name and temp from search

let weatherImage = document.querySelector("#city-image");
let cityTemp = document.querySelector("#display-temp");
let realFeel = document.querySelector("#city-real-feel");
let windSpeed = document.querySelector("#city-wind-speed");
let fahrenheitTemp = null;
let realFeelTemp = null;

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
}

function search(event) {
  event.preventDefault();
  let apiKey = "0t8c730526fo6e849d6726a6fd04bb53";
  let cityInput = document.querySelector("#city-search");
  let city = cityInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

let cityDisplay = document.querySelector("#input-city");
cityDisplay.addEventListener("submit", search);

///Current Weather Button
function retrievePosition(position) {
  let apiKey = "0t8c730526fo6e849d6726a6fd04bb53";
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

/// Looping forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
              <div class="day" id="day-1">${day}</div>
              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" alt="clear-sky-day">
             <div class="max-temp" id="day-1-maximum">
                35°
                </div>
                <div class="min-temp" id="day-1-minimum">
                7°
              </div>
              </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

displayForecast();
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

let displayDate = document.querySelector("#display-date");
let correctDate = formatDate(new Date());
displayDate.innerHTML = correctDate;
