import './style.css'

async function getWeather() {
  let searchResult = "San Antonio";
  const key = weatherApiKey;
  const weatherApiUri = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${searchResult}&days=3&aqi=no&alerts=no`;
  const data = await fetch(weatherApiUri)
  if(data.ok) {
    const {current, forecast, location} = await data.json()
    console.log(forecast)
    displayCurrentWeather(current)
  }
}

getWeather();

function displayCurrentWeather({condition, temp_f, wind_mph, wind_dir}) {
  const currentHtml = `<p>Status: <span id="current_main--status">${condition.text}</span></p>
  <img src=${condition.icon} alt="${condition.text}">
  <p>Current Temp: <span id="current_main--temp">${temp_f}</span></p>
  <p>Wind Speed: <span id="current_main--wind">${wind_mph} ${wind_dir}</span></p>
  `
  const currentWeatherContainer = document.querySelector("#current_main")
  currentWeatherContainer.innerHTML = "";
  currentWeatherContainer.insertAdjacentHTML("beforeend", currentHtml);

}

function buildForecast({date, day}) {
  return ` <div class="forecast_item">
  <p class="forecast__item--date">${date}</p>
  <p>Status: <span class="status">${day.condition.text}</span></p>
  <img src=${day.condition.icon} alt="${day.condition.text}">
  <p>UV Index: <span class="forecast__item--uv-index">${day.uv}</span></p>
  <p>High temp: <span class="forecast__item--hightemp">79.9&deg; F</span></p>
  <p>Chance of Rain: <span class="forecast__item--chance">87&percnt;</span></p>
  <p>Wind Speed: <span class="forecast__item--wind">11.9 mph S</span></p>
  </div>`
}

function displayForecast({forcastday}) {
  const forecastHTML = forecastday.reduce((stringBuilder, forecast) => {
      return stringBulder.concat(buildForecast(forecast));

  },"")

  const forecast = document.querySelector('.forecast_all')
  forecast.innerHTML = "";
  forecast.insertAdjacentHTML('beforeend', forecastHtml)
}

