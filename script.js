const apiKey = "20f8b6acde5f0fc5a93370e039440fc6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// https://api.openweathermap.org/data/2.5/weather?q=lucknow&appid=20f8b6acde5f0fc5a93370e039440fc6
// https://api.openweathermap.org/data/2.5/weather?units=metric&q=lucknow&appid=20f8b6acde5f0fc5a93370e039440fc6

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorContainer = document.querySelector(".error");
const weatherContainer = document.querySelector(".weather");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".weatherTemp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

checkWeather('Delhi');
async function checkWeather(city) {

    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

    const data = await response.json();
    console.log(data);
    if (response.status === 404) {
        errorContainer.style.display = "block";
        weatherContainer.style.display = "none";
       
    }
    else {
        cityElement.innerHTML = data.name;
        tempElement.innerHTML = `${Math.round(data.main.temp)}°c`;
        humidityElement.innerHTML = `${data.main.humidity}%`;
        windElement.innerHTML = `${data.wind.speed} km/h`;

        const typeOfWeather = data.weather[0].main.toLowerCase();
        console.log(typeOfWeather);
        document.querySelector('.typeOfWeather').innerText = `${typeOfWeather}`;
        const imagePath = `images/${typeOfWeather}.svg`;
        const defaultImagePath = 'images/not-available.svg';

        const image = new Image();
        image.onload = () => weatherIcon.src = imagePath;
        image.onerror = () => weatherIcon.src = defaultImagePath;
        image.src = imagePath;

        weatherContainer.style.display = "block";
        errorContainer.style.display = "none";
    }
}



searchBox.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        searchBtn.click();
    }
});

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});