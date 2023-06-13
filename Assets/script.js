// Access the form and weather info elements from the HTML
const searchForm = document.getElementById('search-form');
const weatherInfo = document.getElementById('weather-info');
const futureWeatherDisplay = document.getElementById('future-weather');

// event listener for the form submit event
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const cityInput = document.getElementById('city-input').value;
  const apiKey = '33ee9dfc864e17e04017196eff4eca3a';

  // Make API request to OpenWeatherMap
  const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`;

  fetch(fiveDayUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      for (let i = 2; i < data.list.length; i += 8) {
        const futureWeatherTemp = data.list[i].main.temp;
        const futureWeatherDescription = data.list[i].weather[0].description
        const futureWeatherDate = data.list[i].dt_txt;
        console.log('---------------------')
        console.log('temp: ', futureWeatherTemp);
        console.log('description: ', futureWeatherDescription);
        console.log('date: ', futureWeatherDate)
        console.log('---------------------')

        futureWeatherDisplay.innerHTML += `
      <h1> ${futureWeatherDate}</h1>
      <h2>Future Five Day Forecast in ${cityInput}</h2>
      <p> Tempatures ${futureWeatherTemp}</p>
      <p id="futureWeatherTemp"> Sky conditions ${futureWeatherDescription}</p>

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
      // Display weather information
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;

      weatherInfo.innerHTML = `
        <h2>Weather in ${cityInput}</h2>
        <p>Description: ${weatherDescription}</p>
        <p>Temperature: ${temperature}°C</p>
      `;
    })
    .catch(error => {
      console.log('Error:', error);
      weatherInfo.innerHTML = 'An error occurred while fetching weather data.';
    });
});