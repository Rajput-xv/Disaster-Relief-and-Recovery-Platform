const router = require('express').Router();
const { getWeatherData } = require('../services/weatherService');

router.get('/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const weatherData = await getWeatherData(lat, lon);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;