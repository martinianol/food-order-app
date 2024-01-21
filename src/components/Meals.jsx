import { useState, useEffect } from "react";

import Meal from "./MealItem";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [errorData, setErrorData] = useState(false);

  useEffect(() => {
    console.log("I will fetch the meals...");
    const getData = async () => {
      const response = await fetch("http://localhost:3000/meals");
      if (response.ok) {
        const mealsData = await response.json();
        setMeals(mealsData);
      } else {
        setErrorData(true);
      }
    };
    getData();
  }, []);

  return (
    <section id="meals">
      {meals.map((meal) => (
        <Meal key={meal.id} mealData={meal} />
      ))}
    </section>
  );
};

export default Meals;
