import axios from "axios";

class Country {
  BASE_URL = "https://restcountries.com/v3.1/";

  async getAll() {
    const allCountries = await axios.get(this.BASE_URL + "all");
    return allCountries;
  }

  async getByName(name: string | null) {
    const country = await axios.get(this.BASE_URL + "alpha/" + name);
    return country;
  }

  async getBorderedCountriesInfo(countries: string[]){
    const countryRequests = await Promise.all(countries.map(country => {
        return axios.get(this.BASE_URL + "alpha/" + country);
    }))
    const allCountriesNames = countryRequests.map(country => country.data[0].name.common);
    return allCountriesNames;
  }
}
const country = new Country();
export default country;
