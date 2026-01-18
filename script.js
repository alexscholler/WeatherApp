// API Keys - embedded for Vercel deployment
const API_KEY = 'bc29083ff91f6497ad4eb7297cdf1d78';
const UNSPLASH_ACCESS_KEY = '-WgqT7svHqWlWDWJzGtf8eTvhHr9yKsx0SN_RPgHZ1w';

// Initialize button on page load
window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-text');
    if (btn) {
        btn.textContent = 'Search';
    }
    const input = document.getElementById('city-input');
    if (input) {
        input.disabled = false;
    }
    const button = document.getElementById('get-weather-btn');
    if (button) {
        button.disabled = false;
    }
});

const cityInput = document.getElementById("city-input");
const autocompleteDropdown = document.getElementById("autocomplete-dropdown");
let debounceTimer;

document.getElementById("get-weather-btn").addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
        autocompleteDropdown.classList.remove("show");
    }
});

// Add Enter key support
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
            autocompleteDropdown.classList.remove("show");
        }
    }
});

// Autocomplete functionality
cityInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    
    clearTimeout(debounceTimer);
    
    if (query.length < 2) {
        autocompleteDropdown.classList.remove("show");
        return;
    }
    
    autocompleteDropdown.innerHTML = '<div class="autocomplete-loading">Searching...</div>';
    autocompleteDropdown.classList.add("show");
    
    debounceTimer = setTimeout(() => {
        searchCities(query);
    }, 300);
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".input-wrapper")) {
        autocompleteDropdown.classList.remove("show");
    }
});

async function searchCities(query) {
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);
        const cities = await response.json();
        
        if (cities.length === 0) {
            autocompleteDropdown.innerHTML = '<div class="autocomplete-loading">No cities found</div>';
            return;
        }
        
        autocompleteDropdown.innerHTML = cities.map(city => {
            const cityName = city.name;
            const state = city.state ? `, ${city.state}` : '';
            const country = city.country;
            const displayName = `${cityName}${state}, ${country}`;
            
            return `<div class="autocomplete-item" data-city="${cityName}">${displayName}</div>`;
        }).join('');
        
        // Add click handlers to autocomplete items
        document.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('click', () => {
                const cityName = item.dataset.city;
                cityInput.value = cityName;
                autocompleteDropdown.classList.remove('show');
                getWeather(cityName);
            });
        });
        
    } catch (err) {
        console.error('Error searching cities:', err);
        autocompleteDropdown.innerHTML = '<div class="autocomplete-loading">Error searching cities</div>';
    }
}

async function getWeather(city) {
    try {
        // Current weather
        const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const currentData = await currentRes.json();
        
        console.log('Current weather response:', currentData);
        
        if (currentData.cod !== 200) {
            alert(currentData.message);
            return;
        }
        displayCurrentWeather(currentData);

        // Show all sections
        document.getElementById('current-weather').classList.remove('hidden');
        document.querySelectorAll('.forecast-section, .chart-section').forEach(section => {
            section.classList.remove('hidden');
        });

        // Fetch city background (don't let it crash weather fetch)
        setCityBackground(currentData.name, currentData.sys.country).catch(err => {
            console.error('Background image failed to load:', err);
        });

        // Forecast data
        const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
        const forecastData = await forecastRes.json();
        
        console.log('Forecast response:', forecastData);
        
        displayHourlyForecast(forecastData.list);
        displayDailyForecast(forecastData.list);
        drawCharts(forecastData.list);

    } catch (err) {
        console.error('Full error details:', err);
        alert(`Failed to fetch weather data. Error: ${err.message}`);
    }
}

function displayCurrentWeather(data) {
    const div = document.getElementById("current-weather");
    const weatherClass = `weather-${data.weather[0].main.toLowerCase()}`;
    const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    
    // Remove all previous weather classes
    div.className = '';
    // Add new weather class for background
    div.classList.add(weatherClass);
    
    div.innerHTML = `
        <div style="position: relative; z-index: 1;">
            <img src="${weatherIcon}" alt="${data.weather[0].description}" style="width: 150px; height: 150px; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));">
        </div>
        <h2 style="position: relative; z-index: 1;">${data.name}, ${data.sys.country}</h2>
        <p style="font-size: 1.6rem; margin: 20px 0; position: relative; z-index: 1;">${data.weather[0].description}</p>
        <p style="font-size: 3.5rem; font-weight: 700; margin: 20px 0; position: relative; z-index: 1;">${data.main.temp.toFixed(1)}°C</p>
        <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; margin-top: 25px; position: relative; z-index: 1;">
            <p style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.5rem;">🌡️</span>
                Feels like ${data.main.feels_like.toFixed(1)}°C
            </p>
            <p style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.5rem;">💨</span>
                Wind ${data.wind.speed} m/s
            </p>
            <p style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.5rem;">💧</span>
                Humidity ${data.main.humidity}%
            </p>
            <p style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.5rem;">☁️</span>
                Clouds ${data.clouds.all}%
            </p>
        </div>
    `;
}

