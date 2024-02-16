import styles from './ListOfCountries.module.css'
interface IListOfCountriesProps{
    countries: any[];
    getCountryInfo: (e: React.MouseEvent<HTMLDivElement>)=>void;
}
const ListOfCountries: React.FC<IListOfCountriesProps> = ({countries, getCountryInfo}) => {
    return(
        <div>
            {
                countries.map((country, i) => {
                    return <div key={i} className={styles.countryListItem} onClick={(e)=>getCountryInfo(e)} id={country.cca3}  > {country.name.common}</div>;
                })
            }
        </div>
    )
}

export default ListOfCountries;