document.getElementById("getWeatherBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        // Get coordinates for the city
        const geoRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const geoData = await geoRes.json();
        if (geoData.cod !== 200) {
            alert("City not found!");
            return;
        }

        const { lat, lon } = geoData.coord;

        // Get detailed forecast
        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await res.json();

        renderCurrentWeather(city, data.current);
        renderHourlyForecast(data.hourly);
        renderDailyForecast(data.daily);
        renderCharts(data.hourly);
        updateBackground(data.current.weather[0].main);
    } catch (err) {
        console.error("Error fetching weather:", err);
    }
}

function renderCurrentWeather(city, current) {
    document.getElementById("currentWeather").innerHTML = `
        <h2>${city}</h2>
        <p>${current.weather[0].description}</p>
        <p>Temperature: ${current.temp}°C</p>
        <p>Humidity: ${current.humidity}%</p>
        <p>Wind: ${current.wind_speed} m/s</p>
    `;
}

function renderHourlyForecast(hourly) {
    const hourlyDiv = document.getElementById("hourlyForecast");
    hourlyDiv.innerHTML = "";
    hourly.slice(0, 24).forEach(hour => {
        const time = new Date(hour.dt * 1000).getHours() + ":00";
        hourlyDiv.innerHTML += `
            <div class="forecast-item">
                <p>${time}</p>
                <img src="https://openweathermap.org/img/wn/${hour.weather[0].icon}.png" alt="">
                <p>${hour.temp}°C</p>
                <p>Clouds: ${hour.clouds}%</p>
                <p>Rain: ${(hour.pop * 100).toFixed(0)}%</p>
            </div>
        `;
    });
}

function renderDailyForecast(daily) {
    const dailyDiv = document.getElementById("dailyForecast");
    dailyDiv.innerHTML = "";
    daily.slice(0, 7).forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        dailyDiv.innerHTML += `
            <div class="forecast-item">
                <p>${date}</p>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="">
                <p>Max: ${day.temp.max}°C</p>
                <p>Min: ${day.temp.min}°C</p>
            </div>
        `;
    });
}

function renderCharts(hourly) {
    const hours = hourly.slice(0, 24).map(h => new Date(h.dt * 1000).getHours() + ":00");
    const cloudData = hourly.slice(0, 24).map(h => h.clouds);
    const rainData = hourly.slice(0, 24).map(h => h.pop * 100);

    new Chart(document.getElementById("cloudChart").getContext("2d"), {
        type: 'line',
        data: {
            labels: hours,
            datasets: [{
                label: "Cloud Cover (%)",
                data: cloudData,
                fill: true,
                backgroundColor: "rgba(200,200,200,0.5)",
                borderColor: "rgba(200,200,200,1)",
                tension: 0.4
            }]
        },
        options: { responsive: true, scales: { y: { max: 100 } } }
    });

    new Chart(document.getElementById("rainChart").getContext("2d"), {
        type: 'line',
        data: {
            labels: hours,
            datasets: [{
                label: "Rain Probability (%)",
                data: rainData,
                fill: true,
                backgroundColor: "rgba(0,123,255,0.5)",
                borderColor: "rgba(0,123,255,1)",
                tension: 0.4
            }]
        },
        options: { responsive: true, scales: { y: { max: 100 } } }
    });
}

function updateBackground(weatherMain) {
    let bg;
    switch (weatherMain.toLowerCase()) {
        case "clear": bg = "linear-gradient(to bottom, #87ceeb, #f0f8ff)"; break;
        case "clouds": bg = "linear-gradient(to bottom, #b0c4de, #d3d3d3)"; break;
        case "rain": bg = "linear-gradient(to bottom, #5f9ea0, #4682b4)"; break;
        case "snow": bg = "linear-gradient(to bottom, #e0ffff, #add8e6)"; break;
        default: bg = "linear-gradient(to bottom, #87ceeb, #f0f8ff)";
    }
    document.body.style.background = bg;
}