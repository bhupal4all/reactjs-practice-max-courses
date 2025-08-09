import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const params = useParams();

  return (<>
    <h3>Product Details Page</h3>
    <h4>Product ID: {params.productId}</h4>
  </>);
}