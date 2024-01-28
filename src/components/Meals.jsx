import useHttp from "../hooks/useHttp";
import Meal from "./MealItem";
import Error from "./Error";

const requestConfig = {
  method: "GET",
}; // SINO SE RECREA TODO EL TIEMPO Y HAY MIL CALLS AL BE

const Meals = () => {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }
  return (
    <section id="meals">
      {meals.map((meal) => (
        <Meal key={meal.id} mealData={meal} />
      ))}
    </section>
  );
};

export default Meals;
