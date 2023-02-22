///Changing city name and temp from search
function displayWeather(response) {
  document.querySelector("#city-display-name").innerHTML = response.data.name;
  let cityTemp = document.querySelector("#display-temp");
  cityTemp.innerHTML = Math.round(response.data.main.temp);
}

function search(event) {
  event.preventDefault();
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let cityInput = document.querySelector("#city-search");
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

let cityDisplay = document.querySelector("#input-city");
cityDisplay.addEventListener("submit", search);

///Current Weather Button
function displayCurrent(response) {
  document.querySelector("#city-display-name").innerHTML = response.data.name;
  let cityTemp = document.querySelector("#display-temp");
  cityTemp.innerHTML = Math.round(response.data.main.temp);
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
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
