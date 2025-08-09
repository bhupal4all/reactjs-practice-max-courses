import { Link } from "react-router-dom";
import Navigation from "../components/navigation";

export default function ErrorPage () {
  return (<>
    <Navigation />
    <main>
      <h3>Error Page</h3>
      <p>Page couldn't find...</p>
      <p>Go to <Link to='/'>Home</Link></p>
    </main>
  </>);
}