// ===== API Configuration =====
const API_KEY = "a5f4c242ca835808f4e3b32c52205449";
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ===== Global State =====
let currentUnit = 'C'; // C for Celsius, F for Fahrenheit
let currentWeatherData = null;

// ===== DOM Elements =====
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const currentWeather = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecastSection');
const unitButtons = document.querySelectorAll('.unit-btn');

// ===== Event Listeners =====
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
locationBtn.addEventListener('click', handleGeolocation);

// Temperature unit toggle
unitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const unit = btn.dataset.unit;
        if (unit !== currentUnit && currentWeatherData) {
            currentUnit = unit;
            updateUnitButtons();
            updateTemperatureDisplay();
        }
    });
});

// ===== Main Functions =====

/**
 * Handle search button click
 */
function handleSearch() {
    const city = cityInput.value.trim();

    if (!city) {
        showError('Please enter a city name');
        return;
    }

    fetchWeather(city);
}

/**
 * Handle geolocation button click
 */
function handleGeolocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading();

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchByLocation(latitude, longitude);
        },
        (error) => {
            hideLoading();
            showError('Unable to retrieve your location. Please check your browser permissions.');
            console.error('Geolocation error:', error);
        }
    );
}

/**
 * Fetch weather data by city name
 * @param {string} city - City name
 */
async function fetchWeather(city) {
    showLoading();

    try {
        // Fetch current weather
        const currentResponse = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!currentResponse.ok) {
            throw new Error('City not found');
        }

        const currentData = await currentResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!forecastResponse.ok) {
            throw new Error('Forecast data not available');
        }

        const forecastData = await forecastResponse.json();

        // Store current weather data
        currentWeatherData = currentData;

        // Render data
        renderCurrentWeather(currentData);
        renderForecast(forecastData);

        hideLoading();
        hideError();

    } catch (error) {
        hideLoading();
        showError(error.message || 'Failed to fetch weather data. Please try again.');
        console.error('Fetch error:', error);
    }
}

/**
 * Fetch weather data by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
async function fetchByLocation(lat, lon) {
    try {
        // Fetch current weather
        const currentResponse = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        if (!currentResponse.ok) {
            throw new Error('Unable to fetch weather for your location');
        }

        const currentData = await currentResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        if (!forecastResponse.ok) {
            throw new Error('Forecast data not available');
        }

        const forecastData = await forecastResponse.json();

        // Store current weather data
        currentWeatherData = currentData;

        // Render data
        renderCurrentWeather(currentData);
        renderForecast(forecastData);

        hideLoading();
        hideError();

    } catch (error) {
        hideLoading();
        showError(error.message || 'Failed to fetch weather data. Please try again.');
        console.error('Fetch error:', error);
    }
}

/**
 * Render current weather data
 * @param {Object} data - Weather data from API
 */
function renderCurrentWeather(data) {
    // Update city name and date
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('currentDate').textContent = formatDate(new Date());

    // Update weather icon
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    document.getElementById('weatherIcon').alt = data.weather[0].description;

    // Update temperature and description
    updateTemperatureDisplay();
    document.getElementById('weatherDescription').textContent = data.weather[0].description;

    // Update temperature range
    const tempHigh = currentUnit === 'C' ? data.main.temp_max : celsiusToFahrenheit(data.main.temp_max);
    const tempLow = currentUnit === 'C' ? data.main.temp_min : celsiusToFahrenheit(data.main.temp_min);
    document.getElementById('tempHigh').textContent = `${Math.round(tempHigh)}°`;
    document.getElementById('tempLow').textContent = `${Math.round(tempLow)}°`;

    // Update weather details
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

    const feelsLike = currentUnit === 'C' ? data.main.feels_like : celsiusToFahrenheit(data.main.feels_like);
    document.getElementById('feelsLike').textContent = `${Math.round(feelsLike)}°${currentUnit}`;

    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    document.getElementById('cloudiness').textContent = `${data.clouds.all}%`;

    // Update sunrise and sunset
    document.getElementById('sunrise').textContent = formatTime(data.sys.sunrise, data.timezone);
    document.getElementById('sunset').textContent = formatTime(data.sys.sunset, data.timezone);

    // Show current weather section
    currentWeather.classList.remove('hidden');
}

/**
 * Render 3-day forecast
 * @param {Object} data - Forecast data from API
 */
