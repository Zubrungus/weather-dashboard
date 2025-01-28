import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  
  try{
    // TODO: GET weather data from city name
    // TODO: save city to search history
    
    
  } catch{
    
  }

});

router.get('/history', async (req, res) => {
  // TODO: GET search history

});

// * BONUS TASK: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
