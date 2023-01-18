import { Injectable } from '@angular/core';
import { Action, ActionReducerMap, createReducer, on, State, Store } from '@ngrx/store';
import { Recipe } from '../shared';
import {
  actionAddCreatedRecipe,
  actionSetFetchedRecipes,
  actionSetRemoveRecipe,
  actionSetUpdatedRecipe
} from './recipe.actions';

export interface RecipeListState {
  recipes: Recipe[];
}

const initialState: Recipe[] = [];

const reducer = createReducer<Recipe[]>(
  initialState,
  on(actionSetFetchedRecipes, (state, { recipes }) => {
    return [...recipes];
  }),
  on(actionSetRemoveRecipe, (state, { recipeId }) => {
    return state.filter((recipe) => recipe._id !== recipeId);
  }),
  on(actionAddCreatedRecipe, (state, { recipe }) => {
    return [...state, recipe];
  }),
  on(actionSetUpdatedRecipe, (state, { recipe, recipeId }) => {
    return state.map((item) => (item._id === recipeId ? { ...item, ...recipe } : item));
  })
);

export const reducers: ActionReducerMap<RecipeListState> = {
  recipes: reducer
};
