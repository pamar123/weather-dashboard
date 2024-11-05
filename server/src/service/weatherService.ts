import * as dotenv from 'dotenv';
dotenv.config();

interface WeatherData {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
}

class WeatherService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY || '';
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getCoordinates(cityName: string): Promise<{ lat: number; lon: number }> {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`;
    const response = await fetch(geoUrl);
    const data = await response.json();
    
    if (!data.length) {
      throw new Error('City not found');
    }

    return {
      lat: data[0].lat,
      lon: data[0].lon
    };
  }

  async getWeatherData(cityName: string): Promise<WeatherData[]> {
    const coords = await this.getCoordinates(cityName);
    const weatherUrl = `${this.baseUrl}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${this.apiKey}&units=imperial`;
    
    const response = await fetch(weatherUrl);
    const data = await response.json();

    // Process current weather and next 5 days
    return this.processWeatherData(data, cityName);
  }

  private processWeatherData(data: any, cityName: string): WeatherData[] {
    const processedData: WeatherData[] = [];
    const today = new Date();
    
    // Current weather (first entry)
    processedData.push({
      city: cityName,
      date: today.toLocaleDateString(),
      icon: data.list[0].weather[0].icon,
      iconDescription: data.list[0].weather[0].description,
      tempF: Math.round(data.list[0].main.temp),
      windSpeed: Math.round(data.list[0].wind.speed),
      humidity: data.list[0].main.humidity
    });

    // Next 5 days
    for (let i = 1; i <= 5; i++) {
      const forecastData = data.list[i * 8 - 1]; // Get data for each day
      const forecastDate = new Date(today);
      forecastDate.setDate(today.getDate() + i);

      processedData.push({
        city: cityName,
        date: forecastDate.toLocaleDateString(),
        icon: forecastData.weather[0].icon,
        iconDescription: forecastData.weather[0].description,
        tempF: Math.round(forecastData.main.temp),
        windSpeed: Math.round(forecastData.wind.speed),
        humidity: forecastData.main.humidity
      });
    }

    return processedData;
  }
}

export default new WeatherService();
