import { currencyFormatting } from "../utils/formatting";
import Button from "./common/Button";

const MealItem = ({ mealData }) => {
  const { id, description, image, name, price } = mealData;
  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} />
        <div>
          <h3>{name}</h3>
          <div className="meal-item-price">
            {currencyFormatting.format(price)}
          </div>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button>Add To Cart </Button>
        </p>
      </article>
    </div>
  );
};

export default MealItem;
