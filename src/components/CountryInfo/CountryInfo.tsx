import { useEffect, useState } from 'react';
import styles from './CountryInfo.module.css'
import country from '../../services/countries';
interface ICountryInfoProps{
    mainCountry: any[];
}
const CountryInfo: React.FC<ICountryInfoProps> = ({mainCountry}) => {
    const [borderingCountries, setBorderingCountries] = useState<string[]>([]);
    const getBordCountry = async () => {
        const response = await country.getBorderedCountriesInfo(mainCountry[0].borders);
        setBorderingCountries(response);
    }
    useEffect(()=>{
        if(mainCountry[0].borders){
            getBordCountry();
        }else{
            setBorderingCountries(["NO borders"])
        }

    }, [mainCountry[0].borders])
    return(
        <div>
            <h1><span className={styles.infoText}>{mainCountry[0].name.official}</span></h1>
            <h3>Capital city: <span className={styles.infoText} >{mainCountry[0].capital[0]}</span></h3>
            <img src={mainCountry[0].flags.png} alt="flag" width="500"/>
            <h3>Bordering countries: </h3>
            {
                borderingCountries.map((country, i) => {
                    return(
                        <p className={styles.infoText} key={i}>{country}</p>
                    )
                })
            }
        </div>
    )
}

export default CountryInfo;