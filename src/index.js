let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDate.getDay()];
let months = [
  "Januaray",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[currentDate.getMonth()];
let date = currentDate.getDate();
let year = currentDate.getFullYear();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let seconds = currentDate.getSeconds();

let h2 = document.querySelector("h2");
h2.innerHTML = `${day}, ${date} ${month} ${year} | ${hours}:${minutes}:${seconds}`;

function citySearch() {
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  if (cityInput.value) {
    h1.innerHTML = `${cityInput.value} Weather`;
  } else {
    alert("Enter a city");
  }
}

let search = document.querySelector("#search-button");
search.addEventListener("click", cityWeather);

let input = document.querySelector("#city-input");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#search-button").click();
  }
});

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);

function cityWeather() {
  let cityName = document.querySelector("#city-input");
  citySearch();
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${currentTemp}°C`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name} Weather`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
}

function getCurrentPosition(position) {
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}
