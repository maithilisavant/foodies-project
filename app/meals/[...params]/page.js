import React from 'react';
import { MealContainer } from "../../components/mealContainer";
import { meals } from "../../constants";
meals

const MealPage = ({ params }) => {
  const name = params.params[1];
  const id = params.params[0];
  
  const meal = meals.find((meal) => meal?.id?.toString() === id);

  if (!meal) {
    return <div style={{background: "white", height:"100vh", margin:"auto"}}>
      Meal not found
    </div>;
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