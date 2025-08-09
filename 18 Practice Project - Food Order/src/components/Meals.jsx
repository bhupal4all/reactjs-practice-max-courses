import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./ui/Error";

const requestConfig = {};

export default function Meals() {

  const {
    data:meals,
    isLoading, 
    error
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) {
    return <p className="center">Loading...</p>;
  }

  if (error) {
    return <Error title="Error While Fetching Meals Data" message={error} />
  }

  return (
    <ul id="meals">
      {meals.map(meal => <MealItem key={meal.id} meal={meal} />)}
    </ul>
  );
}