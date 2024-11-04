import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import './index.css'
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="app" element={<AppLayout/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<PageNotFound/>}/>
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
