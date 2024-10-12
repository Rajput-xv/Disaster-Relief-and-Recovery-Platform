const axios = require('axios');

const getWeatherData = async (latitude, longitude) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

module.exports = { getWeatherData };