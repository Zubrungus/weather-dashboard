import dayjs, { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

// TODO: Define a class for the Weather object
class Weather {
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

// TODO: Complete the WeatherService class
class WeatherService {
  
  private baseURL?: string;

  private apiKey?: string;

  private city = '';

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';

    this.apiKey = process.env.API_KEY || '';
  }
  async fetchWeather(cityName: string){
  // TODO: method to fetch weather based on city 
  // TODO: method to fetch 5 day forecast based on lon and lat 
//base URL from instructions: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  // TODO: method to build and return your array of weather objects
  
  //returned object wants city, date, icon, iconDescription, tempF, windSpeed, humidity
  this.city = cityName;
  const initialResponse = await fetch(`${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`);
  const parsedCity = await initialResponse.json();
  
  const parsedName = parsedCity.name;
  const lat = parsedCity.lat;
  const lon = parsedCity.lon;

  const response = await fetch(`${this.baseURL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${this.apiKey}`)
  const parsedResponse = response.json();

  
};
}

export default new WeatherService();