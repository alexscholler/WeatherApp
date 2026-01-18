# 🌦 Weather Forecast App

A beautiful, modern weather application with dynamic backgrounds and smooth animations. Built with vanilla JavaScript and deployed on Vercel with secure environment variables.

**🌐 Live Demo:** https://weatherapp-ten-rust.vercel.app

![Weather App](screenshot.png)

---

## ✨ Features

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful frosted glass effect cards with backdrop blur
- **Dynamic Weather Backgrounds**: CSS-drawn weather illustrations that change based on conditions:
  - ☀️ **Clear**: Animated sun with glowing rays
  - ☁️ **Clouds**: Layered cloud formations
  - 🌧️ **Rain**: Clouds with diagonal rain streaks
  - ⛈️ **Thunderstorm**: Dark clouds with lightning bolt
  - ❄️ **Snow**: Floating snowflakes with light clouds
  - 🌫️ **Mist/Fog**: Horizontal wavy fog layers
- **City Landmark Backgrounds**: Displays famous landmarks from searched cities using Unsplash API
- **Smooth Animations**: Fade-in effects, hover interactions, and animated weather elements
- **Poppins Font**: Clean, modern typography from Google Fonts
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices

### 🔍 Smart City Search
- **Autocomplete Dropdown**: Real-time city suggestions as you type (powered by OpenWeather Geocoding API)
- **Global Coverage**: Search any city worldwide with country and state disambiguation
- **Intelligent Debouncing**: Optimized API calls (300ms delay) to prevent rate limiting
- **Click to Select**: Choose from dropdown suggestions or type and press Enter

### 🌡️ Weather Information
- **Current Weather**: 
  - High-quality weather icons from OpenWeatherMap (150x150px @4x resolution)
  - Current temperature with "feels like" metric
  - Capitalized weather description
  - Wind speed (m/s), humidity (%), and cloud coverage (%)
  
- **Hourly Forecast**: Next 24 hours (8 intervals of 3-hour forecasts)
  - Time-based predictions
  - Emoji weather icons
  - Temperature trends

- **5-Day Forecast**: Extended daily predictions
  - Min/max temperatures per day
  - Weather conditions with large emoji icons
  - Organized by date

- **Interactive Charts**: 
  - Cloud coverage percentage over 24 hours
  - Rain probability visualization
  - Responsive Chart.js line charts
  - Automatic chart destruction and recreation on new searches

### 🔐 Security & Deployment
- **Vercel Deployment**: Hosted on Vercel with automatic deployments
- **API Key Protection**: Keys embedded in code but rate-limited by providers
- **Gitignore Protection**: Local `config.js` is gitignored for development
- **Environment Variables**: Production uses Vercel environment variables
- **CORS Enabled**: Proper cross-origin resource sharing setup

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Advanced gradients, animations, glassmorphism effects
- **Vanilla JavaScript** - ES6+ features, async/await, fetch API
- **Chart.js** - Data visualization for weather charts
- **Google Fonts** - Poppins font family

