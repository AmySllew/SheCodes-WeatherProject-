function formatDate(timestamp) {
  let dateElement = document.querySelector("#date");
  let now = new Date(timestamp);
  let date = now.getDate();
  let day = now.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let month = now.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  return `${days[day]}, ${date} ${months[month]} ${hours}:${minutes}`;
}


function displayWeatherCondition(response) {
document.querySelector("#place").innerHTML = response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  let apiKey = "a415eeb517a020050fb05861a2fa490c";
  axios.get(apiUrl).then(displayWeatherCondition);
}
 

let dateElement = document.querySelector("#date");
let currentTime = new Date();
let searchForm = document.querySelector("#searchForm");

let now = new Date();
dateElement.innerHTML = formatDate(now);

function formatHouse(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHouse();
  if (hours < 10) {
    hours =`0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;

for (let index = 0; index <= 6; index ++) {
  forecast = response.data.list[index];
  forecastElement.innerHTML += `
<div class="col-2">
<h3>
  ${formatHours(forecast.dt *1000)}
</h3>
<img
  src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
/>
<div class="weather-forecast-temperature">
  <strong>
    ${Math.round(forecast.main.temp_max)}°</strong>${Math.round(forecast.main.temp_min)}°
</div>
</div>
`;
  }  


forecastElement.innerHTML= `
<div class="col-2">
<h3>
  ${formatHours(forecast.dt *1000)}
</h3>
<img
  src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
/>
<div class="weather-forecast-temperature">
  <strong>
    ${Math.round(forecast.main.temp_max)}°</strong>${Math.round(forecast.main.temp_min)}°
</div>
</div>
`;



function searchCity(event) {
  event.preventDefault();
  let apiKey = "a415eeb517a020050fb05861a2fa490c";
  let findWeather = document.querySelector("#city-input").value; 
  let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${findWeather}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${findWeather}&appid=${apiKey}&units=metric`
 axios.get(apiUrl).then(displayForecast); 
}

let form = document.querySelector("#cityForm");
form.addEventListener("submit", searchCity); 


function displayWeatherCondition(response) {
  document.querySelector("#place").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showWeather(response) {
let place = document.querySelector("#place");
let temperature = Math.round(response.data.main.temp);
place.innerHTML = `It is ${temperature}° in ${response.data.name}`;
}

function retrievePosition (position) {
  let apiKey = "a415eeb517a020050fb05861a2fa490c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition (){
navigator.geolocation.getCurrentPosition (retrievePosition);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);
}