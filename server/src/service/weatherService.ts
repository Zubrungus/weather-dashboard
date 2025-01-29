import dayjs, { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

export class Weather {
  city: string;
  date: Dayjs | string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  iconDescription: string;
  constructor(
    city: string,
    date: Dayjs | string,
    tempF: number,
    windSpeed: number,
    humidity: number,
    icon: string,
    iconDescription: string
  ) {
    this.city = city;
    this.date = date;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}

class WeatherService {

  private baseURL?: string;

  private apiKey?: string;

  private city = '';

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';

    this.apiKey = process.env.API_KEY || '';
  }

  async fetchWeather(cityName: string) {
    this.city = cityName;

    //Make API call to get geo coordinates
    const coordResponse = await fetch(`${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`);
    const parsedCoord = await coordResponse.json();

    const parsedName = parsedCoord[0].name;
    const lat = parsedCoord[0].lat;
    const lon = parsedCoord[0].lon;

    //Make weather API call with fetched coordinates
    const response = await fetch(`${this.baseURL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${this.apiKey}`)
    const parsedResponse = await response.json();

    //Build array of weather objects with received information
    const weatherArray: Weather[] = [];

    const currentDayWeather = new Weather(parsedName, dayjs().format('MM/DD/YYYY'), parsedResponse.current.temp, parsedResponse.current.wind_speed, parsedResponse.current.humidity, parsedResponse.current.weather[0].icon, parsedResponse.current.weather[0].description);
    weatherArray.push(currentDayWeather);

    for (let i = 0; i < 5; i++) {
      const forecastWeather = new Weather(parsedName, dayjs().add(i + 1, 'day').format('MM/DD/YYYY'), parsedResponse.daily[i].temp.max, parsedResponse.daily[i].wind_speed, parsedResponse.daily[i].humidity, parsedResponse.daily[i].weather[0].icon, parsedResponse.daily[i].weather[0].description);
      weatherArray.push(forecastWeather);
    };

    return weatherArray;
  }

}

export default new WeatherService();