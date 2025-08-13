async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) return alert("Please enter a city");

    // Geocoding API to get coordinates
    const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
    const geoData = await geoRes.json();
    if (!geoData[0]) return alert("City not found");

    const {lat, lon, name} = geoData[0];

    // One Call API for weather
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`);
    const data = await res.json();

    // Current weather
    document.getElementById("cityName").textContent = name;
    document.getElementById("temp").textContent = `Temperature: ${data.current.temp}°C`;
    document.getElementById("description").textContent = `Weather: ${data.current.weather[0].description}`;

    // Set background
    setWeatherBackground(data.current.weather[0].main);

    // Hourly forecast
    const hourlyDiv = document.getElementById("hourlyForecast");
    hourlyDiv.innerHTML = "";
    data.hourly.slice(0,24).forEach(hour => {
        const card = document.createElement("div");
        card.classList.add("forecast-card");
        card.innerHTML = `
            <p>${new Date(hour.dt*1000).getHours()}:00</p>
            <img src="https://openweathermap.org/img/wn/${hour.weather[0].icon}.png">
            <p>${hour.temp}°C</p>
        `;
        hourlyDiv.appendChild(card);
    });

    // Daily forecast
    const dailyDiv = document.getElementById("dailyForecast");
    dailyDiv.innerHTML = "";
    data.daily.forEach(day => {
        const card = document.createElement("div");
        card.classList.add("forecast-card");
        card.innerHTML = `
            <p>${new Date(day.dt*1000).toLocaleDateString()}</p>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
            <p>Max: ${day.temp.max}°C</p>
            <p>Min: ${day.temp.min}°C</p>
        `;
        dailyDiv.appendChild(card);
    });

    // Charts for clouds and rain
    const hours = data.hourly.slice(0,24).map(h => new Date(h.dt*1000).getHours() + ":00");
    const cloudData = data.hourly.slice(0,24).map(h => h.clouds);
    const rainData = data.hourly.slice(0,24).map(h => (h.pop||0)*100);

    renderChart("cloudChart", "Cloud Cover", hours, cloudData, "rgba(200,200,200,1)");
    renderChart("rainChart", "Rain Probability", hours, rainData, "rgba(0,123,255,1)");
}

function setWeatherBackground(mainWeather){
    document.body.className = "";
    switch(mainWeather.to
