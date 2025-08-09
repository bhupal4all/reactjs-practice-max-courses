import { Link, useNavigate } from "react-router-dom";

export default function Home () {
  const navigate = useNavigate();

  function navigateToProducts() {
    navigate('products');
  }

  return (<>
    <h2>Home Page</h2>
    <p>Make a call to <Link to="products">Products</Link></p>

    <button onClick={navigateToProducts}>Go to Products</button>
  </>);
}