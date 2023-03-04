///Changing city name and temp from search
function displayWeather(response) {
  document.querySelector("#city-display-name").innerHTML = response.data.city;
  document.querySelector("#condition-description").innerHTML =
    response.data.condition.description;
  let cityTemp = document.querySelector("#display-temp");
  cityTemp.innerHTML = Math.round(response.data.temperature.current);
  let realFeel = document.querySelector("#city-real-feel");
  realFeel.innerHTML = Math.round(response.data.temperature.feels_like);
  document.querySelector("#city-humidity").innerHTML =
    response.data.temperature.humidity;
  let windSpeed = document.querySelector("#city-wind-speed");
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
function displayCurrent(response) {
  document.querySelector("#city-display-name").innerHTML = response.data.city;
  document.querySelector("#condition-description").innerHTML =
    response.data.condition.description;
  let cityTemp = document.querySelector("#display-temp");
  cityTemp.innerHTML = Math.round(response.data.temperature.current);
  let realFeel = document.querySelector("#city-real-feel");
  realFeel.innerHTML = Math.round(response.data.temperature.feels_like);
  document.querySelector("#city-humidity").innerHTML =
    response.data.temperature.humidity;
  let windSpeed = document.querySelector("#city-wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

function retrievePosition(position) {
  let apiKey = "0t8c730526fo6e849d6726a6fd04bb53";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;
  axios.get(currentUrl).then(displayCurrent);
}

function currentCityWeather() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-city-button");
currentButton.addEventListener("click", currentCityWeather);

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
