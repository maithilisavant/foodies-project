import { MealContainer } from "@/app/components/mealContainer";
import { meals } from "@/app/constants";

const MealPage = ({ params }) => {
  const name = params.params[0];
  const mealId = params.params[1];
  const city = params.params[2];
  
  const meal = meals.find((meal) => meal?.name?.toLowerCase()?.replace(/ /g, '-') === name);

  if (!meal) {
    return <div>Meal not found</div>;
  }

  return (
    <main style={{background: "white", height:"100vh"}}>
      <div>
        <MealContainer meal={meal}/>
      </div>
    </main>
  );
};

export default MealPage;