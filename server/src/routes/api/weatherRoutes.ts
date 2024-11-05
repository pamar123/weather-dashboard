// src/routes/api/weatherRoutes.ts
import { Router, Request, Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

interface WeatherRequest extends Request {
  body: {
    cityName: string;
  };
}

const router = Router();

// POST request to get weather data
router.post('/', async (req: WeatherRequest, res: Response): Promise<void> => {
  try {
    const { cityName } = req.body;
    if (!cityName) {
      res.status(400).json({ error: 'City name is required' });
      return;
    }

    const weatherData = await WeatherService.getWeatherData(cityName);
    await HistoryService.addCity(cityName);
    
    res.json(weatherData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response): Promise<void> => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE city from history
router.delete('/history/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    await HistoryService.deleteCity(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;