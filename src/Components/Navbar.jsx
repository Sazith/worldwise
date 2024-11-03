import { Link } from "react-router-dom";

const NavbarPage = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="../pages/Pricing.jsx">Pricing</Link>
        </li>
        <li>
          <Link to="../pages/Product.jsx">Product</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarPage;
