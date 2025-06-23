// Function to handle Enter key press inside the input field
function handleKeyPress(event) {
    // If the key pressed is "Enter", call the fetchWeather function
    if (event.key === "Enter") {
        fetchWeather();
    }
}

// Asynchronous function to fetch and display weather data
async function fetchWeather() {
    // Get the value entered in the input field and remove leading/trailing spaces
    const city = document.getElementById('city').value.trim();

    // If input is empty, alert the user
    if (!city) return alert('Please enter a city name.');

    // OpenWeatherMap API key and endpoint URL
    const apiKey = "04da1fc566701286837d864813a966fd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        // Fetch weather data from the API
        const response = await fetch(url);
        const data = await response.json();

        // If city is not found or request fails, show an error message
        if (data.cod !== 200) {
            document.getElementById('weatherInfo').innerHTML = '<p>City not found</p>';
            return;
        }

        // Populate weather information in HTML elements
        document.getElementById('location').innerText = data.name;
        document.getElementById('temperature').innerText = `Temperature: ${Math.round(data.main.temp)}°C`;
        document.getElementById('humidity').innerHTML = `Humidity: ${data.main.humidity}% 
            <img src='images/humidity.png' alt='Humidity' width='20' height='20' style='vertical-align: middle;'/>`;
        document.getElementById('windSpeed').innerHTML = `Wind Speed: ${data.wind.speed} km/h 
            <img src='images/wind.png' alt='Wind' width='20' height='20' style='vertical-align: middle;'/>`;

        // Determine icon based on weather condition
        let iconPath = '';
        switch (data.weather[0].main.toLowerCase()) {
            case 'clear':   iconPath = 'images/clear.png'; break;
            case 'clouds':  iconPath = 'images/cloud.png'; break;
            case 'drizzle': iconPath = 'images/drizzle.png'; break;
            case 'rain':    iconPath = 'images/rain.png'; break;
            case 'snow':    iconPath = 'images/snow.png'; break;
            default:        iconPath = 'images/clear.png'; // fallback icon
        }

        // Update the weather icon and message visibility
        const weatherIcon = document.getElementById('weatherIcon');
        const weatherMessage = document.getElementById('weatherMessage');

        if (iconPath) {
            weatherIcon.src = iconPath;
            weatherIcon.style.display = "block";     // Show icon
            weatherMessage.style.display = "none";   // Hide default message
        } else {
            weatherIcon.style.display = "none";      // Hide icon
            weatherMessage.style.display = "block";  // Show default message
        }
    } catch (error) {
        // Handle any errors during the API call
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching the weather. Please try again.");
    }
}
