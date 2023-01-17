import { createSelector } from '@ngrx/store';
import { RecipeListState } from './recipe.reducer';

export const selectStore = (state: RecipeListState) => state;

export const selectRecipes = createSelector(selectStore, (state) => state.recipes);
