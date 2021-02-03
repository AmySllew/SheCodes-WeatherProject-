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
  
    return `${days[day]}, ${months[month]} ${hours}:${minutes}`;
  }
  
  function searchPlace(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city");
    let cityInput = document.querySelector("city-input");
  }
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  let searchForm = document.querySelector("#searchForm");
  
  let now = new Date();
  dateElement.innerHTML = formatDate(now);
  
  function displayWeatherCondition(response) {
    console.log(response.data)
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
  
  
  function searchCity(event) {
    event.preventDefault();
    let apiKey = "a415eeb517a020050fb05861a2fa490c";
    let findWeather = document.querySelector("#city-input").value; 
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${findWeather}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
    
  }
  
  let form = document.querySelector("#cityForm");
  form.addEventListener("submit", searchCity); 
  
  
  function showTemperature(response){
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("temperature"); 
    let status = document.querySelector("#temperature-description");
    degrees.innerHTML = `${temperature}°C`;
    description.innerHTML = response.data.weather[0].description;
  } 

  
  
  
  