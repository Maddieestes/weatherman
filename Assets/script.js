// Access the form and weather info elements from the HTML
const searchForm = document.getElementById('search-form');
const weatherInfo = document.getElementById('weather-info');
const futureWeatherDisplay = document.getElementById('future-weather');

// submit event listener 
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const cityInput = document.getElementById('city-input').value;
  const apiKey = '33ee9dfc864e17e04017196eff4eca3a';

  // API requests to OpenWeatherMap
  const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`;

  fetch(fiveDayUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      for (let i = 2; i < data.list.length; i += 8) {
        const futureWeatherTemp = data.list[i].main.temp;
        const futureWeatherDate = data.list[i].dt_txt;
        console.log('---------------------')
        console.log('temp: ', futureWeatherTemp);
        console.log('date: ', futureWeatherDate)
        console.log('---------------------')

        futureWeatherDisplay.innerHTML += `
      <h1> ${futureWeatherDate}</h1>
      <h2>Five Day Forecast in ${cityInput}</h2>
      <p> Tempature ${futureWeatherTemp}</p>

      `;
      }
    })

    .catch(error => {
      console.log('Error:', error);
      futureWeatherDisplay.innerHTML = 'An error occurred while fetching weather data.';
    });

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      // Displays weather information
      const temperature = data.main.temp;

      weatherInfo.innerHTML = `
        <h2>Weather in ${cityInput}</h2>
        <p>Temperature: ${temperature}°C</p>
      `;
    })
    .catch(error => {
      console.log('Error:', error);
      weatherInfo.innerHTML = 'An error occurred while fetching weather data.';
    });
});