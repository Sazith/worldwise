import { BrowserRouter } from "react-router-dom";
import NavbarPage from "./Components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarPage />
      </BrowserRouter>
    </>
  );
}

export default App;