### APIs
- **[OpenWeatherMap API](https://openweathermap.org/api)** (Free Tier)
  - Prerequisites
- A code editor (VS Code recommended)
- Web browser (Chrome, Firefox, Edge, Safari)
- Git installed on your machine

### 1. Clone the repository
```bash
git clone https://github.com/alexscholler/WeatherApp.git
cd WeatherApp
```

### 2. Set up API Keys (Local Development)

**Get your free API keys:**
- **OpenWeather API**: Sign up at [https://openweathermap.org/api](https://openweathermap.org/api)
- **Unsplash API**: Register at [https://unsplash.com/developers](https://unsplash.com/developers)

**Configure the app:**
1. Copy the example config file:
   ```bash
   cp config.example.js config.js
   ```
2. Open `config.js` and add your API keys:
   ```javascript
   window.API_KEY = "your_openweather_api_key_here";
   window.UNSPLASH_ACCESS_KEY = "your_unsplash_access_key_here";
   ```

### 3. Run the app locally
Simply open `index.html` in your web browser. No build process or server required!

Or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.
api/                    # Vercel serverless functions (optional)
│   └── config.js          # API key endpoint (for advanced setup)
├── .vercel/               # Vercel deployment settings (gitignored)
├── index.html             # Main HTML file
├── style.css              # All styling and animations
├── script.js              # Weather fetching and UI logic
├── config.js              # API keys for local dev (gitignored)
├── config.example.js      # Template for API keys (safe to commit)
├── vercel.json            # Vercel configuration
├── .gitignore             # Protects sensitive files
├── .vercelignore          # Files to ignore in Vercel deployment
├── README.md              # This file
└── LICENSE   1: Deploy via Vercel Website (Easiest)

1. **Sign up for Vercel**
   - Go to [https://vercel.com/signup](https://vercel.com/signup)
   - Sign up with your GitHub account

2. **Import your repository**
   - Click "Add New Project" on your Vercel dashboard in development.

### For Development (Local)
- `config.js` contains your actual API keys and is **gitignored**
- Use `config.example.js` as a template
- Never commit your actual API keys to version control

### For Production (Vercel)
- API keys are stored as **encrypted environment variables** in Vercel
- Keys are injected at build/runtime
- Even if someone views your source code, they won't see the actual keys
- Vercel dashboard shows: `*****` instead of actual values

### Current Setup
- ✅ `config.js` is in `.gitignore`
- ✅ `config.example.js` is safe to commit (template only)
- ✅ `.vercel` folder is gitignored (contains project settings)
- ✅ Vercel environment variables are encrypted

**If you accidentally committed your keys:**
1. Regenerate new API keys from OpenWeather and Unsplash
2. Update them in Vercel environment variables
3. Update your local `config.js`
4. Consider using"

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add OPENWEATHER_API_KEY production
   # Paste your OpenWeather API key when prompted
   
   vercel env add UNSPLASH_ACCESS_KEY production
   # Paste your Unsplash access key when prompted
   ```

5. **Redeploy to Production**
   ```bash
   vercel --prod
   ```

### Vercel Configuration

The app includes a `vercel.json` file for deployment configuration:
```json
{}
```
Vercel auto-detects this as a static site and deploys it accordingly.

### Continuous Deployment

Once linked to Vercel:
- Every push to your `main` branch automatically deploys to production
- Pull requests create preview deployments
- No manual deployment needed after initial setup
1. Copy the example config file:
   ```bash
   cp config.example.js config.js
   ```
2. Open `config.js` and add your API keys:
   ```javascript
   const API_KEY = "your_openweather_api_key_here";
   const UNSPLASH_ACCESS_KEY = "your_unsplash_access_key_here";
   ```

### 3. Run the app
Simply open `index.html` in your web browser. No build process or server required!

---

## 📁 Project Structure

```
weather-app/
├── index.html          # Main HTML file
├── style.css           # All styling and animations
├── script.js           # Weather fetching and UI logic
├── config.js           # API keys (gitignored)
├── config.example.js   # Template for API keys
├── .gitignore          # Protects sensitive files
├── README.md           # This file
└── LICENSE             # License information
```

---

## 🔒 Security & GitHub

**⚠️ Important:** This app uses `.gitignore` to protect your API keys.

- `config.js` is **NOT** committed to GitHub
- Use `config.example.js` as a template
- Never commit your actual API keys to version control

**If you accidentally committed your keys:**
1. Regenerate new API keys from OpenWeather and Unsplash
2. Update `config.js` with the new keys
3. Consider using tools like `git-filter-repo` to remove keys from git history

---

## 🌟 Key Features Explained

### Dynamic Weather Backgrounds
Each weather condition displays unique CSS-drawn backgrounds:
- **Clear**: Animated sun with rays
- **Clouds**: Layered cloud formations
- **Rain**: Cloud + diagonal rain streaks
- **Thunderstorm**: Dark clouds with lightning bolt
- **Snow**: Falling snowflakes with light clouds
- **Mist/Fog**: Horizontal foggy layers

### City Landmark Backgrounds
When you search for a city, the app fetches a beautiful landmark image from that location using Unsplash's extensive photo library. If unavailable, it falls back to Lorem Picsum.

### Chaerver-side API key protection with Vercel serverless functions
- [ ] Save favorite cities to localStorage
- [ ] Temperature unit toggle (°C/°F)
- [ ] Dark/light mode toggle
- [ ] Extended 10-day forecast
- [ ] Air quality index (AQI)
- [ ] Weather alerts and warnings
- [ ] Geolocation support (detect current location)
- [ ] PWA support for offline functionality
- [ ] Multiple language support

---

## 🛠️ Technical Implementation

### API Integration
- **OpenWeatherMap API**: 
  - `/weather` endpoint for current conditions
  - `/forecast` endpoint for 5-day/3-hour predictions
  - `/geo/1.0/direct` endpoint for city autocomplete
- **Unsplash API**: `/search/photos` for city landmark images
- **Fallback**: Lorem Picsum for offline/rate-limited scenarios
- **Vercel** for free hosting and deployment

---

## 👤 Author

Created with ❤️ by [alexscholler](https://github.com/alexscholler)

**Live Demo:** https://weatherapp-ten-rust.vercel.app

---

## 📊 API Rate Limits

- **OpenWeather Free Tier**: 60 calls/minute, 1,000,000 calls/month
- **Unsplash Free Tier**: 50 requests/hour

Both are more than sufficient for personal use!

### Performance Optimizations
- Debounced autocomplete (300ms delay)
- Lazy loading of background images
- CSS animations for smooth transitions
- Minimal JavaScript bundling (vanilla JS, no frameworks)

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox layouts
- Backdrop-filter for glassmorphism (fallback for older browsers

## 📱 Responsive Design

The app automatically adapts to different screen sizes:
- **Desktop**: Full-width cards with side-by-side layouts
- **Tablet**: Adjusted grid layouts
- **Mobile**: Stacked vertical layout with optimized touch targets

---

## 🎯 Future Enhancements

- [ ] Save favorite cities to localStorage
- [ ] Temperature unit toggle (°C/°F)
- [ ] Dark/light mode toggle
- [ ] Extended 10-day forecast
- [ ] Air quality index (AQI)
- [ ] Weather alerts and warnings
- [ ] Geolocation support (detect current location)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenWeatherMap** for free weather data API
- **Unsplash** for beautiful city photography
- **Chart.js** for data visualization
- **Google Fonts** for Poppins font family

---

## 👤 Author

Created with ❤️ by [alexscholler](https://github.com/alexscholler)

---

**Happy Weather Checking! 🌤️**
