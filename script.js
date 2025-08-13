document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  if (city) {
    getWeather(city);
    getForecast(city);
  }
});

function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("city-name").textContent = data.name;
      document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
      document.getElementById("humidity").textContent = `${data.main.humidity}%`;
      document.getElementById("wind").textContent = `${data.wind.speed} km/h`;
      document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("sunrise").textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      document.getElementById("sunset").textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    })
    .catch(() => alert("City not found"));
}

function getForecast(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const forecastContainer = document.querySelector(".forecast");
      forecastContainer.innerHTML = "";

      const daily = {};
      data.list.forEach(item => {
        const date = new Date(item.dt_txt).toLocaleDateString();
        if (!daily[date]) {
          daily[date] = item;
        }
      });

      Object.values(daily).slice(0, 5).forEach(day => {
        const card = document.createElement("div");
        card.classList.add("forecast-card");
        card.innerHTML = `
          <p>${new Date(day.dt_txt).toLocaleDateString()}</p>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" />
          <p>${Math.round(day.main.temp)}°C</p>
        `;
        forecastContainer.appendChild(card);
      });
    });
}