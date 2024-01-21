import { currencyFormatting } from "../utils/formatting";
import Button from "./common/Button";
import { useContext } from "react";
import CartContext from "../store/CartContext";

const MealItem = ({ mealData }) => {
  const { addItem } = useContext(CartContext);
  const { description, image, name, price } = mealData;

  const handleAddMealToCart = () => {
    addItem(mealData);
  };

  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name}/>
        <div>
          <h3>{name}</h3>
          <div className="meal-item-price">
            {currencyFormatting.format(price)}
          </div>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add To Cart </Button>
        </p>
      </article>
    </div>
  );
};

export default MealItem;