function getWeatherIcon(weatherMain) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '🌫️',
        'Haze': '🌫️',
        'Dust': '🌫️',
        'Fog': '🌫️',
        'Sand': '🌫️',
        'Ash': '🌫️',
        'Squall': '💨',
        'Tornado': '🌪️'
    };
    return icons[weatherMain] || '🌤️';
}

async function setCityBackground(city, country) {
    try {
        // Use Unsplash API for city landmark images
        const query = `${city} ${country} landmark cityscape`;
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`);
        
        // Fallback to Lorem Picsum with a city-based seed if Unsplash fails
        if (!response.ok) {
            const seed = city.toLowerCase().replace(/\s+/g, '-');
            const imageUrl = `https://picsum.photos/seed/${seed}/1920/1080`;
            document.body.style.setProperty('--city-bg', `url(${imageUrl})`);
            document.body.setAttribute('style', `background-image: linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%), url(${imageUrl}); background-size: cover; background-position: center; background-attachment: fixed;`);
            return;
        }
        
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const imageUrl = data.results[0].urls.regular;
            document.body.style.setProperty('--city-bg', `url(${imageUrl})`);
            document.body.setAttribute('style', `background-image: linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%), url(${imageUrl}); background-size: cover; background-position: center; background-attachment: fixed;`);
        } else {
            // Fallback to Lorem Picsum
            const seed = city.toLowerCase().replace(/\s+/g, '-');
            const imageUrl = `https://picsum.photos/seed/${seed}/1920/1080`;
            document.body.setAttribute('style', `background-image: linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%), url(${imageUrl}); background-size: cover; background-position: center; background-attachment: fixed;`);
        }
    } catch (err) {
        console.error('Error fetching city background:', err);
        // Keep default gradient background on error
    }
}

function displayHourlyForecast(list) {
    const hourlyDiv = document.getElementById("hourly-forecast");
    hourlyDiv.innerHTML = "";
    const next24h = list.slice(0, 8); // first 8 entries = 24 hours
    next24h.forEach(item => {
        const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const icon = getWeatherIcon(item.weather[0].main);
        hourlyDiv.innerHTML += `
            <div class="forecast-item">
                <p>${time}</p>
                <p style="font-size: 2rem; margin: 10px 0;">${icon}</p>
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
            days[date] = { temps: [], descriptions: [], mains: [] };
        }
        days[date].temps.push(item.main.temp);
        days[date].descriptions.push(item.weather[0].description);
        days[date].mains.push(item.weather[0].main);
    });

    Object.keys(days).slice(0, 5).forEach(date => {
        const temps = days[date].temps;
        const desc = days[date].descriptions[0];
        const icon = getWeatherIcon(days[date].mains[0]);
        dailyDiv.innerHTML += `
            <div class="forecast-item">
                <p>${date}</p>
                <p style="font-size: 2.5rem; margin: 15px 0;">${icon}</p>
                <p>${desc}</p>
                <p>${Math.min(...temps).toFixed(1)}°C - ${Math.max(...temps).toFixed(1)}°C</p>
            </div>
        `;
    });
}

let weatherChart = null;

function drawCharts(list) {
    const ctx = document.getElementById("weather-chart").getContext("2d");
    const labels = list.slice(0, 8).map(item => new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit' }));
    const clouds = list.slice(0, 8).map(item => item.clouds.all);
    const rain = list.slice(0, 8).map(item => item.pop * 100);

    // Destroy existing chart if it exists
    if (weatherChart) {
        weatherChart.destroy();
    }

    weatherChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                { label: 'Clouds (%)', data: clouds, borderColor: 'white', fill: false },
                { label: 'Rain Probability (%)', data: rain, borderColor: 'blue', fill: false }
            ]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: true,
            plugins: { 
                legend: { labels: { color: 'white' } } 
            }, 
            scales: { 
                y: { ticks: { color: 'white' } }, 
                x: { ticks: { color: 'white' } } 
            } 
        }
    });
}