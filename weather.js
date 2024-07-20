document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("btn");
    const cityInput = document.getElementById("city");
    const weatherDisplay = document.querySelector(".weatherDisplay");
    weatherDisplay.style.color = "brown";
  
    button.addEventListener("click", () => {
      const city = cityInput.value;
      if (city) {
        getWeather(city);
      } else {
        alert("Please enter a city name.");
      }
    });
  
    async function getWeather(city) {
      const apiKey = "d41cfa305ebce7afff83892fe4cbde31";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("City not found");
        }
        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    }
  
    function displayWeather(data) {
      const { name, main, weather } = data;
      weatherDisplay.innerHTML = `
        <h3>Weather in ${name}</h3>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Condition: ${weather[0].description}</p>
      `;
    }
  });