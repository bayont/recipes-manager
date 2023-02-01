import { Recipe } from 'src/app/shared';

export const recipesFixtures: Recipe[] = [
  {
    _id: '1',
    description: 'This is a description',
    ingredients: [{ _id: '1', name: 'Ingredient1', quantity: '2' }],
    name: 'RecipeName',
    preparationTimeInMinutes: 25
  }
];