function renderForecast(data) {
    const forecastGrid = document.getElementById('forecastGrid');
    forecastGrid.innerHTML = ''; // Clear previous forecast

    // Filter forecast data to get one entry per day (around noon)
    const dailyForecasts = data.list.filter(item => {
        const date = new Date(item.dt * 1000);
        const hours = date.getHours();
        return hours >= 11 && hours <= 13; // Get forecast around noon
    }).slice(0, 3); // Get only 3 days

    // Create forecast cards
    dailyForecasts.forEach(forecast => {
        const forecastCard = createForecastCard(forecast);
        forecastGrid.appendChild(forecastCard);
    });

    // Show forecast section
    forecastSection.classList.remove('hidden');
}

/**
 * Create a forecast card element
 * @param {Object} forecast - Single forecast data
 * @returns {HTMLElement} Forecast card element
 */
function createForecastCard(forecast) {
    const card = document.createElement('div');
    card.className = 'forecast-card';

    const date = new Date(forecast.dt * 1000);
    const iconCode = forecast.weather[0].icon;

    const temp = currentUnit === 'C' ? forecast.main.temp : celsiusToFahrenheit(forecast.main.temp);

    card.innerHTML = `
        <div class="forecast-date">${formatForecastDate(date)}</div>
        <img 
            src="https://openweathermap.org/img/wn/${iconCode}@2x.png" 
            alt="${forecast.weather[0].description}"
            class="forecast-icon"
        >
        <div class="forecast-temp">${Math.round(temp)}°${currentUnit}</div>
        <div class="forecast-description">${forecast.weather[0].description}</div>
    `;

    return card;
}

// ===== Temperature Conversion =====

/**
 * Convert Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

/**
 * Update temperature display based on current unit
 */
function updateTemperatureDisplay() {
    if (!currentWeatherData) return;

    const temp = currentUnit === 'C'
        ? currentWeatherData.main.temp
        : celsiusToFahrenheit(currentWeatherData.main.temp);

    document.getElementById('temperature').textContent = `${Math.round(temp)}°${currentUnit}`;

    // Update feels like
    const feelsLike = currentUnit === 'C'
        ? currentWeatherData.main.feels_like
        : celsiusToFahrenheit(currentWeatherData.main.feels_like);
    document.getElementById('feelsLike').textContent = `${Math.round(feelsLike)}°${currentUnit}`;

    // Update temp range
    const tempHigh = currentUnit === 'C'
        ? currentWeatherData.main.temp_max
        : celsiusToFahrenheit(currentWeatherData.main.temp_max);
    const tempLow = currentUnit === 'C'
        ? currentWeatherData.main.temp_min
        : celsiusToFahrenheit(currentWeatherData.main.temp_min);
    document.getElementById('tempHigh').textContent = `${Math.round(tempHigh)}°`;
    document.getElementById('tempLow').textContent = `${Math.round(tempLow)}°`;

    // Update forecast cards if they exist
    const forecastCards = document.querySelectorAll('.forecast-card');
    if (forecastCards.length > 0) {
        // Re-render forecast with new unit
        // This would require storing forecast data, but for simplicity we'll just update on next fetch
    }
}

/**
 * Update active state of unit buttons
 */
function updateUnitButtons() {
    unitButtons.forEach(btn => {
        if (btn.dataset.unit === currentUnit) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ===== Utility Functions =====

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format forecast date to short format
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
function formatForecastDate(date) {
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format Unix timestamp to time string
 * @param {number} timestamp - Unix timestamp
 * @param {number} timezone - Timezone offset in seconds
 * @returns {string} Formatted time string
 */
function formatTime(timestamp, timezone) {
    const date = new Date((timestamp + timezone) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${displayHours}:${displayMinutes} ${ampm}`;
}

/**
 * Show loading spinner
 */
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    currentWeather.classList.add('hidden');
    forecastSection.classList.add('hidden');
    errorMessage.classList.add('hidden');
}

/**
 * Hide loading spinner
 */
function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    errorMessage.querySelector('p').textContent = message;
    errorMessage.classList.remove('hidden');
    currentWeather.classList.add('hidden');
    forecastSection.classList.add('hidden');
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.classList.add('hidden');
}

// ===== Initialize =====
window.addEventListener('load', () => {
    // Optional: Load default city on page load
    // fetchWeather('London');

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});
 