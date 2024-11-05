import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface City {
  id: string;
  name: string;
}

class HistoryService {
  private filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, '../searchHistory.json');
  }

  async getCities(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data).cities;
    } catch (error) {
      return [];
    }
  }

  async addCity(cityName: string): Promise<City> {
    const cities = await this.getCities();
    
    // Check if city already exists
    if (!cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
      const newCity = {
        id: uuidv4(),
        name: cityName
      };
      
      cities.push(newCity);
      await fs.writeFile(this.filePath, JSON.stringify({ cities }, null, 2));
      return newCity;
    }
    
    return cities.find(city => city.name.toLowerCase() === cityName.toLowerCase())!;
  }

  async deleteCity(id: string): Promise<void> {
    const cities = await this.getCities();
    const updatedCities = cities.filter(city => city.id !== id);
    await fs.writeFile(this.filePath, JSON.stringify({ cities: updatedCities }, null, 2));
  }
}

export default new HistoryService();