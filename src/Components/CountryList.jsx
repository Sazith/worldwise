/* eslint-disable react/prop-types */
import { useCities } from "../Contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

// eslint-disable-next-line react/prop-types
function CountryList() {

  const {cities,isLoading} = useCities()

  if (isLoading) return <Spinner />;

  // eslint-disable-next-line react/prop-types
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.city).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {
        // eslint-disable-next-line react/prop-types
        countries.map((country) => (
          <CountryItem country={country} key={country.id} />
        ))
      }
    </ul>
  );
}

export default CountryList;
