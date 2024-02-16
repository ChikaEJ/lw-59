import styles from './shoeCountries.module.css'
import country from '../../services/countries'
import ListOfCountries from '../../components/listOfCountries/ListOfCountries';
import { useEffect, useState } from 'react';
import CountryInfo from '../../components/CountryInfo/CountryInfo';

const ShowCountries = () => {
    const [countries, setCountries] = useState([]);
    const [countryInfo, setCountryInfo] = useState<any>([{ name: { common: "" }, capital: [''], flags: { png: '' } }]);

    const getCountries = async () => {
        const countriesFromApi = await country.getAll();
        setCountries(countriesFromApi.data)
    }

    useEffect(() => { getCountries() }, [])

    const showCountryInfo: React.MouseEventHandler<HTMLDivElement> = async (e) => {
        e.preventDefault();
        try {
            const { id } = e.currentTarget

            const countryFromApi = await country.getByName(id);
            console.log(countryFromApi.data);

            setCountryInfo(countryFromApi.data)
        } catch (error) {
            console.log("Cannot make request! Something wrong with countryname.");
            
        }

    }
    return (
        <div className={styles.showCountryBlock}>
            <div className={styles.countryList} >
                < ListOfCountries countries={countries} getCountryInfo={showCountryInfo} />
            </div>
            <div>
                < CountryInfo mainCountry={countryInfo} />
            </div>
        </div>
    )
}

export default ShowCountries;