// Display the current day of the week, date and time (i.e. Wed April 4 16:00)
let now = new Date();

function today(currentDate) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[currentDate.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentDate.getMonth()];
  let date = currentDate.getDate();
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  minutes = (minutes < 10 ? ":0" : ":") + minutes;

  let showToday = document.querySelector("#todayIsThisDay");

  showToday.innerHTML = `${day} ${month} ${date} ${hours}${minutes}`;
}

today(now);

// Display the city name, current temperature & weather description for today
function showCity(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#todays-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#todays-description").innerHTML =
    response.data.weather[0].description;
}

// Geolocalization
function currentPosition(position) {
  let apiKey = "6f117e861b0b0140bf049ebef75f4075";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let location = `${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${location}`).then(showCity);
}

navigator.geolocation.getCurrentPosition(currentPosition);

// Search engine
function searchFavoriteCity(event) {
  event.preventDefault();
  let currentPlace = document.querySelector("#location-search");
  let apiKey = "6f117e861b0b0140bf049ebef75f4075";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;

  axios
    .get(`${apiUrl}${currentPlace.value}&units=metric&appid=${apiKey}`)
    .then(showCity);
}

let formLocation = document.querySelector("#locate");
formLocation.addEventListener("submit", searchFavoriteCity);
