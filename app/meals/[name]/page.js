import { MealContainer } from '@/app/components/mealContainer';
import { meals } from '@/app/constants';
import { notFound } from 'next/navigation';

const getMealByName = (name) => {
  return meals.find(
    (meal) => meal.name.toLowerCase().replace(/ /g, '-') === name
  );
};

export default function MealPage({ params }) {
  const { name } = params;
  const meal = getMealByName(name);

  if (!meal) {
    return notFound();
  }

  return (
    <main style={{background: "white", height:"100vh"}}>
      <MealContainer meal={meal}/>
    </main>
  );
}