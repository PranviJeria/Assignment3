// OpenWeatherMap API key
const API_KEY = "94bc8e30873a4bd19e8d0ae6a3963869"; 

const getWeatherBtn = document.getElementById("getWeather");
const cityInput = document.getElementById("cityInput");
const weatherOutput = document.getElementById("weatherOutput");

// Event listener for button click
getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) return alert("Please enter a city name");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            // Display weather info
            weatherOutput.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Feels like: ${data.main.feels_like} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        })
        .catch(err => {
            weatherOutput.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
        });
});
