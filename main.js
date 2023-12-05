const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
    .then(forecast => {
      return forecast.json();
    })
    .then(displayResults);
}

function displayResults(forecast) {
  let city = document.querySelector('.location .city');
  city.innerText = `${forecast.city.name}, ${forecast.city.country}`;

  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(new Date());

  let forecastList = document.querySelector('.forecast');
  forecastList.innerHTML = ""; // Clear previous forecast entries

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Display forecast for the next 7 days
  for (let i = 0; i < forecast.list.length; i += 8) {
    let forecastItem = document.createElement('div');
    forecastItem.className = 'forecast-item';

    let day = document.createElement('div');
    day.className = 'day';
    day.innerText = days[new Date(forecast.list[i].dt * 1000).getDay()];

    let temp = document.createElement('div');
    temp.className = 'temp';
    temp.innerText = `${Math.round(forecast.list[i].main.temp)}°C`;

    let weatherIcon = document.createElement('img');
    weatherIcon.src = `https://openweathermap.org/img/w/${forecast.list[i].weather[0].icon}.png`;
    weatherIcon.alt = forecast.list[i].weather[0].description;

    forecastItem.appendChild(day);
    forecastItem.appendChild(temp);
    forecastItem.appendChild(weatherIcon);

    forecastList.appendChild(forecastItem);
  }
}

function dateBuilder(d) {
  let date = d.getDate();
  let month = d.toLocaleString('default', { month: 'short' });
  return `${date} ${month}`;
}
