import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import "./index.css";
import City from "./Components/City";
import Form from "./Components/Form";

const BASE_URL =
  "https://6729bd6c6d5fa4901b6e2735.mockapi.io/api/cities/cityList";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally{
        setIsLoading(false)
      }
    }
    fetchCities()
  }, []);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities"/>} />
            <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
            <Route path="cities/:id" element={<City/>}/>
            <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>} />
            <Route path="form" element={<Form/>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
