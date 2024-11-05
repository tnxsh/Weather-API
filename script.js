// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for the Get Weather button
    document.getElementById('getWeatherButton').addEventListener('click', async () => {
        const city = document.getElementById('cityInput').value; // Get the city input value
        const weatherInfoDiv = document.getElementById('weatherInfo'); // Div to display weather information
        const loading = document.getElementById('loading'); // Div to display loading indicator

        loading.style.display = 'block'; // Show loading indicator
        weatherInfoDiv.innerHTML = ''; // Clear previous weather info

        try {
            const response = await fetch(`/weather/${city}`); // Fetch weather data from the server
            const weatherData = await response.json(); // Parse JSON response

            if (response.ok) {
                // If the response is successful, display the weather information
                weatherInfoDiv.innerHTML = `
                    <h2>Weather in ${weatherData.city}</h2>
                    <p>Temperature: ${weatherData.temperature} °C</p>
                    <p>Description: ${weatherData.description}</p>
                    <p>Humidity: ${weatherData.humidity}%</p>
                    <p>Wind Speed: ${weatherData.wind_speed} m/s</p> <!-- Use weatherData.wind_speed -->
                `;
            } else {
                // If the response is not successful, display the error message
                weatherInfoDiv.innerHTML = `<p>Error: ${weatherData.error}</p>`;
            }
        } catch (error) {
            // Catch any errors that occur during the fetch operation
            weatherInfoDiv.innerHTML = `<p>Error: Failed to fetch weather data</p>`;
        } finally {
            loading.style.display = 'none'; // Hide loading indicator after the request is completed
        }
    });

    // Add event listener for the History button
    document.getElementById('historyButton').addEventListener('click', async () => {
        const historyResultDiv = document.getElementById('historyInfo'); // Div to display search history
        historyResultDiv.innerHTML = ''; // Clear previous history info

        try {
            const response = await fetch('/history'); // Fetch history from server
            const historyData = await response.json(); // Parse JSON response

            if (response.ok) {
                if (historyData.length > 0) {
                    historyResultDiv.innerHTML = '<h2>Search History</h2><ul>';
                    historyData.forEach(entry => {
                        historyResultDiv.innerHTML += `<li>${entry.city} - ${entry.dateFetched}</li>`; // Adjust based on your schema
                    });
                    historyResultDiv.innerHTML += '</ul>';
                } else {
                    historyResultDiv.innerHTML = '<p>No search history found.</p>';
                }
            } else {
                historyResultDiv.innerHTML = `<p>Error: ${historyData.error}</p>`;
            }
        } catch (error) {
            historyResultDiv.innerHTML = `<p>Error: Failed to fetch history data</p>`;
        }
    });
});
