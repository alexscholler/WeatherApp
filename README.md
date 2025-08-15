# 🌦 Weather App

A simple, responsive weather application that uses the **free tier** of the [OpenWeather API](https://openweathermap.org/api) to display:

- **Current weather** for any city
- **Next 24 hours** (3-hour intervals)
- **Next 5 days** forecast
- **Cloud coverage** and **rain probability** charts

The app runs entirely in the browser, works on GitHub Pages, and requires no backend.

---

## 🚀 Features
- **Current Weather**: Temperature, description, wind, and cloud cover.
- **Hourly Forecast**: Next 8 intervals (24 hours) from the 3-hour forecast API.
- **Daily Forecast**: Groups the 3-hour forecast into daily summaries (min/max temp).
- **Weather Charts**: Displays cloud coverage and rain probability over the next 24 hours using Chart.js.
- **Responsive Design**: Works on desktop and mobile.
- **Free API Support**: Only uses endpoints available in the free plan (`/weather` and `/forecast`).

---

## 📷 Screenshot
![Weather App Screenshot](screenshot.png)

---

## 🛠 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/alexscholler/WeatherApp.git
   cd weather-app
