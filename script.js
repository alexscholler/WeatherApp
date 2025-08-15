document.getElementById("get-weather-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        // Current weather
        const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const currentData = await currentRes.json();
        if (currentData.cod !== 200) {
            alert(currentData.message);
            return;
        }
        displayCurrentWeather(currentData);

        // Forecast data
        const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
        const forecastData = await forecastRes.json();
        displayHourlyForecast(forecastData.list);
        displayDailyForecast(forecastData.list);
        drawCharts(forecastData.list);

    } catch (err) {
        console.error(err);
        alert("Failed to fetch weather data.");
    }
}

function displayCurrentWeather(data) {
    const div = document.getElementById("current-weather");
    div.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].description}</p>
        <p>🌡️ ${data.main.temp.toFixed(1)}°C</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
        <p>☁️ Clouds: ${data.clouds.all}%</p>
    `;
}

function displayHourlyForecast(list) {
    const hourlyDiv = document.getElementById("hourly-forecast");
    hourlyDiv.innerHTML = "";
    const next24h = list.slice(0, 8); // first 8 entries = 24 hours
    next24h.forEach(item => {
        const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        hourlyDiv.innerHTML += `
            <div class="forecast-item">
                <p>${time}</p>
                <p>${item.weather[0].description}</p>
                <p>${item.main.temp.toFixed(1)}°C</p>
            </div>
        `;
    });
}

function displayDailyForecast(list) {
    const dailyDiv = document.getElementById("daily-forecast");
    dailyDiv.innerHTML = "";
    const days = {};

    list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!days[date]) {
            days[date] = { temps: [], descriptions: [] };
        }
        days[date].temps.push(item.main.temp);
        days[date].descriptions.push(item.weather[0].description);
    });

    Object.keys(days).slice(0, 5).forEach(date => {
        const temps = days[date].temps;
        const desc = days[date].descriptions[0];
        dailyDiv.innerHTML += `
            <div class="forecast-item">
                <p>${date}</p>
                <p>${desc}</p>
                <p>${Math.min(...temps).toFixed(1)}°C - ${Math.max(...temps).toFixed(1)}°C</p>
            </div>
        `;
    });
}

function drawCharts(list) {
    const ctx = document.getElementById("weather-chart").getContext("2d");
    const labels = list.slice(0, 8).map(item => new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit' }));
    const clouds = list.slice(0, 8).map(item => item.clouds.all);
    const rain = list.slice(0, 8).map(item => item.pop * 100);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                { label: 'Clouds (%)', data: clouds, borderColor: 'white', fill: false },
                { label: 'Rain Probability (%)', data: rain, borderColor: 'blue', fill: false }
            ]
        },
        options: { responsive: true, plugins: { legend: { labels: { color: 'white' } } }, scales: { y: { ticks: { color: 'white' } }, x: { ticks: { color: 'white' } } } }
    });
}