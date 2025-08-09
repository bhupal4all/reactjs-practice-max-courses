import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: 'p1', title: 'Product 1'},
  { id: 'p2', title: 'Product 2'},
  { id: 'p3', title: 'Product 3'}
];

export default function ProductsPage() {
  

  return (<>
    <h2>Products Page</h2>
    <ul>
      {PRODUCTS.map(link => <li><Link to={link.id}>{link.title}</Link></li>)}
    </ul>
  </>);
}