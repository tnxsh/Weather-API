const express = require('express');
const axios = require('axios');
const cors = require('cors');
const db = require('./db'); // Import the MySQL connection pool
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Route to fetch and save weather data
app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;

    try {
        // Fetch weather data from OpenWeatherMap API
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const weatherData = response.data;

        // Prepare values for SQL insertion
        const query = `
            INSERT INTO weather (city, temperature, description, humidity, wind_speed)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [
            weatherData.name,
            weatherData.main.temp,
            weatherData.weather[0].description,
            weatherData.main.humidity,
            weatherData.wind.speed
        ];

        // Execute the query to save data in MySQL
        await db.execute(query, values);

        // Send weather data as a JSON response
        res.json({
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            wind_speed: weatherData.wind.speed
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Route to fetch search history
app.get('/history', async (req, res) => {
    try {
        const query = `
            SELECT city, temperature, description, humidity, wind_speed, DATE_FORMAT(date_fetched, '%Y-%m-%d %H:%i:%s') AS dateFetched 
            FROM weather 
            ORDER BY date_fetched DESC
        `;

        const [results] = await db.execute(query);
        res.json(results);
    } catch (error) {
        console.error('Error fetching search history:', error);
        res.status(500).json({ error: 'Failed to fetch search history' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
