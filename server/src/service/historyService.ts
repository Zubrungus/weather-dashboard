import fs from 'node:fs/promises';

class City {
  name: string;
  id: number;

  constructor(name: string, id: number){
    this.name = name;
    this.id = id;
  }
}


class HistoryService {
  private async read() {
    return await fs.readFile('./db/searchHistory.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
  }

  private async write(cities: City[]) {
    return await fs.writeFile('./db/searchHistory.json', JSON.stringify(cities, null, '\t'));
  }


  async getCities() {
    return await this.read().then((cities) =>{
      let parsedCities: City[];

      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch(err){
        parsedCities = [];
      }

      return parsedCities;
    });
  }

  async addCity(city: string) {
    if (!city) {
      throw new Error('city cannot be blank');
    }

    const newCity: City = { name: city, id: 0 };

    // Get all cities, add the new city, write all the updated cities, return the newCity
    return await this.getCities()
      .then((cities) => {
        if (cities.find((index) => index.name === city)) {
          return cities;
        }
        newCity.id = cities.length;
        return [...cities, newCity];
      })
      .then((updatedCities) => this.write(updatedCities))
      .then(() => newCity);
  }

  
  /* BONUS TASK: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {

  }*/
}

export default new HistoryService();
