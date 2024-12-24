// MealPage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { meals } from '../../constants';
import MealPage from './page';

// Mocking the MealContainer component
jest.mock('../../components/mealContainer', () => ({
  MealContainer: ({ meal }) => <div>
    <div>{meal.name}</div>
    <p><strong>Cooking Time:</strong> {meal.cooking_time}</p>
    <p><strong>Prep Time:</strong> {meal.prep_time}</p>
    <p><strong>City:</strong> {meal.city}</p>
</div>,
}));

describe('MealPage', () => {
  const mockMeals = [
    { id: '1', name: 'Spaghetti', cooking_time: '30 mins', prep_time: '10 mins', city: 'Rome', steps: ['Boil water', 'Add pasta', 'serve'] }
  ];

  beforeAll(() => {
    meals.splice(0, meals.length, ...mockMeals);
  });

  test('renders the meal details when a valid ID is provided', () => {
    const params = { params: ['1', 'Spaghetti'] };
    render(<MealPage params={params} />);

    expect(screen.getByText('Spaghetti')).toBeInTheDocument();
    expect(screen.getByText('Cooking Time:')).toBeInTheDocument();
    expect(screen.getByText('30 mins')).toBeInTheDocument();
    expect(screen.getByText('Prep Time:')).toBeInTheDocument();
    expect(screen.getByText('10 mins')).toBeInTheDocument();
    expect(screen.getByText('City:')).toBeInTheDocument();
    expect(screen.getByText('Rome')).toBeInTheDocument();
  });

  test('renders "Meal not found" when an invalid ID is provided', () => {
    const params = { params: ['999', 'Unknown Meal'] };
    render(<MealPage params={params} />);

    expect(screen.getByText('Meal not found')).toBeInTheDocument();
  });
});