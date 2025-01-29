import { Router } from 'express';
import {Weather} from '../../service/weatherService.js';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';


router.post('/', async (req, res) => {
  
  try{
    //Receive array of weather objects, add the city to the history, and respond with the weather array
    let weatherArray: Weather[] = await WeatherService.fetchWeather(req.body.cityName);
    HistoryService.addCity(weatherArray[0].city);
    res.json(weatherArray);
  } catch(err){
    console.error(err);
    res.status(500).json(err);
  }
  
});

router.get('/history', async (_req, res) => {
  try{
    //Get saved cities and respond with them
    const savedCities = await HistoryService.getCities();
    res.json(savedCities)
  }catch(err){
    console.error(err);
    res.status(500).json(err);
  }
});

/* BONUS TASK: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});*/

export default router
