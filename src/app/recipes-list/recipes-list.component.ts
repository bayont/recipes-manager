import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  asyncScheduler,
  combineLatest,
  Observable,
  of,
  startWith,
  switchMap,
  throttleTime
} from 'rxjs';
import { RecipeHttpService } from '../services/recipe-http.service';
import { Recipe } from '../shared';
import {
  actionCreateMockRecipe,
  actionCreateRecipe,
  actionFetchRecipes
} from '../store/recipe.actions';
import { RecipeListState } from '../store/recipe.reducer';
import { selectRecipes } from '../store/recipe.select';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent {
  public recipes$: Observable<Recipe[]> = of([]);
  public searchBar = new FormControl('');

  constructor(private store: Store<RecipeListState>) {}

  ngOnInit(): void {
    this.store.dispatch(actionFetchRecipes());
    this.recipes$ = combineLatest([
      this.store.select(selectRecipes),
      this.searchBar.valueChanges.pipe(startWith(''))
    ]).pipe(
      switchMap(([recipes, searchValue]) => {
        if (!searchValue) {
          return of(recipes);
        }
        return of(
          recipes.filter((recipe) => {
            const regex = new RegExp(searchValue, 'i');
            for (const ingredient of recipe.ingredients) {
              if (regex.test(ingredient.name)) {
                return true;
              }
            }
            return regex.test(recipe.name);
          })
        );
      })
    );
  }

  public addNewRecipe(): void {
    this.store.dispatch(actionCreateMockRecipe());
  }
}
