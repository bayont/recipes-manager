import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipeListState } from './recipe.reducer';
import {
  actionAddCreatedRecipe,
  actionCreateRecipe,
  actionDeleteRecipe,
  actionFetchRecipes,
  actionSetFetchedRecipes,
  actionSetRemoveRecipe,
  actionUpdateRecipe
} from './recipe.actions';
import { map, of, repeat, switchMap, tap } from 'rxjs';
import { RecipeHttpService } from '../services/recipe-http.service';

@Injectable()
export class RecipeListEffects {
  constructor(
    private readonly action$: Actions,
    private store: Store<RecipeListState>,
    private recipeHttpService: RecipeHttpService
  ) {}

  onFetchRecipes$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actionFetchRecipes),
      switchMap(() => {
        return this.recipeHttpService.fetchRecipes();
      }),
      map((recipes) => actionSetFetchedRecipes({ recipes })),
      repeat()
    );
  });

  onCreateRecipe$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actionCreateRecipe),
      switchMap(({ recipe }) => {
        return this.recipeHttpService.createRecipe(recipe);
      }),
      map((recipe) => actionAddCreatedRecipe({ recipe })),
      repeat()
    );
  });

  onUpdateRecipe$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actionUpdateRecipe),
      switchMap(({ recipe }) => {
        return this.recipeHttpService.updateRecipe(recipe._id, recipe);
      }),
      map((recipe) => actionAddCreatedRecipe({ recipe })),
      repeat()
    );
  });

  onDeleteRecipe$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actionDeleteRecipe),
      switchMap(({ recipeId }) => {
        return this.recipeHttpService.deleteRecipe(recipeId);
      }),
      map((recipeId) => actionSetRemoveRecipe({ recipeId })),
      repeat()
    );
  });
}
