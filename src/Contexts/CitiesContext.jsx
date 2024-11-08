/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL =
  "https://6729bd6c6d5fa4901b6e2735.mockapi.io/api/cities/cityList";

// eslint-disable-next-line react/prop-types, no-unused-vars
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id){
    
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        setCurrentCity(data.find((c) => c.id == id));
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    
  }

  
  async function createCity(newCity){
    
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}`,{
        method: 'POST',
        body: JSON.stringify(newCity),
        headers:{
          "Content-type": "application/json"
        }
      });
      const data = await res.json();
      console.log(data);
      setCities((cities) => [...cities, data])
      
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  
}

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities(){
  const context = useContext(CitiesContext);
  if(context === undefined) throw new Error("CitiesContext was used outside of the CitiesProvider")
  return context;
}

export {CitiesProvider,useCities}
