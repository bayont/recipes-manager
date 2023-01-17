import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipeListState } from './recipe.reducer';
import {
  actionAddCreatedRecipe,
  actionCreateMockRecipe,
  actionCreateRecipe,
  actionDeleteRecipe,
  actionFetchRecipes,
  actionSetFetchedRecipes,
  actionSetRemoveRecipe,
  actionUpdateRecipe
} from './recipe.actions';
import { map, of, repeat, switchMap, tap } from 'rxjs';
import { RecipeHttpService } from '../services/recipe-http.service';
import { Router } from '@angular/router';
import { Recipe } from '../shared';

@Injectable()
export class RecipeListEffects {
  constructor(
    private readonly action$: Actions,
    private store: Store<RecipeListState>,
    private recipeHttpService: RecipeHttpService,
    private router: Router
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
      map((recipe) => {
        this.router.navigateByUrl(`/recipes/${recipe._id}/edit`);
        return actionAddCreatedRecipe({ recipe });
      }),
      repeat()
    );
  });

  onCreateMockRecipe$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actionCreateMockRecipe),
      map(() => {
        const MOCK_RECIPE: Omit<Recipe, '_id'> = {
          name: 'New dish',
          description: '',
          preparationTimeInMinutes: 10,
          ingredients: []
        };
        return actionCreateRecipe({ recipe: MOCK_RECIPE });
      }),
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
      tap(() => {
        this.router.navigateByUrl('/recipes');
      }),
      map((recipeId) => actionSetRemoveRecipe({ recipeId })),
      repeat()
    );
  });
}
